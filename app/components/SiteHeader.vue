<script setup lang="ts">
const links = [
  { label: 'Features', to: '#features' },
  { label: 'Compare', to: '#compare' },
  { label: 'Download', to: '#download' },
  { label: 'FAQ', to: '#faq' },
  { label: 'GitHub', to: 'https://github.com/ThienNg65/ferry-release' }
]
</script>

<template>
  <header class="sticky top-4 z-50 px-3">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 rounded-full border border-default bg-elevated/75 pl-3 pr-1.5 backdrop-blur-md">
      <a href="#" class="flex min-h-11 items-center gap-2 rounded-full pr-2 text-lg font-bold tracking-tight text-highlighted">
        <img src="/icon.webp" alt="" width="28" height="28" class="size-7 rounded-lg">
        Ferry
      </a>
      <nav aria-label="Main" class="hidden items-center lg:flex">
        <a v-for="l in links" :key="l.to" :href="l.to" class="flex min-h-11 items-center rounded-full px-3 text-small font-medium text-muted hover:text-highlighted">{{ l.label }}</a>
      </nav>
      <div class="flex items-center gap-1">
        <ClientOnly>
          <UColorModeButton class="size-11 justify-center rounded-full" />
          <template #fallback><span class="block size-11" aria-hidden="true" /></template>
        </ClientOnly>
        <!-- Goes to the download section, where the unsigned-installer notice comes before the button. -->
        <UButton to="#download" label="Download" size="lg" class="min-h-11 rounded-full px-4" />
      </div>
    </div>
  </header>
</template>
