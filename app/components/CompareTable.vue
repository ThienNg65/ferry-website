<script setup lang="ts">
// Cells are copied from .claude/plan/landing-page-v2-plan.md (checked November 2026). Do not edit a cell without re-checking its source.
const rows: [string, string, string, string][] = [
  ['Local and remote side by side', 'Yes, two panes', 'Yes (Commander interface)', 'No: remote browser in a sidebar beside the terminal'],
  ['Interactive SSH terminal in the same window', 'Yes, per server tab', 'No: opens PuTTY; the built-in console can\'t run interactive commands', 'Yes'],
  ['Follow a log live, filter by level', 'Yes', 'No', 'Only `tail` in the terminal'],
  ['Server monitor: CPU, memory, disk, processes', 'Yes, with a process table', 'No', 'Status bar for CPU/RAM/disk; experimental, off by default'],
  ['Folder sync with a preview', 'Yes, one-way', 'Yes, several modes', 'No (rsync in the terminal)'],
  ['Extract and compress archives on the server', 'Yes', 'No built-in action', 'No built-in action'],
  ['Several servers in tabs', 'Yes', 'Yes', 'Yes (Home: up to 12 saved sessions)'],
  ['Keys, SSH agent, jump hosts, 2FA prompts', 'Yes', 'Yes', 'Yes'],
  ['Protocols', 'SSH and SFTP only', 'SFTP, SCP, FTP/FTPS, WebDAV, S3', 'SSH, SFTP, FTP, Telnet, RDP, VNC, X11, serial and more'],
  ['X11 server, RDP, VNC', 'No', 'No', 'Yes'],
  ['Port forwarding (tunnels)', 'No', 'Yes', 'Yes (Home: 2 tunnels)'],
  ['Scripting and automation', 'No', 'Yes: scripts, .NET assembly', 'Macros (Home: 4)'],
  ['Price', 'Free (MIT licence)', 'Free, open source', 'Home free; Professional $69 per user'],
  ['Platform', 'Windows 10/11 x64', 'Windows', 'Windows']
]
const icon = (t: string) => (t.startsWith('Yes') ? 'i-lucide-check' : t.startsWith('No') ? 'i-lucide-minus' : '')
const parts = (t: string) => t.split('`')
const sources = [
  ['WinSCP: introduction', 'https://winscp.net/eng/docs/introduction'],
  ['WinSCP: Commander interface', 'https://winscp.net/eng/docs/ui_commander'],
  ['WinSCP: remote commands', 'https://winscp.net/eng/docs/remote_command'],
  ['WinSCP: tabs', 'https://winscp.net/eng/docs/ui_tabs'],
  ['MobaXterm: features', 'https://mobaxterm.mobatek.net/features.html'],
  ['MobaXterm: download', 'https://mobaxterm.mobatek.net/download.html']
]
</script>

<template>
  <section id="compare" class="py-24" aria-labelledby="compare-title">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="compare-title" class="max-w-xl text-step-4 font-bold">How Ferry compares</h2>
      <p class="mt-4 max-w-[60ch] text-slate-ink">Ferry next to the two tools people most often use for the same job on Windows.</p>
      <div role="region" aria-label="Comparison table, scrolls sideways on small screens" tabindex="0" class="mt-8 overflow-x-auto rounded-lg border border-ink/15 bg-white">
        <table class="w-full min-w-[46rem] border-collapse text-left text-sm">
          <caption class="sr-only">Ferry compared with WinSCP 6.7 and MobaXterm Home, feature by feature</caption>
          <thead>
            <tr class="border-b border-ink/15">
              <th scope="col" class="sticky left-0 z-10 w-[22%] bg-white p-3 font-semibold">Feature</th>
              <th scope="col" class="w-[24%] bg-haze p-3 font-semibold">Ferry</th>
              <th scope="col" class="w-[27%] p-3 font-semibold">WinSCP 6.7</th>
              <th scope="col" class="w-[27%] p-3 font-semibold">MobaXterm Home (free)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rows" :key="r[0]" class="border-b border-ink/10 align-top last:border-0">
              <th scope="row" class="sticky left-0 z-10 bg-white p-3 font-medium">{{ r[0] }}</th>
              <td v-for="(c, i) in r.slice(1)" :key="i" class="p-3" :class="i === 0 ? 'bg-haze/60 font-medium' : 'text-slate-ink'">
                <UIcon v-if="icon(c)" :name="icon(c)" class="mr-1.5 inline size-4 align-text-bottom" aria-hidden="true" />
                <template v-for="(p, j) in parts(c)" :key="j"><code v-if="j % 2" class="font-mono text-xs">{{ p }}</code><template v-else>{{ p }}</template></template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-8 max-w-[68ch] rounded-lg border border-ink/15 bg-white/70 p-5">
        <h3 class="text-step-1 font-semibold">When another tool fits better</h3>
        <p class="mt-2 text-slate-ink">Need FTP, WebDAV or S3, or want to script transfers? WinSCP is excellent. Need RDP, VNC, X11 or port forwarding? MobaXterm covers them. Ferry focuses on SSH and SFTP, with files, terminal, logs and monitoring in one window.</p>
      </div>
      <p class="mt-6 max-w-[68ch] text-xs text-slate-ink">
        Checked November 2026. Sources:
        <template v-for="([n, u], i) in sources" :key="u"><a :href="u" class="underline underline-offset-2">{{ n }}</a>{{ i < sources.length - 1 ? ', ' : '; ' }}</template>
        the Mobatek blog post on MobaXterm 10.6 (remote monitoring is experimental); KIT HPC documentation (monitoring is off by default).
      </p>
    </div>
  </section>
</template>
