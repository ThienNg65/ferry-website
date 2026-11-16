<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = withDefaults(defineProps<{
  code: string
  label?: string
  copyLabel?: string
}>(), {
  label: '',
  copyLabel: 'Copy command'
})

const { copy, copied } = useClipboard({ copiedDuring: 2000 })
</script>

<template>
  <div class="demo overflow-hidden rounded-[14px] border border-[var(--line)]">
    <div class="flex min-h-11 items-center justify-between gap-3 border-b border-[var(--line)] px-3.5 py-1.5">
      <span v-if="label" class="text-[0.8125rem] font-medium text-[var(--fg)]">{{ label }}</span>
      <span v-else class="sr-only">Command snippet</span>
      <button
        type="button"
        class="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border border-[var(--line)] bg-[var(--chip)] px-3 text-[0.8125rem] font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
        :aria-label="copied ? 'Copied' : props.copyLabel"
        aria-live="polite"
        @click="copy(props.code)"
      >
        <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="size-4 shrink-0" :class="copied ? 'text-[var(--ok)]' : 'text-[var(--accent-text)]'" aria-hidden="true" />
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>
    <pre class="overflow-x-auto px-4 py-3.5 text-[0.8125rem] leading-relaxed text-[var(--fg)]"><code class="mono block w-max min-w-full">{{ props.code }}</code></pre>
  </div>
</template>
