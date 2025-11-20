import { beforeEach, describe, expect, it } from 'vitest'
import { getAvailableEquipment, getAvailableRooms, getEquipmentWithAvailability, getNextTeacherSlots, getUpcomingAppointments, getUpcomingEquipmentReservations, getUpcomingRoomReservations } from '../../lib/dashboard'
import type { Appointment, Equipment, EquipmentReservation, Room, RoomReservation, Teacher } from '../../lib/types'

let rooms: Room[]
let equipment: Equipment[]
let roomReservations: RoomReservation[]
let equipmentReservations: EquipmentReservation[]
let appointments: Appointment[]
let teachers: Teacher[]
let futureDate: Date
let futureEnd: Date

beforeEach(() => {
  rooms = [
    { id: 'room-1', name: 'Salle A', capacity: 10 },
    { id: 'room-2', name: 'Salle B', capacity: 20 },
    { id: 'room-3', name: 'Salle C', capacity: 30 }
  ]

  equipment = [
    { id: 'eq-1', name: 'Caméra', description: '', maxDuration: 3, available: true, category: 'Photo' },
    { id: 'eq-2', name: 'Laptop', description: '', maxDuration: 5, available: true, category: 'Info' }
  ]

  futureDate = new Date('2050-01-10T10:00:00')
  futureEnd = new Date('2050-01-10T12:00:00')

  roomReservations = [
    {
      id: 'res-1',
      roomId: 'room-1',
      userId: 'user-1',
      timeSlot: {
        start: futureDate.toISOString(),
        end: futureEnd.toISOString()
      },
      createdAt: new Date().toISOString()
    }
  ]

  equipmentReservations = [
    {
      id: 'eq-res-1',
      equipmentId: 'eq-1',
      userId: 'user-1',
      startDate: '2050-01-10',
      endDate: '2050-01-12',
      createdAt: new Date().toISOString()
    }
  ]

  appointments = [
    {
      id: 'appt-1',
      teacherId: 'teacher-1',
      userId: 'user-1',
      timeSlot: {
        start: futureDate.toISOString(),
        end: futureEnd.toISOString()
      },
      createdAt: new Date().toISOString()
    }
  ]

  teachers = [
    { id: 'teacher-1', name: 'Prof A', email: '', speciality: 'Maths' },
    { id: 'teacher-2', name: 'Prof B', email: '', speciality: 'Physique' }
  ]
})

describe('dashboard calculations', () => {
  it('filtre les réservations à venir par utilisateur', () => {
    expect(getUpcomingRoomReservations(roomReservations, 'user-1')).toHaveLength(1)
    expect(getUpcomingRoomReservations(roomReservations, 'user-2')).toHaveLength(0)

    expect(getUpcomingEquipmentReservations(equipmentReservations, 'user-1')).toHaveLength(1)
    expect(getUpcomingAppointments(appointments, 'user-1')).toHaveLength(1)
  })

  it('limite le nombre de salles accessibles rapidement', () => {
    expect(getAvailableRooms(rooms)).toHaveLength(3)
    expect(getAvailableRooms(rooms, 2)).toEqual(rooms.slice(0, 2))
  })

  it('calcule la disponibilité du matériel', () => {
    const availability = getEquipmentWithAvailability(equipment, equipmentReservations, new Date('2050-01-11T09:00:00'))
    const available = getAvailableEquipment(availability)

    expect(availability.find((item) => item.id === 'eq-1')?.available).toBe(false)
    expect(available).toHaveLength(1)
    expect(available[0].id).toBe('eq-2')
  })

  it('récupère les prochains créneaux enseignants', () => {
    const slots = getNextTeacherSlots(
      teachers,
      () => [
        { start: '2025-01-01T10:00:00Z', end: '2025-01-01T11:00:00Z' },
        { start: '2025-01-01T14:00:00Z', end: '2025-01-01T15:00:00Z' }
      ],
      1
    )
    expect(slots).toHaveLength(1)
    expect(slots[0].teacher.id).toBe('teacher-1')
    expect(slots[0].nextSlot.start).toBe('2025-01-01T10:00:00Z')
  })
})

