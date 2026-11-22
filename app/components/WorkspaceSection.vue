<script setup lang="ts">
const items = [
  {
    id: 'files',
    icon: 'i-lucide-folder-open',
    title: 'Move files and sync folders',
    body: 'Browse your PC and Linux server side by side, drag from Explorer, or preview a one-way folder sync before copying anything.',
    src: '/media/folder-sync.webp',
    width: 1600,
    height: 1045,
    alt: 'Ferry dual-pane SFTP file browser with one-way folder sync preview showing files to transfer'
  },
  {
    id: 'terminal',
    icon: 'i-lucide-terminal',
    title: 'Run commands right below your files',
    body: 'Every server tab includes an interactive SSH terminal. Deploy code and restart services without opening PuTTY.',
    src: '/media/files-terminal.webp',
    width: 1920,
    height: 1080,
    alt: 'Ferry dual-pane SFTP window docked above an interactive SSH terminal'
  },
  {
    id: 'editor',
    icon: 'i-lucide-file-code-2',
    title: 'Edit remote files in place',
    body: 'Open nginx configs, .env files, or scripts straight from the remote pane and save them back over SFTP.',
    src: '/media/code-editor.webp',
    width: 1600,
    height: 1000,
    alt: 'Ferry remote file editor modifying package.json on a Linux server with syntax highlighting'
  }
] as const

const active = ref(0)
const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { batch: true })
</script>

<template>
  <section id="features" ref="rootRef" class="section-y border-t border-default" aria-labelledby="workspace-title">
    <div class="page-x">
      <div class="stack-head reveal-pre max-w-[44rem]">
        <h2 id="workspace-title">
          <span class="heading-muted">One window to</span> get server work done
        </h2>
      </div>

      <div class="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <div role="tablist" aria-label="Core server workflows" class="reveal-pre space-y-3">
          <button
            v-for="(item, idx) in items"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="active === idx"
            class="card-lift block w-full rounded-[14px] border p-5 text-left"
            :class="active === idx
              ? 'border-primary/50 bg-elevated text-highlighted'
              : 'border-default/60 bg-transparent text-muted hover:bg-elevated/50 hover:text-highlighted'"
            @click="active = idx"
          >
            <span class="flex items-center gap-2.5 text-base font-semibold" :class="active === idx ? 'text-highlighted' : ''">
              <UIcon :name="item.icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>{{ item.title }}</span>
            </span>
            <span class="mt-2 block text-small leading-relaxed text-muted">
              {{ item.body }}
            </span>
          </button>
        </div>

        <div class="reveal-pre min-w-0">
          <Transition name="swap" mode="out-in">
            <figure :key="items[active]!.id" class="window bg-elevated">
              <AppShot
                :src="items[active]!.src"
                :alt="items[active]!.alt"
                :width="items[active]!.width"
                :height="items[active]!.height"
              />
            </figure>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
