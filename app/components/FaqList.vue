<script setup lang="ts">
const faq = [
  ['Which Windows versions does it run on?', 'Windows 10 and 11, 64-bit.'],
  ['Which protocols and connections does Ferry support?', 'Ferry connects to any server that speaks SSH, and transfers files over SFTP. It does not offer FTP, FTPS, SCP, S3, RDP, X11 or tunnels. The comparison above shows what other tools cover.'],
  ['Where are my passwords kept?', 'Saved passwords are encrypted with Windows secure storage and only decrypted in memory when you connect.'],
  ['Is Ferry free?', 'Yes. Ferry is free to download and use on Windows via the Microsoft Store or GitHub Releases, with no mandatory account or telemetry. See LICENSE in the release repository for historical source terms.'],
  ['Why does Windows SmartScreen warn me?', 'Only the direct GitHub .exe installer is not code-signed yet and may show a SmartScreen warning. Install from the Microsoft Store for a signed 1-click install with no SmartScreen prompt.'],
  ['How do I update?', 'Ferry checks for new versions itself. You can also download the latest installer from this page.']
]

const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { stagger: 0.05, batch: true })
</script>

<template>
  <section id="faq" ref="rootRef" class="section-y mx-auto max-w-3xl px-6" aria-labelledby="faq-title">
    <h2 id="faq-title" class="reveal-pre">Questions</h2>
    <div class="mt-12 divide-y divide-default border-y border-default">
      <details v-for="[q, a] in faq" :key="q" class="reveal-pre group py-1" @toggle="scheduleScrollTriggerRefresh(320)">
        <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-highlighted hover:text-primary">
          {{ q }}
          <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p class="pb-6 text-muted">{{ a }}</p>
      </details>
    </div>
  </section>
</template>
