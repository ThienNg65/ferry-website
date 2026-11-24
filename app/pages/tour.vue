<script setup lang="ts">
import { buildTourJsonLd, tourChapters } from '~/composables/useSeoSchema'

const { installer, href, portableHref, label } = useLatestRelease()
const route = useRoute()
const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

const title = 'Ferry 35-Second Product Tour - Windows SFTP, SSH & Live Logs'
const description = 'Watch how Ferry imports WinSCP & PuTTY sites, runs dual-pane SFTP, embeds an SSH terminal, tails logs live, and monitors Linux servers on Windows.'

const videoEl = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)

useHead({
  title,
  link: [{ rel: 'canonical', href: `${site}/tour` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildTourJsonLd(site))
    }
  ]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${site}/tour`,
  ogImage: `${site}/og.jpg`,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${site}/og.jpg`
})

function seekTo(sec: number, autoplay = true) {
  if (!videoEl.value) return
  videoEl.value.currentTime = sec
  currentTime.value = sec
  if (autoplay) {
    videoEl.value.play().catch(() => {})
  }
}

onMounted(() => {
  const raw = Number(route.query.t)
  if (Number.isFinite(raw) && raw >= 0 && raw <= 35) {
    seekTo(raw, raw > 0)
  }
})
</script>

<template>
  <article class="section-y">
    <div class="page-x max-w-5xl">
      <nav aria-label="Breadcrumb" class="mb-6 text-small text-muted">
        <NuxtLink to="/" class="hover:text-highlighted">Ferry</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span class="text-highlighted">35-Second Product Tour</span>
      </nav>

      <h1>Ferry for Windows: 35-Second Launch Tour</h1>
      <p class="mt-4 max-w-[66ch] text-lead text-muted">
        See how one ~23 MB Windows app replaces juggling separate file-transfer, SSH terminal, log tailing, and server monitoring windows.
      </p>

      <div class="mt-8 overflow-hidden rounded-[16px] border border-default bg-[#070b14] shadow-2xl">
        <video
          ref="videoEl"
          controls
          playsinline
          preload="metadata"
          poster="/media/files-terminal.webp"
          class="aspect-video w-full"
          @timeupdate="currentTime = videoEl?.currentTime ?? 0"
        >
          <source src="/media/ferry-launch-demo-35s.mp4" type="video/mp4">
          Your browser does not support embedded MP4 playback.
        </video>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Video chapters">
        <button
          v-for="(c, idx) in tourChapters"
          :key="c.id"
          type="button"
          class="min-h-11 rounded-[5px] border px-3.5 text-small font-medium transition-colors"
          :class="(tourChapters[idx + 1] ? currentTime >= c.startOffset && currentTime < tourChapters[idx + 1]!.startOffset : currentTime >= c.startOffset)
            ? 'border-primary bg-primary text-white font-semibold'
            : 'border-default bg-elevated text-muted hover:border-primary/50 hover:text-highlighted'"
          @click="seekTo(c.startOffset)"
        >
          {{ c.label }}
        </button>
      </div>

      <section class="mt-12" aria-labelledby="chapters-title">
        <h2 id="chapters-title" class="text-2xl">What the 35-second walkthrough covers</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <button
            v-for="c in tourChapters"
            :key="c.id"
            type="button"
            class="card-lift rounded-[14px] border border-default bg-elevated p-5 text-left"
            @click="seekTo(c.startOffset)"
          >
            <p class="font-mono text-xs font-semibold text-primary">
              {{ c.label }}
            </p>
            <h3 class="mt-1.5 text-lg text-highlighted">
              {{ c.name }}
            </h3>
            <p class="mt-2 text-small text-muted">
              {{ c.summary }}
            </p>
          </button>
        </div>
      </section>

      <section class="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-default bg-elevated p-6" aria-labelledby="tour-download-title">
        <div>
          <h2 id="tour-download-title" class="text-xl text-highlighted">
            Try Ferry on Windows 10 &amp; 11 (64-bit)
          </h2>
          <p class="mt-1 text-small text-muted">
            Free, local-first DPAPI encryption, ~23 MB install with zero accounts or telemetry.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <MsStoreBadge />
          <a :href="href" class="inline-flex min-h-12 items-center gap-2 rounded-[5px] border border-default bg-default px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary">
            <UIcon name="i-lucide-download" class="size-4 text-primary" aria-hidden="true" />
            <span>{{ installer ? `v${installer.version} (.exe)` : label }}</span>
          </a>
          <a v-if="installer?.portableUrl" :href="portableHref" class="inline-flex min-h-12 items-center gap-2 rounded-[5px] border border-default bg-default px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary">
            <UIcon name="i-lucide-archive" class="size-4 text-primary" aria-hidden="true" />
            <span>Portable .zip</span>
          </a>
          <NuxtLink to="/#compare" class="inline-flex min-h-12 items-center rounded-[5px] px-3 text-small font-medium text-primary underline hover:text-highlighted">
            Compare tools
          </NuxtLink>
        </div>
      </section>
    </div>
  </article>
</template>
