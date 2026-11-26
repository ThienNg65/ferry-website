<script setup lang="ts">
const props = defineProps<{ title: string, destinationLabel: string, target: string }>()

useHead({
  title: props.title,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

let active = true
let timer: number | undefined

onUnmounted(() => {
  active = false
  if (timer !== undefined) window.clearTimeout(timer)
})

onMounted(() => {
  // Brief delay so @vercel/analytics and Google Ads conversion beacon fire before navigating away.
  const analyticsDelay = new Promise<void>((resolve) => {
    timer = window.setTimeout(resolve, 250)
  })
  const adsConversion = new Promise<void>(resolve => trackAdsConversion(resolve))
  Promise.all([analyticsDelay, adsConversion]).then(() => {
    if (active) window.location.replace(props.target)
  })
})
</script>

<template>
  <main class="page-x flex min-h-[70vh] items-center justify-center py-16 text-center">
    <div class="max-w-[32rem] space-y-4">
      <img src="/ferry-glass.svg" alt="" width="48" height="48" class="mx-auto size-12 rounded-[12px]">
      <h1 class="text-2xl font-semibold text-highlighted">
        Opening {{ destinationLabel }}…
      </h1>
      <p class="text-small text-muted">
        If you are not redirected automatically,
        <a :href="target" rel="noopener" class="font-medium text-primary underline hover:text-highlighted">continue to {{ destinationLabel }}</a>.
      </p>
    </div>
  </main>
</template>
