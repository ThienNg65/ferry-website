<script setup lang="ts">
import { usePreferredReducedMotion, useTransition } from '@vueuse/core'
// Mirrors transfers/TransferQueue.vue, TransferItem.vue and history/HistoryDialog.vue: a queue with retry, and a filterable history.
const props = defineProps<{ compact?: boolean }>()
type State = 'done' | 'progress' | 'error'
interface Item { run: number, up: boolean, name: string, dir: string, state: State, pct: number, text: string, right: string }
const queue = ref<Item[]>([
  { run: 0, up: true, name: 'web-api-2.15.0.tar.gz', dir: '/config/apps/web-api', state: 'done', pct: 100, text: '19.0 MB / 19.0 MB (100%)', right: 'done' },
  { run: 0, up: true, name: 'release-notes.pdf', dir: '/config/apps/web-api', state: 'done', pct: 100, text: '349.0 KB / 349.0 KB (100%)', right: 'done' },
  { run: 0, up: true, name: 'releases', dir: '/config/apps/web-api', state: 'progress', pct: 57, text: '33.8 MB / 59.1 MB (57%)', right: '7.8 MB/s, 3s left' },
  { run: 0, up: false, name: 'big-update.bin', dir: 'C:\\ferry-demo', state: 'error', pct: 31, text: 'Connection reset by peer', right: 'error' }
])
const tone: Record<State, string> = { done: 'var(--ok)', progress: 'var(--beacon)', error: 'var(--err)' }
const done = computed(() => queue.value.filter(i => i.state === 'done').length)
const motion = usePreferredReducedMotion()

// The hero shows one transfer and plays it from start to finish; the feature row shows a queue in mid-flight.
const target = ref(0)
const prog = useTransition(target, { duration: 3200, disabled: computed(() => motion.value === 'reduce') })
onMounted(() => { target.value = 100 })
const solo = computed<Item>(() => {
  const p = Math.round(prog.value)
  const fin = p >= 100
  return { run: 0, up: true, name: 'releases', dir: '/config/apps/web-api', state: fin ? 'done' : 'progress', pct: p, text: `${(59.1 * p / 100).toFixed(1)} MB / 59.1 MB (${p}%)`, right: fin ? 'done' : `7.8 MB/s, ${Math.ceil((100 - p) * 0.076)}s left` }
})
const list = computed(() => (props.compact ? [solo.value] : queue.value))

function retry(it: Item) {
  Object.assign(it, { run: it.run + 1, state: 'progress', pct: 100, text: '195.3 MB / 195.3 MB (100%)', right: '7.8 MB/s' })
  setTimeout(() => Object.assign(it, { state: 'done', right: 'done' }), motion.value === 'reduce' ? 0 : 2600)
}

const filters = [['all', 'All'], ['done', 'Done'], ['error', 'Error'], ['cancelled', 'Cancelled']] as const
const filter = ref<(typeof filters)[number][0]>('all')
const rows = computed(() => historyRows.filter(h => filter.value === 'all' || h.status === filter.value))
const badge: Record<string, string> = { done: 'var(--ok)', error: 'var(--err)', cancelled: 'var(--muted)' }
const group = useId()
</script>

<template>
  <DemoWindow label="Ferry transfer queue and history, working illustration" :bare="compact">
    <div class="px-3 pb-3 pt-2">
      <p class="text-[var(--muted)]"><b class="font-medium text-[var(--fg)]">{{ compact ? '1 of 1' : `${done} of ${queue.length}` }}</b>, {{ compact ? solo.pct : done < queue.length ? 57 : 100 }}%</p>
      <ul class="mt-1 border-t border-[var(--line)]">
        <li v-for="it in list" :key="it.name + it.run" class="border-b border-[var(--line)] py-2">
          <div class="flex items-center justify-between gap-2">
            <span class="flex min-w-0 items-center gap-1.5">
              <UIcon :name="it.up ? 'i-lucide-upload' : 'i-lucide-download'" class="size-3.5 shrink-0 text-[var(--muted)]" aria-hidden="true" />
              <b class="shrink-0 font-medium">{{ it.name }}</b><span class="truncate text-[var(--muted)]">in {{ it.dir }}</span>
            </span>
            <button v-if="it.state === 'error'" type="button" class="btn hit !min-h-7 !px-1.5" aria-label="Retry transfer" @click="retry(it)">
              <UIcon name="i-lucide-rotate-cw" class="size-3.5" aria-hidden="true" />Retry
            </button>
          </div>
          <div class="mt-1.5 h-1 rounded-full bg-[var(--chip)]" aria-hidden="true">
            <div class="h-full rounded-full" :class="{ bar: !compact }" :style="{ width: `${it.pct}%`, background: tone[it.state] }" />
          </div>
          <p class="mt-1 flex justify-between gap-2 text-[11px] text-[var(--muted)]">
            <span :style="it.state === 'error' ? { color: 'var(--err)' } : undefined">{{ it.text }}</span><span class="mono">{{ it.right }}</span>
          </p>
        </li>
      </ul>

      <template v-if="!compact">
        <div class="mt-5 flex items-baseline justify-between gap-3">
          <h4 class="text-[15px] font-semibold">History</h4><span class="text-[var(--muted)]">Completed transfers and operations.</span>
        </div>
        <fieldset class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <legend class="sr-only">Filter history by status</legend>
          <label v-for="[v, l] in filters" :key="v" class="hit flex cursor-pointer items-center gap-1.5">
            <input v-model="filter" type="radio" :name="group" :value="v" class="size-3.5 accent-[var(--accent)]">{{ l }}
          </label>
        </fieldset>
        <ul class="mt-2 divide-y divide-[var(--line)] rounded-md border border-[var(--line)]">
          <li v-for="h in rows" :key="h.label" class="flex items-center gap-2 px-3 py-2">
            <UIcon :name="h.kind === 'up' ? 'i-lucide-upload' : 'i-lucide-download'" class="size-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
            <span class="min-w-0 flex-1"><span class="block truncate">{{ h.label }}</span><span class="block truncate text-[11px] text-[var(--muted)]">{{ h.meta }}</span></span>
            <span class="rounded-md px-2 py-0.5 text-[11px] font-medium" :style="{ color: badge[h.status], background: 'var(--chip)' }">{{ h.status }}</span>
          </li>
        </ul>
      </template>
    </div>
  </DemoWindow>
</template>
