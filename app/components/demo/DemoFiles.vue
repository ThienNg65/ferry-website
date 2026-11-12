<script setup lang="ts">
// Mirrors the app's two-pane file view (hero recording). Click a local file to send it. `send` lets the hero play the same move by itself.
const props = defineProps<{ compact?: boolean, send?: string }>()
type Row = readonly [string, string, string, string, string?]
const icons: Record<string, string> = { dir: 'i-lucide-folder', json: 'i-lucide-file-json', file: 'i-lucide-file-text', archive: 'i-lucide-file-archive' }
const local = props.compact ? localFiles.filter(f => f[1] === 'dir' || f[0] === 'package.json') : localFiles
const picked = ref('')
const seq = ref(0)
const sent = ref<string[]>([])

function sendFile(name: string) {
  if (!sent.value.includes(name)) sent.value = [...sent.value, name]
  picked.value = name
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
      <div class="pane border-r border-[var(--line)]">
        <p class="crumb">C:\ ferry-demo / <b>web-api</b></p>
        <div class="row head" aria-hidden="true"><span>Name</span><span class="meta">Size</span><span class="mod">Modified</span></div>
        <component :is="compact ? 'div' : 'button'" v-for="f in local" :key="f[0]" :type="compact ? undefined : 'button'" :aria-label="compact ? undefined : `Send ${f[0]} to the server`"
          class="row relative w-full text-left" :class="{ sel: picked === f[0] }" @click="!compact && sendFile(f[0])">
          <span class="name"><UIcon :name="icons[f[1]]" class="icon" :class="{ json: f[1] === 'json' }" aria-hidden="true" />{{ f[0] }}</span>
          <span class="meta" aria-hidden="true">{{ f[2] }}</span><span class="mod" aria-hidden="true">{{ f[3] }}</span>
          <span v-if="picked === f[0]" :key="`bar-${seq}`" class="absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true"><i class="bar block h-full bg-[var(--beacon)]" style="animation: bar 1.6s linear backwards" /></span>
        </component>
      </div>
      <div class="pane">
        <p class="crumb">/ config / apps / <b>web-api</b></p>
        <div class="row r head" aria-hidden="true"><span>Name</span><span class="meta">Size</span><span class="mod">Modified</span><span class="perm">Permissions</span></div>
        <div v-for="r in remote" :key="r[0] + (r[0] === picked ? seq : '')" class="row r" :class="{ arrive: r[0] === picked }">
          <span class="name"><UIcon :name="icons[r[1]]" class="icon" :class="{ json: r[1] === 'json' }" aria-hidden="true" />{{ r[0] }}</span>
          <span class="meta">{{ r[2] }}</span><span class="mod">{{ r[3] }}</span><span class="perm"><i>{{ r[4] }}</i></span>
        </div>
      </div>
      <span v-if="picked" :key="`chip-${seq}`" class="chip" aria-hidden="true"><UIcon name="i-lucide-folder" class="icon" />{{ picked }}</span>
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
