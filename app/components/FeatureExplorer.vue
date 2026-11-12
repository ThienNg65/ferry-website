<script setup lang="ts">
const modules = [
  { id: 'files', img: 'explorer-files', w: 1400, h: 1280, title: 'Files', line: 'Two panes, local and remote, built for moving things around.', alt: 'Ferry with a local folder on the left, a remote folder on the right and finished uploads in the queue below.', subs: [
    ['Two panes', 'Local files on the left, the server’s files on the right.'],
    ['Drag and drop', 'Drag files to and from Windows Explorer.'],
    ['Archives on the server', 'Extract and compress without opening a terminal.'],
    ['Permissions and owner', 'Change them from the file list, with sudo when you need it.'],
    ['Edit in place', 'Open a remote file, change it and save it back.']
  ] },
  { id: 'transfers', img: 'feature-history', w: 1344, h: 1088, title: 'Transfers', line: 'Big copies that keep going while you keep working.', alt: 'Ferry history dialog listing completed uploads and downloads with sizes and durations.', subs: [
    ['Whole folders', 'Send or fetch a folder in one go.'],
    ['A queue with retry', 'Run a failed transfer again with one click.'],
    ['A bandwidth cap', 'Keep a big upload from flattening the office link.'],
    ['A filterable history', 'Filter by done, error or cancelled to see what happened.']
  ] },
  { id: 'terminal', img: 'terminal', w: 1600, h: 1000, title: 'Terminal', line: 'A real SSH terminal for each server.', alt: 'Ferry terminal showing a directory listing, the last lines of a log and a process list on a remote server.', subs: [
    ['One per server tab', 'Each server keeps its own session.'],
    ['Themes', 'Dracula, Nord, Solarized and more.'],
    ['Same window as your files', 'Switch between a command and your files without leaving the window.']
  ] },
  { id: 'logs', img: 'explorer-logs', w: 1400, h: 1280, title: 'Logs', line: 'Follow a log as it is written.', alt: 'Ferry log viewer streaming live lines with info, warning and error lines highlighted.', subs: [
    ['Follow with tail -F', 'Lines appear as the server writes them.'],
    ['Filter by level', 'Show only errors, or warnings and above.'],
    ['Keep the scrollback', 'Scroll back through what already went past.']
  ] },
  { id: 'monitor', img: 'explorer-monitor', w: 1400, h: 1280, title: 'Monitor', line: 'See how the server is doing without logging in elsewhere.', alt: 'Ferry resource monitor with storage and memory bars, a CPU graph and a table of running processes.', subs: [
    ['CPU, memory and load', 'Live figures with a short CPU graph.'],
    ['Disk use', 'How full the disk is, at a glance.'],
    ['Top processes', 'The busiest processes in a sortable table.']
  ] },
  { id: 'connections', img: 'explorer-sites', w: 1400, h: 1280, title: 'Connections', line: 'Connect the way each server wants.', alt: 'Ferry saved sites grouped into Development, Production and Staging, with coloured dots for each environment.', subs: [
    ['Password, key or agent', 'Use whichever the server accepts.'],
    ['Jump hosts and proxies', 'Reach servers that sit behind another one.'],
    ['Real 2FA prompts', 'Answer the server’s own prompts as they appear.'],
    ['Host-key check', 'Confirm a server’s key the first time you connect.'],
    ['Import', 'Bring sites over from WinSCP, PuTTY and ~/.ssh/config.'],
    ['Colour-coded environments', 'Production, staging and development look different.']
  ] }
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-24 sm:px-6" aria-labelledby="explorer-title">
    <h2 id="explorer-title" class="max-w-xl text-step-4 font-bold">Everything in the window</h2>
    <div class="mt-14 space-y-24">
      <article v-for="(m, i) in modules" :id="`module-${m.id}`" :key="m.id" class="grid items-start gap-8 lg:gap-14" :class="i % 2 ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'">
        <div :class="i % 2 ? 'lg:order-2' : ''">
          <h3 class="text-step-3 font-bold">{{ m.title }}</h3>
          <p class="mt-3 max-w-[60ch] text-slate-ink">{{ m.line }}</p>
          <dl class="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1">
            <div v-for="[n, d] in m.subs" :key="n">
              <dt class="font-semibold">{{ n }}</dt>
              <dd class="mt-1 text-slate-ink">{{ d }}</dd>
            </div>
          </dl>
        </div>
        <picture :class="i % 2 ? 'lg:order-1' : ''">
          <source :srcset="`/screens/${m.img}.webp`" type="image/webp">
          <img :src="`/screens/${m.img}.jpg`" :width="m.w" :height="m.h" loading="lazy" :alt="m.alt" class="h-auto w-full rounded-xl border border-ink/10 shadow-xl shadow-deep/20">
        </picture>
      </article>
    </div>
  </section>
</template>
