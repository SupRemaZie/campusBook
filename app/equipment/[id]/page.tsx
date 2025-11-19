'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { DateRangePicker } from '@/components/date-range-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { equipment } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter, useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function BookEquipmentPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const eq = equipment.find(e => e.id === id)
  const router = useRouter()
  const { toast } = useToast()
  const { addEquipmentReservation, currentUser } = useAppStore()
  
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  
  if (!eq) {
    notFound()
  }
  
  const handleRangeSelect = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!startDate || !endDate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une période d'emprunt",
        variant: "destructive"
      })
      return
    }
    
    if (!eq.available) {
      toast({
        title: "Équipement indisponible",
        description: "Cet équipement est actuellement emprunté",
        variant: "destructive"
      })
      return
    }
    
    // Check duration
    const start = new Date(startDate)
    const end = new Date(endDate)
    const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
    if (durationDays > eq.maxDuration) {
      toast({
        title: "Durée trop longue",
        description: `La durée maximale d'emprunt est de ${eq.maxDuration} jours`,
        variant: "destructive"
      })
      return
    }
    
    // Create reservation
    const reservation = {
      id: `eq-res-${Date.now()}`,
      equipmentId: eq.id,
      userId: currentUser.id,
      startDate,
      endDate,
      createdAt: new Date().toISOString()
    }
    
    addEquipmentReservation(reservation)
    
    toast({
      title: "Réservation confirmée",
      description: `${eq.name} a été réservé avec succès.`
    })
    
    router.push('/profile')
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8 max-w-4xl">
        <Link href="/equipment">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux équipements
          </Button>
        </Link>
        
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{eq.name}</CardTitle>
                <Badge variant="outline" className="mt-2">{eq.category}</Badge>
              </div>
              <Badge variant={eq.available ? "secondary" : "destructive"}>
                {eq.available ? 'Disponible' : 'Emprunté'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-4">{eq.description}</CardDescription>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Durée maximale d'emprunt: {eq.maxDuration} jours</span>
            </div>
          </CardContent>
        </Card>
        
        {eq.available ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <DateRangePicker
              maxDuration={eq.maxDuration}
              onSelectRange={handleRangeSelect}
              selectedStart={startDate}
              selectedEnd={endDate}
            />
            
            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={!startDate || !endDate}
              >
                Confirmer la réservation
              </Button>
              <Link href="/equipment" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Cet équipement est actuellement emprunté et n'est pas disponible pour le moment.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <MobileNavigation />
    </div>
  )
}
