<script setup lang="ts">

defineProps<{ href?: string, label?: string }>()

const open = useState('promo-video-open', () => false)
const dialogEl = ref<HTMLDialogElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)

const chapters = [
  { label: '0:00 Import', time: 0 },
  { label: '0:06 Dual-pane', time: 6 },
  { label: '0:14 Logs & Terminal', time: 14 },
  { label: '0:23 Monitor', time: 23 }
] as const

function seekTo(sec: number) {
  if (!videoEl.value) return
  videoEl.value.currentTime = sec
  videoEl.value.play().catch(() => {})
}

function closeDialog() {
  videoEl.value?.pause()
  if (dialogEl.value?.open) {
    dialogEl.value.close()
  }
  open.value = false
}

function onNativeClose() {
  videoEl.value?.pause()
  if (dialogEl.value) {
    dialogEl.value.returnValue = ''
  }
  open.value = false
}

onMounted(() => {
  if (new URLSearchParams(window.location.search).get('promo') === '1') {
    open.value = true
  }
})

watch(open, (isOpen) => {
  const dlg = dialogEl.value
  if (!dlg) return
  if (isOpen) {
    if (!dlg.open) dlg.showModal()
    nextTick(() => {
      videoEl.value?.play().catch(() => {})
    })
  } else {
    videoEl.value?.pause()
    if (dlg.open) dlg.close()
  }
})

// Fallback light-dismiss where <dialog closedby="any"> is not supported.
let pressedOutside = false
function isOutside(e: PointerEvent, dlg: HTMLDialogElement) {
  const r = dlg.getBoundingClientRect()
  return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
}
function onDialogPointerDown(e: PointerEvent) {
  if (!dialogEl.value || 'closedBy' in HTMLDialogElement.prototype) return
  pressedOutside = isOutside(e, dialogEl.value)
}
function onDialogPointerUp(e: PointerEvent) {
  if (!dialogEl.value || 'closedBy' in HTMLDialogElement.prototype) return
  if (pressedOutside && isOutside(e, dialogEl.value)) {
    closeDialog()
  }
  pressedOutside = false
}
</script>

<template>
  <dialog
    ref="dialogEl"
    v-bind="{ closedby: 'any' } as Record<string, string>"
    aria-labelledby="promo-dialog-title"
    class="m-auto w-[min(96vw,72rem)] rounded-[16px] border border-default bg-elevated p-0 text-default shadow-2xl"
    @close="onNativeClose"
    @pointerdown="onDialogPointerDown"
    @pointerup="onDialogPointerUp"
  >
    <div class="p-4 sm:p-5">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-default pb-3">
        <div class="flex items-center gap-2.5">
          <img src="/ferry-glass.svg" alt="" width="20" height="20" class="size-5 rounded-[5px]">
          <h2 id="promo-dialog-title" class="text-small font-semibold text-highlighted">
            Ferry 35-second launch tour
          </h2>
        </div>

        <div role="group" aria-label="Video chapters" class="flex flex-wrap items-center gap-1">
          <button
            v-for="(c, idx) in chapters"
            :key="c.label"
            type="button"
            class="min-h-11 rounded-lg px-3 text-xs font-medium transition-colors"
            :class="(chapters[idx + 1] ? currentTime >= c.time && currentTime < chapters[idx + 1]!.time : currentTime >= c.time)
              ? 'bg-primary text-white font-semibold'
              : 'bg-muted text-muted hover:text-highlighted'"
            @click="seekTo(c.time)"
          >
            {{ c.label }}
          </button>
        </div>

        <button
          type="button"
          class="inline-flex size-11 items-center justify-center rounded-lg border border-default bg-default text-default hover:text-highlighted"
          aria-label="Close product tour"
          autofocus
          @click="closeDialog"
        >
          <UIcon name="i-lucide-x" class="size-4" aria-hidden="true" />
        </button>
      </div>

      <div class="overflow-hidden rounded-[12px] border border-default bg-[#070b14]">
        <video
          ref="videoEl"
          controls
          playsinline
          :preload="open ? 'metadata' : 'none'"
          poster="/media/files-terminal.webp"
          class="aspect-video w-full"
          @timeupdate="currentTime = videoEl?.currentTime ?? 0"
        >
          <source src="/media/ferry-launch-demo-35s.mp4" type="video/mp4">
          Your browser does not support embedded MP4 playback.
        </video>
      </div>

      <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p class="text-small text-muted">
          Windows 10 and 11 (64-bit) · ~23 MB
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <MsStoreBadge size="small" />
          <UButton v-if="href" :to="href" color="neutral" variant="outline" size="md" class="min-h-11 rounded-[5px] font-medium">
            <span>{{ label || 'Direct installer' }}</span>
          </UButton>
        </div>
      </div>
    </div>
  </dialog>
</template>
