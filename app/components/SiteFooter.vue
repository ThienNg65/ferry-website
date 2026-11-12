<script setup lang="ts">
const props = defineProps<{ releasesUrl: string, notesUrl: string }>()
const cols = [
  { title: 'Product', links: [['Features', '#features'], ['Download', '#download'], ['Questions', '#faq']] },
  { title: 'Releases', links: [['Latest release', props.releasesUrl], ['Release notes', props.notesUrl], ['Changelog', props.releasesUrl.replace(/\/latest$/, '')], ['Licence', 'https://github.com/ThienNg65/ferry-release/blob/main/LICENSE']] },
  { title: 'Help', links: [['Report an issue', 'https://github.com/ThienNg65/ferry-release/issues'], ['This website', 'https://github.com/ThienNg65/ferry-website']] }
]
</script>

<template>
  <footer class="border-t border-ink/10 bg-sky">
    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-[1.5fr_repeat(3,1fr)] sm:px-6">
      <div>
        <p class="flex items-center gap-2.5 font-display text-xl font-bold"><img src="/icon.webp" alt="" width="32" height="32" class="size-8 rounded-lg">Ferry</p>
        <p class="mt-3 max-w-[28ch] text-sm text-slate-ink">A Windows app for working with remote servers.</p>
      </div>
      <nav v-for="c in cols" :key="c.title" :aria-label="c.title">
        <h2 class="font-sans text-sm font-semibold">{{ c.title }}</h2>
        <ul class="mt-2">
          <li v-for="[t, u] in c.links" :key="t"><a :href="u" class="flex min-h-11 items-center text-sm text-slate-ink hover:text-ink">{{ t }}</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
