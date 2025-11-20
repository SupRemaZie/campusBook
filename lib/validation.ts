import { EquipmentReservation, RoomReservation } from './types'

export const HOURS_24_IN_MS = 24 * 60 * 60 * 1000

export const isTimeRangeValid = (start: Date, end: Date) => {
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false
  return end.getTime() > start.getTime()
}

export const doTimeRangesOverlap = (
  rangeA: { start: Date; end: Date },
  rangeB: { start: Date; end: Date }
) => {
  if (!isTimeRangeValid(rangeA.start, rangeA.end) || !isTimeRangeValid(rangeB.start, rangeB.end)) {
    return false
  }
  return rangeA.start < rangeB.end && rangeA.end > rangeB.start
}

export const hasRoomReservationConflict = (
  reservations: RoomReservation[],
  roomId: string,
  requestedStart: Date,
  requestedEnd: Date
) => {
  return reservations.some((reservation) => {
    if (reservation.roomId !== roomId) return false
    return doTimeRangesOverlap(
      { start: requestedStart, end: requestedEnd },
      {
        start: new Date(reservation.timeSlot.start),
        end: new Date(reservation.timeSlot.end)
      }
    )
  })
}

export const hasEquipmentReservationConflict = (
  reservations: EquipmentReservation[],
  equipmentId: string,
  requestedStart: Date,
  requestedEnd: Date
) => {
  return reservations.some((reservation) => {
    if (reservation.equipmentId !== equipmentId) return false
    return doTimeRangesOverlap(
      { start: requestedStart, end: requestedEnd },
      {
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      }
    )
  })
}

export const getReservationDurationInDays = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime()
  if (diffMs <= 0) return 0
  return Math.ceil(diffMs / HOURS_24_IN_MS)
}

export const canCancelBeforeThreshold = (
  targetDate: Date,
  now: Date = new Date(),
  thresholdMs: number = HOURS_24_IN_MS
) => {
  return targetDate.getTime() - now.getTime() >= thresholdMs
}

