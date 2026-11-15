<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Installer } from '~/utils/release'

defineProps<{ installer: Installer | null, href: string, label: string }>()
const facts = [
  ['i-lucide-key-round', 'SSH and SFTP only'],
  ['i-lucide-monitor', 'Windows 10 and 11, 64-bit'],
  ['i-lucide-scale', 'MIT licence'],
  ['i-lucide-user-x', 'No account needed']
]

const heroRef = ref<HTMLElement>()
const demoFrameRef = ref<HTMLElement>()
const installOpen = useState('install-details-open', () => false)
let ctx: gsap.Context | undefined
let mm: gsap.MatchMedia | undefined

useSectionReveal(heroRef, '.hero-fact', { y: 14, stagger: 0.06, start: 'top 92%', batch: true })

onMounted(() => {
  if (!heroRef.value || !demoFrameRef.value) return
  gsap.registerPlugin(ScrollTrigger)
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    ctx = gsap.context(() => {
      // Gentle scale settle as the hero demo enters focus—keeps 12px monospace demo text sharp.
      gsap.fromTo(
        demoFrameRef.value!,
        { scale: 0.985 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: demoFrameRef.value!,
            start: 'top 92%',
            end: 'center 52%',
            scrub: 0.45
          }
        }
      )
    }, heroRef.value)
  })
})

onUnmounted(() => {
  ctx?.revert()
  mm?.revert()
})
</script>

<template>
  <section ref="heroRef" class="relative isolate overflow-x-clip pb-4 pt-24 lg:pt-32">
    <div class="grid-fade" aria-hidden="true"></div>
    <div class="page-x text-center">
      <h1 class="rise mx-auto max-w-[22ch]">Files, terminal, logs and monitor. One window.</h1>
      <p class="rise mx-auto mt-7 max-w-[60ch] text-lead text-muted" style="--d: 80ms">
        Ferry is a Windows app for your Linux servers. Move files between two panes, run commands, follow logs as they are written and watch CPU, memory and disk, all over one SSH connection.
      </p>

      <!-- Primary action block: Download + Explore -->
      <div class="rise mt-10 flex flex-wrap items-center justify-center gap-4" style="--d: 140ms">
        <UButton :to="href" :aria-label="label" size="xl" class="group hover-lift min-h-12 rounded-[10px] px-6">
          <UIcon name="i-lucide-download" class="icon-nudge-down size-5 shrink-0" aria-hidden="true" />
          <span class="btn-win">
            <span class="win-default">{{ label }}</span>
            <span class="win-hover" aria-hidden="true">Free · Ready to install</span>
          </span>
        </UButton>
        <a
          href="#features"
          aria-label="See the features"
          class="group hover-lift inline-flex min-h-12 items-center gap-2 rounded-[10px] border border-default bg-elevated/80 px-5 font-medium text-highlighted hover:text-primary"
        >
          <UIcon name="i-lucide-layers" class="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span class="btn-win">
            <span class="win-default">See the features</span>
            <span class="win-hover" aria-hidden="true">Try the live demos</span>
          </span>
        </a>
      </div>

      <!-- Supporting context & SmartScreen notice grouped beneath the action -->
      <div class="rise mx-auto mt-6 max-w-[60ch] space-y-1.5 text-small text-muted" style="--d: 200ms">
        <p>
          <template v-if="installer">Version {{ installer.version }} for Windows 10 and 11, 64-bit.</template>
          <template v-else>For Windows 10 and 11, 64-bit.</template>
          Free · MIT licensed · No account required
        </p>
        <p>
          The installer is currently unsigned, so Windows may show a SmartScreen warning.
          <a href="#install-details" class="-my-3 inline-block py-3 font-medium text-primary underline underline-offset-4" @click="installOpen = true">Details</a>
        </p>
      </div>
    </div>

    <div class="page-x relative mt-16 lg:mt-20">
      <div ref="demoFrameRef" class="rise relative mx-auto max-w-[68rem]" style="--d: 280ms">
        <div class="aura" aria-hidden="true"></div>
        <HeroDemo class="hover-lift" />
      </div>
      <ul class="relative z-10 mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-4 text-small text-default sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10">
        <li v-for="[icon, text] in facts" :key="text" class="hero-fact reveal-pre flex items-center gap-2">
          <UIcon :name="icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />{{ text }}
        </li>
      </ul>
    </div>
  </section>
</template>
