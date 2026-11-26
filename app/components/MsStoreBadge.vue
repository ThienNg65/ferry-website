<script setup lang="ts">
withDefaults(defineProps<{ size?: 'large' | 'small' }>(), { size: 'large' })

useHead({
  script: [
    { key: 'ms-store-badge', type: 'module', src: 'https://get.microsoft.com/badge/ms-store-badge.bundled.js', defer: true }
  ]
})
</script>

<template>
  <span
    class="store-badge-wrap"
    :style="{
      '--badge-h': size === 'small' ? '2.75rem' : '3rem',
      '--badge-w': size === 'small' ? '8.75rem' : '9.75rem'
    }"
    @click.capture="trackAdsConversion()"
  >
    <ms-store-badge
      class="hidden dark:inline-flex"
      productid="9pjpwk568p53"
      window-mode="full"
      theme="dark"
      size="large"
      language="en-us"
      animation="on"
    />
    <ms-store-badge
      class="inline-flex dark:hidden"
      productid="9pjpwk568p53"
      window-mode="full"
      theme="light"
      size="large"
      language="en-us"
      animation="on"
    />
  </span>
</template>

<style scoped>
.store-badge-wrap {
  display: inline-flex;
  align-items: center;
  min-width: var(--badge-w, 9.75rem);
  min-height: var(--badge-h, 3rem);
  line-height: 0;
}

.store-badge-wrap ms-store-badge {
  align-items: center;
  height: var(--badge-h, 3rem);
  line-height: 0;
}

.store-badge-wrap ms-store-badge::part(img) {
  display: block;
  height: var(--badge-h, 3rem);
  width: auto;
}
</style>
