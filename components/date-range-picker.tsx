'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DateRange } from 'react-day-picker'
import { clampRangeToMaxDuration, formatDateInput } from '@/lib/scheduling'
import { getReservationDurationInDays } from '@/lib/validation'

interface DateRangePickerProps {
  maxDuration: number
  onSelectRange: (startDate: string, endDate: string) => void
  selectedStart?: string
  selectedEnd?: string
}

export function DateRangePicker({ 
  maxDuration, 
  onSelectRange,
  selectedStart,
  selectedEnd
}: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>(
    selectedStart && selectedEnd 
      ? { from: new Date(selectedStart), to: new Date(selectedEnd) }
      : undefined
  )
  
  const handleRangeSelect = (newRange: DateRange | undefined) => {
    if (!newRange?.from) {
      setRange(undefined)
      return
    }
    
    // If both dates are selected, check duration
    if (newRange.from && newRange.to) {
      const durationDays = getReservationDurationInDays(newRange.from, newRange.to)
      
      if (durationDays > maxDuration) {
        const adjustedRange = clampRangeToMaxDuration(newRange, maxDuration)
        setRange(adjustedRange)
        
        onSelectRange(
          formatDateInput(adjustedRange.from),
          adjustedRange.to ? formatDateInput(adjustedRange.to) : formatDateInput(adjustedRange.from)
        )
        return
      }
    }
    
    setRange(newRange)
    
    if (newRange.from && newRange.to) {
      onSelectRange(
        formatDateInput(newRange.from),
        formatDateInput(newRange.to)
      )
    }
  }
  
  const durationDays = range?.from && range?.to
    ? getReservationDurationInDays(range.from, range.to)
    : 0
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sélectionner la période d'emprunt</CardTitle>
        <CardDescription>
          Durée maximale: {maxDuration} jours
          {durationDays > 0 && (
            <span className="ml-2">
              • Durée sélectionnée: {durationDays} jour{durationDays > 1 ? 's' : ''}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleRangeSelect}
          disabled={{ before: new Date() }}
          numberOfMonths={2}
          className="rounded-md border"
        />
        
        {range?.from && range?.to && (
          <div className="flex gap-2 items-center">
            <Badge variant="secondary" className="text-sm">
              Du {range.from.toLocaleDateString('fr-FR')}
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="secondary" className="text-sm">
              Au {range.to.toLocaleDateString('fr-FR')}
            </Badge>
          </div>
        )}
        
        {durationDays > maxDuration && (
          <Badge variant="destructive">
            La durée maximale est de {maxDuration} jours
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
