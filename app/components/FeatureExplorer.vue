<script setup lang="ts">
import { useMediaQuery, usePreferredReducedMotion, useResizeObserver } from '@vueuse/core'
import gsap from 'gsap'

interface FeatureModule {
  id: string
  stage: string
  icon: string
  demo: ReturnType<typeof resolveComponent>
  title: string
  line: string
  subs: [string, string][]
}

const stages: { label: string, items: FeatureModule[] }[] = [
  {
    label: '1. Connect',
    items: [
      {
        id: 'connections', stage: 'Connect', icon: 'i-lucide-server', demo: resolveComponent('DemoSites'),
        title: 'Connections', line: 'Connect the way each server wants.',
        subs: [
          ['Password, key or agent', 'Use whichever the server accepts.'],
          ['Jump hosts and proxies', 'Reach servers that sit behind another one.'],
          ['Real 2FA prompts', 'Answer the server’s own prompts as they appear.'],
          ['Host-key check', 'Confirm a server’s key the first time you connect.'],
          ['Import', 'Bring sites over from WinSCP, PuTTY and ~/.ssh/config.'],
          ['Colour-coded environments', 'Production, staging and development look different.']
        ]
      }
    ]
  },
  {
    label: '2. Move & Run',
    items: [
      {
        id: 'files', stage: 'Move & Run', icon: 'i-lucide-folder-open', demo: resolveComponent('DemoFiles'),
        title: 'Files', line: 'Two panes, local and remote, built for moving things around.',
        subs: [
          ['Two panes', 'Local files on the left, the server’s files on the right.'],
          ['Drag and drop', 'Drag files to and from Windows Explorer.'],
          ['Archives on the server', 'Extract and compress without opening a terminal.'],
          ['Permissions and owner', 'Change them from the file list, with sudo when you need it.'],
          ['Edit in place', 'Open a remote file, change it and save it back.']
        ]
      },
      {
        id: 'transfers', stage: 'Move & Run', icon: 'i-lucide-arrow-down-up', demo: resolveComponent('DemoTransfers'),
        title: 'Transfers', line: 'Big copies that keep going while you keep working.',
        subs: [
          ['Whole folders', 'Send or fetch a folder in one go.'],
          ['A queue with retry', 'Run a failed transfer again with one click.'],
          ['A bandwidth cap', 'Keep a big upload from flattening the office link.'],
          ['A filterable history', 'Filter by done, error or cancelled to see what happened.']
        ]
      },
      {
        id: 'terminal', stage: 'Move & Run', icon: 'i-lucide-terminal', demo: resolveComponent('DemoTerminal'),
        title: 'Terminal', line: 'A real SSH terminal for each server.',
        subs: [
          ['One per server tab', 'Each server keeps its own session.'],
          ['Themes', 'Dracula, Nord, Solarized and more.'],
          ['Same window as your files', 'Switch between a command and your files without leaving the window.']
        ]
      }
    ]
  },
  {
    label: '3. Observe',
    items: [
      {
        id: 'logs', stage: 'Observe', icon: 'i-lucide-scroll-text', demo: resolveComponent('DemoLogs'),
        title: 'Logs', line: 'Follow a log as it is written.',
        subs: [
          ['Follow with tail -F', 'Lines appear as the server writes them.'],
          ['Filter by level', 'Show only errors, or warnings and above.'],
          ['Keep the scrollback', 'Scroll back through what already went past.']
        ]
      },
      {
        id: 'monitor', stage: 'Observe', icon: 'i-lucide-activity', demo: resolveComponent('DemoMonitor'),
        title: 'Monitor', line: 'See how the server is doing without logging in elsewhere.',
        subs: [
          ['CPU, memory and load', 'Live figures with a short CPU graph.'],
          ['Disk use', 'How full the disk is, at a glance.'],
          ['Top processes', 'The busiest processes in a sortable table.']
        ]
      }
    ]
  }
]

const allModules = stages.flatMap(s => s.items)
const activeId = useState('feature-active-module', () => allModules[0]!.id)
const direction = ref<'next' | 'prev'>('next')
const activeModule = computed(() => allModules.find(m => m.id === activeId.value) ?? allModules[0]!)
const isDesktop = useMediaQuery('(min-width: 64rem)')
const detailsOpen = ref(false)

const rootRef = ref<HTMLElement>()
const tabBarRef = ref<HTMLElement>()
const indicatorRef = ref<HTMLElement>()
const motion = usePreferredReducedMotion()

useSectionReveal(rootRef, '.reveal-pre', { batch: true })

watch(activeId, (nextId, prevId) => {
  const nextIdx = allModules.findIndex(m => m.id === nextId)
  const prevIdx = allModules.findIndex(m => m.id === prevId)
  direction.value = nextIdx >= prevIdx ? 'next' : 'prev'
  nextTick(() => updateIndicator(true))
})

watch(isDesktop, (wide) => {
  detailsOpen.value = wide
  scheduleScrollTriggerRefresh(320)
})

function onDetailsToggle(e: Event) {
  detailsOpen.value = (e.target as HTMLDetailsElement).open
  scheduleScrollTriggerRefresh(320)
}

