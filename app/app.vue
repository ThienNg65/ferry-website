<script setup lang="ts">
const { installer, href, label, releasesUrl, notesUrl } = useLatestRelease()
const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
useHead({ link: [{ rel: 'canonical', href: `${site}/` }] })
useSeoMeta({ ogUrl: `${site}/`, ogImage: `${site}/og.jpg`, twitterImage: `${site}/og.jpg` })
</script>

<template>
  <UApp>
    <a href="#main" class="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <HeroWaterline :installer="installer" :href="href" :label="label" />
      <FeatureExplorer />
      <RealWorldExample />
      <CompareTable />
      <DownloadPanel :installer="installer" :href="href" :label="label" :releases-url="releasesUrl" :notes-url="notesUrl" />
      <FaqList />
    </main>
    <SiteFooter :releases-url="releasesUrl" :notes-url="notesUrl" />
  </UApp>
</template>
