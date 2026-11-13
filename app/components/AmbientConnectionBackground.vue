<script setup lang="ts">
import { useDocumentVisibility, useEventListener, useIntersectionObserver, useMediaQuery, usePreferredReducedMotion, useRafFn } from '@vueuse/core'
import { followPointer, pointerTarget } from '~/utils/ambient'

// One fixed decorative layer behind the whole page. The server renders the finished static picture; the client only
// tracks which section is in view (CSS does the emphasis) and, in the hero on a fine pointer, eases a light and a small shift.
const root = ref<HTMLElement>()
const section = ref('hero')
const visibility = useDocumentVisibility()
const motion = usePreferredReducedMotion()
const fine = useMediaQuery('(pointer: fine) and (min-width: 64rem)')
const pointerOn = computed(() => section.value === 'hero' && fine.value && motion.value !== 'reduce' && visibility.value === 'visible')

let cur = { x: 0, y: 0 }
let target = { x: 0, y: 0 }
const { pause, resume } = useRafFn(() => {
  const next = followPointer(cur, target)
  cur = { x: next.x, y: next.y }
  const s = root.value?.style
  if (s) {
    s.setProperty('--tx', `${cur.x.toFixed(2)}px`)
    s.setProperty('--ty', `${cur.y.toFixed(2)}px`)
    s.setProperty('--ax', `${50 + cur.x * 2}%`)
    s.setProperty('--ay', `${32 + cur.y * 2}%`)
  }
  if (next.settled) pause()
}, { immediate: false })

useEventListener(() => (pointerOn.value ? window : null), 'pointermove', (e: PointerEvent) => {
  target = pointerTarget(e.clientX, e.clientY, window.innerWidth, window.innerHeight)
  resume()
}, { passive: true })

// Leaving the hero (or reduced motion, a hidden tab) sends the layer back to centre, then the loop stops itself.
watch(pointerOn, (on) => { if (!on) { target = { x: 0, y: 0 }; resume() } })

onMounted(() => {
  const sections = Array.from(document.querySelectorAll('main > section, footer'))
  useIntersectionObserver(sections, (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) section.value = e.target.id || (e.target.tagName === 'FOOTER' ? 'footer' : 'hero')
    }
  }, { rootMargin: '-45% 0px -45% 0px' })
})
</script>

<template>
  <div ref="root" class="ambient" aria-hidden="true" :data-section="section" :data-paused="visibility === 'hidden' ? '' : undefined">
    <div class="ambient-light" />
    <svg class="ambient-svg" viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
      <g class="ambient-lines" fill="none" stroke-linecap="round">
        <path class="ambient-path" d="M-40 640 C 240 520, 420 760, 720 600 S 1200 380, 1480 470" />
        <path class="ambient-path" d="M-40 260 C 220 140, 520 360, 800 230 S 1220 90, 1480 180" />
        <path class="ambient-path" d="M200 940 C 340 700, 640 760, 860 520 S 1180 300, 1300 -40" />
        <path class="ambient-path" d="M-40 880 C 300 820, 560 900, 900 780 S 1260 700, 1480 760" />
        <path class="ambient-path ambient-extra" d="M0 420 C 260 360, 360 560, 640 470 S 1000 260, 1440 330" />
        <path class="ambient-path ambient-extra" d="M520 -40 C 600 200, 420 380, 560 600 S 520 820, 600 940" />
      </g>
      <g class="ambient-converge" fill="none" stroke-linecap="round">
        <path class="ambient-path" d="M-40 140 C 360 160, 560 380, 720 450" />
        <path class="ambient-path" d="M1480 140 C 1080 160, 880 380, 720 450" />
        <path class="ambient-path" d="M-40 780 C 360 740, 560 520, 720 450" />
        <path class="ambient-path" d="M1480 780 C 1080 740, 880 520, 720 450" />
      </g>
      <!-- Keyed by section: entering a section replays one short pulse (under 5s, so no pause control is needed). -->
      <g :key="section" class="ambient-pulses" fill="none" stroke-linecap="round">
        <path class="ambient-pulse" pathLength="100" d="M-40 640 C 240 520, 420 760, 720 600 S 1200 380, 1480 470" />
        <path class="ambient-pulse ambient-pulse-b" pathLength="100" d="M-40 260 C 220 140, 520 360, 800 230 S 1220 90, 1480 180" />
      </g>
      <g class="ambient-nodes">
        <circle class="ambient-node" cx="720" cy="600" r="4" />
        <circle class="ambient-node" cx="420" cy="690" r="3" />
        <circle class="ambient-node" cx="1200" cy="400" r="3.5" />
        <circle class="ambient-node" cx="800" cy="230" r="4" />
        <circle class="ambient-node" cx="520" cy="300" r="3" />
        <circle class="ambient-node" cx="900" cy="780" r="3" />
      </g>
    </svg>
  </div>
</template>
