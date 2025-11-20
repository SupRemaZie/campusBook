import { Appointment, Equipment, EquipmentReservation, Room, RoomReservation, Teacher } from './types'

interface TimeSlotSource {
  start: string
  end: string
}

const isInFuture = (date: Date, now = new Date()) => date.getTime() > now.getTime()

export const getUpcomingRoomReservations = (
  reservations: RoomReservation[],
  userId: string,
  now = new Date()
) =>
  reservations.filter(
    (reservation) =>
      reservation.userId === userId && isInFuture(new Date(reservation.timeSlot.start), now)
  )

export const getUpcomingEquipmentReservations = (
  reservations: EquipmentReservation[],
  userId: string,
  now = new Date()
) =>
  reservations.filter(
    (reservation) => reservation.userId === userId && new Date(reservation.endDate) >= now
  )

export const getUpcomingAppointments = (
  appointments: Appointment[],
  userId: string,
  now = new Date()
) =>
  appointments.filter(
    (appointment) => appointment.userId === userId && isInFuture(new Date(appointment.timeSlot.start), now)
  )

export const getAvailableRooms = (rooms: Room[], limit = 3) => rooms.slice(0, limit)

export const getEquipmentWithAvailability = (
  equipment: Equipment[],
  reservations: EquipmentReservation[],
  now = new Date()
) =>
  equipment.map((item) => {
    const isReserved = reservations.some((reservation) => {
      if (reservation.equipmentId !== item.id) return false
      const startDate = new Date(reservation.startDate)
      const endDate = new Date(reservation.endDate)
      return now >= startDate && now <= endDate
    })
    return { ...item, available: !isReserved }
  })

export const getAvailableEquipment = (
  equipmentWithAvailability: Equipment[],
  limit = 3
) => equipmentWithAvailability.filter((item) => item.available).slice(0, limit)

export const getNextTeacherSlots = (
  teachers: Teacher[],
  getAvailability: (teacherId: string) => TimeSlotSource[],
  limit = 3
) =>
  teachers.slice(0, limit).map((teacher) => ({
    teacher,
    nextSlot: getAvailability(teacher.id)[0]
  }))

