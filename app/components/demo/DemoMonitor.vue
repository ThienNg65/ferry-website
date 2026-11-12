<script setup lang="ts">
// Mirrors monitor/MonitorPanel.vue and ProcessTable.vue: Storage, Memory and CPU summaries over a process table sorted from its header.
const t = ref(29)
const { root, running, frozen, reduced, toggle } = useDemoLoop({ ms: 2000, tick: () => { t.value++ } })

const cpuAt = (n: number) => Math.round(Math.min(98, Math.max(4, 58 + 26 * Math.sin(n / 3) + 9 * Math.sin(n * 1.7))) * 10) / 10
const samples = computed(() => Array.from({ length: 30 }, (_, i) => cpuAt(t.value - 29 + i)))
const cpu = computed(() => samples.value[29]!)
const points = computed(() => samples.value.map((v, i) => `${(i * 100 / 29).toFixed(1)},${(32 - v / 100 * 32).toFixed(1)}`).join(' '))
const cores = computed(() => Array.from({ length: 10 }, (_, i) => Math.round(Math.min(100, Math.max(6, cpu.value + 28 * Math.sin(t.value + i * 1.3))))))
const cpuColor = computed(() => (cpu.value >= 90 ? 'var(--err)' : cpu.value >= 75 ? 'var(--warn)' : 'var(--accent-text)'))

const key = ref<ProcKey>('cpu')
const dir = ref<'asc' | 'desc'>('desc')
function sort(k: ProcKey) {
  if (key.value === k) dir.value = dir.value === 'desc' ? 'asc' : 'desc'
  else { key.value = k; dir.value = k === 'name' ? 'asc' : 'desc' }
}
const rows = computed(() => sortProcesses(processes.map(p => ({ ...p, cpu: Math.max(0, Math.round((p.cpu + 1.5 * Math.sin(t.value + p.pid)) * 10) / 10) })), key.value, dir.value))
const sortable: [ProcKey, string][] = [['ram', 'RAM'], ['cpu', 'CPU%']]
const bars = [['Storage', 2, '16.0 GB / 1006.9 GB'], ['Memory', 7, '1.3 GB / 19.5 GB, swap 107.9 MB (1%)']] as const
</script>

<template>
  <DemoWindow ref="root" label="Ferry resource monitor, working illustration" :pausable="!reduced" :running :frozen @toggle="toggle">
    <div class="@container">
      <div class="grid gap-3 px-3 py-3 @lg:grid-cols-3 @lg:gap-4" aria-hidden="true">
        <div v-for="[name, pct, text] in bars" :key="name">
          <p class="flex justify-between"><b class="font-medium">{{ name }}</b><span class="mono text-[11px] text-[var(--muted)]">{{ pct }}%</span></p>
          <div class="mt-1 h-1.5 rounded-full bg-[var(--chip)]"><div class="h-full rounded-full bg-[var(--accent)]" :style="{ width: `${pct}%` }" /></div>
          <p class="mt-1 text-[11px] text-[var(--muted)]">{{ text }}</p>
        </div>
        <div>
          <b class="font-medium">CPU</b>
          <p class="flex items-center gap-2">
            <span class="text-[15px] font-semibold tabular-nums" :style="{ color: cpuColor }">{{ cpu.toFixed(1) }}%</span>
            <svg viewBox="0 0 100 32" class="h-4 w-12" :style="{ color: 'var(--accent-text)' }" preserveAspectRatio="none"><polyline :points fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" /></svg>
            <span class="text-[11px] text-[var(--muted)]">10 cores</span>
          </p>
          <p class="mt-1 flex items-end gap-2">
            <span class="flex gap-0.5"><i v-for="(c, i) in cores" :key="i" class="flex h-3 w-1 flex-col justify-end overflow-hidden rounded-sm bg-[var(--chip)]"><i class="block w-full bg-[var(--accent)]" :style="{ height: `${c}%` }" /></i></span>
            <span class="text-[11px] text-[var(--muted)]">7.09/6.58/6.33, 4h 42m</span>
          </p>
        </div>
      </div>
      <table class="w-full border-t border-[var(--line)]">
        <caption class="sr-only">Processes on the server, click Name, RAM or CPU% to sort</caption>
        <thead>
          <tr class="text-[11px] uppercase tracking-wide">
            <th scope="col" :aria-sort="key === 'name' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'" class="border-b border-[var(--line)] text-left font-medium">
              <button type="button" class="hit inline-flex h-7 w-full items-center gap-0.5 px-3 uppercase hover:text-[var(--accent-text)]" @click="sort('name')">
                Name<UIcon v-if="key === 'name'" :name="dir === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-3" aria-hidden="true" />
              </button>
            </th>
            <th scope="col" class="w-14 border-b border-[var(--line)] px-3 text-right font-medium text-[var(--muted)]">PID</th>
            <th v-for="[k, label] in sortable" :key="k" scope="col" :aria-sort="key === k ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'" class="w-20 border-b border-[var(--line)] text-right font-medium">
              <button type="button" class="hit inline-flex h-7 w-full items-center justify-end gap-0.5 px-3 uppercase hover:text-[var(--accent-text)]" @click="sort(k)">
                {{ label }}<UIcon v-if="key === k" :name="dir === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-3" aria-hidden="true" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="tabular-nums">
          <tr v-for="p in rows" :key="p.pid" class="h-7">
            <td class="px-3">{{ p.name }}</td><td class="px-3 text-right text-[var(--muted)]">{{ p.pid }}</td><td class="px-3 text-right">{{ p.ram.toFixed(1) }} MB</td><td class="px-3 text-right">{{ p.cpu.toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DemoWindow>
</template>
