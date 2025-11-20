'use client'

import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { rooms, equipment, teachers, getTeacherAvailability } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { getAvailableEquipment, getAvailableRooms, getEquipmentWithAvailability, getNextTeacherSlots, getUpcomingAppointments, getUpcomingEquipmentReservations, getUpcomingRoomReservations } from '@/lib/dashboard'
import { Calendar, Package, Users, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { roomReservations, equipmentReservations, appointments, currentUser } = useAppStore()
  
  // Get user's upcoming reservations
  const now = new Date()
  
  const myRoomReservations = getUpcomingRoomReservations(roomReservations, currentUser.id, now)
  const myEquipmentReservations = getUpcomingEquipmentReservations(equipmentReservations, currentUser.id, now)
  const myAppointments = getUpcomingAppointments(appointments, currentUser.id, now)
  
  const availableRooms = getAvailableRooms(rooms)
  
  // Calculate equipment availability dynamically
  const equipmentWithAvailability = getEquipmentWithAvailability(equipment, equipmentReservations, now)
  const availableEquipment = getAvailableEquipment(equipmentWithAvailability)
  
  const nextTeacherSlots = getNextTeacherSlots(teachers, getTeacherAvailability)
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">
            Bienvenue, {currentUser.name}
          </h1>
          <p className="text-muted-foreground text-pretty">
            Gérez vos réservations de salles, équipements et rendez-vous en un seul endroit
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Réservations de salles</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myRoomReservations.length}</div>
              <p className="text-xs text-muted-foreground">À venir</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Équipements empruntés</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myEquipmentReservations.length}</div>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rendez-vous planifiés</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Prochains</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Available Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Rooms */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Salles disponibles</CardTitle>
                  <CardDescription>Réservez un espace de travail</CardDescription>
                </div>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableRooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div>
                    <p className="font-medium text-sm">{room.name}</p>
                    <p className="text-xs text-muted-foreground">{room.capacity} places</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Disponible</Badge>
                </div>
              ))}
              <Link href="/rooms">
                <Button variant="outline" className="w-full" size="sm">
                  Voir toutes les salles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Available Equipment */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Équipements disponibles</CardTitle>
                  <CardDescription>Empruntez du matériel</CardDescription>
                </div>
                <Package className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableEquipment.map((eq) => (
                <div key={eq.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div>
                    <p className="font-medium text-sm">{eq.name}</p>
                    <p className="text-xs text-muted-foreground">{eq.category}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Disponible</Badge>
                </div>
              ))}
              <Link href="/equipment">
                <Button variant="outline" className="w-full" size="sm">
                  Voir tous les équipements
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Next Teacher Slots */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prochains créneaux</CardTitle>
                  <CardDescription>Enseignants disponibles</CardDescription>
                </div>
                <Users className="h-5 w-5 text-chart-3" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextTeacherSlots.map(({ teacher, nextSlot }) => (
                <div key={teacher.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div>
                    <p className="font-medium text-sm">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.speciality}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(nextSlot.start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              ))}
              <Link href="/appointments">
                <Button variant="outline" className="w-full" size="sm">
                  Prendre rendez-vous
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <MobileNavigation />
    </div>
  )
}
