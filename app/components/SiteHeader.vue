<script setup lang="ts">
const { href, label } = useLatestRelease()
const links = [
  { label: 'Features', to: '#features' },
  { label: 'Download', to: '#download' },
  { label: 'FAQ', to: '#faq' }
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-transparent bg-sky/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <a href="#" class="flex min-h-11 items-center gap-2.5 font-display text-xl font-bold tracking-tight text-ink">
        <img src="/icon.png" alt="" width="32" height="32" class="size-8 rounded-lg">
        Ferry
      </a>
      <nav aria-label="Main" class="hidden items-center gap-1 md:flex">
        <a v-for="l in links" :key="l.to" :href="l.to" class="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-slate-ink hover:text-ink">{{ l.label }}</a>
        <a href="https://github.com/ThienNg65/ferry-release" class="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-slate-ink hover:text-ink">GitHub</a>
      </nav>
      <UButton :to="href" :label="label" size="lg" class="min-h-11" />
    </div>
  </header>
</template>
