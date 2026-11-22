<script setup lang="ts">
const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { batch: true })

const logBullets = [
  ['i-lucide-radio', 'Stream logs live as lines are written with tail -F'],
  ['i-lucide-filter', 'Filter straight to Errors or Warnings without grepping manually'],
  ['i-lucide-align-right', 'Spot error spikes quickly on the right-hand overview rail']
] as const

const monitorBullets = [
  ['i-lucide-cpu', 'Live CPU, memory, swap, and storage bars'],
  ['i-lucide-arrow-up-down', 'Sort running processes by CPU or memory usage'],
  ['i-lucide-server-off', 'Nothing extra to install on your Linux servers']
] as const
</script>

<template>
  <div ref="rootRef">
    <section class="section-y border-t border-default bg-muted/40" aria-labelledby="logs-title">
      <div class="page-x grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <div class="reveal-pre">
          <h2 id="logs-title">
            <span class="heading-muted">Find broken</span> deploys faster
          </h2>
          <p class="mt-4 max-w-[46ch] text-lead text-muted">
            When a service goes down, you should not have to open another SSH window just to read logs.
          </p>
          <ul class="mt-6 space-y-3.5">
            <li v-for="[icon, text] in logBullets" :key="text" class="flex items-start gap-3 text-default">
              <UIcon :name="icon" class="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>{{ text }}</span>
            </li>
          </ul>
        </div>
        <figure class="reveal-pre window bg-[#070b14]">
          <img
            src="/media/log-tail.webp"
            alt="Ferry live log tail showing error and warning filters with the right-hand overview rail"
            width="1920"
            height="1080"
            loading="lazy"
            class="block h-auto w-full"
          >
        </figure>
      </div>
    </section>

    <section class="section-y border-t border-default" aria-labelledby="monitor-title">
      <div class="page-x grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
        <figure class="reveal-pre window order-2 bg-[#070b14] lg:order-1">
          <img
            src="/media/monitor.webp"
            alt="Ferry resource monitor displaying CPU, memory, storage, and running processes"
            width="1920"
            height="1200"
            loading="lazy"
            class="block h-auto w-full"
          >
        </figure>
        <div class="reveal-pre order-1 lg:order-2">
          <h2 id="monitor-title">
            <span class="heading-muted">See what the</span> server is doing
          </h2>
          <p class="mt-4 max-w-[46ch] text-lead text-muted">
            Check CPU load, memory, disk space, and busy processes over the SSH session you already have open.
          </p>
          <ul class="mt-6 space-y-3.5">
            <li v-for="[icon, text] in monitorBullets" :key="text" class="flex items-start gap-3 text-default">
              <UIcon :name="icon" class="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>{{ text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
