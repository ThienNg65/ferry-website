<script setup lang="ts">
// Mirrors sessions/SessionManagerView.vue: saved sites in environment groups with a search box, and Quick Connect beside it.
// Quick Connect is display only. Nothing here takes a host or a password.
const q = ref('')
const id = useId()
const groups = computed(() => {
  const term = q.value.trim().toLowerCase()
  const hit = sites.filter(s => !term || `${s.name} ${s.addr}`.toLowerCase().includes(term))
  return ['Development', 'Production', 'Staging'].map(g => ({ g, items: hit.filter(s => s.group === g) })).filter(x => x.items.length)
})
const empty = computed(() => !groups.value.length)
const fields = [['Host', 'example.com'], ['Port', '22'], ['Username', 'e.g. root'], ['Authentication', 'Password'], ['Password', '']]
</script>

<template>
  <DemoWindow label="Ferry saved sites, working illustration" tab="New Tab">
    <div class="@container p-3">
      <div class="grid gap-3 @xl:grid-cols-[1.2fr_1fr] @xl:items-start">
        <section class="rounded-lg border border-[var(--line)] p-3" :aria-labelledby="`${id}-s`">
          <div class="flex items-center justify-between">
            <h4 :id="`${id}-s`" class="text-[15px] font-medium">Sites</h4>
            <span class="rounded-full bg-[var(--sel)] px-2.5 py-0.5 text-[var(--accent-text)]" aria-hidden="true">+ Add site</span>
          </div>
          <label :for="`${id}-q`" class="sr-only">Search sites by name, host, or user</label>
          <input :id="`${id}-q`" v-model="q" type="search" placeholder="Search sites by name, host, or user…" autocomplete="off" class="mt-3 h-11 w-full rounded-full border border-[var(--line)] bg-transparent px-3 text-[var(--fg)] placeholder:text-[var(--muted)]">
          <p v-if="empty" class="py-4 text-center text-[var(--muted)]" role="status">No sites match "{{ q }}".</p>
          <div v-for="x in groups" :key="x.g" class="mt-2" role="group" :aria-label="x.g">
            <p class="px-2 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]" aria-hidden="true">{{ x.g }}</p>
            <ul>
              <li v-for="s in x.items" :key="s.name" class="flex items-center gap-2 rounded-md px-2 py-1.5">
                <UIcon name="i-lucide-server" class="size-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                <span class="size-2 shrink-0 rounded-full" :style="{ background: s.env }" aria-hidden="true" />
                <span class="min-w-0"><b class="block truncate font-medium">{{ s.name }}</b><span class="block truncate text-[11px] text-[var(--muted)]">{{ s.addr }}</span></span>
              </li>
            </ul>
          </div>
        </section>
        <section class="rounded-lg border border-[var(--line)] p-3" :aria-labelledby="`${id}-c`">
          <h4 :id="`${id}-c`" class="text-[15px] font-medium">Quick Connect</h4>
          <div class="mt-3 grid gap-2.5">
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
