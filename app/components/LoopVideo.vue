<script setup lang="ts">
// A short muted loop of the real app. Under prefers-reduced-motion only the poster is shown. The pause button is for WCAG 2.2.2.
defineProps<{ name: string, width: number, height: number, alt: string, eager?: boolean }>()
const video = ref<HTMLVideoElement>()
const reduced = ref(false)
const paused = ref(false)
const failed = ref(false)
onMounted(() => { reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches })

function toggle() {
  const v = video.value
  if (!v) return
  if (v.paused) { v.play(); paused.value = false } else { v.pause(); paused.value = true }
}
</script>

<template>
  <div class="relative">
    <img v-if="reduced || failed" :src="`/loops/${name}.jpg`" :width="width" :height="height" :alt="alt" class="h-auto w-full rounded-xl">
    <template v-else>
      <video
        ref="video" autoplay muted loop playsinline preload="metadata" :poster="`/loops/${name}.jpg`"
        :width="width" :height="height" :aria-label="alt" class="h-auto w-full rounded-xl" @error="failed = true"
      >
        <!-- MP4 first: some GPUs fail to decode the VP9 stream in hardware, and the browser only falls back on unsupported types, not on decode errors. -->
        <source :src="`/loops/${name}.mp4`" type="video/mp4">
        <source :src="`/loops/${name}.webm`" type="video/webm">
      </video>
      <button
        type="button" class="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-deep/80 text-white backdrop-blur hover:bg-deep"
        :aria-label="paused ? 'Play the demo' : 'Pause the demo'" @click="toggle"
      >
        <UIcon :name="paused ? 'i-lucide-play' : 'i-lucide-pause'" class="size-5" aria-hidden="true" />
      </button>
    </template>
  </div>
</template>
