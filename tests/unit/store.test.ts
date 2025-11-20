import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore } from '../../lib/store'
import { appointments as initialAppointments, currentUser, equipmentReservations as initialEquipmentReservations, roomReservations as initialRoomReservations } from '../../lib/mock-data'
import type { Appointment, EquipmentReservation, RoomReservation, User } from '../../lib/types'

const createRoomReservation = (overrides?: Partial<RoomReservation>): RoomReservation => ({
  id: 'test-room',
  roomId: 'room-1',
  userId: 'user-42',
  timeSlot: {
    start: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  },
  createdAt: new Date().toISOString(),
  ...overrides
})

const createEquipmentReservation = (overrides?: Partial<EquipmentReservation>): EquipmentReservation => ({
  id: 'test-eq',
  equipmentId: 'eq-1',
  userId: 'user-99',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
  ...overrides
})

const createAppointment = (overrides?: Partial<Appointment>): Appointment => ({
  id: 'test-appt',
  teacherId: 'teacher-1',
  userId: 'user-77',
  timeSlot: {
    start: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
  },
  createdAt: new Date().toISOString(),
  ...overrides
})

beforeEach(() => {
  useAppStore.setState({
    currentUser,
    roomReservations: [...initialRoomReservations],
    equipmentReservations: [...initialEquipmentReservations],
    appointments: [...initialAppointments]
  })
})

describe('useAppStore actions', () => {
  it('ajoute puis supprime une réservation de salle', () => {
    const reservation = createRoomReservation()
    const { addRoomReservation, cancelRoomReservation, roomReservations } = useAppStore.getState()

    addRoomReservation(reservation)
    expect(useAppStore.getState().roomReservations).toContain(reservation)

    cancelRoomReservation(reservation.id)
    expect(useAppStore.getState().roomReservations).not.toContain(reservation)
    expect(useAppStore.getState().roomReservations).toEqual(roomReservations)
  })

  it('ajoute et supprime une réservation d’équipement', () => {
    const reservation = createEquipmentReservation()
    const originalCount = useAppStore.getState().equipmentReservations.length

    useAppStore.getState().addEquipmentReservation(reservation)
    expect(useAppStore.getState().equipmentReservations).toHaveLength(originalCount + 1)

    useAppStore.getState().cancelEquipmentReservation(reservation.id)
    expect(useAppStore.getState().equipmentReservations).toHaveLength(originalCount)
  })

  it('ajoute un rendez-vous', () => {
    const appointment = createAppointment()
    const originalCount = useAppStore.getState().appointments.length

    useAppStore.getState().addAppointment(appointment)
    expect(useAppStore.getState().appointments).toHaveLength(originalCount + 1)
    expect(useAppStore.getState().appointments).toContain(appointment)
  })

  it('change l’utilisateur courant', () => {
    const newUser: User = {
      id: 'user-100',
      name: 'Testeur',
      email: 'testeur@campus.fr',
      role: 'teacher'
    }

    useAppStore.getState().setCurrentUser(newUser)
    expect(useAppStore.getState().currentUser).toEqual(newUser)
  })
})

