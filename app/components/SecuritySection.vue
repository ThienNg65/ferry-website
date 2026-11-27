<script setup lang="ts">
const pillars = [
  {
    icon: 'i-lucide-lock',
    title: 'Encrypted with Windows DPAPI',
    body: 'Saved passwords and key passphrases are decrypted only on your PC, at the moment you connect.'
  },
  {
    icon: 'i-lucide-hard-drive',
    title: 'No account or cloud lock-in',
    body: 'Open Ferry and connect right away. Your server list and credentials are never uploaded to a vendor cloud.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'No telemetry, ~23 MB install',
    body: 'The app sends no usage data or crash reports. It runs on Windows WebView2, which keeps the install small.'
  }
] as const

const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { batch: true })
</script>

<template>
  <section id="security" ref="rootRef" class="section-y border-t border-default" aria-labelledby="security-title">
    <div class="page-x">
      <div class="stack-head reveal-pre mx-auto max-w-[44rem] text-center">
        <UIcon name="i-lucide-shield" class="mx-auto size-10 text-primary" aria-hidden="true" />
        <h2 id="security-title" class="mt-4">
          <span class="heading-muted">Built to stay</span> on your machine
        </h2>
        <p class="text-lead text-muted">
          Your SSH keys, host list and passwords stay on your PC. No subscription, no vendor cloud.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="p in pillars"
          :key="p.title"
          class="reveal-pre card-lift rounded-[14px] border border-default bg-elevated p-6"
        >
          <UIcon :name="p.icon" class="size-6 text-primary" aria-hidden="true" />
          <h3 class="mt-4 text-lg text-highlighted">{{ p.title }}</h3>
          <p class="mt-2 text-small text-muted">{{ p.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
