<script setup lang="ts">
import type { Installer } from '~/utils/release'
const props = defineProps<{ installer: Installer | null, href: string, label: string, releasesUrl: string, notesUrl: string }>()
const date = computed(() => props.installer?.date
  ? new Date(props.installer.date).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
  : '')
const size = computed(() => (props.installer?.size ? `${(props.installer.size / 1024 / 1024).toFixed(0)} MB` : ''))
const meta = computed(() => [size.value, date.value && `released ${date.value}`].filter(Boolean).join(', '))
</script>

<template>
  <section id="download" class="bg-haze/50 py-24" aria-labelledby="download-title">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="download-title" class="text-step-4 font-bold">Download Ferry</h2>
      <p class="mt-3 text-slate-ink md:hidden">Ferry runs on Windows. Open this page on your PC to install.</p>
      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <UButton :to="href" size="xl" icon="i-lucide-download" class="min-h-11" :label="installer ? `${label}: Ferry-Setup-${installer.version}.exe` : label" />
        <span v-if="meta" class="text-slate-ink">{{ meta }}</span>
      </div>
      <p class="mt-4 text-sm text-slate-ink">Requires Windows 10 or 11, 64-bit. Ferry updates itself.</p>
      <div v-if="installer?.notes.length" class="mt-6 max-w-[68ch]">
        <h3 class="text-step-1 font-semibold">What’s new in v{{ installer.version }}</h3>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-slate-ink">
          <li v-for="n in installer.notes" :key="n">{{ n }}</li>
        </ul>
      </div>
      <p v-if="installer?.sha256" class="mt-4 max-w-full break-all text-sm text-slate-ink">
        SHA-256 <code class="font-mono text-xs text-ink">{{ installer.sha256 }}</code>
      </p>
      <p class="mt-4 flex flex-wrap gap-x-6 text-sm">
        <a :href="notesUrl" class="flex min-h-11 items-center font-medium text-ferry-text underline underline-offset-4">Release notes</a>
        <a :href="releasesUrl" class="flex min-h-11 items-center font-medium text-ferry-text underline underline-offset-4">All releases</a>
      </p>
      <div class="mt-6 max-w-[68ch] rounded-lg border border-ink/15 bg-white/70 p-5">
        <h3 class="text-step-1 font-semibold">The installer is not code-signed yet</h3>
        <p class="mt-2 text-slate-ink">
          Windows SmartScreen may ask you to confirm before it runs. Choose <strong class="text-ink">More info</strong>, then <strong class="text-ink">Run anyway</strong>.
        </p>
        <p v-if="installer?.sha256" class="mt-2 text-slate-ink">
          To check the file first, run <code class="font-mono text-xs text-ink">Get-FileHash .\Ferry-Setup-{{ installer.version }}.exe</code> in PowerShell and compare it with the SHA-256 above. A match means the download is intact and is the file GitHub lists. It does not show who built it.
        </p>
        <p class="mt-2 text-slate-ink">
          The “Verified” badge GitHub puts on commits and tags is not a code-signing certificate, so it does not remove this warning.
        </p>
      </div>
    </div>
  </section>
</template>
