import type { Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let refreshTimer: ReturnType<typeof setTimeout> | undefined

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
 * Respects `prefers-reduced-motion` and cleans up all GSAP contexts on unmount.
 */
export function useSectionReveal(
  rootRef: Ref<HTMLElement | undefined>,
  selector = '.reveal-pre',
  opts: SectionRevealOptions = {}
) {
  let ctx: gsap.Context | undefined
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    const root = rootRef.value
    if (!root) return

    if (typeof navigator !== 'undefined' && navigator.webdriver) {
      for (const el of root.querySelectorAll<HTMLElement>(selector)) {
        el.classList.remove('reveal-pre')
      }
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ctx = gsap.context(() => {
        const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
        if (!targets.length) return

        const y = opts.y ?? 22
        const x = opts.x ?? 0
        const duration = opts.duration ?? 0.65
        const stagger = opts.stagger ?? 0.08
        const start = opts.start ?? 'top 86%'

        if (opts.batch) {
          gsap.set(targets, { opacity: 0, y, x, scale: 0.985 })
          for (const el of targets) el.classList.remove('reveal-pre')

          ScrollTrigger.batch(targets, {
            start,
            once: true,
            onEnter(batch) {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration,
                stagger,
                ease: 'power3.out',
                clearProps: 'transform,opacity'
              })
            }
          })
          return
        }

        const triggerEl = typeof opts.trigger === 'string'
          ? opts.trigger
          : opts.trigger?.value ?? root

        gsap.fromTo(
          targets,
          { opacity: 0, y, x, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
            stagger,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            onStart() {
              for (const el of targets) el.classList.remove('reveal-pre')
            },
            scrollTrigger: {
              trigger: triggerEl,
              start,
              once: true
            }
          }
        )
      }, root)
    })

    // Ensure elements are visible immediately if reduced motion is enabled.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
      for (const el of targets) el.classList.remove('reveal-pre')
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    mm?.revert()
  })
}
