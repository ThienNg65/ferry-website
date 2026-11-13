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
  <section id="download" class="band section-y overflow-x-clip" aria-labelledby="download-title">
    <div class="page-x">
      <!-- The call to action stands alone; the release details and the installer notice sit quietly beneath it. -->
      <div class="reveal relative mx-auto max-w-[44rem] text-center">
        <div class="aura" aria-hidden="true"></div>
        <img src="/icon.webp" alt="" width="88" height="88" class="relative mx-auto size-22 rounded-[22px]">
        <h2 id="download-title" class="relative mt-8">Get Ferry for Windows</h2>
        <p class="relative mt-5 text-muted md:hidden">Ferry runs on Windows. Open this page on your PC to install.</p>
        <p class="relative mt-8 text-small text-muted">
          Ferry’s installer is currently unsigned. Windows may display a SmartScreen warning.
        </p>
        <div class="relative mt-4 flex flex-col items-center gap-4">
          <UButton :to="href" size="xl" icon="i-lucide-download" class="min-h-12 max-w-full rounded-[10px] px-6" :ui="{ label: 'whitespace-normal break-words text-left' }" :label="installer ? `${label}: Ferry-Setup-${installer.version}.exe` : label" />
          <span v-if="meta" class="text-muted">{{ meta }}</span>
        </div>
        <p class="relative mt-4 text-small text-muted">Requires Windows 10 or 11, 64-bit. Ferry updates itself.</p>
        <p class="relative mt-2 text-small text-muted">Free · MIT licensed · No account required</p>
        <p class="relative mt-1 flex flex-wrap justify-center gap-x-6 text-small">
          <a :href="notesUrl" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Release notes</a>
          <a :href="releasesUrl" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">All releases</a>
        </p>
      </div>

      <div v-if="installer?.notes.length" class="reveal mx-auto mt-14 max-w-[44rem] min-w-0 rounded-[20px] border border-default bg-elevated p-8">
        <h3 class="text-lead font-semibold">What’s new in v{{ installer.version }}</h3>
        <ul class="mt-3 list-disc space-y-1 pl-5 text-muted">
          <li v-for="n in installer.notes" :key="n">{{ n }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
