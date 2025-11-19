// Type definitions for Campus Book application

export type UserRole = 'student' | 'teacher'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Room {
  id: string
  name: string
  capacity: number
  description?: string
}

export interface TimeSlot {
  start: string // ISO format
  end: string // ISO format
}

export interface RoomReservation {
  id: string
  roomId: string
  userId: string
  timeSlot: TimeSlot
  purpose?: string
  createdAt: string
}

export interface Equipment {
  id: string
  name: string
  description: string
  maxDuration: number // in days
  available: boolean
  category: string
}

export interface EquipmentReservation {
  id: string
  equipmentId: string
  userId: string
  startDate: string
  endDate: string
  createdAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  speciality: string
  avatar?: string
}

export interface Appointment {
  id: string
  teacherId: string
  userId: string
  timeSlot: TimeSlot
  subject?: string
  createdAt: string
}

export interface TeacherAvailability {
  teacherId: string
  availableSlots: TimeSlot[]
}
