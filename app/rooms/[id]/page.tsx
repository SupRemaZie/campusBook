'use client'

import { use } from 'react'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { rooms, roomReservations } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { Calendar, Users, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const room = rooms.find(r => r.id === id)
  const allRoomReservations = useAppStore(state => state.roomReservations)
  
  if (!room) {
    notFound()
  }
  
  // Get reservations for this room
  const reservations = allRoomReservations.filter(r => r.roomId === room.id)
  
  // Generate calendar view for next 7 days
  const today = new Date()
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    return date
  })
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ]
  
  const isSlotReserved = (date: Date, time: string) => {
    const [hours] = time.split(':').map(Number)
    const slotStart = new Date(date)
    slotStart.setHours(hours, 0, 0, 0)
    
    return reservations.some(res => {
      const resStart = new Date(res.timeSlot.start)
      const resEnd = new Date(res.timeSlot.end)
      return slotStart >= resStart && slotStart < resEnd
    })
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <Link href="/rooms">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux salles
          </Button>
        </Link>
        
        {/* Room Info */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{room.name}</CardTitle>
                <CardDescription className="mt-2">{room.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">Disponible</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{room.capacity} places</span>
              </div>
              <Link href={`/rooms/${room.id}/book`}>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Réserver cette salle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Calendrier des réservations</CardTitle>
            <CardDescription>Vue des créneaux disponibles pour les 7 prochains jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Calendar Header */}
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="font-medium text-sm text-muted-foreground">Horaire</div>
                  {calendarDays.map((date, i) => (
                    <div key={i} className="text-center">
                      <div className="font-medium text-sm">
                        {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="space-y-2">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-2">
                      <div className="flex items-center text-sm text-muted-foreground font-medium">
                        <Clock className="h-3 w-3 mr-1" />
                        {time}
                      </div>
                      {calendarDays.map((date, i) => {
                        const reserved = isSlotReserved(date, time)
                        return (
                          <div
                            key={i}
                            className={`h-10 rounded-md flex items-center justify-center text-xs font-medium ${
                              reserved 
                                ? 'bg-destructive/10 text-destructive border border-destructive/20' 
                                : 'bg-secondary/30 text-secondary-foreground border border-secondary/50'
                            }`}
                          >
                            {reserved ? 'Réservé' : 'Libre'}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <MobileNavigation />
    </div>
  )
}
