<script setup lang="ts">
// The hero's Ferry window: the file view on top (or left), and the multi-panel dock (Transfers, Terminal, Log Tail, Monitor) with Bottom / Right-split toggle.
const scenes = [
  { label: 'Transfers', badge: 1 },
  { label: 'Terminal', badge: 0 },
  { label: 'Log Tail', badge: 1 },
  { label: 'Monitor', badge: 0 }
] as const
const dockRight = ref(false)
const { scene, frozen, running, reduced, root, pick, toggle } = useDemoLoop({ count: scenes.length })
</script>

<template>
  <DemoWindow ref="root" label="Ferry window demo" :frozen>
    <div :class="dockRight ? 'lg:grid lg:grid-cols-[1.18fr_1fr]' : ''">
      <DemoFiles compact :send="scene === 0 ? 'releases' : ''" :active-side="scene === 0 ? 'local' : 'remote'" />
      <div :class="dockRight ? 'border-t border-[var(--line)] lg:border-l lg:border-t-0' : 'border-t border-[var(--line)]'">
        <div class="demo-glass-chrome flex items-center gap-1 overflow-x-auto border-b border-[var(--line)] px-2.5 py-1.5">
          <button
            v-for="(s, i) in scenes" :key="s.label" type="button" :aria-pressed="scene === i"
            class="btn hit relative !min-h-8 rounded-lg !px-2.5 py-1 text-xs font-medium sm:!px-3"
            :class="scene === i ? 'demo-glass-tab font-semibold text-[var(--fg)]' : 'hover:bg-white/5 hover:text-[var(--fg)]'"
            @click="pick(i)"
          >
            <span>{{ s.label }}</span>
            <span v-if="s.badge" class="rounded-full bg-[var(--sel)] px-1.5 text-[10px] font-bold text-[var(--accent-text)]" aria-hidden="true">{{ s.badge }}</span>
            <span v-if="scene === i" aria-hidden="true" class="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
          </button>
          <div class="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              class="btn hit !min-h-8 !px-2 text-[11px] font-medium"
              :aria-label="dockRight ? 'Dock to bottom' : 'Dock to right'"
              :title="dockRight ? 'Dock to bottom' : 'Dock to right (Ctrl+`)'"
              @click="dockRight = !dockRight"
            >
              <UIcon :name="dockRight ? 'i-lucide-panel-bottom' : 'i-lucide-panel-right'" class="size-3.5 text-[var(--accent-text)]" aria-hidden="true" />
              <span class="hidden sm:inline">{{ dockRight ? 'Bottom dock' : 'Right split' }}</span>
            </button>
            <button v-if="!reduced" type="button" class="btn hit !min-h-8 size-8 !px-0" :aria-label="running ? 'Pause the demo' : 'Play the demo'" @click="toggle">
              <UIcon :name="running ? 'i-lucide-pause' : 'i-lucide-play'" class="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div :key="scene" class="min-h-44 px-1 pb-1">
          <DemoTransfers v-if="scene === 0" compact />
          <DemoTerminal v-else-if="scene === 1" compact />
          <DemoLogs v-else-if="scene === 2" compact />
          <DemoMonitor v-else compact />
        </div>
      </div>
    </div>
  </DemoWindow>
</template>
