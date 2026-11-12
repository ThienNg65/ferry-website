<script setup lang="ts">
// Mirrors logs/LogTailViewer.vue: a Live pill, a line count, level filters with counts, and rows with a level bar, line number and badge.
const props = defineProps<{ compact?: boolean }>()
const lines = ref(initialLogs)
const filter = ref<LogFilter>('all')
const { root, running, frozen, reduced, toggle } = useDemoLoop({
  ms: 1200,
  tick: () => { if (!props.compact) lines.value = [...lines.value, makeLog(lines.value.length + 1)].slice(-300) }
})

const count = (f: LogFilter) => filterLogs(lines.value, f).length
const filters = computed<[LogFilter, string, number][]>(() => [
  ['all', 'All', 0], ['error', 'Errors', count('error')], ['warn', 'Warnings+', count('warn')],
  ['info', 'Info+', lines.value.filter(l => l.level === 'info').length], ['debug', 'Debug', count('debug')]
])
const view = computed(() => filterLogs(props.compact ? initialLogs.slice(0, 6) : lines.value, filter.value).slice(props.compact ? -4 : -11))
const total = computed(() => filterLogs(lines.value, filter.value).length)
const hue: Record<string, string> = { error: 'var(--err)', warn: 'var(--warn)', info: 'var(--info)', debug: 'var(--muted)' }
</script>

<template>
  <DemoWindow ref="root" label="Ferry log viewer, working illustration" :bare="compact" :pausable="!reduced && !compact" :running :frozen @toggle="toggle">
    <div class="flex items-center gap-x-3 gap-y-1 overflow-x-auto border-b border-[var(--line)] px-2 py-1">
      <component :is="compact ? 'span' : 'button'" :type="compact ? undefined : 'button'" class="mono hit flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider" :style="{ color: running ? 'var(--ok)' : 'var(--warn)', borderColor: 'currentColor' }" @click="!compact && toggle()">
        <span class="size-2 rounded-full" :class="{ 'live-dot': running }" :style="{ background: 'currentColor' }" aria-hidden="true" />{{ running ? 'Live' : 'Paused' }}
      </component>
      <span class="mono shrink-0 text-[11px] text-[var(--muted)]"><b class="font-semibold text-[var(--fg)]">{{ total }}</b><span v-if="total !== lines.length"> / {{ lines.length }}</span> lines</span>
      <div role="group" aria-label="Filter lines by level" class="flex shrink-0 gap-0.5 rounded-md bg-[var(--chip)] p-0.5">
        <button v-for="[id, label, n] in filters" :key="id" type="button" :aria-pressed="filter === id" class="mono hit flex items-center gap-1 rounded px-2 py-0.5 text-[11px]"
          :class="filter === id ? 'bg-[var(--bg)] font-semibold text-[var(--fg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'" @click="filter = id">
          {{ label }}<span v-if="n && id !== 'all'" class="rounded-full px-1 text-[10px] font-bold" :style="{ color: hue[id] }">{{ n }}</span>
        </button>
      </div>
    </div>
    <div class="mono overflow-hidden py-0.5 text-[12px] leading-relaxed" :class="compact ? 'h-24' : 'h-72'" aria-hidden="true">
      <div v-for="(l, i) in view" :key="l.n" class="flex items-start" :class="{ line: compact || l.n > 24 }"
        :style="{ background: l.level === 'error' || l.level === 'warn' ? `color-mix(in srgb, ${hue[l.level]} 14%, transparent)` : undefined, animationDelay: compact ? `${0.3 + i * 0.7}s` : undefined }">
        <i class="w-1 shrink-0 self-stretch" :style="{ background: l.level === 'info' || l.level === 'debug' ? 'transparent' : hue[l.level] }" />
        <span class="w-10 shrink-0 pr-2 text-right text-[10px] leading-[18px] text-[var(--muted)]">{{ l.n }}</span>
        <span class="min-w-0 flex-1 truncate pl-2" :style="{ color: l.level === 'debug' ? 'var(--muted)' : l.level === 'info' ? 'var(--fg)' : hue[l.level] }">
          <b class="mr-1.5 inline-block rounded px-1 text-[10px] font-bold leading-4" :style="{ color: hue[l.level], background: 'var(--chip)' }">{{ levelBadge[l.level] }}</b><span class="mr-1.5 hidden text-[11px] text-[var(--muted)] sm:inline">{{ l.ts }}</span><span class="mr-1.5">{{ l.src }}</span>{{ l.text }}
        </span>
      </div>
    </div>
  </DemoWindow>
</template>
