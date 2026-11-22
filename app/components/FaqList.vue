<script setup lang="ts">
import { faqItems } from '~/utils/comparisons'

const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { stagger: 0.05, batch: true })
</script>

<template>
  <section id="faq" ref="rootRef" class="section-y mx-auto max-w-3xl px-6" aria-labelledby="faq-title">
    <h2 id="faq-title" class="reveal-pre">
      <span class="heading-muted">Frequently Asked</span> Questions
    </h2>
    <div class="mt-10 divide-y divide-default border-y border-default">
      <details v-for="[q, a] in faqItems" :key="q" class="reveal-pre group py-1" @toggle="scheduleScrollTriggerRefresh(320)">
        <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-highlighted hover:text-primary">
          {{ q }}
          <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p class="pb-6 text-muted">{{ a }}</p>
      </details>
    </div>
  </section>
</template>
