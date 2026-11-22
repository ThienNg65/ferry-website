<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const navLinks = [
  { label: 'Features', to: '/#features' },
  { label: 'Security', to: '/#security' },
  { label: 'Compare', to: '/#compare' },
  { label: 'FAQ', to: '/#faq' }
] as const

const menuOpen = ref(false)
const scrolled = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const colorMode = useColorMode()

function toggleTheme(e: MouseEvent) {
  const next = colorMode.value === 'dark' ? 'light' : 'dark'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (typeof document.startViewTransition !== 'function' || reduced) {
    colorMode.preference = next
    return
  }
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX > 0 ? e.clientX : rect.left + rect.width / 2
  const y = e.clientY > 0 ? e.clientY : rect.top + rect.height / 2
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  document.documentElement.style.setProperty('--theme-x', `${x}px`)
  document.documentElement.style.setProperty('--theme-y', `${y}px`)
  document.documentElement.style.setProperty('--theme-r', `${endRadius}px`)
  document.startViewTransition(() => {
    colorMode.preference = next
  })
}

onClickOutside(headerRef, () => {
  menuOpen.value = false
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 border-b transition-colors duration-200"
    :class="scrolled ? 'border-default bg-default/85 backdrop-blur-md' : 'border-transparent bg-default/75 backdrop-blur-sm'"
    @keydown="onKeydown"
  >
    <div class="page-x flex h-16 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex min-h-11 shrink-0 items-center gap-2.5 text-lg font-bold tracking-tight text-highlighted">
        <img src="/ferry-glass.svg" alt="" width="28" height="28" class="size-7 rounded-[7px]">
        <span>Ferry</span>
      </NuxtLink>

      <nav aria-label="Main" class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex min-h-11 items-center rounded-lg px-3.5 text-small font-medium text-muted hover:text-highlighted"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1.5">
        <ClientOnly>
          <button
            type="button"
            class="flex size-11 items-center justify-center rounded-lg text-muted hover:bg-muted/70 hover:text-highlighted"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <UIcon
              :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              class="size-5 transition-transform duration-300"
              aria-hidden="true"
            />
          </button>
          <template #fallback><span class="block size-11" aria-hidden="true" /></template>
        </ClientOnly>
        <button
          type="button"
          class="flex size-11 items-center justify-center rounded-lg text-muted hover:bg-muted/70 hover:text-highlighted lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" aria-hidden="true" />
        </button>
        <UButton to="/#download" size="md" class="min-h-11 rounded-lg px-4 font-semibold">
          <span>Get Ferry</span>
        </UButton>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      id="mobile-nav"
      aria-label="Mobile navigation"
      class="border-t border-default bg-default px-5 py-3 lg:hidden"
    >
      <ul class="space-y-1">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="flex min-h-11 items-center rounded-lg px-3 text-small font-medium text-highlighted hover:bg-muted/70"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
