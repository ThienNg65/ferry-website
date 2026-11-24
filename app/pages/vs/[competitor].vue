<script setup lang="ts">
import { comparisons, competitorSlugs, type CompetitorSlug } from '~/utils/comparisons'
import { GO_STORE_PATH } from '~/utils/release'

const route = useRoute()
const slug = String(route.params.competitor ?? '') as CompetitorSlug

if (!competitorSlugs.includes(slug)) {
  throw createError({ statusCode: 404, statusMessage: 'Comparison page not found' })
}

const spec = comparisons[slug]
const others = competitorSlugs.filter(s => s !== slug).map(s => comparisons[s])
const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

useHead({
  title: spec.metaTitle,
  link: [{ rel: 'canonical', href: `${site}/vs/${spec.slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildComparisonJsonLd(site, spec.slug, spec.metaTitle, spec.metaDescription, spec.competitor))
    }
  ]
})

useSeoMeta({
  title: spec.metaTitle,
  description: spec.metaDescription,
  ogTitle: spec.metaTitle,
  ogDescription: spec.metaDescription,
  ogUrl: `${site}/vs/${spec.slug}`,
  ogImage: `${site}/og.jpg`,
  twitterTitle: spec.metaTitle,
  twitterDescription: spec.metaDescription,
  twitterImage: `${site}/og.jpg`
})
</script>

<template>
  <article class="section-y">
    <div class="page-x max-w-4xl">
      <nav aria-label="Breadcrumb" class="mb-6 text-small text-muted">
        <NuxtLink to="/" class="hover:text-highlighted">Ferry</NuxtLink>
        <span aria-hidden="true"> / </span>
        <NuxtLink to="/#compare" class="hover:text-highlighted">Compare</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span class="text-highlighted">Ferry vs. {{ spec.competitor }}</span>
      </nav>

      <h1>{{ spec.h1 }}</h1>
      <p class="mt-5 max-w-[65ch] text-lead text-muted">{{ spec.subtitle }}</p>
      <p class="mt-4 max-w-[68ch] text-default">{{ spec.angle }}</p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <UButton :to="GO_STORE_PATH" target="_blank" rel="noopener" size="xl" class="min-h-12 rounded-lg px-6 font-semibold">
          <UIcon name="i-lucide-shopping-bag" class="size-5 shrink-0" aria-hidden="true" />
          <span>{{ spec.ctaLabel }}</span>
        </UButton>
        <NuxtLink to="/#download" class="inline-flex min-h-12 items-center gap-2 rounded-lg border border-default bg-elevated px-5 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary">
          <UIcon name="i-lucide-download" class="size-4 text-primary" aria-hidden="true" />
          <span>Direct .exe &amp; Portable .zip</span>
        </NuxtLink>
      </div>

      <div class="mt-10">
        <figure class="window overflow-hidden bg-elevated">
          <AppShot
            src="/media/files-terminal.webp"
            alt="Ferry Modern Glass UI showing dual-pane SFTP and embedded SSH terminal"
            :width="1920"
            :height="1080"
            eager
          />
        </figure>
      </div>

      <section class="mt-14" aria-labelledby="vs-table-title">
        <h2 id="vs-table-title">Side-by-side: Ferry vs. {{ spec.competitor }}</h2>
        <div role="region" aria-labelledby="vs-table-title" tabindex="0" class="mt-5 overflow-x-auto rounded-[14px] border border-default bg-elevated">
          <table class="w-full min-w-[38rem] border-collapse text-left text-base">
            <thead>
              <tr class="border-b border-default bg-muted/60">
                <th scope="col" class="w-[34%] px-4 py-3.5 text-small font-medium text-muted">Capability</th>
                <th scope="col" class="w-[33%] bg-primary/8 px-4 py-3.5 font-bold text-highlighted">
                  <span class="flex items-center gap-2"><img src="/ferry-glass.svg" alt="" width="20" height="20" class="size-5 rounded-[5px]">Ferry</span>
                </th>
                <th scope="col" class="w-[33%] px-4 py-3.5 font-semibold text-highlighted">{{ spec.competitor }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default">
              <tr v-for="[feature, ferryVal, compVal] in spec.rows" :key="feature" class="align-top">
                <th scope="row" class="px-4 py-3.5 font-medium text-highlighted">{{ feature }}</th>
                <td class="bg-primary/8 px-4 py-3.5 font-medium text-highlighted">{{ ferryVal }}</td>
                <td class="px-4 py-3.5 text-muted">{{ compVal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-12 rounded-[14px] border border-default bg-elevated p-6" aria-labelledby="stick-title">
        <h2 id="stick-title" class="text-xl">{{ spec.stickWithTitle }}</h2>
        <p class="mt-2 text-default">{{ spec.stickWithText }}</p>
      </section>

      <section class="mt-12" aria-labelledby="migrate-title">
        <h2 id="migrate-title">Switch in 30 seconds</h2>
        <ol class="mt-4 list-decimal space-y-2.5 pl-5 text-default">
          <li v-for="step in spec.migrationSteps" :key="step">{{ step }}</li>
        </ol>
      </section>

      <nav aria-label="Other comparisons" class="mt-14 border-t border-default pt-8">
        <p class="text-small font-semibold text-highlighted">Other comparisons</p>
        <ul class="mt-3 flex flex-wrap gap-2.5">
          <li v-for="o in others" :key="o.slug">
            <NuxtLink
              :to="`/vs/${o.slug}`"
              class="inline-flex min-h-11 items-center rounded-lg border border-default bg-elevated px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary"
            >
              Ferry vs. {{ o.competitor }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </article>
</template>
