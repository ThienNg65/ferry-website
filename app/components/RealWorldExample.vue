<script setup lang="ts">
// The story is told with the app itself: picking a step shows that view of the window.
const steps = [
  { view: 'files', icon: 'i-lucide-folder-open', demo: resolveComponent('DemoFiles'), text: 'Open the server’s tab. Its folders and its terminal are already there.' },
  { view: 'logs', icon: 'i-lucide-scroll-text', demo: resolveComponent('DemoLogs'), text: 'Follow app.log as it is written and filter it down to errors.' },
  { view: 'files', icon: 'i-lucide-file-pen', demo: resolveComponent('DemoFiles'), text: 'Open the config file, fix the setting and save it back to the server.' },
  { view: 'terminal', icon: 'i-lucide-terminal', demo: resolveComponent('DemoTerminal'), text: 'Restart the service in the terminal, in the same window.' },
  { view: 'monitor', icon: 'i-lucide-activity', demo: resolveComponent('DemoMonitor'), text: 'Watch CPU settle in the monitor and confirm the fix held.' }
]
const active = ref(0)
const rootRef = ref<HTMLElement>()

useSectionReveal(rootRef, '.reveal-head', { y: 20, batch: true })
useSectionReveal(rootRef, '.reveal-step', { y: 16, stagger: 0.06, batch: true })
// Animate opacity only on an inner child so the outer `lg:sticky` wrapper keeps clean scroll-tracking.
useSectionReveal(rootRef, '.reveal-demo', { y: 0, duration: 0.55, batch: true })
</script>

<template>
  <section id="example" ref="rootRef" class="band section-y overflow-x-clip" aria-labelledby="example-title">
    <div class="page-x">
      <div class="stack-head reveal-head reveal-pre mx-auto max-w-[68ch] text-center">
        <h2 id="example-title">A deploy broke at 6 pm.</h2>
        <p class="text-lead text-muted">Here is how the next ten minutes go when files, terminal, logs and monitoring live in one window.</p>
      </div>
      <div class="grid items-start gap-5 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div class="space-y-3 lg:space-y-0">
          <ol class="grid grid-cols-5 gap-2 lg:grid-cols-1 lg:gap-2.5">
            <li v-for="(s, i) in steps" :key="s.text" class="reveal-step reveal-pre">
              <SpotlightSurface as="div" class="rounded-[14px]">
                <button
                  type="button" :aria-pressed="active === i"
                  class="hover-lift relative flex min-h-11 w-full items-center justify-center rounded-[14px] border p-2 text-left lg:grid lg:grid-cols-[2rem_1fr_auto] lg:items-start lg:gap-x-3.5 lg:p-4"
                  :class="active === i ? 'surface-specular border-primary/50 bg-elevated text-highlighted' : 'border-default/60 text-muted hover:bg-elevated/60 hover:text-default lg:border-transparent'"
                  @click="active = i"
                >
                  <span
                    class="flex size-7 items-center justify-center rounded-full border text-sm font-semibold lg:size-8"
                    :class="active === i ? 'border-primary bg-primary text-[var(--ui-bg)]' : 'border-default text-muted'" aria-hidden="true"
                  >{{ i + 1 }}</span>
                  <span class="sr-only lg:not-sr-only lg:pt-0.5"><span class="sr-only">Step {{ i + 1 }}: </span>{{ s.text }}</span>
                  <UIcon :name="s.icon" class="hidden size-4 shrink-0 lg:mt-1 lg:block" :class="active === i ? 'text-primary' : 'opacity-60'" aria-hidden="true" />
                </button>
              </SpotlightSurface>
            </li>
          </ol>

          <!-- Mobile/tablet active step text paired directly above the demo -->
          <SpotlightSurface as="div" class="surface-specular rounded-[14px] border border-primary/40 bg-elevated p-4 lg:hidden">
            <div class="flex items-start gap-3">
              <UIcon :name="steps[active]!.icon" class="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              <p class="text-small text-highlighted"><span class="font-semibold text-primary">Step {{ active + 1 }}:</span> {{ steps[active]!.text }}</p>
            </div>
          </SpotlightSurface>
        </div>
        <div class="min-w-0 lg:sticky lg:top-28 lg:min-h-[27rem]">
          <div class="reveal-demo reveal-pre">
            <Transition name="swap" mode="out-in">
              <component :is="steps[active]!.demo" :key="steps[active]!.view" class="hover-lift" />
            </Transition>
          </div>
        </div>
      </div>
      <p class="reveal-head reveal-pre mt-6 text-center text-small text-muted">Interactive preview with sample data.</p>
      <p class="reveal-head reveal-pre mt-10 text-center text-2xl font-semibold text-highlighted sm:mt-16">One window, no tool switching.</p>
    </div>
  </section>
</template>
