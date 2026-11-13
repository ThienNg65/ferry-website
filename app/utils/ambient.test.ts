import { describe, expect, it } from 'vitest'
import { followPointer, pointerTarget } from './ambient'

describe('pointerTarget', () => {
  it('the centre of the viewport is no offset', () => expect(pointerTarget(500, 400, 1000, 800)).toEqual({ x: 0, y: 0 }))
  it('the corners map to the cap', () => expect(pointerTarget(1000, 0, 1000, 800, 12)).toEqual({ x: 12, y: -12 }))
  it('never exceeds the cap for out-of-range input', () => {
    const t = pointerTarget(99999, -99999, 1000, 800, 12)
    expect(Math.abs(t.x)).toBeLessThanOrEqual(12)
    expect(Math.abs(t.y)).toBeLessThanOrEqual(12)
  })
  it('a zero-size viewport gives no offset', () => expect(pointerTarget(5, 5, 0, 0)).toEqual({ x: 0, y: 0 }))
})

describe('followPointer', () => {
  it('moves towards the target without overshooting', () => {
    const next = followPointer({ x: 0, y: 0 }, { x: 10, y: -10 })
    expect(next.x).toBeGreaterThan(0)
    expect(next.x).toBeLessThan(10)
    expect(next.y).toBeLessThan(0)
  })
  it('converges and reports settled', () => {
    let p = { x: 0, y: 0, settled: false }
    for (let i = 0; i < 200 && !p.settled; i++) p = followPointer(p, { x: 8, y: 8 })
    expect(p.settled).toBe(true)
    expect(p.x).toBeCloseTo(8, 0)
  })
  it('clamps an extreme target to the cap', () => {
    let p = { x: 0, y: 0, settled: false }
    for (let i = 0; i < 300; i++) p = followPointer(p, { x: 1e6, y: -1e6 }, 0.5, 12)
    expect(p.x).toBeLessThanOrEqual(12)
    expect(p.y).toBeGreaterThanOrEqual(-12)
  })
  it('a target at the current position is settled at once', () => expect(followPointer({ x: 0, y: 0 }, { x: 0, y: 0 }).settled).toBe(true))
})
