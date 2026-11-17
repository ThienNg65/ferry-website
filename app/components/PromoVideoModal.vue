<script setup lang="ts">
import { usePreferredReducedMotion, useRafFn } from '@vueuse/core'
import { promoSceneAt, promoScenes, promoTotalMs } from '~/utils/demoData'
import type { LogFilter } from '~/utils/demoData'

defineProps<{ href?: string, label?: string }>()
const open = useState('promo-video-open', () => false)
const cleanStage = ref(false)
const isPromoQuery = ref(false)
const dialogEl = ref<HTMLDialogElement | null>(null)
const motion = usePreferredReducedMotion()
const reduced = computed(() => motion.value === 'reduce')

const elapsedMs = ref(0)
const playing = ref(false)
let lastTs = 0

const { pause: pauseRaf, resume: resumeRaf } = useRafFn(({ timestamp }) => {
  if (!playing.value) return
  if (!lastTs) lastTs = timestamp
  const dt = Math.min(100, Math.max(0, timestamp - lastTs))
  lastTs = timestamp
  const next = elapsedMs.value + dt
  if (next >= promoTotalMs) {
    elapsedMs.value = promoTotalMs
    playing.value = false
    pauseRaf()
  } else {
    elapsedMs.value = next
  }
}, { immediate: false })

const current = computed(() => promoSceneAt(elapsedMs.value))
const activeScene = computed(() => current.value.scene)
const activeIndex = computed(() => current.value.index)
const totalPct = computed(() => Math.round(current.value.totalProgress * 1000) / 10)

// Midway through Scene 2 (logs), the cursor clicks the "Errors" filter pill.
const logFilter = computed<LogFilter>(() =>
  activeScene.value.id === 'logs' && current.value.sceneProgress > 0.42 ? 'error' : 'all'
)

// Midway through Scene 3 (terminal), the right-split dock switches from Terminal to Monitor.
const activeDockPanel = computed<'transfers' | 'tail' | 'terminal' | 'monitor'>(() => {
  if (activeScene.value.id === 'terminal' && current.value.sceneProgress > 0.52) {
    return 'monitor'
  }
  return activeScene.value.dockTab
})

// Dynamic sub-step cursor choreography so the pointer moves actively within each scene.
const activeCursor = computed(() => {
  const s = activeScene.value
  const p = current.value.sceneProgress
  if (s.id === 'connect') {
    return p < 0.38
      ? { x: 35, y: 20, label: 'Import WinSCP / PuTTY' }
      : { x: 24, y: 54, label: 'Connect api-prod-01' }
  }
  if (s.id === 'transfer') {
    return p < 0.45
      ? { x: 22, y: 38, label: 'Upload releases/' }
      : { x: 64, y: 34, label: 'current → releases/2026-11-16' }
  }
  if (s.id === 'logs') {
    return p < 0.38
      ? { x: 84, y: 68, label: 'LogRail: 3 errors spotted' }
      : { x: 35, y: 64, label: 'Filter: Errors (3)' }
  }
  if (s.id === 'terminal') {
    return p <= 0.52
      ? { x: 72, y: 34, label: 'Ctrl+` · systemctl restart web-api' }
      : { x: 74, y: 48, label: 'Monitor · 10 cores settling' }
  }
  return s.cursor
})

const cameraStyle = computed(() => {
  if (reduced.value) return {}
  const { scale, x, y } = activeScene.value.camera
  return {
    transform: `translate3d(${x}%, ${y}%, 0) scale(${scale})`,
    transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)'
  }
})

const cursorStyle = computed(() => {
  const { x, y } = activeCursor.value
  return {
    transform: `translate3d(${x}cqw, ${y}cqh, 0)`,
    transition: 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)'
  }
})

function startPlayback() {
  if (elapsedMs.value >= promoTotalMs) elapsedMs.value = 0
  lastTs = 0
  playing.value = true
  resumeRaf()
}

function pausePlayback() {
  playing.value = false
  lastTs = 0
  pauseRaf()
}

function togglePlay() {
  if (playing.value) pausePlayback()
  else startPlayback()
}

function restart() {
  elapsedMs.value = 0
  lastTs = 0
  if (!reduced.value) startPlayback()
}

