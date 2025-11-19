'use client'

import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { rooms, equipment, teachers } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { Calendar, Package, Users, Clock, MapPin, Trash2, UserCircle } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function ProfilePage() {
  const { 
    currentUser, 
    roomReservations, 
    equipmentReservations, 
    appointments,
    cancelRoomReservation,
    cancelEquipmentReservation,
    cancelAppointment
  } = useAppStore()
  
  const { toast } = useToast()
  const [cancelDialog, setCancelDialog] = useState<{
    open: boolean
    type: 'room' | 'equipment' | 'appointment'
    id: string
    name: string
  } | null>(null)
  
  // Get user's reservations
  const myRoomReservations = roomReservations
    .filter(r => r.userId === currentUser.id)
    .map(r => ({
      ...r,
      room: rooms.find(room => room.id === r.roomId)
    }))
    .sort((a, b) => new Date(b.timeSlot.start).getTime() - new Date(a.timeSlot.start).getTime())
  
  const myEquipmentReservations = equipmentReservations
    .filter(r => r.userId === currentUser.id)
    .map(r => ({
      ...r,
      equipment: equipment.find(eq => eq.id === r.equipmentId)
    }))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  
  const myAppointments = appointments
    .filter(a => a.userId === currentUser.id)
    .map(a => ({
      ...a,
      teacher: teachers.find(t => t.id === a.teacherId)
    }))
    .sort((a, b) => new Date(b.timeSlot.start).getTime() - new Date(a.timeSlot.start).getTime())
  
  // Separate upcoming and past
  const now = new Date()
  const upcomingRooms = myRoomReservations.filter(r => new Date(r.timeSlot.start) > now)
  const pastRooms = myRoomReservations.filter(r => new Date(r.timeSlot.start) <= now)
  
  const upcomingEquipment = myEquipmentReservations.filter(r => new Date(r.endDate) >= now)
  const pastEquipment = myEquipmentReservations.filter(r => new Date(r.endDate) < now)
  
  const upcomingAppointments = myAppointments.filter(a => new Date(a.timeSlot.start) > now)
  const pastAppointments = myAppointments.filter(a => new Date(a.timeSlot.start) <= now)
  
  const handleCancel = () => {
    if (!cancelDialog) return
    
    switch (cancelDialog.type) {
      case 'room':
        cancelRoomReservation(cancelDialog.id)
        break
      case 'equipment':
        cancelEquipmentReservation(cancelDialog.id)
        break
      case 'appointment':
        cancelAppointment(cancelDialog.id)
        break
    }
    
    toast({
      title: "Réservation annulée",
      description: `La réservation de ${cancelDialog.name} a été annulée.`
    })
    
    setCancelDialog(null)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* User Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
                <CardDescription className="mt-1">
                  {currentUser.email} • <Badge variant="outline" className="ml-1">{currentUser.role === 'student' ? 'Étudiant' : 'Enseignant'}</Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        {/* Reservations */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {/* Upcoming Room Reservations */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Réservations de salles
              </h2>
              {upcomingRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingRooms.map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{res.room?.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {res.purpose || 'Pas de motif spécifié'}
                            </CardDescription>
                          </div>
                          <Badge>À venir</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(res.timeSlot.start).toLocaleDateString('fr-FR', { 
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(res.timeSlot.start).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })} - {new Date(res.timeSlot.end).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full mt-4"
                          onClick={() => setCancelDialog({
                            open: true,
                            type: 'room',
                            id: res.id,
                            name: res.room?.name || 'la salle'
                          })}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucune réservation de salle à venir
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Upcoming Equipment Reservations */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-secondary" />
                Équipements empruntés
              </h2>
              {upcomingEquipment.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingEquipment.map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{res.equipment?.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {res.equipment?.category}
                            </CardDescription>
                          </div>
                          <Badge>En cours</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Du {new Date(res.startDate).toLocaleDateString('fr-FR')} au {new Date(res.endDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full mt-4"
                          onClick={() => setCancelDialog({
                            open: true,
                            type: 'equipment',
                            id: res.id,
                            name: res.equipment?.name || 'l\'équipement'
                          })}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucun équipement emprunté
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-chart-3" />
                Rendez-vous planifiés
              </h2>
              {upcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingAppointments.map((appt) => (
                    <Card key={appt.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{appt.teacher?.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {appt.teacher?.speciality}
                            </CardDescription>
                          </div>
                          <Badge>À venir</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          {appt.subject && (
                            <p className="text-muted-foreground">{appt.subject}</p>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(appt.timeSlot.start).toLocaleDateString('fr-FR', { 
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(appt.timeSlot.start).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })} - {new Date(appt.timeSlot.end).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full mt-4"
                          onClick={() => setCancelDialog({
                            open: true,
                            type: 'appointment',
                            id: appt.id,
                            name: `le rendez-vous avec ${appt.teacher?.name}`
                          })}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucun rendez-vous planifié
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            {/* Past Room Reservations */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Réservations de salles
              </h2>
              {pastRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastRooms.map((res) => (
                    <Card key={res.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{res.room?.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {res.purpose || 'Pas de motif spécifié'}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">Terminé</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(res.timeSlot.start).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucun historique de réservation
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Past Equipment */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-secondary" />
                Équipements empruntés
              </h2>
              {pastEquipment.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastEquipment.map((res) => (
                    <Card key={res.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{res.equipment?.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {res.equipment?.category}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">Terminé</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Du {new Date(res.startDate).toLocaleDateString('fr-FR')} au {new Date(res.endDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucun historique d'emprunt
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Past Appointments */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-chart-3" />
                Rendez-vous passés
              </h2>
              {pastAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastAppointments.map((appt) => (
                    <Card key={appt.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{appt.teacher?.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {appt.teacher?.speciality}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">Terminé</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(appt.timeSlot.start).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucun historique de rendez-vous
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Cancel Dialog */}
      {cancelDialog && (
        <AlertDialog open={cancelDialog.open} onOpenChange={(open) => !open && setCancelDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer l'annulation</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir annuler {cancelDialog.name} ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Retour</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Confirmer l'annulation
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
      <MobileNavigation />
    </div>
  )
}
