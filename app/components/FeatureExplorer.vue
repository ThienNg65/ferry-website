<script setup lang="ts">
const modules = [
  { id: 'files', wide: true, icon: 'i-lucide-folder-open', demo: resolveComponent('DemoFiles'), title: 'Files', line: 'Two panes, local and remote, built for moving things around.', subs: [
    ['Two panes', 'Local files on the left, the server’s files on the right.'],
    ['Drag and drop', 'Drag files to and from Windows Explorer.'],
    ['Archives on the server', 'Extract and compress without opening a terminal.'],
    ['Permissions and owner', 'Change them from the file list, with sudo when you need it.'],
    ['Edit in place', 'Open a remote file, change it and save it back.']
  ] },
  { id: 'transfers', icon: 'i-lucide-arrow-down-up', demo: resolveComponent('DemoTransfers'), title: 'Transfers', line: 'Big copies that keep going while you keep working.', subs: [
    ['Whole folders', 'Send or fetch a folder in one go.'],
    ['A queue with retry', 'Run a failed transfer again with one click.'],
    ['A bandwidth cap', 'Keep a big upload from flattening the office link.'],
    ['A filterable history', 'Filter by done, error or cancelled to see what happened.']
  ] },
  { id: 'terminal', icon: 'i-lucide-terminal', demo: resolveComponent('DemoTerminal'), title: 'Terminal', line: 'A real SSH terminal for each server.', subs: [
    ['One per server tab', 'Each server keeps its own session.'],
    ['Themes', 'Dracula, Nord, Solarized and more.'],
    ['Same window as your files', 'Switch between a command and your files without leaving the window.']
  ] },
  { id: 'logs', icon: 'i-lucide-scroll-text', demo: resolveComponent('DemoLogs'), title: 'Logs', line: 'Follow a log as it is written.', subs: [
    ['Follow with tail -F', 'Lines appear as the server writes them.'],
    ['Filter by level', 'Show only errors, or warnings and above.'],
    ['Keep the scrollback', 'Scroll back through what already went past.']
  ] },
  { id: 'monitor', icon: 'i-lucide-activity', demo: resolveComponent('DemoMonitor'), title: 'Monitor', line: 'See how the server is doing without logging in elsewhere.', subs: [
    ['CPU, memory and load', 'Live figures with a short CPU graph.'],
    ['Disk use', 'How full the disk is, at a glance.'],
    ['Top processes', 'The busiest processes in a sortable table.']
  ] },
  { id: 'connections', wide: true, icon: 'i-lucide-server', demo: resolveComponent('DemoSites'), title: 'Connections', line: 'Connect the way each server wants.', subs: [
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
  <section id="features" class="section-y overflow-x-clip" aria-labelledby="explorer-title">
    <div class="page-x">
      <div class="stack-head reveal mx-auto max-w-[68ch] text-center">
        <h2 id="explorer-title">What is in the window</h2>
        <p class="text-lead text-muted">Six tools share one connection to your server. The windows below are working illustrations built for this page, so click around.</p>
      </div>
      <template v-for="(m, i) in modules" :key="m.id">
        <!-- Wide: a centred heading over one large window, with the details in a row beneath it. -->
        <article v-if="m.wide" :id="`module-${m.id}`" :aria-labelledby="`module-${m.id}-title`" class="pool pool-center [&:not(:first-of-type)]:mt-28 lg:[&:not(:first-of-type)]:mt-40">
          <div class="reveal mx-auto max-w-[40rem] text-center">
            <p class="flex items-center justify-center gap-2 text-small font-semibold text-primary"><UIcon :name="m.icon" class="size-5" aria-hidden="true" />{{ m.title }}</p>
            <h3 :id="`module-${m.id}-title`" class="mt-4">{{ m.line }}</h3>
          </div>
          <component :is="m.demo" class="reveal mx-auto mt-12 max-w-[64rem] lg:mt-14" />
          <dl class="reveal mx-auto mt-12 grid max-w-[64rem] gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-14" :class="m.subs.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-3'">
            <div v-for="[n, d] in m.subs" :key="n" class="border-t border-default pt-4">
              <dt class="text-base font-semibold text-highlighted">{{ n }}</dt>
              <dd class="mt-1.5 text-small text-muted">{{ d }}</dd>
            </div>
          </dl>
        </article>
        <!-- Split: a short text column beside the window, sides alternating. -->
        <article
          v-else :id="`module-${m.id}`" :aria-labelledby="`module-${m.id}-title`"
          class="pool mt-28 grid items-center gap-12 lg:mt-40 lg:gap-20"
          :class="i % 2 ? 'lg:grid-cols-[5fr_7fr]' : 'pool-flip lg:grid-cols-[7fr_5fr]'"
        >
          <div :class="i % 2 ? 'reveal-l' : 'reveal-r lg:order-last'">
            <p class="flex items-center gap-2 text-small font-semibold text-primary"><UIcon :name="m.icon" class="size-5" aria-hidden="true" />{{ m.title }}</p>
            <h3 :id="`module-${m.id}-title`" class="mt-4">{{ m.line }}</h3>
            <dl class="mt-8 grid gap-y-5">
              <div v-for="[n, d] in m.subs" :key="n" class="grid grid-cols-[1.5rem_1fr] gap-x-3">
                <UIcon name="i-lucide-check" class="mt-1 size-5 text-primary" aria-hidden="true" />
                <div>
                  <dt class="text-base font-semibold text-highlighted">{{ n }}</dt>
                  <dd class="mt-0.5 text-small text-muted">{{ d }}</dd>
                </div>
              </div>
            </dl>
          </div>
          <component :is="m.demo" class="min-w-0" :class="i % 2 ? 'reveal-r' : 'reveal-l'" />
        </article>
      </template>
    </div>
  </section>
</template>
