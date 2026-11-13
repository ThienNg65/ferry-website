<script setup lang="ts">
// The hero's Ferry window: the file view on top, a dock with three of the app's panels below. Built from the same demos as the feature rows.
const scenes = ['Transfers', 'Terminal', 'Log Tail']
const { scene, frozen, running, reduced, root, pick, toggle } = useDemoLoop({ count: scenes.length })
</script>

<template>
  <DemoWindow ref="root" label="Ferry window, working illustration" :frozen>
    <DemoFiles compact :send="scene === 0 ? 'releases' : ''" />
    <div class="border-t border-[var(--line)]">
      <div class="flex items-center gap-1 px-1.5">
        <button
          v-for="(s, i) in scenes" :key="s" type="button" :aria-pressed="scene === i" class="btn !px-2.5 font-medium sm:!px-3" @click="pick(i)"
        >
          {{ s }}
        </button>
        <button v-if="!reduced" type="button" class="btn ml-auto !px-0 size-11" :aria-label="running ? 'Pause the demo' : 'Play the demo'" @click="toggle">
          <UIcon :name="running ? 'i-lucide-pause' : 'i-lucide-play'" class="size-4" aria-hidden="true" />
        </button>
      </div>
      <div :key="scene" class="min-h-44 px-1 pb-1">
        <DemoTransfers v-if="scene === 0" compact />
        <DemoTerminal v-else-if="scene === 1" compact />
        <DemoLogs v-else compact />
      </div>
    </div>
    <template #caption>Interactive preview with sample data, not a recording of a real server.</template>
  </DemoWindow>
</template>
