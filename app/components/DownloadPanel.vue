<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import type { Installer } from '~/utils/release'

const props = defineProps<{ installer: Installer | null, href: string, label: string, releasesUrl: string, notesUrl: string }>()
const storeUrl = 'https://apps.microsoft.com/detail/9PJPWK568P53'
const date = computed(() => props.installer?.date
  ? new Date(props.installer.date).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
  : '')
const size = computed(() => (props.installer?.size ? `${(props.installer.size / 1024 / 1024).toFixed(0)} MB` : ''))
const { copy, copied } = useClipboard({ copiedDuring: 2000 })
const meta = computed(() => [size.value, date.value && `released ${date.value}`].filter(Boolean).join(', '))
const installOpen = useState('install-details-open', () => false)
const installSummary = ref<HTMLElement | null>(null)
const rootRef = ref<HTMLElement>()
const hashCommand = computed(() => (props.installer ? `Get-FileHash .\\Ferry-Setup-${props.installer.version}.exe -Algorithm SHA256` : ''))

useSectionReveal(rootRef, '.reveal-pre', { batch: true })

function syncInstallHash() {
  if (window.location.hash === '#install-details') {
    installOpen.value = true
    scheduleScrollTriggerRefresh(320)
  }
}

watch(installOpen, () => {
  scheduleScrollTriggerRefresh(320)
})

onMounted(() => {
  syncInstallHash()
  window.addEventListener('hashchange', syncInstallHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncInstallHash)
})

// Open (never toggle) the installation details, then glide smoothly via Lenis and move focus without snap-abort.
function showInstallDetails(e: Event) {
  e.preventDefault()
  installOpen.value = true
  nextTick(() => {
    const target = installSummary.value
    if (!target) return
    const lenis = useNuxtApp().$getLenis?.()
    if (lenis) {
      lenis.scrollTo(target, { offset: -96 })
    } else {
      target.scrollIntoView({ block: 'center' })
    }
    target.focus({ preventScroll: true })
    scheduleScrollTriggerRefresh(320)
  })
}

function onInstallToggle(e: Event) {
  installOpen.value = (e.target as HTMLDetailsElement).open
  scheduleScrollTriggerRefresh(320)
}
</script>