function seekToScene(index: number) {
  let start = 0
  for (let i = 0; i < index; i++) {
    start += promoScenes[i]!.durationMs
  }
  elapsedMs.value = start
  lastTs = 0
}

function closeDialog() {
  pausePlayback()
  if (dialogEl.value?.open) {
    dialogEl.value.close()
  }
  open.value = false
  cleanStage.value = false
}

function onNativeClose() {
  pausePlayback()
  if (dialogEl.value) {
    dialogEl.value.returnValue = ''
  }
  open.value = false
  cleanStage.value = false
}

watch(open, (isOpen) => {
  const dlg = dialogEl.value
  if (!dlg) return
  if (isOpen) {
    if (!dlg.open) dlg.showModal()
    if (elapsedMs.value >= promoTotalMs) elapsedMs.value = 0
    if (!reduced.value) startPlayback()
  } else {
    pausePlayback()
    if (dlg.open) dlg.close()
  }
})

// Fallback light-dismiss where <dialog closedby="any"> is not supported (modern-web-guidance: dialog)
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

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('promo') === '1') {
    isPromoQuery.value = true
    cleanStage.value = true
    open.value = true
  }
})

function formatTime(ms: number) {
  const sec = Math.floor(ms / 1000)
  return `0:${String(sec).padStart(2, '0')}`
}
</script>

