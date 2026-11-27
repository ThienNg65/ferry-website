<script setup lang="ts">
// Cells are checked November 2026 against official docs/pricing. Do not edit a cell without re-checking its source.
const rows: [string, string, string, string, string][] = [
  ['Local and remote side by side', 'Yes, two panes', 'Yes (Commander interface)', 'No: remote browser in a sidebar beside the terminal', 'Split view in SFTP tab'],
  ['Interactive SSH terminal in the same window', 'Yes, per server tab', 'No: opens PuTTY; the built-in console can\'t run interactive commands', 'Yes', 'Yes (terminal-first)'],
  ['Follow a log live, filter by level', 'Yes, dedicated tab', 'No', 'Only `tail` in the terminal', 'Only `tail` in the terminal'],
  ['Server monitor: CPU, memory, disk, processes', 'Yes, with a process table', 'No', 'Status bar for CPU/RAM/disk; experimental, off by default', 'No'],
  ['Edit remote files in place', 'Yes, built-in editor', 'Plain internal or external editor', 'Built-in MobaTextEditor', 'Downloads to external editor'],
  ['Folder sync & compare with preview', 'Yes, one-way', 'Yes, several modes', 'No (`rsync` in the terminal)', 'No'],
  ['Extract and compress archives on the server', 'Yes', 'No built-in action', 'No built-in action', 'No'],
  ['Import from WinSCP / PuTTY / ~/.ssh/config', 'Yes', 'PuTTY import', 'Session import', '`~/.ssh/config` import'],
  ['Several servers in tabs', 'Yes (unlimited)', 'Yes', 'Yes (Home: up to 12 saved sessions)', 'Yes'],
  ['Account & cloud lock-in', 'None (local DPAPI storage)', 'None', 'None', 'Account required for Pro sync'],
  ['Protocols', 'SSH and SFTP only', 'SFTP, SCP, FTP/FTPS, WebDAV, S3', 'SSH, SFTP, FTP, Telnet, RDP, VNC, X11, serial and more', 'SSH, SFTP, Mosh, Telnet'],
  ['X11 server, RDP, VNC', 'No', 'No', 'Yes', 'No'],
  ['Port forwarding (tunnels)', 'No', 'Yes', 'Yes (Home: 2 tunnels)', 'Yes'],
  ['Scripting and automation', 'No', 'Yes: scripts, .NET assembly', 'Macros (Home: 4)', 'Snippets & commands'],
  ['Price', 'Free', 'Free, open source', 'Home free; Professional $69 per user', 'Free (limited); Pro ~$10/mo (~$120/yr)'],
  ['Platform', 'Windows 10/11 x64 (~23 MB)', 'Windows', 'Windows', 'Windows, macOS, Linux, Mobile']
]
const coreRows = rows.slice(0, 10)
const extraRows = rows.slice(10)
const icon = (t: string) => (t.startsWith('Yes') || t.startsWith('None (') ? 'i-lucide-check' : t.startsWith('No') ? 'i-lucide-minus' : '')
const parts = (t: string) => t.split('`')

const vsLinks = [
  { label: 'Ferry vs. WinSCP', to: '/vs/winscp' },
  { label: 'Ferry vs. Termius', to: '/vs/termius' },
  { label: 'Ferry vs. MobaXterm', to: '/vs/mobaxterm' },
  { label: 'Ferry vs. FileZilla', to: '/vs/filezilla' }
] as const

const rootRef = ref<HTMLElement>()
useSectionReveal(rootRef, '.reveal-pre', { batch: true })
</script>

