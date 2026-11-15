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
const coreRows = rows.slice(0, 8)
const extraRows = rows.slice(8)
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

const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { batch: true })
</script>

<template>
  <section id="compare" ref="rootRef" class="section-y" aria-labelledby="compare-title">
    <div class="page-x">
      <div class="stack-head reveal-pre mx-auto max-w-[68ch] text-center">
        <h2 id="compare-title">How Ferry compares</h2>
        <p class="text-lead text-muted">Ferry puts files, terminal, logs and monitoring in one window. Here it is next to the two tools people most often use for the same job on Windows.</p>
      </div>
      <!-- No box around the table: hairlines between rows, and the Ferry column lifted as one tinted card. -->
      <div role="region" aria-label="Comparison table, scrolls sideways on small screens" tabindex="0" data-lenis-prevent-horizontal class="reveal-pre mx-auto max-w-[68rem] overflow-x-auto">
        <table class="w-full min-w-[46rem] border-separate border-spacing-0 text-left text-base">
          <caption class="sr-only">Ferry compared with WinSCP 6.7 and MobaXterm Home, feature by feature</caption>
          <thead>
            <tr>
              <th scope="col" class="sticky left-0 z-10 w-[24%] bg-default px-5 pb-5 pt-6 text-small font-medium text-muted">Feature</th>
              <th scope="col" class="surface-specular w-[24%] rounded-t-[20px] border-x border-t border-primary/40 bg-primary/10 px-5 pb-5 pt-6 text-lead font-bold text-highlighted">
                <span class="flex items-center gap-2.5"><img src="/icon.webp" alt="" width="28" height="28" class="size-7 rounded-lg">Ferry</span>
              </th>
              <th scope="col" class="w-[26%] px-5 pb-5 pt-6 font-semibold text-highlighted">WinSCP 6.7</th>
              <th scope="col" class="w-[26%] px-5 pb-5 pt-6 font-semibold text-highlighted">MobaXterm Home (free)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, n) in coreRows" :key="r[0]" class="align-top">
              <th scope="row" class="sticky left-0 z-10 border-t border-default bg-default px-5 py-4 font-medium text-highlighted">{{ r[0] }}</th>
              <td
                v-for="(c, i) in r.slice(1)" :key="i" class="border-t px-5 py-4"
                :class="[i === 0 ? 'border-x border-primary/40 border-t-primary/15 bg-primary/10 font-medium text-highlighted' : 'border-default text-muted', i === 0 && n === coreRows.length - 1 ? 'rounded-b-[20px] border-b' : '']"
              >
                <span class="flex gap-2.5">
                  <span v-if="i === 0 && c.startsWith('Yes')" class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[var(--ui-bg)]" aria-hidden="true"><UIcon name="i-lucide-check" class="size-3.5" /></span>
                  <UIcon v-else-if="icon(c)" :name="icon(c)" class="mt-1 size-4 shrink-0 opacity-70" aria-hidden="true" />
                  <span><template v-for="(p, j) in parts(c)" :key="j"><code v-if="j % 2" class="font-mono text-[0.9em]">{{ p }}</code><template v-else>{{ p }}</template></template></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Fold secondary protocol/niche rows & sources into accordions -->
      <div class="reveal-pre mx-auto mt-10 max-w-[68rem] space-y-4">
        <SpotlightSurface
          as="details"
          class="group hover-lift surface-specular rounded-[20px] border border-default bg-elevated/80 px-6 sm:px-8"
          @toggle="scheduleScrollTriggerRefresh(320)"
        >
          <summary class="relative flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon name="i-lucide-sliders-horizontal" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>More protocol, automation &amp; platform details ({{ extraRows.length }} rows)</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div class="relative overflow-x-auto border-t border-default pb-6 pt-4">
            <table class="w-full min-w-[46rem] border-separate border-spacing-0 text-left text-base">
              <caption class="sr-only">Additional protocol, automation, pricing and platform comparison rows</caption>
              <tbody>
                <tr v-for="(r, n) in extraRows" :key="r[0]" class="align-top">
                  <th scope="row" class="w-[24%] px-4 py-3.5 font-medium text-highlighted" :class="n > 0 ? 'border-t border-default' : ''">{{ r[0] }}</th>
                  <td
                    v-for="(c, i) in r.slice(1)" :key="i"
                    class="px-4 py-3.5"
                    :class="[
                      i === 0 ? 'w-[24%] bg-primary/10 font-medium text-highlighted' : 'w-[26%] text-muted',
                      n > 0 ? 'border-t border-default' : ''
                    ]"
                  >
                    <span class="flex gap-2.5">
                      <UIcon v-if="icon(c)" :name="icon(c)" class="mt-1 size-4 shrink-0 opacity-70" aria-hidden="true" />
                      <span><template v-for="(p, j) in parts(c)" :key="j"><code v-if="j % 2" class="font-mono text-[0.9em]">{{ p }}</code><template v-else>{{ p }}</template></template></span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SpotlightSurface>

        <SpotlightSurface
          as="details"
          class="group hover-lift surface-specular rounded-[20px] border border-default bg-elevated/80 px-6 sm:px-8"
          @toggle="scheduleScrollTriggerRefresh(320)"
        >
          <summary class="relative flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon name="i-lucide-book-open" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>When another tool fits better &amp; sources (Checked November 2026)</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div class="relative border-t border-default pb-6 pt-5">
            <p class="text-muted">Need FTP, WebDAV or S3, or want to script transfers? WinSCP is excellent. Need RDP, VNC, X11 or port forwarding? MobaXterm covers them. Ferry focuses on SSH and SFTP, with files, terminal, logs and monitoring in one window.</p>
            <p class="mt-6 text-small font-semibold text-highlighted">Sources</p>
            <ul class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-small text-muted">
              <li v-for="[n, u] in sources" :key="u"><a :href="u" class="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-highlighted">{{ n }}</a></li>
            </ul>
            <p class="mt-2 text-small text-muted">Also the Mobatek blog post on MobaXterm 10.6 (remote monitoring is experimental) and the KIT HPC documentation (monitoring is off by default).</p>
          </div>
        </SpotlightSurface>
      </div>
    </div>
  </section>
</template>
