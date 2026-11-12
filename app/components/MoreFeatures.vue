<script setup lang="ts">
const rows = [
  { img: 'sync', title: 'Keep folders in step', text: 'Preview a one-way sync before it runs: how many files will move and how many will be deleted. Then push or pull.', alt: 'Ferry sync dialog showing nine files to transfer and three destination items to be deleted.' },
  { img: 'connection', title: 'Connect your way', text: 'Use a password, a private key or your SSH agent, with jump hosts and proxies when a server sits behind one. Group sites and colour production, staging and development so you always know where you are.', alt: 'Ferry saved sites grouped into Development, Production and Staging, with coloured dots for each environment.' },
  { img: 'settings-terminal', title: 'Make it yours', text: 'Pick an accent colour, a row density and a terminal theme from Dracula, Nord, Solarized and more. Light and dark both included.', alt: 'Ferry settings showing a gallery of terminal colour themes with a live preview.' },
  { img: 'history', title: 'See what moved', text: 'Every upload and download is kept in a history you can filter by done, failed or cancelled, so you can check what happened last Tuesday.', alt: 'Ferry history dialog listing completed uploads and downloads with sizes and durations.' }
]
const list = [
  ['Tabs for every server', 'Open several servers side by side, each with its own folders and terminal.'],
  ['Command palette', 'Press Ctrl+K to jump to a site or run any action.'],
  ['Bring your sites over', 'Import saved sessions from WinSCP and PuTTY.'],
  ['Cap the bandwidth', 'Limit transfers so a big upload does not flatten the office link.'],
  ['Retry a failed transfer', 'Run it again with one click instead of starting over.'],
  ['Edit in place', 'Open a remote file, change it and save it back.']
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-24 sm:px-6" aria-labelledby="more-title">
    <h2 id="more-title" class="max-w-xl text-step-4 font-bold">Built for the rest of the job</h2>
    <div class="mt-14 space-y-20">
      <div v-for="(r, i) in rows" :key="r.img" class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div :class="i % 2 ? 'lg:order-2' : ''">
          <h3 class="text-step-3 font-bold">{{ r.title }}</h3>
          <p class="mt-3 max-w-[60ch] text-slate-ink">{{ r.text }}</p>
        </div>
        <picture :class="i % 2 ? 'lg:order-1' : ''">
          <source :srcset="`/screens/${r.img}.webp`" type="image/webp">
          <img :src="`/screens/${r.img}.jpg`" width="1600" height="1000" loading="lazy" :alt="r.alt" class="h-auto w-full rounded-xl border border-ink/10 shadow-xl shadow-deep/20">
        </picture>
      </div>
    </div>
    <ul class="mt-24 grid gap-x-14 gap-y-8 sm:grid-cols-2">
      <li v-for="[t, d] in list" :key="t">
        <h3 class="text-step-1 font-semibold">{{ t }}</h3>
        <p class="mt-1 text-slate-ink">{{ d }}</p>
      </li>
    </ul>
  </section>
</template>
