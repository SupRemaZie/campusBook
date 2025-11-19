'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimeSlot {
  start: string
  end: string
}

interface TimeSlotPickerProps {
  reservedSlots: TimeSlot[]
  onSelectSlot: (date: Date, startTime: string, endTime: string) => void
  selectedDate?: Date
  selectedStartTime?: string
  selectedEndTime?: string
}

// Generate time slots from 8:00 to 20:00 in 1-hour increments
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour < 20; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`
    slots.push({ start, end })
  }
  return slots
}

export function TimeSlotPicker({ 
  reservedSlots, 
  onSelectSlot,
  selectedDate,
  selectedStartTime,
  selectedEndTime
}: TimeSlotPickerProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const [startTime, setStartTime] = useState<string | undefined>(selectedStartTime)
  const [endTime, setEndTime] = useState<string | undefined>(selectedEndTime)
  
  const timeSlots = generateTimeSlots()
  
  // Check if a time slot is in the past
  const isSlotInPast = (slotStart: string) => {
    if (!date) return false
    
    const now = new Date()
    const tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    const dateStr = tempDate.toISOString().split('T')[0]
    const todayStr = now.toISOString().split('T')[0]
    
    // If the selected date is not today, it's not in the past (already handled by calendar)
    if (dateStr !== todayStr) return false
    
    // Check if the time slot is in the past for today
    const slotDateTime = new Date(`${dateStr}T${slotStart}`)
    return slotDateTime < now
  }
  
  // Check if a time slot is reserved for the selected date
  const isSlotReserved = (slotStart: string, slotEnd: string) => {
    if (!date) return false
    
    const tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    const dateStr = tempDate.toISOString().split('T')[0]
    const slotStartDateTime = new Date(`${dateStr}T${slotStart}`)
    const slotEndDateTime = new Date(`${dateStr}T${slotEnd}`)
    
    return reservedSlots.some(reserved => {
      const reservedStart = new Date(reserved.start)
      const reservedEnd = new Date(reserved.end)
      
      // Check if dates match
      if (reservedStart.toISOString().split('T')[0] !== dateStr) return false
      
      // Check if time slots overlap
      return slotStartDateTime < reservedEnd && slotEndDateTime > reservedStart
    })
  }
  
  const handleTimeSlotClick = (slot: { start: string; end: string }) => {
    if (!date) return
    if (isSlotReserved(slot.start, slot.end)) return
    if (isSlotInPast(slot.start)) return
    
    setStartTime(slot.start)
    setEndTime(slot.end)
    onSelectSlot(date, slot.start, slot.end)
  }
  
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    setStartTime(undefined)
    setEndTime(undefined)
  }
  
  // Disable past dates
  const disabledDays = { before: new Date() }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sélectionner une date</CardTitle>
          <CardDescription>Choisissez le jour de votre réservation</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      
      {date && (
        <Card>
          <CardHeader>
            <CardTitle>Créneaux disponibles</CardTitle>
            <CardDescription>
              {date.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const reserved = isSlotReserved(slot.start, slot.end)
                const inPast = isSlotInPast(slot.start)
                const disabled = reserved || inPast
                const selected = startTime === slot.start && endTime === slot.end
                
                return (
                  <Button
                    key={`${slot.start}-${slot.end}`}
                    type="button"
                    variant={selected ? "default" : disabled ? "outline" : "outline"}
                    className={cn(
                      "h-auto py-3 flex flex-col gap-1",
                      disabled && "opacity-50 cursor-not-allowed",
                      selected && "ring-2 ring-primary"
                    )}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={disabled}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm font-medium">
                        {slot.start} - {slot.end}
                      </span>
                    </div>
                    {inPast && (
                      <Badge variant="secondary" className="text-xs">
                        Passé
                      </Badge>
                    )}
                    {reserved && (
                      <Badge variant="destructive" className="text-xs">
                        Réservé
                      </Badge>
                    )}
                    {selected && (
                      <Badge variant="secondary" className="text-xs">
                        Sélectionné
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
