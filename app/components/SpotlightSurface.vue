<script setup lang="ts">
import { useMediaQuery, usePreferredReducedMotion } from '@vueuse/core'

withDefaults(defineProps<{ as?: string }>(), { as: 'div' })

const host = ref<HTMLElement>()
const motion = usePreferredReducedMotion()
const fine = useMediaQuery('(pointer: fine)')
const active = computed(() => fine.value && motion.value !== 'reduce')

let rafId = 0
let pendingX = 0
let pendingY = 0

function onPointerMove(e: PointerEvent) {
  if (!active.value || !host.value) return
  const rect = host.value.getBoundingClientRect()
  pendingX = e.clientX - rect.left
  pendingY = e.clientY - rect.top
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    if (!host.value) return
    host.value.style.setProperty('--sx', `${pendingX.toFixed(1)}px`)
    host.value.style.setProperty('--sy', `${pendingY.toFixed(1)}px`)
  })
}

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <component :is="as" ref="host" class="spotlight-host relative" @pointermove="onPointerMove">
    <!-- Dedicated inner clip keeps the radial sheen inside rounded corners without clipping :focus-visible outlines. -->
    <span aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <span class="spotlight-layer absolute inset-0" />
    </span>
    <slot />
  </component>
</template>
