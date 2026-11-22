<script setup lang="ts">
// Mirrors the app's two-pane file view (FilePane.vue + FileRow.vue): active-pane indicator, compact toolbar, bold folders, and inline symlink target.
const props = withDefaults(defineProps<{ compact?: boolean, send?: string, activeSide?: 'local' | 'remote' }>(), {
  activeSide: 'local'
})
type Row = readonly [string, string, string, string, string?, string?]
const icons: Record<string, string> = { dir: 'i-lucide-folder', json: 'i-lucide-file-json', file: 'i-lucide-file-text', archive: 'i-lucide-file-archive' }
const local = props.compact ? localFiles.filter(f => f[1] === 'dir' || f[0] === 'package.json') : localFiles
const picked = ref('')
const seq = ref(0)
const sent = ref<string[]>([])
const activePane = ref<'local' | 'remote'>(props.activeSide)
watch(() => props.activeSide, (s) => { activePane.value = s })

function sendFile(name: string) {
  if (!sent.value.includes(name)) sent.value = [...sent.value, name]
  picked.value = name
  activePane.value = 'local'
  seq.value++
}
watch(() => props.send, (n) => { if (n) sendFile(n); else picked.value = '' }, { immediate: true })

const remote = computed<Row[]>(() => {
  const added = sent.value.map((n): Row => { const f = localFiles.find(l => l[0] === n)!; return [n, f[1], f[2], 'Nov 12, 01:44 PM', f[1] === 'dir' ? 'Read, Write & Execute' : 'Read & Write'] })
  const rows = [...remoteFiles.filter(r => !sent.value.includes(r[0])), ...added]
  return rows.sort((a, b) => Number(b[1] === 'dir') - Number(a[1] === 'dir') || a[0].localeCompare(b[0]))
})
</script>

