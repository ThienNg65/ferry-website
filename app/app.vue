<script setup lang="ts">
const { href, label, releasesUrl, notesUrl } = useLatestRelease()
</script>

<template>
  <UApp>
    <a href="#main" class="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <PromoVideoModal :href="href" :label="label" />
    <SiteFooter :releases-url="releasesUrl" :notes-url="notesUrl" />
  </UApp>
</template>
