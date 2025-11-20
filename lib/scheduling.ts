import type { DateRange } from 'react-day-picker'
import type { EquipmentReservation } from './types'

export interface HourSlot {
  start: string
  end: string
}

const MS_IN_DAY = 24 * 60 * 60 * 1000

export const generateHourlySlots = (startHour = 8, endHour = 20): HourSlot[] => {
  const slots: HourSlot[] = []
  for (let hour = startHour; hour < endHour; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`
    slots.push({ start, end })
  }
  return slots
}

export const getDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const isSlotInPast = (date: Date | undefined, slotStart: string, now = new Date()) => {
  if (!date) return false

  const dateKey = getDateKey(date)
  const todayKey = getDateKey(now)

  if (dateKey !== todayKey) return false

  const slotDateTime = new Date(`${dateKey}T${slotStart}`)
  return slotDateTime < now
}

export const isSlotReserved = (
  date: Date | undefined,
  slot: HourSlot,
  reservedSlots: HourSlot[]
) => {
  if (!date) return false

  const dateKey = getDateKey(date)
  const [startHour, startMinute] = slot.start.split(':').map(Number)
  const [endHour, endMinute] = slot.end.split(':').map(Number)
  const slotStartDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, startMinute)
  const slotEndDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, endMinute)

  return reservedSlots.some((reserved) => {
    const reservedStart = new Date(reserved.start)
    const reservedEnd = new Date(reserved.end)

    if (getDateKey(reservedStart) !== dateKey) return false

    return slotStartDateTime < reservedEnd && slotEndDateTime > reservedStart
  })
}

export const clampRangeToMaxDuration = (range: DateRange, maxDuration: number): DateRange => {
  if (!range.from || !range.to) return range

  const diff = Math.ceil((range.to.getTime() - range.from.getTime()) / MS_IN_DAY)
  if (diff <= maxDuration) return range

  const adjustedEnd = new Date(range.from)
  adjustedEnd.setDate(adjustedEnd.getDate() + maxDuration)
  return { from: range.from, to: adjustedEnd }
}

export const formatDateInput = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const isEquipmentCurrentlyReserved = (
  reservations: EquipmentReservation[],
  equipmentId: string,
  now = new Date()
) => {
  return reservations.some((reservation) => {
    if (reservation.equipmentId !== equipmentId) return false
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    return now >= start && now <= end
  })
}

