<script setup lang="ts">
const { installer, href, label } = useLatestRelease()
</script>

<template>
  <section class="hero relative isolate overflow-x-clip bg-gradient-to-b from-sky via-sky to-haze pb-24 pt-10 sm:pt-16">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="max-w-4xl">
        <h1 class="text-[clamp(2.6rem,6vw,4.5rem)] font-bold text-ink">
          <span class="block">Meet Ferry.</span>
          <span class="block">Your server workspace, simplified.</span>
        </h1>
        <p class="mt-5 max-w-[60ch] text-step-1 text-slate-ink">
          Transfer files, run commands, follow logs and watch your servers from one Windows app.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <UButton :to="href" :label="label" size="xl" icon="i-lucide-download" class="min-h-11" />
          <a href="#features" class="flex min-h-11 items-center font-medium text-ferry-text underline underline-offset-4">See what it does</a>
        </div>
        <p class="mt-4 text-sm text-slate-ink">
          <template v-if="installer">Version {{ installer.version }} for Windows 10 and 11, 64-bit.</template>
          <template v-else>For Windows 10 and 11, 64-bit.</template>
        </p>
      </div>
    </div>

    <figure class="waterline relative mx-auto mt-12 max-w-6xl px-4 sm:px-6">
      <picture>
        <source srcset="/screens/files.webp" type="image/webp">
        <img
          src="/screens/files.jpg" width="1600" height="1000" fetchpriority="high"
          alt="The Ferry window with a local folder on the left and a remote server folder on the right, and a list of downloads in progress below."
          class="hero-window relative z-10 h-auto w-full rounded-xl border border-white/20 shadow-[0_30px_80px_-20px_rgba(13,38,77,0.55)]"
        >
      </picture>
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
