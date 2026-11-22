<script setup lang="ts">
// The Ferry window chrome shared by every coded demo, matching SiteTabBar.vue (Modern Glass floating pill tabs, bottom environment glow indicator, and command palette pill).
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
      <div aria-hidden="true" class="demo-glass-chrome flex min-h-10 items-center justify-between gap-2 border-b border-[var(--line)] px-2.5 py-1">
        <div class="flex min-w-0 items-center gap-1.5">
          <!-- Modern Glass Ferry emblem -->
          <span
            class="flex size-5 shrink-0 items-center justify-center rounded-[5px] shadow-[inset_0_1px_0_rgba(225,251,255,0.65),0_1px_3px_rgba(2,6,23,0.6)] ring-1 ring-white/25"
            style="background: linear-gradient(145deg, #2c98f3 0%, #1457bc 55%, #102b76 100%)"
          >
            <svg viewBox="0 0 128 128" class="size-4">
              <path fill="#f7fdff" fill-rule="evenodd" d="M60 27 C60 24.8 61.8 23 64 23 C66.2 23 68 24.8 68 27 V31 H73 A2.5 2.5 0 0 1 73 36 H68 V40 H79 Q86 40 88 47 L92 61 H100 Q107 61 106 68 L103 77 Q99 87 91 91 L68 98 Q64 99.5 60 98 L37 91 Q29 87 25 77 L22 68 Q21 61 28 61 H36 L40 47 Q42 40 49 40 H60 V36 H55 A2.5 2.5 0 0 1 55 31 H60 Z M50 46 H58 Q60 46 60 48 V56 Q60 58 58 58 H46 Q43 58 44 55 L46 49 Q47 46 50 46 Z M78 46 H70 Q68 46 68 48 V56 Q68 58 70 58 H82 Q85 58 84 55 L82 49 Q81 46 78 46 Z" />
              <path fill="#84edff" d="M20 90 C32 85 40 85 51 91 C60 96 68 96 77 91 C88 85 96 85 108 90 A4.5 4.5 0 0 1 104.5 98.3 C95 94.5 90 94.7 81.5 99.3 C69 106 59 106 46.5 99.3 C38 94.7 33 94.5 23.5 98.3 A4.5 4.5 0 0 1 20 90 Z" />
            </svg>
          </span>
          <!-- Floating Modern Glass pill tab with glowing bottom environment bar -->
          <span class="demo-glass-tab relative flex min-w-0 items-center gap-1.5 px-2.5 py-1 text-[var(--fg)]">
            <span v-if="tab !== 'New Tab'" class="size-2 shrink-0 rounded-full bg-[var(--ok)] shadow-[0_0_6px_var(--ok)]" />
            <UIcon v-else name="i-lucide-server" class="size-3 shrink-0 text-[var(--accent-text)]" />
            <b class="truncate font-semibold">{{ tab }}</b>
            <span v-if="tab !== 'New Tab'" class="hidden truncate text-[var(--muted)] sm:inline">{{ host }}</span>
            <UIcon name="i-lucide-x" class="ml-0.5 size-3 shrink-0 text-[var(--muted)] opacity-70" />
            <span
              class="pointer-events-none absolute inset-x-2.5 bottom-0 h-0.5 rounded-full"
              :style="{
                background: tab === 'New Tab' ? 'var(--accent)' : env,
                boxShadow: `0 0 8px ${tab === 'New Tab' ? 'var(--accent)' : env}`
              }"
            />
          </span>
          <span class="inline-flex size-6 items-center justify-center rounded-md text-[var(--muted)] hover:bg-white/5">
            <UIcon name="i-lucide-plus" class="size-3.5" />
          </span>
        </div>
        <div class="flex shrink-0 items-center gap-1.5" :class="pausable ? 'pr-11' : 'pr-0.5'">
          <span class="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-[var(--well)] px-2 py-0.5 text-[11px] text-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:flex">
            <UIcon name="i-lucide-search" class="size-3" />
            <span>Search</span>
            <kbd class="mono rounded bg-white/8 px-1 text-[10px] text-[var(--muted)]">Ctrl+K</kbd>
          </span>
          <UIcon name="i-lucide-sun" class="hidden size-3.5 text-[var(--muted)] md:inline" />
          <UIcon name="i-lucide-history" class="hidden size-3.5 text-[var(--muted)] md:inline" />
          <UIcon name="i-lucide-settings" class="hidden size-3.5 text-[var(--muted)] sm:inline" />
          <UIcon name="i-lucide-panel-left-close" class="hidden size-3.5 text-[var(--muted)] sm:inline" />
        </div>
      </div>
      <slot />
      <button
        v-if="pausable" type="button" class="demo-glass-card absolute right-1 top-0.5 z-10 flex size-10 items-center justify-center !rounded-full text-[var(--fg)] hover:border-white/25"
        :aria-label="running ? 'Pause the demo' : 'Play the demo'" @click="$emit('toggle')"
      >
        <UIcon :name="running ? 'i-lucide-pause' : 'i-lucide-play'" class="size-4" aria-hidden="true" />
      </button>
    </div>
    <figcaption v-if="$slots.caption" class="mt-4 text-center text-small" :class="captionClass"><slot name="caption" /></figcaption>
  </figure>
</template>