<template>
  <dialog
    ref="dialogEl"
    v-bind="{ closedby: 'any' } as Record<string, string>"
    aria-labelledby="promo-dialog-title"
    class="promo-dialog m-auto w-[min(96vw,78rem)] rounded-[20px] border border-default bg-elevated p-0 text-default shadow-2xl"
    @close="onNativeClose"
    @pointerdown="onDialogPointerDown"
    @pointerup="onDialogPointerUp"
  >
    <div class="p-3 sm:p-5">
      <!-- Player Header & Scene Scrubber (hidden in Clean 16:9 Social Stage mode) -->
      <div v-if="!cleanStage" class="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-default pb-3">
        <div class="flex items-center gap-2.5">
          <span class="size-2.5 rounded-full bg-primary" aria-hidden="true" />
          <h2 id="promo-dialog-title" class="text-small font-semibold text-highlighted">
            Ferry motion tour
          </h2>
          <span class="text-xs tabular-nums text-muted" aria-hidden="true">
            {{ formatTime(elapsedMs) }} / {{ formatTime(promoTotalMs) }}
          </span>
        </div>

        <!-- Chapter buttons -->
        <div role="group" aria-label="Promo scenes" class="flex flex-wrap items-center gap-1">
          <button
            v-for="(s, idx) in promoScenes"
            :key="s.id"
            type="button"
            :aria-pressed="activeIndex === idx"
            class="min-h-11 rounded-full px-3 text-xs font-medium transition-colors"
            :class="activeIndex === idx
              ? 'bg-primary text-[var(--ui-bg)] font-semibold'
              : 'bg-default/60 text-muted hover:bg-default hover:text-highlighted'"
            @click="seekToScene(idx)"
          >
            {{ s.step }}
          </button>
        </div>

        <!-- Playback & Stage Controls -->
        <div class="flex items-center gap-1">
          <button
            v-if="isPromoQuery"
            type="button"
            class="inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border border-default bg-default/70 px-3 text-xs font-medium text-default hover:text-highlighted"
            aria-label="Switch to clean 16:9 stage for recording"
            @click="cleanStage = true"
          >
            <UIcon name="i-lucide-maximize-2" class="size-3.5 text-primary" aria-hidden="true" />
            <span class="hidden sm:inline">16:9 stage</span>
          </button>
          <button
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-[10px] border border-default bg-default/70 text-default hover:text-highlighted"
            :aria-label="playing ? 'Pause promo video' : 'Play promo video'"
            autofocus
            @click="togglePlay"
          >
            <UIcon :name="playing ? 'i-lucide-pause' : 'i-lucide-play'" class="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-[10px] border border-default bg-default/70 text-default hover:text-highlighted"
            aria-label="Restart promo video"
            @click="restart"
          >
            <UIcon name="i-lucide-rotate-ccw" class="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-[10px] border border-default bg-default/70 text-default hover:text-highlighted"
            aria-label="Close promo video"
            @click="closeDialog"
          >
            <UIcon name="i-lucide-x" class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <h2 v-else id="promo-dialog-title" class="sr-only">Ferry motion tour (16:9 stage)</h2>

      <!-- 16:9 Motion Video Stage -->
      <div class="promo-stage relative aspect-video w-full overflow-hidden rounded-[14px] border border-default bg-default">
        <div class="grid-fade" aria-hidden="true" />
        <div class="aura" aria-hidden="true" />

        <!-- Floating controls in Clean 16:9 Stage mode (visible on hover/focus) -->
        <div
          v-if="cleanStage"
          class="absolute right-3 top-3 z-30 flex items-center gap-1.5 opacity-0 transition-opacity hover:opacity-100 focus-within:opacity-100"
        >
          <button
            type="button"
            class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-default bg-elevated/90 px-3 text-xs font-medium text-highlighted backdrop-blur-md"
            :aria-label="playing ? 'Pause promo video' : 'Play promo video'"
            @click="togglePlay"
          >
            <UIcon :name="playing ? 'i-lucide-pause' : 'i-lucide-play'" class="size-3.5 text-primary" aria-hidden="true" />
            <span>{{ playing ? 'Pause' : 'Play' }}</span>
          </button>
          <button
            type="button"
            class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-default bg-elevated/90 px-3 text-xs font-medium text-highlighted backdrop-blur-md"
            aria-label="Exit 16:9 stage"
            @click="cleanStage = false"
          >
            <UIcon name="i-lucide-minimize-2" class="size-3.5 text-primary" aria-hidden="true" />
            <span>Controls</span>
          </button>
        </div>

        <!-- Choreographed Camera Canvas -->
        <div class="flex h-full w-full items-center justify-center p-3 pb-20 sm:p-6 sm:pb-24" :style="cameraStyle">
          <div class="w-full max-w-[64rem]">
            <!-- Scene 0: Saved Sites & Quick Connect -->
            <DemoSites v-if="activeScene.id === 'connect'" :active-site="current.sceneProgress >= 0.38 ? 'api-prod-01' : undefined" />

            <!-- Scenes 1..4: Connected Ferry Window with Bottom or Right-Split Dock -->
            <DemoWindow
              v-else
              label="Ferry motion promo window"
              tab="api-prod-01"
              host="deploy@api-01.example.com"
              env="var(--err)"
              :frozen="!playing"
            >
              <div :class="activeScene.dockPosition === 'right' ? 'grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]' : ''">
                <DemoFiles
                  compact
                  :send="activeScene.id === 'transfer' ? 'releases' : ''"
                  :active-side="activeScene.id === 'transfer' ? 'local' : 'remote'"
                />
                <div
                  :class="activeScene.dockPosition === 'right'
                    ? 'border-t border-[var(--line)] lg:border-l lg:border-t-0'
                    : 'border-t border-[var(--line)]'"
                >
                  <!-- Dock Bar with 6 Tabs + Right-Split Indicator -->
                  <div class="flex items-center gap-1 overflow-x-auto bg-[var(--chip)]/45 px-2 py-1" aria-hidden="true">
                    <span
                      v-for="tabItem in [
                        ['transfers', 'Transfers', 1],
                        ['activity', 'Activity', 0],
                        ['tail', 'Log Tail', 1],
                        ['terminal', 'Terminal', 0],
                        ['monitor', 'Monitor', 0],
                        ['edits', 'Edits', 0]
                      ] as const"
                      :key="tabItem[0]"
                      class="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium"
                      :class="activeDockPanel === tabItem[0]
                        ? 'bg-[var(--sel)] text-[var(--accent-text)] font-semibold'
                        : 'text-[var(--muted)]'"
                    >
                      <span>{{ tabItem[1] }}</span>
                      <span v-if="tabItem[2]" class="rounded-full bg-[var(--bg)] px-1 text-[10px] font-bold text-[var(--accent-text)]">{{ tabItem[2] }}</span>
                    </span>
                    <span class="ml-auto inline-flex items-center gap-1 text-[11px] text-[var(--muted)]">
                      <UIcon :name="activeScene.dockPosition === 'right' ? 'i-lucide-panel-bottom' : 'i-lucide-panel-right'" class="size-3.5 text-[var(--accent-text)]" />
                      <span class="hidden sm:inline">{{ activeScene.dockPosition === 'right' ? 'Right split' : 'Bottom dock' }}</span>
                    </span>
                  </div>

                  <div class="min-h-40 px-1 pb-1">
                    <DemoTransfers v-if="activeDockPanel === 'transfers'" compact />
                    <DemoLogs v-else-if="activeDockPanel === 'tail'" compact :forced-filter="logFilter" />
                    <DemoTerminal v-else-if="activeDockPanel === 'terminal'" compact />
                    <DemoMonitor v-else compact />
                  </div>
                </div>
              </div>
            </DemoWindow>
          </div>
        </div>

        <!-- Outro Brand Overlay Card (Scene 4) -->
        <div
          v-if="activeScene.id === 'outro'"
          class="absolute inset-0 z-20 flex items-center justify-center bg-default/75 p-6 backdrop-blur-sm"
        >
          <div class="surface-specular max-w-lg rounded-[20px] border border-default bg-elevated/95 p-6 text-center shadow-2xl sm:p-8">
            <div class="mx-auto inline-flex items-center gap-2 rounded-full border border-default bg-default px-3.5 py-1 text-small font-semibold text-primary">
              <span class="size-2 rounded-full bg-primary" aria-hidden="true" />
              <span>Ferry for Windows</span>
            </div>
            <h3 class="mt-4 text-highlighted">
              Files, terminal, logs and monitor. One window.
            </h3>
            <p class="mt-2 text-small text-muted">
              SSH and SFTP for your Linux servers · Windows 10 and 11 (64-bit) · Free and MIT licensed
            </p>
            <p class="mt-1 font-mono text-xs text-primary">
              github.com/ThienNg65/ferry-release
            </p>
            <div v-if="href && !cleanStage" class="mt-5 flex justify-center">
              <UButton :to="href" :aria-label="label || 'Download for Windows'" size="lg" class="min-h-11 rounded-[10px] px-5">
                <UIcon name="i-lucide-download" class="size-4 shrink-0" aria-hidden="true" />
                <span>{{ label || 'Download for Windows' }}</span>
              </UButton>
            </div>
          </div>
        </div>

        <!-- Simulated Animated Cursor (hidden under reduced motion or outro) -->
        <div
          v-if="!reduced && activeScene.id !== 'outro'"
          aria-hidden="true"
          class="pointer-events-none absolute left-0 top-0 z-20 flex items-center gap-2"
          :style="cursorStyle"
        >
          <span class="relative flex size-6 items-center justify-center">
            <span class="absolute inset-0 animate-ping rounded-full bg-beacon opacity-55" />
            <span class="relative flex size-5 items-center justify-center rounded-full border border-default bg-elevated text-primary shadow-md">
              <UIcon name="i-lucide-mouse-pointer-click" class="size-3" />
            </span>
          </span>
          <span
            v-if="activeCursor.label"
            class="rounded-full border border-default bg-elevated/95 px-2.5 py-0.5 text-xs font-semibold text-highlighted shadow-md backdrop-blur-sm"
          >
            {{ activeCursor.label }}
          </span>
        </div>

        <!-- Kinetic Lower-Third Story Bar -->
        <div class="absolute inset-x-3 bottom-3 z-20 sm:inset-x-5 sm:bottom-4">
          <div class="surface-specular flex flex-col justify-between gap-2 rounded-[14px] border border-default bg-elevated/92 px-4 py-2.5 backdrop-blur-md sm:flex-row sm:items-center">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {{ activeScene.step }}
                </span>
                <p class="truncate text-small font-semibold text-highlighted">
                  {{ activeScene.title }}
                </p>
              </div>
              <p class="mt-0.5 truncate text-xs text-muted">
                {{ activeScene.caption }}
              </p>
            </div>
            <span class="shrink-0 font-mono text-xs font-semibold text-primary">
              Ferry · SSH &amp; SFTP
            </span>
          </div>
          <!-- Live Timeline Progress Bar (Beacon Amber) -->
          <div class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div class="h-full rounded-full bg-beacon transition-[width] duration-100 ease-linear" :style="{ width: `${totalPct}%` }" />
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.promo-stage {
  container-type: size;
}
</style>
