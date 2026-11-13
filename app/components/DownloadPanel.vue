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
const installOpen = ref(false)
const installSummary = ref<HTMLElement | null>(null)
// Open (never toggle) the installation details, then move focus to their summary. Without JS the link still jumps to the section.
function showInstallDetails(e: Event) {
  e.preventDefault()
  installOpen.value = true
  nextTick(() => {
    installSummary.value?.scrollIntoView({ block: 'center' })
    installSummary.value?.focus()
  })
}
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
        <p class="relative mt-2 text-small text-muted">
          Ferry’s installer is currently unsigned. Windows may display a SmartScreen warning.
          <a href="#install-details" class="font-medium text-primary underline underline-offset-4" @click="showInstallDetails">Installation details</a>
        </p>
        <p class="relative mt-1 flex flex-wrap justify-center gap-x-6 text-small">
          <a :href="notesUrl" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Release notes</a>
          <a :href="releasesUrl" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">All releases</a>
        </p>
      </div>

      <div class="reveal mx-auto mt-14 max-w-[44rem] space-y-6">
        <div v-if="installer?.notes.length" class="min-w-0 rounded-[20px] border border-default bg-elevated p-8">
          <h3 class="text-lead font-semibold">What’s new in v{{ installer.version }}</h3>
          <ul class="mt-3 list-disc space-y-1 pl-5 text-muted">
            <li v-for="n in installer.notes" :key="n">{{ n }}</li>
          </ul>
        </div>
        <details id="install-details" :open="installOpen" @toggle="installOpen = ($event.target as HTMLDetailsElement).open" class="group min-w-0 rounded-[20px] border border-default bg-elevated px-8">
          <summary ref="installSummary" class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lead font-semibold">
            Installation &amp; file verification
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div class="pb-8">
            <p class="text-muted">
              The installer is not code-signed yet, so Windows does not recognise the publisher and SmartScreen may warn you before it runs. Download it only from this page or the
              <a :href="releasesUrl" class="text-primary underline underline-offset-4">release page</a>.
            </p>
            <template v-if="installer?.sha256">
              <h3 class="mt-6 text-base font-semibold text-highlighted">Optional: check the file</h3>
              <p class="mt-2 text-muted">
                Run <code class="font-mono text-[0.9em] text-highlighted">Get-FileHash .\Ferry-Setup-{{ installer.version }}.exe</code> in PowerShell and compare the result with the SHA-256 below (letter case does not matter).
                A match means the download is intact. It does not show who built it.
              </p>
              <div class="mt-4 flex items-center justify-between gap-4">
                <span class="text-small font-semibold text-highlighted">SHA-256</span>
                <UButton
                  :label="copied ? 'Copied' : 'Copy'" :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'" color="neutral" variant="outline"
                  class="min-h-11 rounded-[10px]" aria-live="polite" @click="copy(installer.sha256)"
                />
              </div>
              <code class="mt-2 block break-all font-mono text-[0.8125rem] text-highlighted">{{ installer.sha256 }}</code>
            </template>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
