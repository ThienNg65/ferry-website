<script setup lang="ts">
// The story is told with the app itself: picking a step shows that view of the window.
const steps = [
  { view: 'files', demo: resolveComponent('DemoFiles'), text: 'Open the server’s tab. Its folders and its terminal are already there.' },
  { view: 'logs', demo: resolveComponent('DemoLogs'), text: 'Follow app.log as it is written and filter it down to errors.' },
  { view: 'files', demo: resolveComponent('DemoFiles'), text: 'Open the config file, fix the setting and save it back to the server.' },
  { view: 'terminal', demo: resolveComponent('DemoTerminal'), text: 'Restart the service in the terminal, in the same window.' },
  { view: 'monitor', demo: resolveComponent('DemoMonitor'), text: 'Watch CPU settle in the monitor and confirm the fix held.' }
]
const active = ref(0)
</script>

<template>
  <section id="example" class="band section-y overflow-x-clip" aria-labelledby="example-title">
    <div class="page-x">
      <div class="stack-head reveal mx-auto max-w-[68ch] text-center">
        <h2 id="example-title">A deploy broke at 6 pm.</h2>
        <p class="text-lead text-muted">Here is how the next ten minutes go when files, terminal, logs and monitoring live in one window.</p>
      </div>
      <div class="grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <ol class="reveal-l grid gap-2">
          <li v-for="(s, i) in steps" :key="s.text">
            <button
              type="button" :aria-pressed="active === i"
              class="grid w-full grid-cols-[2rem_1fr] items-start gap-x-4 rounded-[14px] border p-4 text-left"
              :class="active === i ? 'border-primary/50 bg-elevated text-highlighted' : 'border-transparent text-muted hover:bg-elevated/60 hover:text-default'"
              @click="active = i"
            >
              <span
                class="flex size-8 items-center justify-center rounded-full border text-sm font-semibold"
                :class="active === i ? 'border-primary bg-primary text-[var(--ui-bg)]' : 'border-default text-muted'" aria-hidden="true"
              >{{ i + 1 }}</span>
              <span class="pt-0.5"><span class="sr-only">Step {{ i + 1 }}: </span>{{ s.text }}</span>
            </button>
          </li>
        </ol>
        <div class="reveal-r min-w-0 lg:sticky lg:top-28 lg:min-h-[27rem]">
          <Transition name="swap" mode="out-in">
            <component :is="steps[active]!.demo" :key="steps[active]!.view" />
          </Transition>
        </div>
      </div>
      <p class="reveal mt-16 text-center text-2xl font-semibold text-highlighted">One window, no tool switching.</p>
    </div>
  </section>
</template>
