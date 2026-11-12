<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import type { Installer } from '~/utils/release'
const props = defineProps<{ installer: Installer | null, href: string, label: string, releasesUrl: string, notesUrl: string }>()
const date = computed(() => props.installer?.date
  ? new Date(props.installer.date).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
  : '')
const size = computed(() => (props.installer?.size ? `${(props.installer.size / 1024 / 1024).toFixed(0)} MB` : ''))
const { copy, copied } = useClipboard({ copiedDuring: 2000 })
const meta = computed(() => [size.value, date.value && `released ${date.value}`].filter(Boolean).join(', '))
const details = computed(() => Boolean(props.installer?.sha256 || props.installer?.notes.length))
</script>

<template>
  <section id="download" class="band section-y overflow-x-clip" aria-labelledby="download-title">
    <div class="page-x">
      <!-- The call to action stands alone; the release details and the installer notice sit quietly beneath it. -->
      <div class="reveal relative mx-auto max-w-[44rem] text-center">
        <div class="aura" aria-hidden="true"></div>
        <img src="/icon.webp" alt="" width="88" height="88" class="relative mx-auto size-22 rounded-[22px]">
        <h2 id="download-title" class="relative mt-8">Get Ferry for Windows</h2>
        <p class="relative mt-5 text-muted md:hidden">Ferry runs on Windows. Open this page on your PC to install.</p>
        <div class="relative mt-10 flex flex-col items-center gap-4">
          <UButton :to="href" size="xl" icon="i-lucide-download" class="min-h-12 max-w-full rounded-[10px] px-6" :ui="{ label: 'whitespace-normal break-words text-left' }" :label="installer ? `${label}: Ferry-Setup-${installer.version}.exe` : label" />
          <span v-if="meta" class="text-muted">{{ meta }}</span>
        </div>
        <p class="relative mt-4 text-small text-muted">Requires Windows 10 or 11, 64-bit. Ferry updates itself.</p>
        <p class="relative mt-1 flex flex-wrap justify-center gap-x-6 text-small">
          <a :href="notesUrl" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Release notes</a>
          <a :href="releasesUrl" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">All releases</a>
        </p>
      </div>

      <div class="reveal mx-auto mt-14 grid gap-6" :class="details ? 'max-w-[68rem] lg:grid-cols-2' : 'max-w-[44rem]'">
        <div v-if="details && installer" class="min-w-0 rounded-[20px] border border-default bg-elevated p-8">
          <template v-if="installer.notes.length">
            <h3 class="text-lead font-semibold">What’s new in v{{ installer.version }}</h3>
            <ul class="mt-3 list-disc space-y-1 pl-5 text-muted">
              <li v-for="n in installer.notes" :key="n">{{ n }}</li>
            </ul>
          </template>
          <div v-if="installer.sha256" :class="{ 'mt-8 border-t border-default pt-6': installer.notes.length }">
            <div class="flex items-center justify-between gap-4">
              <span class="text-small font-semibold text-highlighted">SHA-256</span>
              <UButton
                :label="copied ? 'Copied' : 'Copy'" :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'" color="neutral" variant="outline"
                class="min-h-11 rounded-[10px]" aria-live="polite" @click="copy(installer.sha256)"
              />
            </div>
            <code class="mt-2 block break-all font-mono text-[0.8125rem] text-highlighted">{{ installer.sha256 }}</code>
          </div>
        </div>
        <div class="min-w-0 rounded-[20px] border border-default bg-elevated p-8">
          <h3 class="text-lead font-semibold">The installer is not code-signed yet</h3>
          <p class="mt-3 text-muted">
            Windows SmartScreen may ask you to confirm before it runs. Choose <strong class="text-highlighted">More info</strong>, then <strong class="text-highlighted">Run anyway</strong>.
          </p>
          <p v-if="installer?.sha256" class="mt-2 text-muted">
            To check the file first, run <code class="font-mono text-[0.9em] text-highlighted">Get-FileHash .\Ferry-Setup-{{ installer.version }}.exe</code> in PowerShell and compare it with the SHA-256 above (letter case does not matter). A match means the download is intact and is the file GitHub lists. It does not show who built it.
          </p>
          <p class="mt-2 text-muted">
            The “Verified” badge GitHub puts on commits and tags is not a code-signing certificate, so it does not remove this warning.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