<template>
  <DemoWindow label="Ferry file view, working illustration" :bare="compact">
    <div class="relative grid grid-cols-2">
      <div class="pane border-r border-[var(--line)]" @pointerdown="activePane = 'local'">
        <div
          class="crumb border-b border-[var(--line)] bg-[rgba(13,18,30,0.52)]"
          :class="activePane === 'local' ? 'shadow-[inset_0_-2px_0_var(--accent)]' : ''"
        >
          <span class="crumb-pill" :class="activePane === 'local' ? 'border-[var(--accent)]/40' : ''">
            <UIcon name="i-lucide-hard-drive" class="size-3 shrink-0 text-[var(--accent-text)]" aria-hidden="true" />
            <span class="min-w-0 truncate">C:\ ferry-demo \ <b>web-api</b></span>
          </span>
          <span class="hidden shrink-0 items-center gap-1.5 text-[var(--muted)] sm:flex" aria-hidden="true">
            <UIcon name="i-lucide-arrow-up" class="size-3" />
            <UIcon name="i-lucide-refresh-cw" class="size-3" />
            <UIcon name="i-lucide-folder-plus" class="size-3" />
            <UIcon name="i-lucide-search" class="size-3" />
          </span>
        </div>
        <div class="row head border-b border-[var(--line)]" aria-hidden="true"><span>Name</span><span class="meta">Size</span><span class="mod">Modified</span></div>
        <component :is="compact ? 'div' : 'button'" v-for="f in local" :key="f[0]" :type="compact ? undefined : 'button'" :aria-label="compact ? undefined : `Send ${f[0]} to the server`"
          class="row relative w-full text-left transition-colors hover:bg-white/4" :class="{ sel: picked === f[0] }" @click="!compact && sendFile(f[0])">
          <span class="name">
            <UIcon :name="icons[f[1]]" class="icon" :class="{ json: f[1] === 'json' }" aria-hidden="true" />
            <span class="truncate" :class="{ 'font-medium': f[1] === 'dir' }">{{ f[0] }}</span>
          </span>
          <span class="meta" aria-hidden="true">{{ f[2] }}</span><span class="mod" aria-hidden="true">{{ f[3] }}</span>
          <span v-if="picked === f[0]" :key="`bar-${seq}`" class="absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true"><i class="bar block h-full bg-[var(--beacon)]" style="animation: bar 1.6s linear backwards" /></span>
        </component>
      </div>
      <div class="pane" @pointerdown="activePane = 'remote'">
        <div
          class="crumb border-b border-[var(--line)] bg-[rgba(13,18,30,0.52)]"
          :class="activePane === 'remote' ? 'shadow-[inset_0_-2px_0_var(--accent)]' : ''"
        >
          <span class="crumb-pill" :class="activePane === 'remote' ? 'border-[var(--accent)]/40' : ''">
            <UIcon name="i-lucide-server" class="size-3 shrink-0 text-[var(--ok-text)]" aria-hidden="true" />
            <span class="min-w-0 truncate">/ config / apps / <b>web-api</b></span>
          </span>
          <span class="hidden shrink-0 items-center gap-1.5 text-[var(--muted)] sm:flex" aria-hidden="true">
            <UIcon name="i-lucide-arrow-up" class="size-3" />
            <UIcon name="i-lucide-refresh-cw" class="size-3" />
            <UIcon name="i-lucide-search" class="size-3" />
            <UIcon name="i-lucide-bookmark" class="size-3" />
          </span>
        </div>
        <div class="row r head border-b border-[var(--line)]" aria-hidden="true"><span>Name</span><span class="meta">Size</span><span class="mod">Modified</span><span class="perm">Permissions</span></div>
        <div v-for="r in remote" :key="r[0] + (r[0] === picked ? seq : '')" class="row r transition-colors hover:bg-white/4" :class="{ arrive: r[0] === picked }">
          <span class="name">
            <span v-if="r[5]" class="relative inline-flex size-4 shrink-0" aria-hidden="true">
              <UIcon :name="icons[r[1]]" class="icon" />
              <UIcon name="i-lucide-link-2" class="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[var(--bg)] text-[var(--muted)]" />
            </span>
            <UIcon v-else :name="icons[r[1]]" class="icon" :class="{ json: r[1] === 'json' }" aria-hidden="true" />
            <span class="truncate" :class="{ 'font-medium': r[1] === 'dir' }">{{ r[0] }}</span>
            <span v-if="r[5]" class="min-w-0 flex-1 truncate text-[11px] font-normal text-[var(--muted)]">→ {{ r[5] }}</span>
          </span>
          <span class="meta">{{ r[2] }}</span><span class="mod">{{ r[3] }}</span><span class="perm"><i>{{ r[4] }}</i></span>
        </div>
      </div>
      <span v-if="picked" :key="`chip-${seq}`" class="chip" aria-hidden="true"><UIcon name="i-lucide-folder" class="icon" />{{ picked }}</span>
    </div>
    <div v-if="!compact" class="demo-glass-chrome flex items-center justify-between border-t border-[var(--line)] px-3 py-1.5 text-[11px] text-[var(--muted)]" aria-hidden="true">
      <span class="flex items-center gap-1.5">
        <UIcon name="i-lucide-upload" class="size-3 text-[var(--accent-text)]" />
        <span>Click any local file on the left to send it to the server</span>
      </span>
      <span class="hidden sm:inline">7 folders, 4 files</span>
    </div>
  </DemoWindow>
</template>

<style scoped>
.arrive { animation: arrive 400ms ease-out 1.6s backwards; }
@keyframes arrive { from { opacity: 0; background: var(--sel); } }
.chip {
  position: absolute; top: 40%; left: 50%; display: flex; align-items: center; gap: .375rem; pointer-events: none;
  padding: .25rem .625rem; border-radius: 9999px; background: var(--sel); color: var(--fg); box-shadow: 0 8px 24px -8px var(--shadow);
  opacity: 0; animation: ferry 1.6s ease-in-out backwards;
}
@keyframes ferry { 0% { opacity: 0; left: 8%; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; left: 58%; } }
</style>