<template>
  <section id="download" ref="rootRef" class="band section-y overflow-x-clip" aria-labelledby="download-title">
    <div class="page-x">
      <!-- Order of operations: Download CTA -> Context & SmartScreen notice -> Folded verification & release notes -->
      <div class="reveal-pre relative mx-auto max-w-[44rem] text-center">
        <div class="aura" aria-hidden="true"></div>
        <img src="/icon.webp" alt="" width="88" height="88" class="relative mx-auto size-22 rounded-[22px]">
        <h2 id="download-title" class="relative mt-8">Get Ferry for Windows</h2>
        <p class="relative mt-5 text-muted md:hidden">Ferry runs on Windows. Open this page on your PC to install.</p>
        <div class="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <UButton
            :to="storeUrl"
            target="_blank"
            rel="noopener"
            size="xl"
            aria-label="Get Ferry from Microsoft Store"
            class="group hover-lift min-h-12 max-w-full rounded-[10px] px-6"
          >
            <UIcon name="i-lucide-shopping-bag" class="icon-nudge-down size-5 shrink-0" aria-hidden="true" />
            <span class="btn-win">
              <span class="win-default">Get it from Microsoft Store</span>
              <span class="win-hover" aria-hidden="true">Signed MSIX · Auto-updates</span>
            </span>
          </UButton>
          <UButton
            :to="href"
            color="neutral"
            variant="outline"
            size="xl"
            :aria-label="installer ? `${label}: Ferry-Setup-${installer.version}.exe` : label"
            class="group hover-lift min-h-12 max-w-full rounded-[10px] px-6"
          >
            <UIcon name="i-lucide-download" class="icon-nudge-down size-5 shrink-0" aria-hidden="true" />
            <span class="btn-win">
              <span class="win-default">{{ installer ? `Ferry-Setup-${installer.version}.exe` : label }}</span>
              <span class="win-hover" aria-hidden="true">Direct installer · Free</span>
            </span>
          </UButton>
        </div>
        <span v-if="meta" class="relative mt-3 block text-muted">{{ meta }}</span>
        <p class="relative mt-4 text-small text-muted">Requires Windows 10 or 11, 64-bit. Free · Local-first (Windows DPAPI) · No account required.</p>
        <p class="relative mt-2 text-small text-muted">
          The direct <code>.exe</code> installer is unsigned (use Microsoft Store above to skip SmartScreen).
          <a href="#install-details" class="-my-3 inline-block py-3 font-medium text-primary underline underline-offset-4" @click="showInstallDetails">Installation &amp; SHA-256 details</a>
        </p>
        <p class="relative mt-1 flex flex-wrap justify-center gap-x-6 text-small">
          <a :href="notesUrl" class="flex min-h-11 items-center gap-1.5 font-medium text-primary underline underline-offset-4">
            <UIcon name="i-lucide-file-text" class="size-4 shrink-0" aria-hidden="true" />Release notes
          </a>
          <a :href="releasesUrl" class="flex min-h-11 items-center gap-1.5 font-medium text-primary underline underline-offset-4">
            <UIcon name="i-lucide-tag" class="size-4 shrink-0" aria-hidden="true" />All releases
          </a>
        </p>
      </div>

      <div class="reveal-pre mx-auto mt-14 max-w-[44rem] space-y-4">
        <SpotlightSurface
          v-if="installer?.notes.length"
          as="details"
          class="group hover-lift surface-specular min-w-0 rounded-[20px] border border-default bg-elevated px-8"
          @toggle="scheduleScrollTriggerRefresh(320)"
        >
          <summary class="relative flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lead font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon name="i-lucide-sparkles" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>What’s new in v{{ installer.version }}</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ul class="relative list-disc space-y-1.5 border-t border-default pb-6 pl-5 pt-4 text-muted">
            <li v-for="n in installer.notes" :key="n">{{ n }}</li>
          </ul>
        </SpotlightSurface>

        <SpotlightSurface
          id="install-details"
          as="details"
          :open="installOpen"
          class="group hover-lift surface-specular min-w-0 rounded-[20px] border border-default bg-elevated px-8"
          @toggle="onInstallToggle"
        >
          <summary ref="installSummary" class="relative flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lead font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon name="i-lucide-shield-check" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>Installation &amp; file verification</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div class="relative border-t border-default pb-8 pt-5">
            <p class="text-muted">
              The installer is not code-signed yet, so Windows does not recognise the publisher and SmartScreen may warn you before it runs. If SmartScreen appears, click <b class="font-semibold text-highlighted">More info</b> and then <b class="font-semibold text-highlighted">Run anyway</b>. Download it only from this page or the
              <a :href="releasesUrl" class="text-primary underline underline-offset-4">release page</a>.
              GitHub’s “Verified” badge on commits and tags is not Windows code signing and does not change this.
            </p>
            <template v-if="installer?.sha256">
              <h3 class="mt-6 text-base font-semibold text-highlighted">Optional: check the file</h3>
              <p class="mt-2 text-muted">
                Run this command in PowerShell and compare the output with the SHA-256 below (letter case does not matter).
                A match means the download is intact. It does not show who built it.
              </p>
              <CodeBlock
                label="PowerShell"
                :code="hashCommand"
                copy-label="Copy PowerShell Get-FileHash command"
                class="mt-4"
              />
              <div class="mt-5 flex items-center justify-between gap-4">
                <span class="text-small font-semibold text-highlighted">SHA-256</span>
                <UButton
                  color="neutral" variant="outline"
                  :aria-label="copied ? 'Copied SHA-256' : 'Copy SHA-256'"
                  class="group hover-lift min-h-11 rounded-[10px]" aria-live="polite" @click="copy(installer.sha256)"
                >
                  <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="size-4 shrink-0" aria-hidden="true" />
                  <span v-if="copied">Copied</span>
                  <span v-else class="btn-win">
                    <span class="win-default">Copy</span>
                    <span class="win-hover" aria-hidden="true">Verify integrity</span>
                  </span>
                </UButton>
              </div>
              <code class="mt-2 block break-all font-mono text-[0.8125rem] text-highlighted">{{ installer.sha256 }}</code>
            </template>
          </div>
        </SpotlightSurface>
      </div>
    </div>
  </section>
</template>
