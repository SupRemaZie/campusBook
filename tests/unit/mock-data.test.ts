import { describe, expect, it } from 'vitest'
import { getTeacherAvailability } from '../../lib/mock-data'

describe('getTeacherAvailability', () => {
  it('retourne 14 créneaux sur 7 jours', () => {
    const slots = getTeacherAvailability('teacher-1')
    expect(slots).toHaveLength(14)

    const uniqueDays = new Set(slots.map((slot) => new Date(slot.start).toDateString()))
    expect(uniqueDays.size).toBe(7)
  })

  it('génère des créneaux triés et d’une heure', () => {
    const slots = getTeacherAvailability('teacher-2')

    slots.forEach((slot, index) => {
      const start = new Date(slot.start)
      const end = new Date(slot.end)
      expect(end.getTime() - start.getTime()).toBe(60 * 60 * 1000)

      if (index > 0) {
        const previousEnd = new Date(slots[index - 1].end)
        expect(start.getTime()).toBeGreaterThanOrEqual(previousEnd.getTime())
      }
    })
  })
})

