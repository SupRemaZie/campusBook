'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { rooms } from '@/lib/mock-data'
import { Calendar, Users, Search } from 'lucide-react'
import Link from 'next/link'

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">
            Salles disponibles
          </h1>
          <p className="text-muted-foreground text-pretty">
            Réservez un espace adapté à vos besoins
          </p>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une salle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription className="mt-1.5">{room.description}</CardDescription>
                  </div>
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} places</span>
                  </div>
                  <Badge variant="secondary">Disponible</Badge>
                </div>
                <div className="flex gap-2">
                  <Link href={`/rooms/${room.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      Voir le calendrier
                    </Button>
                  </Link>
                  <Link href={`/rooms/${room.id}/book`} className="flex-1">
                    <Button className="w-full" size="sm">
                      Réserver
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune salle trouvée</p>
          </div>
        )}
      </main>
      
      <MobileNavigation />
    </div>
  )
}
