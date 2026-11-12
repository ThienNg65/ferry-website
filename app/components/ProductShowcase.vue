<script setup lang="ts">
const tabs = [
  { id: 'files', name: 'Files', line: 'Two panes, local and remote. Queue transfers, cap the bandwidth and keep working.', img: 'files', alt: 'Ferry file browser with a local folder on the left, a remote server folder on the right and a transfer queue below.' },
  { id: 'terminal', name: 'Terminal', line: 'A real SSH terminal for each server, in the same window, in the colours you pick.', img: 'terminal', alt: 'Ferry terminal showing a directory listing, the last lines of a log and a process list on a remote server.' },
  { id: 'logs', name: 'Logs', line: 'Follow a log as it is written. Filter to errors or warnings without leaving the view.', img: 'logs', alt: 'Ferry log viewer streaming live lines, with info, warning and error lines highlighted and filter buttons above.' },
  { id: 'monitor', name: 'Monitor', line: 'See CPU, memory, disk and the busiest processes on the server, live.', img: 'monitor', alt: 'Ferry resource monitor with storage and memory bars, a CPU graph and a table of running processes.' }
]
const active = ref(0)
const tabEls = ref<HTMLElement[]>([])

function onKey(e: KeyboardEvent) {
  const last = tabs.length - 1
  const fwd = active.value === last ? 0 : active.value + 1
  const back = active.value === 0 ? last : active.value - 1
  const next: Record<string, number> = { ArrowDown: fwd, ArrowRight: fwd, ArrowUp: back, ArrowLeft: back, Home: 0, End: last }
  const i = next[e.key]
  if (i === undefined) return
  e.preventDefault()
  active.value = i
  tabEls.value[i]?.focus()
}
</script>

<template>
  <section id="features" class="bg-deep pb-24 text-white" aria-labelledby="showcase-title">
    <div class="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <h2 id="showcase-title" class="max-w-xl text-step-4 font-bold">One connection. Four ways to work.</h2>
      <div class="mt-10 grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div role="tablist" aria-label="Ferry features" aria-orientation="vertical" class="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" @keydown="onKey">
          <button
            v-for="(t, i) in tabs" :id="`tab-${t.id}`" :key="t.id" :ref="(el) => { if (el) tabEls[i] = el as HTMLElement }"
            type="button" role="tab" :aria-selected="active === i" :aria-controls="`panel-${t.id}`" :tabindex="active === i ? 0 : -1"
            class="min-h-11 shrink-0 rounded-lg border-l-4 px-4 py-3 text-left transition-colors lg:shrink"
            :class="active === i ? 'border-ferry bg-white/10' : 'border-transparent hover:bg-white/5'"
            @click="active = i"
          >
            <span class="block font-display text-step-1 font-semibold">{{ t.name }}</span>
            <span class="mt-1 hidden text-sm text-haze lg:block">{{ t.line }}</span>
          </button>
        </div>
        <div class="grid">
          <div
            v-for="(t, i) in tabs" :id="`panel-${t.id}`" :key="t.id" role="tabpanel" :aria-labelledby="`tab-${t.id}`"
            :inert="active !== i" :aria-hidden="active !== i" class="col-start-1 row-start-1 transition-opacity duration-300"
            :class="active === i ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            <p class="mb-4 text-haze lg:hidden">{{ t.line }}</p>
            <picture>
              <source :srcset="`/screens/${t.img}.webp`" type="image/webp">
              <img :src="`/screens/${t.img}.jpg`" width="1600" height="1000" :alt="t.alt" :loading="i === 0 ? 'eager' : 'lazy'" class="h-auto w-full rounded-xl border border-white/15 shadow-2xl shadow-black/40">
            </picture>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
