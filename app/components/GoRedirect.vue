<script setup lang="ts">
const props = defineProps<{ title: string, destinationLabel: string, target: string }>()

useHead({
  title: props.title,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

onMounted(() => {
  // Brief delay so @vercel/analytics records the /go/* pageview before navigating away.
  window.setTimeout(() => {
    window.location.replace(props.target)
  }, 250)
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
