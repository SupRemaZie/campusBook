import { describe, expect, it } from 'vitest'
import { canCancelBeforeThreshold, doTimeRangesOverlap, getReservationDurationInDays, hasEquipmentReservationConflict, hasRoomReservationConflict, isTimeRangeValid } from '../../lib/validation'
import type { EquipmentReservation, RoomReservation } from '../../lib/types'

const createRoomReservation = (overrides?: Partial<RoomReservation>): RoomReservation => ({
  id: 'res-test',
  roomId: 'room-1',
  userId: 'user-1',
  timeSlot: {
    start: new Date('2025-01-10T10:00:00Z').toISOString(),
    end: new Date('2025-01-10T12:00:00Z').toISOString()
  },
  createdAt: new Date().toISOString(),
  ...overrides
})

const createEquipmentReservation = (overrides?: Partial<EquipmentReservation>): EquipmentReservation => ({
  id: 'eq-test',
  equipmentId: 'eq-1',
  userId: 'user-1',
  startDate: '2025-01-10',
  endDate: '2025-01-12',
  createdAt: new Date().toISOString(),
  ...overrides
})

describe('validation helpers', () => {
  it('détecte les conflits de réservation de salles', () => {
    const reservations = [createRoomReservation()]
    const requestedStart = new Date('2025-01-10T11:00:00Z')
    const requestedEnd = new Date('2025-01-10T13:00:00Z')

    expect(hasRoomReservationConflict(reservations, 'room-1', requestedStart, requestedEnd)).toBe(true)
    expect(hasRoomReservationConflict(reservations, 'room-2', requestedStart, requestedEnd)).toBe(false)

    const nonOverlappingStart = new Date('2025-01-10T13:00:00Z')
    const nonOverlappingEnd = new Date('2025-01-10T14:00:00Z')
    expect(hasRoomReservationConflict(reservations, 'room-1', nonOverlappingStart, nonOverlappingEnd)).toBe(false)
  })

  it('détecte les conflits de réservation d’équipement', () => {
    const reservations = [createEquipmentReservation()]
    const overlappingStart = new Date('2025-01-11T00:00:00Z')
    const overlappingEnd = new Date('2025-01-13T00:00:00Z')

    expect(hasEquipmentReservationConflict(reservations, 'eq-1', overlappingStart, overlappingEnd)).toBe(true)

    const nonOverlapStart = new Date('2025-01-13T00:00:00Z')
    const nonOverlapEnd = new Date('2025-01-14T00:00:00Z')
    expect(hasEquipmentReservationConflict(reservations, 'eq-1', nonOverlapStart, nonOverlapEnd)).toBe(false)
  })

  it('valide et compare correctement les plages horaires', () => {
    const start = new Date('2025-01-10T09:00:00Z')
    const end = new Date('2025-01-10T10:00:00Z')
    expect(isTimeRangeValid(start, end)).toBe(true)
    expect(isTimeRangeValid(end, start)).toBe(false)
    expect(
      doTimeRangesOverlap(
        { start, end },
        { start: new Date('2025-01-10T09:30:00Z'), end: new Date('2025-01-10T11:00:00Z') }
      )
    ).toBe(true)
  })

  it('calcule la durée en jours en arrondissant vers le haut', () => {
    const start = new Date('2025-01-01T10:00:00Z')
    const end = new Date('2025-01-03T09:00:00Z')
    expect(getReservationDurationInDays(start, end)).toBe(2)

    const longEnd = new Date('2025-01-03T15:00:00Z')
    expect(getReservationDurationInDays(start, longEnd)).toBe(3)
  })

  it('applique la règle d’annulation 24h', () => {
    const now = new Date('2025-01-01T10:00:00Z')
    const allowed = new Date('2025-01-02T11:00:00Z')
    const blocked = new Date('2025-01-01T20:00:00Z')

    expect(canCancelBeforeThreshold(allowed, now)).toBe(true)
    expect(canCancelBeforeThreshold(blocked, now)).toBe(false)
  })
})

