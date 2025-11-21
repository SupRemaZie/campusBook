import { describe, expect, it } from 'vitest'
import { clampRangeToMaxDuration, formatDateInput, generateHourlySlots, getDateKey, isEquipmentCurrentlyReserved, isSlotInPast, isSlotReserved } from '../../lib/scheduling'

describe('scheduling helpers', () => {
  it('génère les créneaux horaires attendus', () => {
    const slots = generateHourlySlots()
    expect(slots).toHaveLength(12)
    expect(slots[0]).toEqual({ start: '08:00', end: '09:00' })
    expect(slots.at(-1)).toEqual({ start: '19:00', end: '20:00' })
  })

  it('détecte les créneaux passés pour la date sélectionnée', () => {
    const date = new Date('2025-01-02T09:00:00')
    const now = new Date('2025-01-02T10:30:00')
    expect(isSlotInPast(date, '09:00', now)).toBe(true)
    expect(isSlotInPast(date, '11:00', now)).toBe(false)
  })

  it('détecte les créneaux réservés', () => {
    const date = new Date('2025-01-10T00:00:00')
    const slot = { start: '10:00', end: '11:00' }
    const reservedSlots = [
      {
        start: '2025-01-10T10:00:00',
        end: '2025-01-10T12:00:00'
      }
    ]
    expect(isSlotReserved(date, slot, reservedSlots)).toBe(true)
    expect(isSlotReserved(date, { start: '12:00', end: '13:00' }, reservedSlots)).toBe(false)
  })

  it('retourne false si la date est undefined dans isSlotReserved', () => {
    const slot = { start: '10:00', end: '11:00' }
    const reservedSlots = [
      {
        start: '2025-01-10T10:00:00',
        end: '2025-01-10T12:00:00'
      }
    ]
    expect(isSlotReserved(undefined, slot, reservedSlots)).toBe(false)
  })

  it('retourne false si la date est undefined dans isSlotInPast', () => {
    const now = new Date('2025-01-02T10:30:00')
    expect(isSlotInPast(undefined, '09:00', now)).toBe(false)
  })

  it('retourne false si la date n\'est pas aujourd\'hui dans isSlotInPast', () => {
    const date = new Date('2025-01-01T09:00:00')
    const now = new Date('2025-01-02T10:30:00')
    expect(isSlotInPast(date, '09:00', now)).toBe(false)
  })

  it('clamp la plage de dates à la durée maximale', () => {
    const range = {
      from: new Date('2025-01-01'),
      to: new Date('2025-01-05')
    }
    const clamped = clampRangeToMaxDuration(range, 2)
    expect(formatDateInput(clamped.from!)).toBe('2025-01-01')
    expect(formatDateInput(clamped.to!)).toBe('2025-01-03')
  })

  it('retourne la plage inchangée si from ou to est undefined dans clampRangeToMaxDuration', () => {
    const rangeWithoutFrom = { from: undefined, to: new Date('2025-01-05') }
    expect(clampRangeToMaxDuration(rangeWithoutFrom, 2)).toEqual(rangeWithoutFrom)

    const rangeWithoutTo = { from: new Date('2025-01-01'), to: undefined }
    expect(clampRangeToMaxDuration(rangeWithoutTo, 2)).toEqual(rangeWithoutTo)

    const rangeWithoutBoth = { from: undefined, to: undefined }
    expect(clampRangeToMaxDuration(rangeWithoutBoth, 2)).toEqual(rangeWithoutBoth)
  })

  it('retourne la plage inchangée si la durée est déjà inférieure à la durée maximale', () => {
    const range = {
      from: new Date('2025-01-01'),
      to: new Date('2025-01-02')
    }
    const clamped = clampRangeToMaxDuration(range, 3)
    expect(clamped).toEqual(range)
  })

  it('détermine si un équipement est emprunté', () => {
    const reservations = [
      {
        id: 'eq-res',
        equipmentId: 'eq-1',
        userId: 'user',
        startDate: '2025-01-01',
        endDate: '2025-01-03',
        createdAt: '2024-12-31'
      }
    ]
    expect(isEquipmentCurrentlyReserved(reservations, 'eq-1', new Date('2025-01-02'))).toBe(true)
    expect(isEquipmentCurrentlyReserved(reservations, 'eq-1', new Date('2025-01-05'))).toBe(false)
  })

  it('détecte les créneaux réservés avec des dates différentes', () => {
    const date = new Date('2025-01-10T00:00:00')
    const slot = { start: '10:00', end: '11:00' }
    const reservedSlots = [
      {
        start: '2025-01-09T10:00:00',
        end: '2025-01-09T12:00:00'
      }
    ]
    expect(isSlotReserved(date, slot, reservedSlots)).toBe(false)
  })

  it('normalise les dates pour correspondre aux créneaux', () => {
    const date = new Date('2025-01-01T12:00:00')
    expect(getDateKey(date)).toBe('2025-01-01')
  })
})

