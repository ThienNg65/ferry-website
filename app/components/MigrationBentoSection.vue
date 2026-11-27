<script setup lang="ts">
const cards = [
  {
    title: 'Import from WinSCP, PuTTY, and ~/.ssh/config',
    body: 'Import saved hosts, ports and usernames in one step instead of retyping dozens of servers.',
    src: '/media/import-sessions.webp',
    width: 1600,
    height: 1000,
    alt: 'Ferry Import sites dialog scanning saved WinSCP, PuTTY, and ~/.ssh/config sessions'
  },
  {
    title: 'Jump hosts, proxies, and 2FA',
    body: 'Reach private servers through bastions and SOCKS or HTTP proxies, with SSH agent and interactive 2FA prompt support.',
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
    body: 'Group Production, Staging and Development servers by colour so you can tell at a glance which box a command will hit.',
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
          <span class="heading-muted">Bring your</span> WinSCP and PuTTY sites
        </h2>
        <p class="text-lead text-muted">
          Import your saved hosts and jump boxes and keep the dual-pane layout you already use.
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
          <figure class="border-t border-default bg-elevated">
            <AppShot
              :src="card.src"
              :alt="card.alt"
              :width="card.width"
              :height="card.height"
            />
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>
