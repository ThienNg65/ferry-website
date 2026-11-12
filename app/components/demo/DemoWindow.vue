<script setup lang="ts">
// The Ferry window chrome shared by every coded demo. `bare` drops the chrome so a demo can sit inside another one (the hero dock); it keeps one wrapper element for the visibility observer.
withDefaults(defineProps<{ label: string, tab?: string, host?: string, bare?: boolean, pausable?: boolean, running?: boolean, frozen?: boolean, captionClass?: string }>(), {
  tab: 'web-api', host: 'ferrytest@127.0.0.1', captionClass: 'text-muted'
})
defineEmits<{ toggle: [] }>()
</script>

<template>
  <div v-if="bare"><slot /></div>
  <figure v-else role="group" :aria-label="label" class="relative z-10">
    <div class="demo window relative" :class="{ frozen }">
      <div aria-hidden="true">
        <div class="flex h-9 items-center justify-center gap-3 border-b border-[var(--line)] px-3">
          <span class="flex items-center gap-1.5 font-semibold text-[var(--fg)]"><span class="size-2 rounded-full bg-[var(--accent)]" />Ferry</span>
          <span class="hidden items-center gap-1.5 rounded-md bg-[var(--chip)] px-2 py-0.5 text-[var(--muted)] sm:flex"><UIcon name="i-lucide-search" class="size-3" />Search / Commands</span>
        </div>
        <div class="flex h-8 items-end gap-1 border-b border-[var(--line)] px-2">
          <span class="flex items-center gap-1.5 rounded-t-md border-x border-t border-[var(--beacon-line)] bg-[var(--bg)] px-2.5 py-1 text-[var(--fg)]">
            <span v-if="tab !== 'New Tab'" class="size-1.5 rounded-full bg-[var(--ok)]" /><b class="font-semibold">{{ tab }}</b><span v-if="tab !== 'New Tab'" class="hidden text-[var(--muted)] sm:inline">{{ host }}</span>
          </span>
        </div>
      </div>
      <slot />
      <button
        v-if="pausable" type="button" class="absolute right-1 top-0 z-10 flex size-11 items-center justify-center rounded-full bg-[var(--chip)] text-[var(--fg)] hover:bg-[var(--line)]"
        :aria-label="running ? 'Pause the demo' : 'Play the demo'" @click="$emit('toggle')"
      >
        <UIcon :name="running ? 'i-lucide-pause' : 'i-lucide-play'" class="size-4" aria-hidden="true" />
      </button>
    </div>
    <figcaption v-if="$slots.caption" class="mt-4 text-center text-small" :class="captionClass"><slot name="caption" /></figcaption>
  </figure>
</template>
