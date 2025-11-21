import { describe, expect, it } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn utility function', () => {
  it('combine des classes CSS simples', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('gère les classes conditionnelles', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar')
  })

  it('gère les objets conditionnels', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('gère les tableaux de classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('merge les classes Tailwind en conflit', () => {
    // twMerge devrait résoudre les conflits (ex: p-2 et p-4)
    const result = cn('p-2', 'p-4')
    expect(result).toContain('p-4')
    expect(result).not.toContain('p-2')
  })

  it('gère les valeurs undefined et null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('gère les chaînes vides', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('combine plusieurs types d\'entrées', () => {
    expect(cn('foo', { bar: true, baz: false }, ['qux'], 'quux')).toContain('foo')
    expect(cn('foo', { bar: true, baz: false }, ['qux'], 'quux')).toContain('bar')
    expect(cn('foo', { bar: true, baz: false }, ['qux'], 'quux')).toContain('qux')
    expect(cn('foo', { bar: true, baz: false }, ['qux'], 'quux')).toContain('quux')
  })
})

