<script setup lang="ts">
const cards = [
  {
    title: 'Import from WinSCP, PuTTY, and ~/.ssh/config',
    body: 'Bring your saved hosts, ports, and usernames over in one step instead of retyping dozens of servers.',
    src: '/media/import-sessions.webp',
    width: 1600,
    height: 1000,
    alt: 'Ferry Import sites dialog scanning saved WinSCP, PuTTY, and ~/.ssh/config sessions'
  },
  {
    title: 'Jump hosts, proxies, and 2FA',
    body: 'Reach private servers through bastions, SOCKS or HTTP proxies, SSH agents, and interactive 2FA prompts.',
    src: '/media/site-options.webp',
    width: 1600,
    height: 1169,
    alt: 'Ferry Add site dialog with authentication methods, jump host toggle, and proxy options'
  },
  {
    title: 'Compare folders and hide clutter',
    body: 'Diff local and remote directories side by side and filter out build or cache folders per site.',
    src: '/media/folder-compare.webp',
    width: 1600,
    height: 1000,
    alt: 'Ferry Compare folders dialog highlighting local-only and remote-only files'
  },
  {
    title: 'Tabs coloured by environment',
    body: 'Keep Production, Staging, and Development servers visually separate so you never run a command on the wrong box.',
    src: '/media/connections-import.webp',
    width: 1600,
    height: 1000,
    alt: 'Ferry Connections screen grouping Development, Production, and Staging hosts beside Quick Connect'
  }
] as const

const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { batch: true })
</script>

<template>
  <section ref="rootRef" class="section-y border-t border-default bg-muted/40" aria-labelledby="bento-title">
    <div class="page-x">
      <div class="stack-head reveal-pre mx-auto max-w-[44rem] text-center">
        <h2 id="bento-title">
          <span class="heading-muted">Switch in seconds,</span> stay connected
        </h2>
        <p class="text-lead text-muted">
          Keep your saved hosts, jump boxes, and dual-pane habits without starting from scratch.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <article
          v-for="card in cards"
          :key="card.title"
          class="reveal-pre card-lift flex flex-col justify-between overflow-hidden rounded-[14px] border border-default bg-elevated"
        >
          <div class="p-6 pb-4">
            <h3 class="text-xl text-highlighted">{{ card.title }}</h3>
            <p class="mt-2 text-small text-muted">{{ card.body }}</p>
          </div>
          <figure class="border-t border-default bg-[#070b14]">
            <img
              :src="card.src"
              :alt="card.alt"
              :width="card.width"
              :height="card.height"
              loading="lazy"
              class="block h-auto w-full"
            >
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>
