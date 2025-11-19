'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { teachers } from '@/lib/mock-data'
import { Users, Search, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">
            Prendre rendez-vous
          </h1>
          <p className="text-muted-foreground text-pretty">
            Réservez un créneau avec un enseignant ou tuteur
          </p>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <CardDescription className="mt-1.5">{teacher.speciality}</CardDescription>
                  </div>
                  <Users className="h-5 w-5 text-chart-3 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-muted-foreground">
                    {teacher.email}
                  </div>
                </div>
                <Link href={`/appointments/${teacher.id}`}>
                  <Button className="w-full" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Voir les créneaux
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun enseignant trouvé</p>
          </div>
        )}
      </main>
      
      <MobileNavigation />
    </div>
  )
}
