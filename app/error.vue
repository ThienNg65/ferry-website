<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { releasesUrl, notesUrl } = useLatestRelease()

const isNotFound = computed(() => props.error?.statusCode === 404)
const pageTitle = computed(() => (isNotFound.value ? 'Page Not Found - Ferry' : 'Something Went Wrong - Ferry'))

useHead({
  title: pageTitle,
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})

const handleGoHome = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <a href="#main" class="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main" class="page-x flex min-h-[70vh] items-center justify-center py-20 text-center">
      <div class="max-w-[34rem]">
        <p class="font-mono text-small font-semibold text-primary">
          {{ error?.statusCode || 404 }}
        </p>
        <h1 class="mt-2 text-3xl sm:text-4xl">
          {{ isNotFound ? 'Page not found' : 'Unable to load this page' }}
        </h1>
        <p class="mt-4 text-default text-muted">
          {{ isNotFound
            ? 'The link may have moved or the URL has a typo. Jump back to Ferry home, watch the 35-second product tour, or compare Ferry with other Windows SSH & SFTP tools.'
            : (error?.statusMessage || 'An unexpected error occurred while rendering this page.') }}
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <UButton size="lg" class="min-h-11 rounded-[5px] px-5 font-semibold" @click="handleGoHome">
            <span>Back to Ferry home</span>
          </UButton>
          <NuxtLink
            to="/tour"
            class="inline-flex min-h-11 items-center rounded-[5px] border border-default bg-elevated px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary"
          >
            35s Product Tour
          </NuxtLink>
          <NuxtLink
            to="/vs/winscp"
            class="inline-flex min-h-11 items-center rounded-[5px] border border-default bg-elevated px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary"
          >
            Ferry vs. WinSCP
          </NuxtLink>
          <NuxtLink
            to="/#download"
            class="inline-flex min-h-11 items-center rounded-[5px] border border-default bg-elevated px-4 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary"
          >
            Download Ferry
          </NuxtLink>
        </div>
      </div>
    </main>
    <SiteFooter :releases-url="releasesUrl" :notes-url="notesUrl" />
  </UApp>
</template>
