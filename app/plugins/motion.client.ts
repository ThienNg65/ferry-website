import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let lenis: Lenis | null = null
  let rafCallback: ((time: number) => void) | null = null

  function startLenis() {
    if (lenis || reducedQuery.matches) return
    document.documentElement.classList.add('motion-ready')
    lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15
    })
    lenis.on('scroll', ScrollTrigger.update)
    rafCallback = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)
  }

  function stopLenis() {
    document.documentElement.classList.remove('motion-ready')
    if (rafCallback) {
      gsap.ticker.remove(rafCallback)
      rafCallback = null
    }
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  }

  startLenis()

  reducedQuery.addEventListener('change', (e) => {
    if (e.matches) stopLenis()
    else startLenis()
  })

  // Route same-page anchor clicks through Lenis when active so header offset and smooth easing apply everywhere.
  document.addEventListener('click', (e) => {
    if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const anchor = (e.target as Element | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!anchor) return

    const hash = anchor.getAttribute('href')
    if (!hash) return

    if (hash === '#') {
      e.preventDefault()
      lenis.scrollTo(0)
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const target = document.getElementById(id)
    if (!target) return

    e.preventDefault()
    history.pushState(null, '', hash)
    lenis.scrollTo(target, { offset: -96 })
    if (anchor.classList.contains('skip-link')) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      getLenis: () => lenis
    }
  }
})
