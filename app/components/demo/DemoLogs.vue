<script setup lang="ts">
// Mirrors logs/LogTailViewer.vue, LogTailControls.vue and LogRail.vue: open tail tab pill, Live pill, rolling buffer bar, level filters, and right-edge overview rail.
const props = defineProps<{ compact?: boolean, forcedFilter?: LogFilter }>()
const lines = ref(initialLogs)
const filter = ref<LogFilter>(props.forcedFilter ?? 'all')
watch(() => props.forcedFilter, (f) => { if (f) filter.value = f })

const { root, running, frozen, reduced, toggle } = useDemoLoop({
  ms: 1200,
  tick: () => { if (!props.compact) lines.value = [...lines.value, makeLog(lines.value.length + 1)].slice(-300) }
})

const count = (f: LogFilter) => filterLogs(lines.value, f).length
const filters = computed<[LogFilter, string, number][]>(() => [
  ['all', 'All', 0], ['error', 'Errors', count('error')], ['warn', 'Warnings+', count('warn')],
  ['info', 'Info+', lines.value.filter(l => l.level === 'info').length], ['debug', 'Debug', count('debug')]
])
const view = computed(() => filterLogs(props.compact ? initialLogs : lines.value, filter.value).slice(props.compact ? -4 : -11))
const total = computed(() => filterLogs(lines.value, filter.value).length)
const bufferPct = computed(() => Math.min(100, Math.round((lines.value.length / 300) * 100)))
const hue: Record<string, string> = { error: 'var(--err)', warn: 'var(--warn)', info: 'var(--info)', debug: 'var(--muted)' }
const railMarks = computed(() => (props.compact ? initialLogs.slice(0, 12) : lines.value.slice(-24)))
</script>

<template>
  <DemoWindow ref="root" label="Ferry log viewer, working illustration" :bare="compact" :pausable="!reduced && !compact" :running :frozen @toggle="toggle">
    <div class="demo-glass-chrome flex items-center gap-x-2.5 gap-y-1 overflow-x-auto border-b border-[var(--line)] px-2.5 py-1.5">
      <span aria-hidden="true" class="demo-glass-tab flex shrink-0 items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium text-[var(--fg)]">
        <span class="size-2 rounded-full bg-[var(--ok)]" :class="{ 'live-dot': running }" />
        <UIcon name="i-lucide-file-text" class="size-3 text-[var(--accent-text)]" />
        <span>app.log</span>
      </span>
      <component :is="compact ? 'span' : 'button'" :type="compact ? undefined : 'button'" class="mono hit flex shrink-0 items-center gap-1.5 rounded-full border bg-[var(--well)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider" :style="{ color: running ? 'var(--ok-text)' : 'var(--warn-text)', borderColor: running ? 'rgba(48, 209, 88, 0.45)' : 'rgba(255, 159, 10, 0.45)' }" @click="!compact && toggle()">
        <span class="size-2 rounded-full" :class="{ 'live-dot': running }" :style="{ background: 'currentColor' }" aria-hidden="true" />{{ running ? 'Live' : 'Paused' }}
      </component>
      <span class="mono flex shrink-0 items-center gap-1.5 text-[11px] text-[var(--muted)]">
        <span><b class="font-semibold text-[var(--fg)]">{{ total }}</b><span v-if="total !== lines.length"> / {{ lines.length }}</span> lines</span>
        <span class="hidden h-1.5 w-10 overflow-hidden rounded-full bg-[var(--well)] sm:inline-block" aria-hidden="true">
          <i class="block h-full rounded-full bg-[var(--accent)]" :style="{ width: `${bufferPct}%` }" />
        </span>
      </span>
      <div role="group" aria-label="Filter lines by level" class="demo-glass-well flex shrink-0 gap-0.5 rounded-lg p-0.5">
        <button v-for="[id, label, n] in filters" :key="id" type="button" :aria-pressed="filter === id" class="mono hit flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] transition-colors"
          :class="filter === id ? 'bg-[var(--chip)] font-semibold text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'" @click="filter = id">
          {{ label }}<span v-if="n && id !== 'all'" class="rounded-full px-1 text-[10px] font-bold" :style="{ color: hue[id] }">{{ n }}</span>
        </button>
      </div>
    </div>
    <div class="demo-glass-well flex !border-0" :class="compact ? 'h-24' : 'h-72'" aria-hidden="true">
      <div class="mono min-w-0 flex-1 overflow-hidden py-0.5 text-[12px] leading-relaxed">
        <div v-for="(l, i) in view" :key="l.n" class="flex items-start" :class="{ line: compact || l.n > 24 }"
          :style="{ background: l.level === 'error' || l.level === 'warn' ? `color-mix(in srgb, ${hue[l.level]} 14%, transparent)` : undefined, animationDelay: compact ? `${0.3 + i * 0.7}s` : undefined }">
          <i class="w-1 shrink-0 self-stretch" :style="{ background: l.level === 'info' || l.level === 'debug' ? 'transparent' : hue[l.level] }" />
          <span class="w-10 shrink-0 pr-2 text-right text-[10px] leading-[18px] text-[var(--muted)]">{{ l.n }}</span>
          <span class="min-w-0 flex-1 truncate pl-2" :style="{ color: l.level === 'debug' ? 'var(--muted)' : l.level === 'info' ? 'var(--fg)' : hue[l.level] }">
            <b class="mr-1.5 inline-block rounded px-1 text-[10px] font-bold leading-4" :style="{ color: hue[l.level], background: 'var(--chip)' }">{{ levelBadge[l.level] }}</b><span class="mr-1.5 hidden text-[11px] text-[var(--muted)] sm:inline">{{ l.ts }}</span><span class="mr-1.5">{{ l.src }}</span>{{ l.text }}
          </span>
        </div>
      </div>
      <!-- LogRail overview strip showing error and warning density marks -->
      <div class="relative flex w-2.5 shrink-0 flex-col border-l border-[var(--line)] bg-[rgba(13,18,30,0.65)]">
        <span v-for="m in railMarks" :key="m.n" class="relative min-h-0 flex-1">
          <i
            v-if="m.level === 'error' || m.level === 'warn'"
            class=" inset-x-0 top-0 block h-0.5"
            :style="{ background: hue[m.level] }"
          />
        </span>
        <span class="pointer-events-none absolute inset-x-0 bottom-1 h-1/3 rounded-xs bg-[var(--fg)]/15 ring-1 ring-inset ring-[var(--line)]" />
      </div>
    </div>
  </DemoWindow>
</template>
