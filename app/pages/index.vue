<script setup lang="ts">
const { installer, href, portableHref, label, releasesUrl, notesUrl } = useLatestRelease()
const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

const title = 'Ferry - Free Windows SFTP & SSH Client with Live Log Tail'
const description = 'Free Windows SFTP and SSH client: dual-pane transfer, terminal, live tail -F logs and server monitor in one ~23 MB app. Imports WinSCP and PuTTY sites.'

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
  ogDescription: 'Stop alt-tabbing between WinSCP, PuTTY and tail windows. Dual-pane SFTP, SSH terminal, live logs and server health in one free Windows app.',
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
