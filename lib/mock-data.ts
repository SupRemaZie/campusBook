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
  },
  {
    id: 'room-6',
    name: 'Salle C305',
    capacity: 30,
    description: 'Salle de cours standard avec tableau interactif'
  },
  {
    id: 'room-7',
    name: 'Bibliothèque - Espace Silencieux',
    capacity: 50,
    description: 'Espace de travail silencieux avec prises électriques'
  },
  {
    id: 'room-8',
    name: 'Salle de Conférence',
    capacity: 60,
    description: 'Grande salle pour conférences et présentations'
  },
  {
    id: 'room-9',
    name: 'Labo Électronique',
    capacity: 12,
    description: 'Laboratoire équipé pour travaux pratiques électroniques'
  },
  {
    id: 'room-10',
    name: 'Atelier Créatif',
    capacity: 18,
    description: 'Espace pour projets créatifs et artistiques'
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
  },
  {
    id: 'eq-7',
    name: 'PC Portable Dell XPS 15',
    description: 'Ordinateur portable performant pour développement et design',
    maxDuration: 7,
    available: true,
    category: 'Informatique'
  },
  {
    id: 'eq-8',
    name: 'Caméra GoPro Hero 12',
    description: 'Caméra d\'action pour captation vidéo dynamique',
    maxDuration: 5,
    available: true,
    category: 'Photo/Vidéo'
  },
  {
    id: 'eq-9',
    name: 'Enceinte Bluetooth JBL',
    description: 'Enceinte portable pour présentations et événements',
    maxDuration: 3,
    available: true,
    category: 'Audio'
  },
  {
    id: 'eq-10',
    name: 'Tablette Graphique Wacom',
    description: 'Tablette graphique pour illustration et design numérique',
    maxDuration: 7,
    available: true,
    category: 'Informatique'
  },
  {
    id: 'eq-11',
    name: 'Micro-cravate sans fil',
    description: 'Microphone cravate pour présentations et enregistrements',
    maxDuration: 2,
    available: true,
    category: 'Audio'
  },
  {
    id: 'eq-12',
    name: 'Drone DJI Mini 3',
    description: 'Drone compact pour prises de vue aériennes',
    maxDuration: 3,
    available: true,
    category: 'Photo/Vidéo'
  },
  {
    id: 'eq-13',
    name: 'Écran Externe 27"',
    description: 'Écran haute résolution pour travail multimédia',
    maxDuration: 5,
    available: true,
    category: 'Informatique'
  },
  {
    id: 'eq-14',
    name: 'Mixeur Audio 8 canaux',
    description: 'Table de mixage pour enregistrements audio professionnels',
    maxDuration: 4,
    available: false,
    category: 'Audio'
  },
  {
    id: 'eq-15',
    name: 'Trépied Manfrotto',
    description: 'Trépied professionnel pour caméras et appareils photo',
    maxDuration: 5,
    available: true,
    category: 'Photo/Vidéo'
  },
  {
    id: 'eq-16',
    name: 'Casque Audio Sennheiser',
    description: 'Casque audio professionnel pour mixage et montage',
    maxDuration: 7,
    available: true,
    category: 'Audio'
  },
  {
    id: 'eq-17',
    name: 'Scanner 3D',
    description: 'Scanner 3D pour numérisation d\'objets',
    maxDuration: 5,
    available: true,
    category: 'Informatique'
  },
  {
    id: 'eq-18',
    name: 'Stabilisateur Gimbal',
    description: 'Stabilisateur pour caméras et smartphones',
    maxDuration: 3,
    available: true,
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
  },
  {
    id: 'teacher-5',
    name: 'Prof. Marc Lefebvre',
    email: 'm.lefebvre@campus.fr',
    speciality: 'Base de données'
  },
  {
    id: 'teacher-6',
    name: 'Dr. Anne Moreau',
    email: 'a.moreau@campus.fr',
    speciality: 'Sécurité Informatique'
  },
  {
    id: 'teacher-7',
    name: 'M. Thomas Rousseau',
    email: 't.rousseau@campus.fr',
    speciality: 'Architecture Logicielle'
  },
  {
    id: 'teacher-8',
    name: 'Mme. Julie Petit',
    email: 'j.petit@campus.fr',
    speciality: 'Marketing Digital'
  },
  {
    id: 'teacher-9',
    name: 'Prof. Laurent Girard',
    email: 'l.girard@campus.fr',
    speciality: 'Réseaux et Systèmes'
  },
  {
    id: 'teacher-10',
    name: 'Dr. Émilie Durand',
    email: 'e.durand@campus.fr',
    speciality: 'Data Science'
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
