<script setup lang="ts">
const steps = [
  { tab: 'files', text: 'Open the server’s tab. Its folders and its terminal are already there.', link: 'See the file view' },
  { tab: 'logs', text: 'Follow app.log as it is written and filter it down to errors.', link: 'See the log viewer' },
  { tab: 'files', text: 'Open the config file, fix the setting and save it back to the server.', link: 'See the file view' },
  { tab: 'terminal', text: 'Restart the service in the terminal, in the same window.', link: 'See the terminal' },
  { tab: 'monitor', text: 'Watch CPU settle in the monitor and confirm the fix held.', link: 'See the monitor' }
]
</script>

<template>
  <section id="example" class="mx-auto max-w-6xl px-4 py-24 sm:px-6" aria-labelledby="example-title">
    <h2 id="example-title" class="max-w-xl text-step-4 font-bold">A deploy broke at 6 pm.</h2>
    <p class="mt-4 max-w-[60ch] text-step-1 text-slate-ink">Here is how the next ten minutes go when files, terminal, logs and monitoring live in one window.</p>
    <ol class="mt-10 max-w-[68ch] list-decimal space-y-6 pl-8 text-step-1 marker:font-semibold marker:text-ferry-text">
      <li v-for="s in steps" :key="s.text" class="pl-2">
        {{ s.text }}
        <a :href="`#tab-${s.tab}`" class="mt-1 flex min-h-11 items-center text-base font-medium text-ferry-text underline underline-offset-4">{{ s.link }}</a>
      </li>
    </ol>
    <p class="mt-10 font-display text-step-2 font-bold">One window, no tool switching.</p>
  </section>
</template>