<template>
  <section id="compare" ref="rootRef" class="section-y border-t border-default bg-muted/40" aria-labelledby="compare-title">
    <div class="page-x">
      <div class="stack-head reveal-pre mx-auto max-w-[44rem] text-center">
        <h2 id="compare-title">
          <span class="heading-muted">How Ferry compares to</span> WinSCP, MobaXterm and Termius
        </h2>
        <p class="text-lead text-muted">
          Feature by feature, including where the other tools do more.
        </p>
      </div>

      <div role="region" aria-labelledby="compare-title" tabindex="0" data-lenis-prevent-horizontal class="reveal-pre mx-auto max-w-[74rem] overflow-x-auto">
        <table class="w-full min-w-[56rem] border-separate border-spacing-0 text-left text-base">
          <caption class="sr-only">Ferry compared with WinSCP 6.7, MobaXterm Home, and Termius, feature by feature</caption>
          <thead>
            <tr>
              <th scope="col" class="sticky left-0 z-10 w-[22%] bg-default px-4 pb-4 pt-5 text-small font-medium text-muted">Feature</th>
              <th scope="col" class="w-[19.5%] rounded-t-[14px] border-x border-t border-primary/35 bg-primary/10 px-4 pb-4 pt-5 text-lead font-bold text-highlighted">
                <span class="flex items-center gap-2"><img src="/ferry-glass.svg" alt="" width="24" height="24" class="size-6 rounded-[6px]">Ferry</span>
              </th>
              <th scope="col" class="w-[19.5%] px-4 pb-4 pt-5 font-semibold text-highlighted">WinSCP 6.7</th>
              <th scope="col" class="w-[19.5%] px-4 pb-4 pt-5 font-semibold text-highlighted">MobaXterm Home</th>
              <th scope="col" class="w-[19.5%] px-4 pb-4 pt-5 font-semibold text-highlighted">Termius (Free / Pro)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, n) in coreRows" :key="r[0]" class="align-top">
              <th scope="row" class="sticky left-0 z-10 border-t border-default bg-default px-4 py-3.5 font-medium text-highlighted">{{ r[0] }}</th>
              <td
                v-for="(c, i) in r.slice(1)"
                :key="i"
                class="border-t px-4 py-3.5"
                :class="[i === 0 ? 'border-x border-primary/35 border-t-primary/15 bg-primary/10 font-medium text-highlighted' : 'border-default text-muted', i === 0 && n === coreRows.length - 1 ? 'rounded-b-[14px] border-b' : '']"
              >
                <span class="flex gap-2">
                  <span v-if="i === 0 && (c.startsWith('Yes') || c.startsWith('None ('))" class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[var(--ui-bg)]" aria-hidden="true"><UIcon name="i-lucide-check" class="size-3.5" /></span>
                  <UIcon v-else-if="icon(c)" :name="icon(c)" class="mt-1 size-4 shrink-0 opacity-70" aria-hidden="true" />
                  <span><template v-for="(p, j) in parts(c)" :key="j"><code v-if="j % 2" class="font-mono text-[0.9em]">{{ p }}</code><template v-else>{{ p }}</template></template></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="reveal-pre mx-auto mt-3 max-w-[74rem] text-center text-xs text-muted">
        Comparison facts and pricing verified November 2026 against official WinSCP 6.7, MobaXterm Home, and Termius documentation.
      </p>

      <div class="reveal-pre mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <span class="text-small font-medium text-muted">Detailed comparisons:</span>
        <NuxtLink
          v-for="link in vsLinks"
          :key="link.to"
          :to="link.to"
          class="inline-flex min-h-11 items-center rounded-[5px] border border-default bg-elevated px-3.5 text-small font-medium text-highlighted hover:border-primary/50 hover:text-primary"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="reveal-pre mx-auto mt-8 max-w-[74rem] space-y-3">
        <details class="group rounded-[14px] border border-default bg-elevated px-6" @toggle="scheduleScrollTriggerRefresh(320)">
          <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-highlighted">
            <span class="flex items-center gap-2.5">
              <UIcon name="i-lucide-sliders-horizontal" class="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>More protocol, automation &amp; platform details</span>
            </span>
            <UIcon name="i-lucide-chevron-down" class="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div class="overflow-x-auto border-t border-default pb-6 pt-4">
            <table class="w-full min-w-[56rem] border-separate border-spacing-0 text-left text-base">
              <caption class="sr-only">Additional protocol, automation, pricing and platform comparison rows</caption>
              <tbody>
                <tr v-for="(r, n) in extraRows" :key="r[0]" class="align-top">
                  <th scope="row" class="sticky left-0 z-10 w-[22%] bg-elevated px-4 py-3 font-medium text-highlighted" :class="n > 0 ? 'border-t border-default' : ''">{{ r[0] }}</th>
                  <td
                    v-for="(c, i) in r.slice(1)"
                    :key="i"
                    class="w-[19.5%] px-4 py-3"
                    :class="[i === 0 ? 'bg-primary/10 font-medium text-highlighted' : 'text-muted', n > 0 ? 'border-t border-default' : '']"
                  >
                    <span class="flex gap-2">
                      <UIcon v-if="icon(c)" :name="icon(c)" class="mt-1 size-4 shrink-0 opacity-70" aria-hidden="true" />
                      <span><template v-for="(p, j) in parts(c)" :key="j"><code v-if="j % 2" class="font-mono text-[0.9em]">{{ p }}</code><template v-else>{{ p }}</template></template></span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
