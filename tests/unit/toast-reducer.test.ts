import { afterEach, describe, expect, it, vi } from 'vitest'
import { reducer } from '../../hooks/use-toast'

const baseState = { toasts: [] }

const toast = {
  id: '1',
  title: 'Hello',
  description: 'World',
  open: true
}

describe('toast reducer', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('ajoute un toast dans la limite autorisée', () => {
    const nextState = reducer(baseState, { type: 'ADD_TOAST', toast })
    expect(nextState.toasts).toHaveLength(1)
    expect(nextState.toasts[0]).toMatchObject({ id: '1', title: 'Hello' })
  })

  it('met à jour un toast existant', () => {
    const state = reducer(baseState, { type: 'ADD_TOAST', toast })
    const updated = reducer(state, { type: 'UPDATE_TOAST', toast: { id: '1', title: 'Updated' } })
    expect(updated.toasts[0].title).toBe('Updated')
  })

  it('marque un toast comme fermé lors de la suppression', () => {
    const state = reducer(baseState, { type: 'ADD_TOAST', toast })
    vi.spyOn(globalThis, 'setTimeout').mockReturnValue(0 as unknown as ReturnType<typeof setTimeout>)
    const dismissed = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' })
    expect(dismissed.toasts[0].open).toBe(false)
  })
})

