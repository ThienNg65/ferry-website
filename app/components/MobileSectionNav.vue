<script setup lang="ts">
import { onClickOutside, useIntersectionObserver, usePreferredReducedMotion } from '@vueuse/core'
import gsap from 'gsap'

const sections = [
  { id: 'features', label: 'Features', icon: 'i-lucide-layers' },
  { id: 'example', label: 'Deploy workflow', icon: 'i-lucide-route' },
  { id: 'compare', label: 'Compare tools', icon: 'i-lucide-scale' },
  { id: 'download', label: 'Download & verify', icon: 'i-lucide-download' },
  { id: 'faq', label: 'Questions', icon: 'i-lucide-circle-help' }
] as const

const modules = [
  { id: 'connections', label: 'Connections', icon: 'i-lucide-server' },
  { id: 'files', label: 'Files', icon: 'i-lucide-folder-open' },
  { id: 'transfers', label: 'Transfers', icon: 'i-lucide-arrow-down-up' },
  { id: 'terminal', label: 'Terminal', icon: 'i-lucide-terminal' },
  { id: 'logs', label: 'Logs', icon: 'i-lucide-scroll-text' },
  { id: 'monitor', label: 'Monitor', icon: 'i-lucide-activity' }
] as const

const activeSection = ref<string>('features')
const menuOpen = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const activeModuleId = useState('feature-active-module', () => 'connections')
const motion = usePreferredReducedMotion()

const activeLabel = computed(() => sections.find(s => s.id === activeSection.value)?.label ?? 'Sections')

onClickOutside(wrapperRef, () => {
  menuOpen.value = false
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    triggerRef.value?.focus()
  }
}

function scrollToId(id: string, hash = `#${id}`) {
  menuOpen.value = false
  const target = document.getElementById(id)
  if (!target) return
  history.pushState(null, '', hash)
  const lenis = useNuxtApp().$getLenis?.()
  if (lenis) {
    // Clear both SiteHeader (top-4 + h-16) and this sticky mobile jump bar.
    lenis.scrollTo(target, { offset: -148 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - 148
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
  }
}

function jumpToSection(e: Event, id: string) {
  e.preventDefault()
  activeSection.value = id
  scrollToId(id, `#${id}`)
}

function jumpToModule(e: Event, id: string) {
  e.preventDefault()
  activeModuleId.value = id
  activeSection.value = 'features'
  scrollToId('features', `#module-${id}`)
}

function onMenuEnter(el: Element, done: () => void) {
  if (motion.value === 'reduce') return done()
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: -6, scale: 0.98 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: 'power3.out', clearProps: 'transform,opacity,visibility', onComplete: done }
  )
}

function onMenuLeave(el: Element, done: () => void) {
  if (motion.value === 'reduce') return done()
  gsap.to(el, {
    autoAlpha: 0,
    y: -4,
    scale: 0.98,
    duration: 0.12,
    ease: 'power2.in',
    onComplete: done
  })
}

onMounted(() => {
  const targets = sections.map(s => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
  if (!targets.length) return
  useIntersectionObserver(targets, (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.target.id) {
        activeSection.value = entry.target.id
      }
    }
  }, { rootMargin: '-35% 0px -55% 0px' })
})
</script>

<template>
  <div ref="wrapperRef" class="pointer-events-none sticky top-[5.25rem] z-30 mx-auto max-w-md px-3 pt-2 lg:hidden" @keydown="onKeydown">
    <div class="surface-specular pointer-events-auto flex items-center justify-between gap-1.5 rounded-full border border-default bg-elevated/90 p-1.5 shadow-lg backdrop-blur-md">
      <button
        ref="triggerRef"
        type="button"
        class="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-2 rounded-full px-3 text-left text-small font-medium text-highlighted hover:bg-muted/60"
        :aria-expanded="menuOpen"
        aria-controls="mobile-section-menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="flex min-w-0 items-center gap-2">
          <UIcon name="i-lucide-compass" class="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span class="truncate">{{ activeLabel }}</span>
        </span>
        <UIcon
          name="i-lucide-chevron-down"
          class="size-4 shrink-0 text-muted transition-transform duration-200"
          :class="menuOpen ? 'rotate-180 text-primary' : ''"
          aria-hidden="true"
        />
      </button>

      <a
        href="#download"
        aria-label="Jump to download"
        class="flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-default bg-muted/70 px-3.5 text-small font-semibold text-highlighted hover:border-primary/50 hover:text-primary"
        @click="jumpToSection($event, 'download')"
      >
        <UIcon name="i-lucide-download" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>Download</span>
      </a>
    </div>

    <Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
      <nav
        v-if="menuOpen"
        id="mobile-section-menu"
        aria-label="Section and tool navigation"
        class="surface-specular pointer-events-auto absolute inset-x-3 top-full mt-2 max-h-[calc(100dvh-10rem)] overflow-y-auto rounded-[16px] border border-default bg-elevated/95 p-3 shadow-lg backdrop-blur-md"
      >
        <p class="px-2.5 pb-1 text-xs font-semibold text-muted">Sections</p>
        <ul class="space-y-0.5">
          <li v-for="s in sections" :key="s.id">
            <a
              :href="`#${s.id}`"
              :aria-current="activeSection === s.id ? 'location' : undefined"
              class="flex min-h-11 items-center gap-2.5 rounded-[10px] border-l-2 px-3 text-small transition-colors"
              :class="activeSection === s.id
                ? 'border-primary bg-primary/10 font-semibold text-highlighted'
                : 'border-transparent font-medium text-muted hover:bg-muted/60 hover:text-highlighted'"
              @click="jumpToSection($event, s.id)"
            >
              <UIcon :name="s.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{{ s.label }}</span>
            </a>
          </li>
        </ul>

        <p class="mt-3 border-t border-default px-2.5 pb-1 pt-3 text-xs font-semibold text-muted">Tools in the window</p>
        <ul class="grid grid-cols-2 gap-1">
          <li v-for="m in modules" :key="m.id">
            <a
              :href="`#module-${m.id}`"
              class="flex min-h-11 items-center gap-2 rounded-[10px] px-2.5 text-small transition-colors"
              :class="activeModuleId === m.id
                ? 'bg-primary/10 font-semibold text-highlighted'
                : 'font-medium text-muted hover:bg-muted/60 hover:text-highlighted'"
              @click="jumpToModule($event, m.id)"
            >
              <UIcon :name="m.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span class="truncate">{{ m.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>
