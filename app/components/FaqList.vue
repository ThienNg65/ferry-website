<script setup lang="ts">
const faq = [
  ['Which Windows versions does it run on?', 'Windows 10 and 11, 64-bit.'],
  ['Which protocols and connections does Ferry support?', 'Ferry connects to any server that speaks SSH, and transfers files over SFTP. It does not offer FTP, FTPS, SCP, S3, RDP, X11 or tunnels. The comparison above shows what other tools cover.'],
  ['Where are my passwords kept?', 'Saved passwords are encrypted with Windows secure storage and only decrypted in memory when you connect.'],
  ['Is Ferry free?', 'Yes. Ferry is released under the MIT licence, and you can read it in the LICENSE file of the release repository.'],
  ['Why does Windows SmartScreen warn me?', 'Ferry’s installer is not code-signed yet, so Windows does not recognise the publisher and may show a SmartScreen warning. Download Ferry only from this website or its official GitHub releases page.'],
  ['How do I update?', 'Ferry checks for new versions itself. You can also download the latest installer from this page.']
]
</script>

<template>
  <section id="faq" class="section-y mx-auto max-w-3xl px-6" aria-labelledby="faq-title">
    <h2 id="faq-title">Questions</h2>
    <div class="reveal mt-12 divide-y divide-default border-y border-default">
      <details v-for="[q, a] in faq" :key="q" class="group py-1">
        <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-highlighted">
          {{ q }}
          <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <p class="pb-6 text-muted">{{ a }}</p>
      </details>
    </div>
  </section>
</template>
