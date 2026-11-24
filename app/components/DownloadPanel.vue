<script setup lang="ts">
import { GO_DOWNLOAD_PATH, GO_STORE_PATH, type Installer } from '~/utils/release'

const props = defineProps<{ installer: Installer | null, href: string, portableHref: string, label: string, releasesUrl: string, notesUrl: string }>()

const date = computed(() => props.installer?.date
  ? new Date(props.installer.date).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
  : '')
const size = computed(() => (props.installer?.size ? `${(props.installer.size / 1024 / 1024).toFixed(0)} MB` : '~23 MB'))
const rootRef = ref<HTMLElement>()

useSectionReveal(rootRef, '.reveal-pre', { batch: true })
</script>

<template>
  <section id="download" ref="rootRef" class="section-y overflow-x-clip border-t border-default" aria-labelledby="download-title">
    <div class="page-x">
      <div class="cta-card reveal-pre mx-auto max-w-[56rem] rounded-[20px] px-6 py-12 text-center sm:px-12 sm:py-16">
        <img src="/ferry-glass.svg" alt="" width="64" height="64" class="mx-auto size-16 rounded-[16px]">
        <h2 id="download-title" class="mt-6">
          <span class="heading-muted">Try Ferry</span> for free
        </h2>
        <p class="mx-auto mt-3 max-w-[44ch] text-lead text-muted">
          Windows 10 and 11 (64-bit) · {{ size }}<template v-if="date"> · Updated {{ date }}</template>
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <UButton :to="GO_STORE_PATH" target="_blank" rel="noopener" size="xl" class="min-h-12 rounded-lg px-7 font-semibold">
            <UIcon name="i-lucide-shopping-bag" class="size-5 shrink-0" aria-hidden="true" />
            <span>Get it from Microsoft Store</span>
          </UButton>
          <UButton :to="href" color="neutral" variant="outline" size="xl" class="min-h-12 rounded-lg px-5 font-medium">
            <UIcon name="i-lucide-download" class="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{{ installer ? `Ferry-Setup-${installer.version}.exe` : label }}</span>
          </UButton>
          <UButton v-if="installer?.portableUrl" :to="portableHref" color="neutral" variant="outline" size="xl" class="min-h-12 rounded-lg px-5 font-medium">
            <UIcon name="i-lucide-archive" class="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Portable .zip</span>
          </UButton>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-small">
          <a :href="notesUrl" target="_blank" rel="noopener" class="inline-flex min-h-11 items-center gap-1.5 font-medium text-primary underline hover:text-highlighted">
            <UIcon name="i-lucide-file-text" class="size-4 shrink-0" aria-hidden="true" />Release notes
          </a>
          <a :href="GO_DOWNLOAD_PATH" target="_blank" rel="noopener" class="inline-flex min-h-11 items-center gap-1.5 font-medium text-primary underline hover:text-highlighted">
            <UIcon name="i-lucide-tag" class="size-4 shrink-0" aria-hidden="true" />All releases
          </a>
        </div>
      </div>

      <div v-if="installer?.notes.length" class="reveal-pre mx-auto mt-4 max-w-[56rem]">
        <details
          class="group rounded-[14px] border border-default bg-elevated px-6"
          @toggle="scheduleScrollTriggerRefresh(320)"
        >
          <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon name="i-lucide-tag" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>What’s new in v{{ installer.version }}</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ul class="list-disc space-y-1.5 border-t border-default pb-6 pl-5 pt-4 text-muted">
            <li v-for="n in installer.notes" :key="n">{{ n }}</li>
          </ul>
        </details>
      </div>
    </div>
  </section>
</template>
