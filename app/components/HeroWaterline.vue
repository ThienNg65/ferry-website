<script setup lang="ts">
import type { Installer } from '~/utils/release'
defineProps<{ installer: Installer | null, href: string, label: string }>()
</script>

<template>
  <section class="hero relative isolate overflow-x-clip bg-gradient-to-b from-sky via-sky to-haze pb-24 pt-6 sm:pt-10">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="max-w-4xl">
        <h1 class="text-[clamp(2.2rem,4.4vw,3.5rem)] font-bold text-ink">Your server workspace, simplified.</h1>
        <p class="mt-4 max-w-[60ch] text-step-1 text-slate-ink">
          Meet Ferry. Transfer files, run commands, follow logs and watch your servers from one Windows app.
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <UButton :to="href" :label="label" size="xl" icon="i-lucide-download" class="min-h-11" />
          <a href="#features" class="flex min-h-11 items-center font-medium text-ferry-text underline underline-offset-4">See what it does</a>
        </div>
        <p class="mt-4 text-sm text-slate-ink">
          <template v-if="installer">Version {{ installer.version }} for Windows 10 and 11, 64-bit.</template>
          <template v-else>For Windows 10 and 11, 64-bit.</template>
        </p>
      </div>
    </div>

    <figure class="waterline relative mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <LoopVideo
        name="hero" :width="1280" :height="800"
        alt="The Ferry window sending a release folder from the local pane to the server, with the transfer queue filling to 100 percent."
        class="hero-window relative z-10 overflow-hidden rounded-xl border border-white/20 shadow-[0_30px_80px_-20px_rgba(13,38,77,0.55)]"
      />
      <figcaption class="relative z-10 mt-3 text-sm text-haze">Sending a release folder to the server, then watching it upload.</figcaption>
    </figure>
  </section>
</template>

<style scoped>
/* The water starts at the window's vertical middle and runs to the bottom of the hero, then continues into the dark showcase. */
.waterline::before {
  content: '';
  position: absolute;
  z-index: 0;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  top: 50%;
  bottom: -6rem;
  background: var(--color-deep);
}
.waterline::after {
  content: '';
  position: absolute;
  z-index: 0;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  top: calc(50% - 11px);
  height: 12px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='12' viewBox='0 0 120 12'%3E%3Cpath d='M0 12V6c10 0 10-6 20-6s10 6 20 6 10-6 20-6 10 6 20 6 10-6 20-6 10 6 20 6v6z' fill='%230d264d'/%3E%3C/svg%3E") repeat-x;
}
.hero-window { animation: rise 600ms ease-out both; }
@keyframes rise { from { transform: translateY(16px); } to { transform: none; } }
</style>
