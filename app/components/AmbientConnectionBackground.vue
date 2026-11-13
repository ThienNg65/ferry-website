<script setup lang="ts">
import { useDocumentVisibility, useEventListener, useIntersectionObserver, useMediaQuery, usePreferredReducedMotion, useRafFn } from '@vueuse/core'
import { followPointer, pointerTarget } from '~/utils/ambient'

// One fixed decorative layer behind the whole page: source (left) -> connection (centre) -> destination (right).
// The server renders the finished static picture. The client only tracks which section (and, in Features, which side
// the demo is on) is in view, so CSS can set the emphasis, and in the hero on a fine pointer eases a small shift.
const CAP = 8
const root = ref<HTMLElement>()
const section = ref('hero')
const side = ref('c')
const visibility = useDocumentVisibility()
const motion = usePreferredReducedMotion()
const fine = useMediaQuery('(pointer: fine) and (min-width: 64rem)')
const pointerOn = computed(() => section.value === 'hero' && fine.value && motion.value !== 'reduce' && visibility.value === 'visible')

let cur = { x: 0, y: 0 }
let target = { x: 0, y: 0 }
const { pause, resume } = useRafFn(() => {
  const next = followPointer(cur, target, 0.08, CAP)
  cur = { x: next.x, y: next.y }
  const s = root.value?.style
  if (s) {
    s.setProperty('--tx', `${cur.x.toFixed(2)}px`)
    s.setProperty('--ty', `${cur.y.toFixed(2)}px`)
  }
  if (next.settled) pause()
}, { immediate: false })

useEventListener(() => (pointerOn.value ? window : null), 'pointermove', (e: PointerEvent) => {
  target = pointerTarget(e.clientX, e.clientY, window.innerWidth, window.innerHeight, CAP)
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
  // The demo of the feature row in view is on the right (.pool), on the left (.pool-flip) or wide (.pool-center).
  useIntersectionObserver(Array.from(document.querySelectorAll('#features .pool')), (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) side.value = e.target.classList.contains('pool-center') ? 'c' : e.target.classList.contains('pool-flip') ? 'l' : 'r'
    }
  }, { rootMargin: '-45% 0px -45% 0px' })
})
</script>

<template>
  <div ref="root" class="ambient" aria-hidden="true" :data-section="section" :data-side="side" :data-paused="visibility === 'hidden' ? '' : undefined">
    <div class="ambient-light" />

    <!-- Desktop: two arcs carry the flow from two sources to two destinations through a relay each; a faint crossing path
         joins them. Rails frame the demo side in Features; the converge group meets in one hub at Download. -->
    <svg class="ambient-svg ambient-desk" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g class="ambient-lines" fill="none" stroke-linecap="round">
        <path class="ambient-path" d="M200 300 C 420 300, 500 120, 720 120 S 1020 300, 1240 300" />
        <path class="ambient-path" d="M170 600 C 390 600, 500 800, 720 800 S 1050 600, 1270 600" />
        <path class="ambient-path ambient-cross" d="M170 600 C 480 560, 960 340, 1240 300" />
      </g>
      <g class="ambient-rails" fill="none" stroke-linecap="round">
        <path class="ambient-path ambient-rail-l" d="M130 -20 C 170 300, 110 600, 150 920" />
        <path class="ambient-path ambient-rail-r" d="M1310 -20 C 1270 300, 1330 600, 1290 920" />
      </g>
      <g class="ambient-converge" fill="none" stroke-linecap="round">
        <path class="ambient-path" d="M200 300 C 440 300, 580 450, 720 450" />
        <path class="ambient-path" d="M170 600 C 440 600, 580 450, 720 450" />
        <path class="ambient-path" d="M1240 300 C 1000 300, 860 450, 720 450" />
        <path class="ambient-path" d="M1270 600 C 1000 600, 860 450, 720 450" />
        <circle class="ambient-ring" cx="720" cy="450" r="9" />
        <circle class="ambient-dot" cx="720" cy="450" r="3" />
      </g>
      <g class="ambient-pulses" fill="none" stroke-linecap="round">
        <path class="ambient-pulse ambient-pulse-a" pathLength="100" d="M200 300 C 420 300, 500 120, 720 120 S 1020 300, 1240 300" />
        <path class="ambient-pulse ambient-pulse-b" pathLength="100" d="M170 600 C 390 600, 500 800, 720 800 S 1050 600, 1270 600" />
      </g>
      <g class="ambient-nodes">
        <circle class="ambient-ring" cx="200" cy="300" r="8" /><circle class="ambient-dot" cx="200" cy="300" r="3" />
        <circle class="ambient-ring" cx="170" cy="600" r="8" /><circle class="ambient-dot" cx="170" cy="600" r="3" />
        <circle class="ambient-ring" cx="1240" cy="300" r="8" /><circle class="ambient-dot" cx="1240" cy="300" r="3" />
        <circle class="ambient-ring" cx="1270" cy="600" r="8" /><circle class="ambient-dot" cx="1270" cy="600" r="3" />
        <circle class="ambient-dot" cx="720" cy="120" r="3" />
        <circle class="ambient-dot" cx="720" cy="800" r="3" />
      </g>
    </svg>

    <!-- Phones and tablets: a separate, static, vertical composition (two sources at the top, one relay, two destinations
         at the bottom), not the desktop geometry stretched. No pulses and no pointer. -->
    <svg class="ambient-svg ambient-mob" viewBox="0 0 390 800" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g class="ambient-lines" fill="none" stroke-linecap="round">
        <path class="ambient-path" d="M44 140 C 44 290, 195 260, 195 400 S 346 540, 346 710" />
        <path class="ambient-path" d="M346 140 C 346 290, 195 260, 195 400 S 44 540, 44 710" />
      </g>
      <g class="ambient-nodes">
        <circle class="ambient-ring" cx="44" cy="140" r="7" /><circle class="ambient-dot" cx="44" cy="140" r="2.5" />
        <circle class="ambient-ring" cx="346" cy="140" r="7" /><circle class="ambient-dot" cx="346" cy="140" r="2.5" />
        <circle class="ambient-dot" cx="195" cy="400" r="3" />
        <circle class="ambient-ring" cx="44" cy="710" r="7" /><circle class="ambient-dot" cx="44" cy="710" r="2.5" />
        <circle class="ambient-ring" cx="346" cy="710" r="7" /><circle class="ambient-dot" cx="346" cy="710" r="2.5" />
      </g>
    </svg>
  </div>
</template>
