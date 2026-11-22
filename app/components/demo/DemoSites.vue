<script setup lang="ts">
// Mirrors sessions/SessionManagerView.vue (Modern Glass UI): floating frosted-glass cards for Saved Sites and Quick Connect over ambient mesh backdrop.
// Quick Connect is display only. Nothing here takes a host or a password.
defineProps<{ bare?: boolean, activeSite?: string }>()
const q = ref('')
const id = useId()
const groups = computed(() => {
  const term = q.value.trim().toLowerCase()
  const hit = sites.filter(s => !term || `${s.name} ${s.addr}`.toLowerCase().includes(term))
  return ['Development', 'Production', 'Staging'].map(g => ({ g, items: hit.filter(s => s.group === g) })).filter(x => x.items.length)
})
const empty = computed(() => !groups.value.length)
const authOptions = ['Password', 'Private key', 'SSH agent'] as const
</script>

<template>
  <DemoWindow label="Ferry saved sites, working illustration" tab="New Tab" :bare>
    <div class="@container p-3 sm:p-4">
      <div class="grid gap-3 sm:gap-4 @xl:grid-cols-[1.2fr_1fr] @xl:items-start">
        <section class="demo-glass-card p-3 sm:p-3.5" :aria-labelledby="`${id}-s`">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5">
            <h4 :id="`${id}-s`" class="text-[15px] font-semibold tracking-tight">Sites</h4>
            <div class="flex items-center gap-1.5 text-[11px]" aria-hidden="true">
              <span class="hidden rounded-md px-2 py-1 text-[var(--muted)] sm:inline">Select</span>
              <span class="hidden items-center gap-1 rounded-md px-2 py-1 text-[var(--muted)] sm:inline-flex">
                <UIcon name="i-lucide-folder-down" class="size-3 text-[var(--accent-text)]" />
                Import / Export
                <UIcon name="i-lucide-chevron-down" class="size-3" />
              </span>
              <span class="inline-flex items-center gap-1 rounded-lg bg-[var(--sel)] px-2.5 py-1 font-medium text-[var(--accent-text)] ring-1 ring-inset ring-[var(--accent)]/35">+ Add site</span>
            </div>
          </div>
          <label :for="`${id}-q`" class="sr-only">Search sites by name, host, or user</label>
          <input :id="`${id}-q`" v-model="q" type="search" placeholder="Search sites by name, host, or user…" autocomplete="off" class="demo-glass-well mt-3 h-11 w-full rounded-lg px-3 text-[var(--fg)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none">
          <p v-if="empty" class="py-4 text-center text-[var(--muted)]" role="status">No sites match "{{ q }}".</p>
          <div v-for="x in groups" :key="x.g" class="mt-2.5" role="group" :aria-label="x.g">
            <p class="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]" aria-hidden="true">{{ x.g }}</p>
            <ul class="space-y-0.5">
              <li
                v-for="s in x.items" :key="s.name"
                class="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
                :class="activeSite === s.name ? 'bg-[var(--sel)] ring-1 ring-[var(--accent)]/50' : 'hover:bg-white/5'"
              >
                <UIcon name="i-lucide-server" class="size-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                <span class="size-2 shrink-0 rounded-full" :style="{ background: s.env, boxShadow: `0 0 6px ${s.env}` }" aria-hidden="true" />
                <span class="min-w-0 flex-1"><b class="block truncate font-medium">{{ s.name }}</b><span class="block truncate text-[11px] text-[var(--muted)]">{{ s.addr }}</span></span>
                <UIcon name="i-lucide-ellipsis" class="size-3.5 shrink-0 text-[var(--muted)] opacity-65" aria-hidden="true" />
              </li>
            </ul>
          </div>
        </section>
        <section class="demo-glass-card p-3 sm:p-3.5" :aria-labelledby="`${id}-c`">
          <div class="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5">
            <h4 :id="`${id}-c`" class="text-[15px] font-semibold tracking-tight">Quick Connect</h4>
            <span class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-[var(--muted)]" aria-hidden="true">
              <UIcon name="i-lucide-clock" class="size-3" />Recent<UIcon name="i-lucide-chevron-down" class="size-3" />
            </span>
          </div>
          <div class="mt-3 grid gap-2.5">
            <div class="grid grid-cols-[1fr_4.5rem] gap-2">
              <div>
                <label :for="`${id}-Host`" class="mb-1 block text-[11px] font-medium text-[var(--muted)]">Host</label>
                <input :id="`${id}-Host`" disabled placeholder="example.com" class="demo-glass-well h-8 w-full rounded-lg px-2.5 placeholder:text-[var(--muted)]" type="text">
              </div>
              <div>
                <label :for="`${id}-Port`" class="mb-1 block text-[11px] font-medium text-[var(--muted)]">Port</label>
                <input :id="`${id}-Port`" disabled placeholder="22" class="demo-glass-well h-8 w-full rounded-lg px-2.5 placeholder:text-[var(--muted)]" type="text">
              </div>
            </div>
            <div>
              <label :for="`${id}-Username`" class="mb-1 block text-[11px] font-medium text-[var(--muted)]">Username</label>
              <input :id="`${id}-Username`" disabled placeholder="e.g. root" class="demo-glass-well h-8 w-full rounded-lg px-2.5 placeholder:text-[var(--muted)]" type="text">
            </div>
            <div>
              <span class="mb-1 block text-[11px] font-medium text-[var(--muted)]">Authentication</span>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--fg)]" aria-hidden="true">
                <span v-for="(opt, idx) in authOptions" :key="opt" class="inline-flex items-center gap-1.5">
                  <span
                    class="flex size-3.5 items-center justify-center rounded-full border"
                    :class="idx === 0 ? 'border-[var(--accent)] bg-[var(--accent)]/25' : 'border-white/25'"
                  >
                    <span v-if="idx === 0" class="size-1.5 rounded-full bg-[var(--accent-text)]" />
                  </span>
                  <span :class="idx === 0 ? 'font-medium text-[var(--fg)]' : 'text-[var(--muted)]'">{{ opt }}</span>
                </span>
              </div>
            </div>
            <div>
              <label :for="`${id}-Password`" class="mb-1 block text-[11px] font-medium text-[var(--muted)]">Password</label>
              <input :id="`${id}-Password`" disabled placeholder="••••••••" class="demo-glass-well h-8 w-full rounded-lg px-2.5 placeholder:text-[var(--muted)]" type="password">
            </div>
            <div class="flex items-center gap-1.5 text-[11px] text-[var(--muted)]" aria-hidden="true">
              <span class="size-3.5 rounded border border-white/20 bg-[var(--well)]" />
              <span>Also save the password when saving as a site</span>
            </div>
            <div class="mt-1 flex gap-2 border-t border-[var(--line)] pt-2.5">
              <button type="button" disabled class="h-8 flex-1 rounded-lg bg-[var(--accent)] font-medium text-white opacity-75 shadow-sm">Connect</button>
              <button type="button" disabled class="demo-glass-well h-8 rounded-lg px-3 text-[var(--muted)] opacity-75">Save as site</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </DemoWindow>
</template>
