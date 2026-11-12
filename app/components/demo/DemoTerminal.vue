<script setup lang="ts">
// Mirrors terminal/TerminalView.vue: a host label strip over an xterm-style pane (#1e1e1e on #d4d4d4 text in the app's default theme).
defineProps<{ compact?: boolean }>()
const run = ref(0)
const cmds = [{ cmd: 'sudo systemctl restart web-api', at: 0.3 }, { cmd: 'systemctl status web-api', at: 2.4 }]
</script>

<template>
  <DemoWindow label="Ferry terminal, working illustration" :bare="compact">
    <div class="flex items-center justify-between border-b border-[var(--line)] pl-3 text-[var(--muted)]">
      <span>ferrytest@127.0.0.1</span>
      <button v-if="!compact" type="button" class="btn !min-h-11" @click="run++"><UIcon name="i-lucide-rotate-ccw" class="size-3.5" aria-hidden="true" />Replay</button>
    </div>
    <div :key="run" class="mono overflow-hidden bg-[var(--term-bg)] px-3 py-3 leading-relaxed text-[var(--term-fg)]" :class="compact ? 'h-28' : 'h-72'" aria-hidden="true">
      <p v-for="t in cmds" :key="t.cmd" class="mt-1.5">
        <span class="text-[var(--ok)]">web-api:~$ </span><span class="type" :style="{ width: `${t.cmd.length}ch`, animationTimingFunction: `steps(${t.cmd.length})`, animationDelay: `${t.at}s` }">{{ t.cmd }}</span>
      </p>
      <div class="line" style="animation-delay: 4s">
        <p class="mt-1.5"><span class="mr-2 inline-block size-2 rounded-full bg-[var(--ok)]" />web-api.service - Web API</p>
        <p>&nbsp;&nbsp;&nbsp;Active: <span class="text-[var(--ok)]">active (running)</span> since Thu 2026-11-12 14:02:11 UTC; 2s ago</p>
        <p v-if="!compact">&nbsp;Main PID: 1377 (node)</p>
      </div>
      <p class="line mt-1.5" style="animation-delay: 4.2s"><span class="text-[var(--ok)]">web-api:~$ </span><span class="cursor" /></p>
    </div>
  </DemoWindow>
</template>
