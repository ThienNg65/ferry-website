<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt: string
  width: number
  height: number
  eager?: boolean
}>(), { eager: false })

const lightSrc = computed(() => props.src.replace('/media/', '/media/light/'))
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :fetchpriority="eager ? 'high' : undefined"
    :loading="eager ? undefined : 'lazy'"
    decoding="async"
    class="shot-dark block h-auto w-full"
  >
  <img
    :src="lightSrc"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    class="shot-light block h-auto w-full"
  >
</template>
