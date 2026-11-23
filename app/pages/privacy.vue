<script setup lang="ts">
import { RELEASES_URL } from '~/utils/release'

const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const title = 'Privacy Policy — Ferry for Windows'
const description = 'Ferry Desktop App is local-first with zero telemetry, zero cookies, zero analytics, and zero accounts. The ferryssh.com website uses cookie-free Vercel Web Analytics.'

useHead({
  title,
  link: [{ rel: 'canonical', href: `${site}/privacy` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildLegalJsonLd(site, '/privacy', title, description, 'Privacy Policy'))
    }
  ]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${site}/privacy`,
  ogImage: `${site}/og.jpg`,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${site}/og.jpg`
})

const localStorageRows = [
  ['Saved sites & proxy settings', 'sites.json, app-settings.json', 'Passwords and key passphrases are encrypted at rest with Windows DPAPI (CryptProtectData) and never leave the local backend decrypted'],
  ['Transfer & operation history', 'history.json', 'Capped at 2,000 entries and pruned by your retention setting (default: 90 days)'],
  ['Trusted SSH host keys', 'known_hosts.json', 'Local SHA-256 fingerprints; manageable or deletable in Settings'],
  ['Directory bookmarks', 'bookmarks.json', 'Local JSON on your device'],
  ['UI & window preferences', 'WebView localStorage', 'Local WebView storage only'],
  ['Temporary staging & edit files', 'OS temp directory', 'Cleaned up after transfer or edit session close']
] as const
</script>

<template>
  <article class="section-y">
    <div class="page-x max-w-3xl">
      <nav aria-label="Breadcrumb" class="mb-6 text-small text-muted">
        <NuxtLink to="/" class="hover:text-highlighted">Ferry</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span class="text-highlighted">Privacy Policy</span>
      </nav>

      <h1>Privacy Policy for Ferry</h1>
      <p class="mt-3 text-small text-muted">
        Effective Date: 2026-11-23 · Policy Version: 1.1 · Maintainer: ThienNg65
      </p>
      <p class="mt-6 text-lead text-muted">
        Ferry is a free, local-first Windows desktop SFTP and SSH client. The desktop app operates with zero telemetry, zero accounts, and zero analytics. The <code class="font-mono text-[0.9em]">ferryssh.com</code> website uses cookie-free Vercel Web Analytics to measure aggregate visits and download link clicks.
      </p>

      <h2 class="mt-12 text-2xl">1. Ferry Desktop App — Data we do not collect</h2>
      <ul class="mt-4 list-disc space-y-2 pl-5 text-default">
        <li>The Ferry desktop app does <strong>not</strong> collect, transmit, or sell personal data, usage telemetry, crash reports, or behavioral analytics.</li>
        <li>The desktop app does <strong>not</strong> use HTTP cookies, advertising identifiers, or third-party tracking SDKs (the application UI enforces a strict <code class="font-mono text-[0.9em]">default-src 'self'</code> Content Security Policy).</li>
        <li>Ferry does <strong>not</strong> require user accounts, collect email addresses, process payments, or send any user data or files for AI training.</li>
      </ul>

      <h2 class="mt-12 text-2xl">2. Data stored locally on your device</h2>
      <p class="mt-3 text-muted">
        All configuration and state stay exclusively on your local Windows machine under <code class="font-mono text-[0.9em]">%APPDATA%\Ferry</code> and WebView <code class="font-mono text-[0.9em]">localStorage</code>.
      </p>
      <div role="region" aria-label="Local data storage table" tabindex="0" class="mt-5 overflow-x-auto rounded-[12px] border border-default bg-elevated">
        <table class="w-full min-w-[36rem] border-collapse text-left text-small">
          <thead>
            <tr class="border-b border-default bg-muted/60">
              <th scope="col" class="px-4 py-3 font-semibold text-highlighted">Data</th>
              <th scope="col" class="px-4 py-3 font-semibold text-highlighted">Location</th>
              <th scope="col" class="px-4 py-3 font-semibold text-highlighted">Protection</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="[name, loc, protection] in localStorageRows" :key="name" class="align-top">
              <th scope="row" class="px-4 py-3 font-medium text-highlighted">{{ name }}</th>
              <td class="px-4 py-3 font-mono text-xs text-muted">{{ loc }}</td>
              <td class="px-4 py-3 text-muted">{{ protection }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mt-12 text-2xl">3. Network connections</h2>
      <ol class="mt-4 list-decimal space-y-2 pl-5 text-default">
        <li><strong>Your SSH / SFTP / proxy connections:</strong> Ferry connects directly to the hostnames, jump hosts, or proxies you configure.</li>
        <li><strong>Application update checks (optional):</strong> When enabled, standalone builds check <code class="font-mono text-[0.9em]">latest.yml</code> from <a :href="RELEASES_URL" target="_blank" rel="noopener" class="text-primary underline">ThienNg65/ferry-release</a> on GitHub. You can disable automatic update checks at any time in <strong>Settings → Updates &amp; About</strong>.</li>
      </ol>

      <h2 class="mt-12 text-2xl">4. Retention, export &amp; deletion</h2>
      <p class="mt-3 text-default">
        In <strong>Settings → Privacy &amp; Legal</strong> you can configure history retention (<code class="font-mono text-[0.9em]">30 days</code>, <code class="font-mono text-[0.9em]">90 days</code> default, <code class="font-mono text-[0.9em]">1 year</code>, or <code class="font-mono text-[0.9em]">Unlimited</code>), run <strong>Export My Data</strong> (JSON excluding passwords/passphrases), or run <strong>Delete All Local Data</strong> to erase all saved sites, credentials, history, and known hosts.
      </p>

      <h2 class="mt-12 text-2xl">5. Website analytics (<code class="font-mono text-[0.9em]">ferryssh.com</code>)</h2>
      <p class="mt-3 text-default">
        Unlike the Ferry desktop app, the <code class="font-mono text-[0.9em]">ferryssh.com</code> marketing website uses privacy-friendly, cookie-free <strong>Vercel Web Analytics</strong> to measure aggregate page views and outbound download/Microsoft Store clicks. It does not set cookies, store personal identifiers, or track visitors across other websites.
      </p>

      <h2 class="mt-12 text-2xl">6. Contact</h2>
      <p class="mt-3 text-default">
        Questions or security reports can be submitted through <a :href="`${RELEASES_URL}/issues`" target="_blank" rel="noopener" class="text-primary underline">GitHub Issues on ThienNg65/ferry-release</a>.
      </p>
    </div>
  </article>
</template>
