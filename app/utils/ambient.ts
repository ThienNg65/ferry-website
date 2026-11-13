// Pointer-follow maths for the ambient background. Pure, so it can be tested without a browser.
export interface Offset { x: number, y: number }

const clamp = (v: number, cap: number) => Math.max(-cap, Math.min(cap, v))

// Pointer position in the viewport as an offset from the centre, scaled to -cap..cap pixels.
export function pointerTarget(clientX: number, clientY: number, w: number, h: number, cap = 12): Offset {
  if (!w || !h) return { x: 0, y: 0 }
  return { x: clamp(((clientX / w) - 0.5) * 2 * cap, cap), y: clamp(((clientY / h) - 0.5) * 2 * cap, cap) }
}

// One easing step from `cur` towards `target`; `settled` once within 0.1px so the frame loop can stop.
export function followPointer(cur: Offset, target: Offset, ease = 0.08, cap = 12): Offset & { settled: boolean } {
  const x = clamp(cur.x + (clamp(target.x, cap) - cur.x) * ease, cap)
  const y = clamp(cur.y + (clamp(target.y, cap) - cur.y) * ease, cap)
  const settled = Math.abs(clamp(target.x, cap) - x) < 0.1 && Math.abs(clamp(target.y, cap) - y) < 0.1
  return { x, y, settled }
}
