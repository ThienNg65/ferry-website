<script setup lang="ts">
const { installer, href, portableHref, label, releasesUrl, notesUrl } = useLatestRelease()
const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

const title = 'Ferry - Modern Windows SFTP & SSH Client'
const description = 'Move files, run SSH commands, follow live tail -F logs, and check server health in one ~23 MB Windows app. Import WinSCP and PuTTY sites in seconds.'

useHead({
  link: [
    { rel: 'canonical', href: `${site}/` },
    { rel: 'preload', as: 'image', href: '/media/files-terminal.webp', type: 'image/webp' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(buildHomeJsonLd(site, installer.value?.version)))
    }
  ]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: 'Stop switching between WinSCP, PuTTY, and tail windows. Dual-pane SFTP, SSH terminal, live logs, and server health in one Windows app.',
  ogUrl: `${site}/`,
  ogImage: `${site}/og.jpg`,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${site}/og.jpg`
})
</script>

<template>
  <div>
    <HeroSection :installer="installer" :href="href" :label="label" />
    <WorkspaceSection />
    <ProblemSplitsSection />
    <MigrationBentoSection />
    <SecuritySection />
    <CompareTable />
    <DownloadPanel :installer="installer" :href="href" :portable-href="portableHref" :label="label" :releases-url="releasesUrl" :notes-url="notesUrl" />
    <FaqList />
  </div>
</template>
