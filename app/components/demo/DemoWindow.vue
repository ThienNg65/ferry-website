<script setup lang="ts">
// The Ferry window chrome shared by every coded demo, matching SiteTabBar.vue (single unified tab + command bar on the native OS window frame).
// `bare` drops the chrome so a demo can sit inside another one (the hero dock); it keeps one wrapper element for the visibility observer.
withDefaults(defineProps<{ label: string, tab?: string, host?: string, env?: string, bare?: boolean, pausable?: boolean, running?: boolean, frozen?: boolean, captionClass?: string }>(), {
  tab: 'web-api', host: 'ferrytest@127.0.0.1', env: 'var(--ok)', captionClass: 'text-muted'
})
defineEmits<{ toggle: [] }>()
</script>

<template>
  <div v-if="bare"><slot /></div>
  <figure v-else role="group" :aria-label="label" class="relative z-10">
    <div class="demo window relative" :class="{ frozen }">
      <div aria-hidden="true" class="flex h-9 items-end justify-between gap-2 border-b border-[var(--line)] bg-[var(--chip)]/55 px-2 pt-1">
        <div class="flex min-w-0 items-end gap-1">
          <span
            class="flex items-center gap-1.5 rounded-t-md border-x border-t-2 border-x-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-[var(--fg)]"
            :style="{ borderTopColor: tab === 'New Tab' ? 'var(--accent)' : env }"
          >
            <span v-if="tab !== 'New Tab'" class="size-2 shrink-0 rounded-full bg-[var(--ok)]" />
            <UIcon v-else name="i-lucide-server" class="size-3 shrink-0 text-[var(--muted)]" />
            <b class="truncate font-semibold">{{ tab }}</b>
            <span v-if="tab !== 'New Tab'" class="hidden truncate text-[var(--muted)] sm:inline">{{ host }}</span>
            <UIcon name="i-lucide-x" class="ml-0.5 size-3 shrink-0 text-[var(--muted)] opacity-70" />
          </span>
          <span class="mb-1 inline-flex size-6 items-center justify-center rounded text-[var(--muted)]">
            <UIcon name="i-lucide-plus" class="size-3.5" />
          </span>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 pb-1" :class="pausable ? 'pr-11' : 'pr-1'">
          <span class="hidden items-center gap-1.5 rounded-md border border-[var(--line)] bg-[var(--bg)]/80 px-2 py-0.5 text-[11px] text-[var(--muted)] sm:flex">
            <UIcon name="i-lucide-search" class="size-3" />
            <span>Search</span>
            <kbd class="mono rounded bg-[var(--chip)] px-1 text-[10px] text-[var(--muted)]">Ctrl+K</kbd>
          </span>
          <UIcon name="i-lucide-sun" class="hidden size-3.5 text-[var(--muted)] md:inline" />
          <UIcon name="i-lucide-history" class="hidden size-3.5 text-[var(--muted)] md:inline" />
          <UIcon name="i-lucide-settings" class="hidden size-3.5 text-[var(--muted)] sm:inline" />
          <UIcon name="i-lucide-panel-left-close" class="hidden size-3.5 text-[var(--muted)] sm:inline" />
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
