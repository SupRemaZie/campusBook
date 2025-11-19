// Mock data for Campus Book application

import { Room, Equipment, Teacher, RoomReservation, EquipmentReservation, Appointment, User } from './types'

// Current mock user
export const currentUser: User = {
  id: 'user-1',
  name: 'Marie Dupont',
  email: 'marie.dupont@campus.fr',
  role: 'student'
}

// Rooms mock data
export const rooms: Room[] = [
  {
    id: 'room-1',
    name: 'Salle A101',
    capacity: 25,
    description: 'Salle de cours avec projecteur'
  },
  {
    id: 'room-2',
    name: 'Salle B203',
    capacity: 40,
    description: 'Amphithéâtre avec équipement audiovisuel'
  },
  {
    id: 'room-3',
    name: 'Labo Informatique',
    capacity: 20,
    description: '20 postes informatiques avec logiciels de développement'
  },
  {
    id: 'room-4',
    name: 'Salle de Réunion',
    capacity: 10,
    description: 'Espace de travail en groupe avec tableau blanc'
  },
  {
    id: 'room-5',
    name: 'Studio Multimédia',
    capacity: 15,
    description: 'Équipement photo/vidéo professionnel'
  }
]

// Equipment mock data
export const equipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'MacBook Pro 16"',
    description: 'Ordinateur portable haute performance pour montage vidéo et développement',
    maxDuration: 7,
    available: true,
    category: 'Informatique'
  },
  {
    id: 'eq-2',
    name: 'Caméra Canon EOS R6',
    description: 'Appareil photo professionnel pour projets audiovisuels',
    maxDuration: 3,
    available: true,
    category: 'Photo/Vidéo'
  },
  {
    id: 'eq-3',
    name: 'Microphone Rode NT-USB',
    description: 'Micro USB professionnel pour podcast et enregistrement audio',
    maxDuration: 5,
    available: false,
    category: 'Audio'
  },
  {
    id: 'eq-4',
    name: 'Projecteur Portable',
    description: 'Projecteur HD pour présentations et projections',
    maxDuration: 2,
    available: true,
    category: 'Présentation'
  },
  {
    id: 'eq-5',
    name: 'Tablette iPad Pro',
    description: 'Tablette graphique pour design et prise de notes',
    maxDuration: 7,
    available: true,
    category: 'Informatique'
  },
  {
    id: 'eq-6',
    name: 'Kit d\'éclairage LED',
    description: 'Kit complet d\'éclairage pour studio photo/vidéo',
    maxDuration: 3,
    available: false,
    category: 'Photo/Vidéo'
  }
]

// Teachers mock data
export const teachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Prof. Jean Martin',
    email: 'j.martin@campus.fr',
    speciality: 'Développement Web'
  },
  {
    id: 'teacher-2',
    name: 'Dr. Sophie Leclerc',
    email: 's.leclerc@campus.fr',
    speciality: 'Intelligence Artificielle'
  },
  {
    id: 'teacher-3',
    name: 'M. Pierre Dubois',
    email: 'p.dubois@campus.fr',
    speciality: 'Design UX/UI'
  },
  {
    id: 'teacher-4',
    name: 'Mme. Claire Bernard',
    email: 'c.bernard@campus.fr',
    speciality: 'Gestion de Projet'
  }
]

// Room reservations mock data
export const roomReservations: RoomReservation[] = [
  {
    id: 'res-1',
    roomId: 'room-1',
    userId: 'user-1',
    timeSlot: {
      start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T14:00:00', // Tomorrow at 14:00
      end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T16:00:00' // Tomorrow at 16:00
    },
    purpose: 'Travail de groupe - Projet Web',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    id: 'res-2',
    roomId: 'room-3',
    userId: 'user-2',
    timeSlot: {
      start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T10:00:00', // Day after tomorrow at 10:00
      end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T12:00:00' // Day after tomorrow at 12:00
    },
    purpose: 'Pratique développement',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  }
]

// Equipment reservations mock data
export const equipmentReservations: EquipmentReservation[] = [
  {
    id: 'eq-res-1',
    equipmentId: 'eq-3',
    userId: 'user-3',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // In 3 days
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
  },
  {
    id: 'eq-res-2',
    equipmentId: 'eq-6',
    userId: 'user-4',
    startDate: new Date(Date.now()).toISOString().split('T')[0], // Today
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // In 2 days
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
]

// Appointments mock data
export const appointments: Appointment[] = [
  {
    id: 'appt-1',
    teacherId: 'teacher-1',
    userId: 'user-1',
    timeSlot: {
      start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T15:00:00', // In 3 days at 15:00
      end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T16:00:00' // In 3 days at 16:00
    },
    subject: 'Questions sur le projet React',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  }
]

// Teacher availability (simplified - shows next available slots)
export const getTeacherAvailability = (teacherId: string) => {
  // Generate mock available slots for the next 7 days
  const slots = []
  const today = new Date()
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    
    // Morning slot
    slots.push({
      start: new Date(date.setHours(10, 0, 0, 0)).toISOString(),
      end: new Date(date.setHours(11, 0, 0, 0)).toISOString()
    })
    
    // Afternoon slot
    slots.push({
      start: new Date(date.setHours(14, 0, 0, 0)).toISOString(),
      end: new Date(date.setHours(15, 0, 0, 0)).toISOString()
    })
  }
  
  return slots
}