function updateIndicator(animate = false) {
  const bar = tabBarRef.value
  const ind = indicatorRef.value
  if (!bar || !ind) return
  const btn = document.getElementById(`module-${activeId.value}`)
  if (!btn) return
  const barRect = bar.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()
  const x = btnRect.left - barRect.left
  const width = btnRect.width

  if (!animate || motion.value === 'reduce') {
    gsap.set(ind, { x, width, opacity: 1 })
  } else {
    gsap.to(ind, { x, width, opacity: 1, duration: 0.28, ease: 'power3.out' })
  }
}

useResizeObserver(tabBarRef, () => updateIndicator(false))

function selectFromHash() {
  const match = window.location.hash.match(/^#module-(.+)$/)
  if (match && allModules.some(m => m.id === match[1])) {
    activeId.value = match[1]!
  }
}

onMounted(() => {
  detailsOpen.value = isDesktop.value
  selectFromHash()
  nextTick(() => updateIndicator(false))
  window.addEventListener('hashchange', selectFromHash)
})
onUnmounted(() => {
  window.removeEventListener('hashchange', selectFromHash)
})
</script>

<template>
  <section id="features" ref="rootRef" class="section-y overflow-x-clip" aria-labelledby="explorer-title">
    <div class="page-x">
      <div class="stack-head reveal-pre mx-auto max-w-[68ch] text-center">
        <h2 id="explorer-title">What is in the window</h2>
        <p class="text-lead text-muted">Six tools share one connection to your server, ordered the way you work. The previews below use sample data, so click around.</p>
      </div>

      <!-- Flat, unboxed OpenProject-style underline tabs grouped by order of operations -->
      <div class="pool pool-center mx-auto max-w-[64rem]">
        <div
          ref="tabBarRef"
          role="group"
          aria-label="Ferry workflow tools"
          class="reveal-pre relative flex flex-wrap items-end justify-center gap-x-5 gap-y-2.5 border-b border-default sm:gap-x-8 sm:gap-y-4"
        >
          <div v-for="(stage, si) in stages" :key="stage.label" class="flex flex-col gap-0.5 sm:gap-1" :class="si > 0 ? 'lg:border-l lg:border-default/60 lg:pl-8' : ''">
            <span class="px-2 text-xs font-medium text-muted">{{ stage.label }}</span>
            <div class="flex flex-wrap gap-0.5 sm:gap-1">
              <button
                v-for="m in stage.items"
                :key="m.id"
                :id="`module-${m.id}`"
                type="button"
                :aria-pressed="activeId === m.id"
                class="-mb-px flex min-h-11 items-center gap-1.5 border-b-2 px-2.5 pb-2 pt-1 text-small transition-colors sm:gap-2 sm:px-3 sm:pb-2.5 lg:border-b-0"
                :class="activeId === m.id
                  ? 'border-primary font-semibold text-highlighted'
                  : 'border-transparent font-medium text-muted hover:border-default hover:text-highlighted'"
                @click="activeId = m.id"
              >
                <UIcon :name="m.icon" class="size-4 shrink-0" :class="activeId === m.id ? 'text-primary' : ''" aria-hidden="true" />
                <span>{{ m.title }}</span>
              </button>
            </div>
          </div>
          <!-- Animated active underline on desktop single-row layout -->
          <span
            ref="indicatorRef"
            aria-hidden="true"
            class="pointer-events-none absolute -bottom-px left-0 hidden h-0.5 rounded-full bg-primary opacity-0 lg:block"
          />
        </div>

        <!-- Text-before-demo: active module heading & summary always sit above the interactive preview -->
        <div class="mt-6 text-center sm:mt-10">
          <p class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated/80 px-3.5 py-1 text-small font-semibold text-primary">
            <UIcon :name="activeModule.icon" class="size-4" aria-hidden="true" />
            <span>{{ activeModule.stage }} · {{ activeModule.title }}</span>
          </p>
          <h3 class="mx-auto mt-3 max-w-[34ch] sm:mt-4">{{ activeModule.line }}</h3>
        </div>

        <div class="mt-6 sm:mt-8">
          <Transition :name="direction === 'next' ? 'swap-next' : 'swap-prev'" mode="out-in">
            <component :is="activeModule.demo" :key="activeModule.id" class="hover-lift mx-auto max-w-[64rem]" />
          </Transition>
        </div>

        <!-- Capabilities list: collapsed by default on phones/tablets, expanded by default on lg+ -->
        <SpotlightSurface
          as="details"
          :open="detailsOpen"
          class="group hover-lift surface-specular mx-auto mt-6 max-w-[64rem] rounded-[20px] border border-default bg-elevated/80 px-5 sm:mt-8 sm:px-8"
          @toggle="onDetailsToggle"
        >
          <summary class="relative flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon :name="activeModule.icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>Included in {{ activeModule.title }} ({{ activeModule.subs.length }} capabilities)</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <dl class="relative grid gap-x-8 gap-y-4 border-t border-default pb-6 pt-5 sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-3">
            <div v-for="[n, d] in activeModule.subs" :key="n" class="grid grid-cols-[1.25rem_1fr] gap-x-2.5">
              <UIcon name="i-lucide-check" class="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt class="text-small font-semibold text-highlighted">{{ n }}</dt>
                <dd class="mt-0.5 text-small text-muted">{{ d }}</dd>
              </div>
            </div>
          </dl>
        </SpotlightSurface>
      </div>
    </div>
  </section>
</template>
