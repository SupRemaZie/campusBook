'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { TimeSlotPicker } from '@/components/time-slot-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { rooms } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { hasRoomReservationConflict, isTimeRangeValid } from '@/lib/validation'

export default function BookRoomPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const room = rooms.find(r => r.id === id)
  const router = useRouter()
  const { toast } = useToast()
  const { addRoomReservation, roomReservations, currentUser } = useAppStore()
  
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedStartTime, setSelectedStartTime] = useState<string>()
  const [selectedEndTime, setSelectedEndTime] = useState<string>()
  const [purpose, setPurpose] = useState('')
  
  if (!room) {
    notFound()
  }
  
  // Get reserved slots for this room
  const reservedSlots = roomReservations
    .filter(res => res.roomId === room.id)
    .map(res => ({
      start: res.timeSlot.start,
      end: res.timeSlot.end
    }))
  
  const handleSlotSelect = (date: Date, startTime: string, endTime: string) => {
    setSelectedDate(date)
    setSelectedStartTime(startTime)
    setSelectedEndTime(endTime)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedStartTime || !selectedEndTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un créneau horaire",
        variant: "destructive"
      })
      return
    }
    
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    
    const requestedStart = new Date(`${dateStr}T${selectedStartTime}`)
    const requestedEnd = new Date(`${dateStr}T${selectedEndTime}`)
    
    // Validation: vérifier que l'heure de fin est après l'heure de début
    if (!isTimeRangeValid(requestedStart, requestedEnd)) {
      toast({
        title: "Erreur",
        description: "L'heure de fin doit être après l'heure de début",
        variant: "destructive"
      })
      return
    }
    
    // Validation: vérifier les conflits avec les réservations existantes
    const hasConflict = hasRoomReservationConflict(
      roomReservations,
      room.id,
      requestedStart,
      requestedEnd
    )
    
    if (hasConflict) {
      toast({
        title: "Créneau indisponible",
        description: "Ce créneau est déjà réservé. Veuillez choisir un autre horaire.",
        variant: "destructive"
      })
      return
    }
    
    const reservation = {
      id: `res-${Date.now()}`,
      roomId: room.id,
      userId: currentUser.id,
      timeSlot: {
        start: requestedStart.toISOString(),
        end: requestedEnd.toISOString()
      },
      purpose,
      createdAt: new Date().toISOString()
    }
    
    addRoomReservation(reservation)
    
    toast({
      title: "Réservation confirmée",
      description: `La salle ${room.name} a été réservée avec succès.`
    })
    
    router.push('/profile')
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8 max-w-4xl">
        <Link href={`/rooms/${room.id}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Réserver {room.name}</h1>
          <p className="text-muted-foreground">{room.description}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <TimeSlotPicker
            reservedSlots={reservedSlots}
            onSelectSlot={handleSlotSelect}
            selectedDate={selectedDate}
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Informations complémentaires</CardTitle>
              <CardDescription>Ajoutez des détails sur votre réservation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="purpose">Motif de la réservation</Label>
                <Textarea
                  id="purpose"
                  placeholder="Ex: Travail de groupe, Présentation de projet..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-3">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!selectedDate || !selectedStartTime || !selectedEndTime}
            >
              Confirmer la réservation
            </Button>
            <Link href={`/rooms/${room.id}`} className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Annuler
              </Button>
            </Link>
          </div>
        </form>
      </main>
      
      <MobileNavigation />
    </div>
  )
}
