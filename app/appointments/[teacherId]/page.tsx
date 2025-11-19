'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { teachers, getTeacherAvailability } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function BookAppointmentPage() {
  const params = useParams<{ teacherId: string }>()
  const teacherId = params.teacherId
  const teacher = teachers.find(t => t.id === teacherId)
  const router = useRouter()
  const { toast } = useToast()
  const { addAppointment, appointments, currentUser } = useAppStore()
  
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null)
  const [subject, setSubject] = useState('')
  
  if (!teacher) {
    notFound()
  }
  
  // Get available slots
  const availableSlots = getTeacherAvailability(teacher.id)
  
  // Filter out already booked slots
  const freeSlots = availableSlots.filter(slot => {
    return !appointments.some(appt => 
      appt.teacherId === teacher.id &&
      appt.timeSlot.start === slot.start
    )
  })
  
  // Group slots by date
  const slotsByDate = freeSlots.reduce((acc, slot) => {
    const date = new Date(slot.start).toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(slot)
    return acc
  }, {} as Record<string, typeof freeSlots>)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedSlot) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un créneau",
        variant: "destructive"
      })
      return
    }
    
    // Create appointment
    const appointment = {
      id: `appt-${Date.now()}`,
      teacherId: teacher.id,
      userId: currentUser.id,
      timeSlot: selectedSlot,
      subject,
      createdAt: new Date().toISOString()
    }
    
    addAppointment(appointment)
    
    toast({
      title: "Rendez-vous confirmé",
      description: `Votre rendez-vous avec ${teacher.name} a été réservé.`
    })
    
    router.push('/profile')
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8 max-w-4xl">
        <Link href="/appointments">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux enseignants
          </Button>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Teacher Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{teacher.name}</CardTitle>
                  <CardDescription className="mt-2">{teacher.speciality}</CardDescription>
                </div>
                <Users className="h-5 w-5 text-chart-3 flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {teacher.email}
              </div>
            </CardContent>
          </Card>
          
          {/* Booking Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Réserver un créneau</CardTitle>
              <CardDescription>Sélectionnez un horaire disponible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Available Slots */}
                <div className="space-y-4">
                  <Label>Créneaux disponibles *</Label>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {Object.entries(slotsByDate).map(([date, slots]) => (
                      <div key={date} className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground capitalize">
                          {date}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {slots.map((slot) => {
                            const isSelected = selectedSlot?.start === slot.start
                            const startTime = new Date(slot.start).toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                            const endTime = new Date(slot.end).toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                            
                            return (
                              <Button
                                key={slot.start}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedSlot(slot)}
                                className="justify-start"
                              >
                                <Clock className="h-3 w-3 mr-2" />
                                {startTime} - {endTime}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {freeSlots.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Aucun créneau disponible pour le moment
                    </p>
                  )}
                </div>
                
                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet du rendez-vous</Label>
                  <Textarea
                    id="subject"
                    placeholder="Ex: Questions sur le cours de React, aide pour le projet..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    rows={3}
                  />
                </div>
                
                {/* Selected Slot Display */}
                {selectedSlot && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Créneau sélectionné:</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedSlot.start).toLocaleDateString('fr-FR', { 
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={!selectedSlot || freeSlots.length === 0}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Confirmer le rendez-vous
                  </Button>
                  <Link href="/appointments" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Annuler
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <MobileNavigation />
    </div>
  )
}
