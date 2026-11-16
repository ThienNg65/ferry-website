<script setup lang="ts">
import { onClickOutside, usePreferredReducedMotion } from '@vueuse/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const groups = [
  {
    label: 'Explore',
    links: [
      { label: 'Features', to: '#features', icon: 'i-lucide-layers' },
      { label: 'Workflow', to: '#example', icon: 'i-lucide-route' },
      { label: 'Compare', to: '#compare', icon: 'i-lucide-scale' }
    ]
  },
  {
    label: 'Resources',
    links: [
      { label: 'Download', to: '#download', icon: 'i-lucide-download' },
      { label: 'FAQ', to: '#faq', icon: 'i-lucide-circle-help' },
      { label: 'GitHub', to: 'https://github.com/ThienNg65/ferry-release', icon: 'i-lucide-github' }
    ]
  }
]
const openGroup = ref<string | null>(null)
const menuOpen = ref(false)
const scrolled = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const motion = usePreferredReducedMotion()
let ctx: gsap.Context | undefined

onClickOutside(headerRef, () => {
  openGroup.value = null
  menuOpen.value = false
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    openGroup.value = null
    menuOpen.value = false
  }
}

function onMenuEnter(el: Element, done: () => void) {
  if (motion.value === 'reduce') return done()
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: -8, scale: 0.98 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.2, ease: 'power3.out', clearProps: 'transform,opacity,visibility', onComplete: done }
  )
}

function onMenuLeave(el: Element, done: () => void) {
  if (motion.value === 'reduce') return done()
  gsap.to(el, {
    autoAlpha: 0,
    y: -6,
    scale: 0.98,
    duration: 0.14,
    ease: 'power2.in',
    onComplete: done
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 36,
      onEnter: () => { scrolled.value = true },
      onLeaveBack: () => { scrolled.value = false }
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <header ref="headerRef" class="sticky top-4 z-50 px-3" @keydown="onKeydown">
    <div
      class="surface-specular mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 rounded-full border pl-3 pr-1.5 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300"
      :class="scrolled ? 'border-primary/25 bg-elevated/90 shadow-lg' : 'border-default bg-elevated/80'"
    >
      <a href="#" class="flex min-h-11 shrink-0 items-center gap-2 rounded-full pr-2 text-lg font-bold tracking-tight text-highlighted">
        <img src="/icon.webp" alt="" width="28" height="28" class="size-7 rounded-lg">
        Ferry
      </a>
      <nav aria-label="Main" class="hidden items-center gap-1 lg:flex">
        <div v-for="g in groups" :key="g.label" class="relative">
          <button
            type="button"
            class="flex min-h-11 items-center gap-1.5 rounded-full px-4 text-small font-medium text-muted hover:text-highlighted"
            :class="openGroup === g.label ? 'text-highlighted' : ''"
            :aria-expanded="openGroup === g.label"
            @click="openGroup = openGroup === g.label ? null : g.label"
          >
            <span>{{ g.label }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 transition-transform duration-200"
              :class="openGroup === g.label ? 'rotate-180 text-primary' : ''"
              aria-hidden="true"
            />
          </button>
          <Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
            <div
              v-if="openGroup === g.label"
              class="surface-specular absolute left-0 top-full mt-2 w-52 rounded-[16px] border border-default bg-elevated/95 p-2 shadow-lg backdrop-blur-md"
            >
              <p class="px-3 pb-1 pt-1 text-xs font-semibold text-muted">{{ g.label }}</p>
              <a
                v-for="l in g.links"
                :key="l.to"
                :href="l.to"
                class="flex min-h-11 items-center gap-2.5 rounded-[10px] px-3 text-small font-medium text-highlighted hover:bg-muted/70"
                @click="openGroup = null"
              >
                <UIcon :name="l.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{{ l.label }}</span>
              </a>
            </div>
          </Transition>
        </div>
      </nav>
      <div class="flex items-center gap-1">
        <ClientOnly>
          <UColorModeButton class="size-11 justify-center rounded-full" />
          <template #fallback><span class="block size-11" aria-hidden="true" /></template>
        </ClientOnly>
        <button
          type="button"
          class="flex size-11 items-center justify-center rounded-full text-muted hover:bg-muted/60 hover:text-highlighted lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" aria-hidden="true" />
        </button>
        <!-- Goes to the download section, where the unsigned-installer notice comes before the button. -->
        <UButton to="#download" size="lg" aria-label="Download" class="group hover-lift min-h-11 rounded-full px-4">
          <UIcon name="i-lucide-download" class="icon-nudge-down size-4 shrink-0" aria-hidden="true" />
          <span class="btn-win">
            <span class="win-default">Download</span>
            <span class="win-hover" aria-hidden="true">Get Ferry</span>
          </span>
        </UButton>
      </div>
    </div>

    <Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        aria-label="Mobile navigation"
        class="surface-specular mx-auto mt-2 max-w-5xl rounded-[20px] border border-default bg-elevated/95 p-4 shadow-lg backdrop-blur-md lg:hidden"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="g in groups" :key="g.label" class="space-y-1">
            <p class="px-3 text-xs font-semibold text-muted">{{ g.label }}</p>
            <a
              v-for="l in g.links"
              :key="l.to"
              :href="l.to"
              class="flex min-h-11 items-center gap-2.5 rounded-[10px] px-3 text-small font-medium text-highlighted hover:bg-muted/70"
              @click="menuOpen = false"
            >
              <UIcon :name="l.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{{ l.label }}</span>
            </a>
          </div>
        </div>
      </nav>
    </Transition>
  </header>
</template>
