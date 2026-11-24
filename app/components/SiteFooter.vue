<script setup lang="ts">
import { RELEASES_URL } from '~/utils/release'

const props = defineProps<{ releasesUrl: string, notesUrl: string }>()

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features', external: false },
      { label: '35s Product Tour', to: '/tour', external: false },
      { label: 'Security', to: '/#security', external: false },
      { label: 'Compare', to: '/#compare', external: false },
      { label: 'Download', to: '/#download', external: false },
      { label: 'FAQ', to: '/#faq', external: false }
    ]
  },
  {
    title: 'Compare',
    links: [
      { label: 'Ferry vs. WinSCP', to: '/vs/winscp', external: false },
      { label: 'Ferry vs. Termius', to: '/vs/termius', external: false },
      { label: 'Ferry vs. MobaXterm', to: '/vs/mobaxterm', external: false },
      { label: 'Ferry vs. FileZilla', to: '/vs/filezilla', external: false }
    ]
  },
  {
    title: 'Resources & Legal',
    links: [
      { label: 'Latest release', to: props.releasesUrl, external: true },
      { label: 'Release notes', to: props.notesUrl, external: true },
      { label: 'Report an issue', to: `${RELEASES_URL}/issues`, external: true },
      { label: 'Privacy Policy', to: '/privacy', external: false },
      { label: 'Terms of Service', to: '/terms', external: false }
    ]
  }
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default bg-default">
    <div class="page-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
      <div>
        <NuxtLink to="/" class="inline-flex items-center gap-2.5 text-xl font-bold text-highlighted">
          <img src="/ferry-glass.svg" alt="" width="32" height="32" class="size-8 rounded-[8px]">
          <span>Ferry</span>
        </NuxtLink>
        <p class="mt-4 max-w-[30ch] text-small text-muted">
          Windows SFTP and SSH client with built-in terminal, live log tail, and server monitor.
        </p>
        <a
          :href="RELEASES_URL"
          target="_blank"
          rel="noopener"
          class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[5px] border border-default bg-elevated px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary"
        >
          <UIcon name="i-lucide-github" class="size-4 shrink-0" aria-hidden="true" />
          <span>Releases &amp; issue tracker</span>
        </a>
      </div>

      <nav v-for="c in cols" :key="c.title" :aria-label="c.title">
        <h2 class="text-small font-semibold tracking-normal text-highlighted">{{ c.title }}</h2>
        <ul class="mt-3 space-y-0.5">
          <li v-for="l in c.links" :key="l.label">
            <a
              v-if="l.external"
              :href="l.to"
              target="_blank"
              rel="noopener"
              class="flex min-h-11 items-center text-small text-muted hover:text-highlighted"
            >
              {{ l.label }}
            </a>
            <NuxtLink
              v-else
              :to="l.to"
              class="flex min-h-11 items-center text-small text-muted hover:text-highlighted"
            >
              {{ l.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="border-t border-default">
      <div class="page-x flex flex-col items-start justify-between gap-2 py-6 text-small text-muted sm:flex-row sm:items-center">
        <p>
          © {{ year }} Ferry · Windows SSH &amp; SFTP Client ·
          <a :href="`${RELEASES_URL}/blob/main/LICENSE`" target="_blank" rel="noopener" class="-my-3 inline-block py-3 underline hover:text-highlighted">Licence</a>
        </p>
        <a href="#main" class="flex min-h-11 items-center gap-1.5 hover:text-highlighted">
          <UIcon name="i-lucide-arrow-up" class="size-4" aria-hidden="true" />
          <span>Back to top</span>
        </a>
      </div>
    </div>
  </footer>
</template>
