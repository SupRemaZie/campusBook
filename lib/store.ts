'use client'

import { create } from 'zustand'
import { User, RoomReservation, EquipmentReservation, Appointment } from './types'
import { currentUser as initialUser, roomReservations as initialRoomReservations, equipmentReservations as initialEquipmentReservations, appointments as initialAppointments } from './mock-data'

interface AppState {
  currentUser: User
  roomReservations: RoomReservation[]
  equipmentReservations: EquipmentReservation[]
  appointments: Appointment[]
  
  // Actions
  addRoomReservation: (reservation: RoomReservation) => void
  cancelRoomReservation: (id: string) => void
  addEquipmentReservation: (reservation: EquipmentReservation) => void
  cancelEquipmentReservation: (id: string) => void
  addAppointment: (appointment: Appointment) => void
  cancelAppointment: (id: string) => void
  setCurrentUser: (user: User) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: initialUser,
  roomReservations: initialRoomReservations,
  equipmentReservations: initialEquipmentReservations,
  appointments: initialAppointments,
  
  addRoomReservation: (reservation) => 
    set((state) => ({ 
      roomReservations: [...state.roomReservations, reservation] 
    })),
  
  cancelRoomReservation: (id) =>
    set((state) => ({
      roomReservations: state.roomReservations.filter(r => r.id !== id)
    })),
  
  addEquipmentReservation: (reservation) =>
    set((state) => ({
      equipmentReservations: [...state.equipmentReservations, reservation]
    })),
  
  cancelEquipmentReservation: (id) =>
    set((state) => ({
      equipmentReservations: state.equipmentReservations.filter(r => r.id !== id)
    })),
  
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment]
    })),
  
  cancelAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter(a => a.id !== id)
    })),
  
  setCurrentUser: (user) => set({ currentUser: user })
}))
