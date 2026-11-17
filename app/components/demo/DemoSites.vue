<script setup lang="ts">
// Mirrors sessions/SessionManagerView.vue: saved sites in environment groups with Select/Import/Export actions, and Quick Connect with Recent dropdown & side-by-side Host+Port.
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
const fields = [['Username', 'e.g. root'], ['Authentication', 'Password'], ['Password', '']] as const
</script>

<template>
  <DemoWindow label="Ferry saved sites, working illustration" tab="New Tab" :bare>
    <div class="@container p-3">
      <div class="grid gap-3 @xl:grid-cols-[1.2fr_1fr] @xl:items-start">
        <section class="rounded-lg border border-[var(--line)] p-3" :aria-labelledby="`${id}-s`">
          <div class="flex items-center justify-between gap-2">
            <h4 :id="`${id}-s`" class="text-[15px] font-medium">Sites</h4>
            <div class="flex items-center gap-1.5 text-[11px] text-[var(--muted)]" aria-hidden="true">
              <span class="hidden items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5 text-[var(--fg)] sm:inline-flex">
                <UIcon name="i-lucide-import" class="size-3 text-[var(--accent-text)]" />Import WinSCP / PuTTY
              </span>
              <UIcon name="i-lucide-download" class="hidden size-3.5 md:inline" />
              <span class="rounded-full bg-[var(--sel)] px-2.5 py-0.5 font-medium text-[var(--accent-text)]">+ Add site</span>
            </div>
          </div>
          <label :for="`${id}-q`" class="sr-only">Search sites by name, host, or user</label>
          <input :id="`${id}-q`" v-model="q" type="search" placeholder="Search sites by name, host, or user…" autocomplete="off" class="mt-3 h-11 w-full rounded-full border border-[var(--line)] bg-transparent px-3 text-[var(--fg)] placeholder:text-[var(--muted)]">
          <p v-if="empty" class="py-4 text-center text-[var(--muted)]" role="status">No sites match "{{ q }}".</p>
          <div v-for="x in groups" :key="x.g" class="mt-2" role="group" :aria-label="x.g">
            <p class="px-2 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]" aria-hidden="true">{{ x.g }}</p>
            <ul>
              <li
                v-for="s in x.items" :key="s.name"
                class="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors"
                :class="activeSite === s.name ? 'bg-[var(--sel)] ring-1 ring-[var(--accent)]/50' : ''"
              >
                <UIcon name="i-lucide-server" class="size-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                <span class="size-2 shrink-0 rounded-full" :style="{ background: s.env }" aria-hidden="true" />
                <span class="min-w-0 flex-1"><b class="block truncate font-medium">{{ s.name }}</b><span class="block truncate text-[11px] text-[var(--muted)]">{{ s.addr }}</span></span>
                <UIcon name="i-lucide-ellipsis" class="size-3.5 shrink-0 text-[var(--muted)] opacity-60" aria-hidden="true" />
              </li>
            </ul>
          </div>
        </section>
        <section class="rounded-lg border border-[var(--line)] p-3" :aria-labelledby="`${id}-c`">
          <div class="flex items-center justify-between gap-2">
            <h4 :id="`${id}-c`" class="text-[15px] font-medium">Quick Connect</h4>
            <span class="inline-flex items-center gap-1 rounded-md border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--muted)]" aria-hidden="true">
              <UIcon name="i-lucide-clock" class="size-3" />Recent<UIcon name="i-lucide-chevron-down" class="size-3" />
            </span>
          </div>
          <div class="mt-3 grid gap-2.5">
            <div class="grid grid-cols-[1fr_5rem] gap-2">
              <div>
                <label :for="`${id}-Host`" class="mb-1 block text-[11px] text-[var(--muted)]">Host</label>
                <input :id="`${id}-Host`" disabled placeholder="example.com" class="h-8 w-full rounded-md border border-[var(--line)] bg-transparent px-2 placeholder:text-[var(--muted)]" type="text">
              </div>
              <div>
                <label :for="`${id}-Port`" class="mb-1 block text-[11px] text-[var(--muted)]">Port</label>
                <input :id="`${id}-Port`" disabled placeholder="22" class="h-8 w-full rounded-md border border-[var(--line)] bg-transparent px-2 placeholder:text-[var(--muted)]" type="text">
              </div>
            </div>
            <div v-for="[label, ph] in fields" :key="label">
              <label :for="`${id}-${label}`" class="mb-1 block text-[11px] text-[var(--muted)]">{{ label }}</label>
              <input :id="`${id}-${label}`" disabled :placeholder="ph" class="h-8 w-full rounded-md border border-[var(--line)] bg-transparent px-2 placeholder:text-[var(--muted)]" :type="label === 'Password' ? 'password' : 'text'">
            </div>
            <div class="mt-1 flex gap-2">
              <button type="button" disabled class="h-8 flex-1 rounded-md bg-[var(--accent)] text-white opacity-50">Connect</button>
              <button type="button" disabled class="h-8 rounded-md border border-[var(--line)] px-3 opacity-50">Save as site</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </DemoWindow>
</template>
