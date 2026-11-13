<script setup lang="ts">
import type { Installer } from '~/utils/release'
defineProps<{ installer: Installer | null, href: string, label: string }>()
const facts = [
  ['i-lucide-key-round', 'SSH and SFTP only'],
  ['i-lucide-monitor', 'Windows 10 and 11, 64-bit'],
  ['i-lucide-scale', 'MIT licence'],
  ['i-lucide-user-x', 'No account needed']
]
</script>

<template>
  <section class="relative isolate overflow-x-clip pb-4 pt-24 lg:pt-32">
    <div class="grid-fade" aria-hidden="true"></div>
    <div class="page-x text-center">
      <h1 class="rise mx-auto max-w-[22ch]">Files, terminal, logs and monitor. One window.</h1>
      <p class="rise mx-auto mt-7 max-w-[60ch] text-lead text-muted" style="--d: 80ms">
        Ferry is a Windows app for your Linux servers. Move files between two panes, run commands, follow logs as they are written and watch CPU, memory and disk, all over one SSH connection.
      </p>
      <p class="rise mx-auto mt-10 max-w-[60ch] text-small text-muted" style="--d: 120ms">
        The installer is currently unsigned, so Windows may show a SmartScreen warning.
        <a href="#download" class="font-medium text-primary underline underline-offset-4">Details</a>
      </p>
      <div class="rise mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3" style="--d: 160ms">
        <UButton :to="href" :label="label" size="xl" icon="i-lucide-download" class="min-h-11 rounded-[10px]" />
        <a href="#features" class="flex min-h-11 items-center font-medium text-primary underline underline-offset-4">See the features</a>
      </div>
      <p class="rise mt-5 text-small text-muted" style="--d: 220ms">
        <template v-if="installer">Version {{ installer.version }} for Windows 10 and 11, 64-bit.</template>
        <template v-else>For Windows 10 and 11, 64-bit.</template>
        Free · MIT licensed · No account required
      </p>
    </div>

    <div class="page-x relative mt-20">
      <div class="rise relative mx-auto max-w-[68rem]" style="--d: 320ms">
        <div class="aura" aria-hidden="true"></div>
        <HeroDemo />
      </div>
      <ul class="relative z-10 mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-4 text-small text-default sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10">
        <li v-for="[icon, text] in facts" :key="text" class="flex items-center gap-2">
          <UIcon :name="icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />{{ text }}
        </li>
      </ul>
    </div>
  </section>
</template>
