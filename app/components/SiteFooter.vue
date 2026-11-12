<script setup lang="ts">
const props = defineProps<{ releasesUrl: string, notesUrl: string }>()
const repo = 'https://github.com/ThienNg65/ferry-release'
const cols = [
  { title: 'Product', links: [['Features', '#features'], ['Compare', '#compare'], ['Download', '#download'], ['Questions', '#faq']] },
  { title: 'Releases', links: [['Latest release', props.releasesUrl], ['Release notes', props.notesUrl], ['Changelog', props.releasesUrl.replace(/\/latest$/, '')], ['Licence', `${repo}/blob/main/LICENSE`]] },
  { title: 'Help', links: [['Report an issue', `${repo}/issues`], ['This website', 'https://github.com/ThienNg65/ferry-website']] }
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default bg-default">
    <div class="page-x grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
      <div>
        <p class="flex items-center gap-2.5 text-xl font-bold text-highlighted"><img src="/icon.webp" alt="" width="32" height="32" class="size-8 rounded-lg">Ferry</p>
        <p class="mt-4 max-w-[30ch] text-small text-muted">A Windows app for working with remote servers.</p>
        <a :href="repo" class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-default px-4 text-small font-medium text-highlighted hover:border-primary/60 hover:text-primary">
          <UIcon name="i-lucide-github" class="size-5" aria-hidden="true" />Ferry on GitHub
        </a>
      </div>
      <nav v-for="c in cols" :key="c.title" :aria-label="c.title">
        <h2 class="text-small font-semibold tracking-normal">{{ c.title }}</h2>
        <ul class="mt-3">
          <li v-for="[t, u] in c.links" :key="t"><a :href="u" class="flex min-h-11 items-center text-small text-muted hover:text-highlighted">{{ t }}</a></li>
        </ul>
      </nav>
    </div>
    <div class="border-t border-default">
      <div class="page-x flex flex-col items-start justify-between gap-2 py-6 text-small text-muted sm:flex-row sm:items-center">
        <p>© {{ year }} Ferry. Released under the <a :href="`${repo}/blob/main/LICENSE`" class="underline underline-offset-2 hover:text-highlighted">MIT licence</a>.</p>
        <a href="#main" class="flex min-h-11 items-center gap-1.5 hover:text-highlighted"><UIcon name="i-lucide-arrow-up" class="size-4" aria-hidden="true" />Back to top</a>
      </div>
    </div>
  </footer>
</template>
