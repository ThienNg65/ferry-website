import type { Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let refreshTimer: ReturnType<typeof setTimeout> | undefined

export interface RevealTarget {
  inert: boolean
  setAttribute(name: string, value: string): void
  removeAttribute(name: string): void
  classList: {
    remove(token: string): void
  }
}

export function hideRevealTargets(targets: readonly RevealTarget[]) {
  for (const el of targets) {
    el.setAttribute('inert', '')
    el.inert = true
  }
}

export function showRevealTargets(targets: readonly RevealTarget[]) {
  for (const el of targets) {
    el.inert = false
    el.removeAttribute('inert')
    el.classList.remove('reveal-pre')
  }
}

export function scheduleScrollTriggerRefresh(delayMs = 320) {
  if (!import.meta.client) return
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh()
  }, delayMs)
}

export interface SectionRevealOptions {
  y?: number
  x?: number
  duration?: number
  stagger?: number
  start?: string
  batch?: boolean
  trigger?: Ref<HTMLElement | undefined> | string
}

/**
 * Animates elements marked `.reveal-pre` once as they enter the viewport.
 * Keeps hidden targets non-focusable (`autoAlpha` + `inert`) until revealed,
 * respects `prefers-reduced-motion`, and cleans up all GSAP contexts on unmount.
 */
export function useSectionReveal(
  rootRef: Ref<HTMLElement | undefined>,
  selector = '.reveal-pre',
  opts: SectionRevealOptions = {}
) {
  let ctx: gsap.Context | undefined
  let mm: gsap.MatchMedia | undefined
  let activeTargets: HTMLElement[] = []

  onMounted(() => {
    const root = rootRef.value
    if (!root) return

    if (typeof navigator !== 'undefined' && navigator.webdriver) {
      showRevealTargets(Array.from(root.querySelectorAll<HTMLElement>(selector)))
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ctx = gsap.context(() => {
        const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
        if (!targets.length) return
        activeTargets = targets

        const y = opts.y ?? 22
        const x = opts.x ?? 0
        const duration = opts.duration ?? 0.65
        const stagger = opts.stagger ?? 0.08
        const start = opts.start ?? 'top 86%'

        if (opts.batch) {
          gsap.set(targets, { autoAlpha: 0, y, x, scale: 0.985 })
          hideRevealTargets(targets)
          for (const el of targets) el.classList.remove('reveal-pre')

          ScrollTrigger.batch(targets, {
            start,
            once: true,
            onEnter(batch) {
              showRevealTargets(batch as HTMLElement[])
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration,
                stagger,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility'
              })
            }
          })
          return () => showRevealTargets(targets)
        }

        const triggerEl = typeof opts.trigger === 'string'
          ? opts.trigger
          : opts.trigger?.value ?? root

        hideRevealTargets(targets)
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y, x, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
            stagger,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
            onStart() {
              showRevealTargets(targets)
            },
            scrollTrigger: {
              trigger: triggerEl,
              start,
              once: true
            }
          }
        )
        return () => showRevealTargets(targets)
      }, root)
    })

    // Ensure elements are visible and focusable immediately if reduced motion is enabled.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
      showRevealTargets(targets)
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    mm?.revert()
    showRevealTargets(activeTargets)
    activeTargets = []
  })
}
