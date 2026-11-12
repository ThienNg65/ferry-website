<script setup lang="ts">
const faq = [
  ['Why does Windows SmartScreen warn me?', 'The installer is not code-signed yet, so Windows does not recognise the publisher. Choose More info, then Run anyway. You can compare the file’s SHA-256 with the one on this page before you run it.'],
  ['Which Windows versions does it run on?', 'Windows 10 and 11, 64-bit.'],
  ['Which servers can I connect to?', 'Any server that speaks SSH. Ferry uses SSH and SFTP only, so there is no FTP, FTPS or SCP.'],
  ['Where are my passwords kept?', 'Saved passwords are encrypted with Windows secure storage and only decrypted in memory when you connect.'],
  ['Is Ferry free?', 'Yes. Ferry is released under the MIT licence, and you can read it in the LICENSE file of the release repository.'],
  ['What if development stops?', 'The installed app keeps working. It has no account and no licence server, so nothing has to be reachable for it to run.'],
  ['What isn’t Ferry for?', 'FTP, S3, RDP, X11 and tunnels. Ferry focuses on SSH and SFTP. The comparison above shows what other tools cover.'],
  ['How do I update?', 'Ferry checks for new versions itself. You can also download the latest installer from this page.']
]
</script>

<template>
  <section id="faq" class="mx-auto max-w-3xl px-4 py-24 sm:px-6" aria-labelledby="faq-title">
    <h2 id="faq-title" class="text-step-4 font-bold">Questions</h2>
    <div class="mt-8 divide-y divide-ink/15 border-y border-ink/15">
      <details v-for="[q, a] in faq" :key="q" class="group py-1">
        <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium">
          {{ q }}
          <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <p class="pb-4 text-slate-ink">{{ a }}</p>
      </details>
    </div>
  </section>
</template>
