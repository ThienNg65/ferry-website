<script setup lang="ts">
import { STORE_URL, type Installer } from '~/utils/release'

defineProps<{ installer: Installer | null, href: string, label: string }>()

const promoOpen = useState('promo-video-open', () => false)

const badges = [
  ['i-lucide-monitor', 'Windows 10 & 11'],
  ['i-lucide-key-round', 'SSH & SFTP'],
  ['i-lucide-user-x', 'No account needed'],
  ['i-lucide-check-circle-2', 'Free']
] as const
</script>

<template>
  <section class="hero-glow overflow-x-clip pb-12 pt-16 lg:pb-16 lg:pt-24">
    <div class="page-x">
      <div class="mx-auto max-w-[46rem] text-center">
        <h1 class="rise">
          <span class="heading-muted">Modern Windows</span> SFTP &amp; SSH Client
        </h1>
        <p class="rise mx-auto mt-5 max-w-[54ch] text-lead text-muted" style="--d: 60ms">
          Stop switching between WinSCP, PuTTY, and tail windows. Move files, run commands, watch logs, and check server health in one app.
        </p>

        <div class="rise mt-8 flex flex-col items-center gap-3" style="--d: 110ms">
          <UButton
            :to="STORE_URL"
            target="_blank"
            rel="noopener"
            size="xl"
            class="min-h-12 rounded-lg px-7 font-semibold"
          >
            <UIcon name="i-lucide-shopping-bag" class="size-5 shrink-0" aria-hidden="true" />
            <span>Get it from Microsoft Store</span>
          </UButton>
          <p class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-small text-muted">
            <a :href="href" class="-my-3 inline-block py-3 font-medium text-primary underline hover:text-highlighted">
              {{ installer ? `Download v${installer.version} (.exe)` : label }}
            </a>
            <span aria-hidden="true" class="hidden sm:inline">·</span>
            <button
              type="button"
              class="-my-3 inline-flex items-center gap-1.5 py-3 font-medium text-muted hover:text-highlighted"
              @click="promoOpen = true"
            >
              <UIcon name="i-lucide-play-circle" class="size-4 text-primary" aria-hidden="true" />
              <span>Watch 35s video</span>
            </button>
          </p>
        </div>

        <ul class="rise mt-8 flex flex-wrap items-center justify-center gap-2.5" style="--d: 150ms">
          <li
            v-for="[icon, text] in badges"
            :key="text"
            class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated px-3.5 py-1.5 text-xs font-medium text-default"
          >
            <UIcon :name="icon" class="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{{ text }}</span>
          </li>
        </ul>
      </div>

      <div class="rise mx-auto mt-12 max-w-[68rem]" style="--d: 200ms">
        <figure class="window bg-elevated">
          <AppShot
            src="/media/files-terminal.webp"
            alt="Ferry on Windows showing dual-pane local and remote files above an interactive SSH terminal"
            :width="1920"
            :height="1080"
            eager
          />
        </figure>
      </div>
    </div>
  </section>
</template>
