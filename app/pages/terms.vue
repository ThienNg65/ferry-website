<script setup lang="ts">
import { RELEASES_URL, STORE_URL } from '~/utils/release'

const site = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const title = 'Terms of Service — Ferry for Windows'
const description = 'Terms of Service, acceptable use, unsigned direct installer notice, and warranty disclaimer for Ferry on Windows.'

useHead({
  title,
  link: [{ rel: 'canonical', href: `${site}/terms` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildLegalJsonLd(site, '/terms', title, description, 'Terms of Service'))
    }
  ]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${site}/terms`,
  ogImage: `${site}/og.jpg`,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${site}/og.jpg`
})
</script>

<template>
  <article class="section-y">
    <div class="page-x max-w-3xl">
      <nav aria-label="Breadcrumb" class="mb-6 text-small text-muted">
        <NuxtLink to="/" class="hover:text-highlighted">Ferry</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span class="text-highlighted">Terms of Service</span>
      </nav>

      <h1>Terms of Service for Ferry</h1>
      <p class="mt-3 text-small text-muted">
        Effective Date: 2026-11-14 · Terms Version: 1.0 · Maintainer: ThienNg65
      </p>
      <p class="mt-6 text-lead text-muted">
        By downloading, installing, or using Ferry, you agree to these Terms of Service and the terms in <a :href="`${RELEASES_URL}/blob/main/LICENSE`" target="_blank" rel="noopener" class="text-primary underline">LICENSE</a>.
      </p>

      <h2 class="mt-12 text-2xl">1. Free software &amp; licence</h2>
      <p class="mt-3 text-default">
        Ferry is free to download and use on Windows with no fees, subscriptions, or paid tiers. Historical source releases were distributed under the MIT License; downloading a packaged installer does not change rights already granted to earlier source releases. Third-party components bundled with Ferry remain subject to their respective licences (<code class="font-mono text-[0.9em]">THIRD_PARTY_LICENSES.txt</code> included with Ferry distributions).
      </p>

      <h2 class="mt-12 text-2xl">2. Acceptable &amp; lawful use</h2>
      <ul class="mt-4 list-disc space-y-2 pl-5 text-default">
        <li>Connect only to servers, networks, and files you own or have explicit authorization to access.</li>
        <li>Comply with all applicable local, national, and international laws and regulations.</li>
        <li>Verify SSH host-key fingerprints on first connection and whenever a host-key mismatch warning appears.</li>
      </ul>

      <h2 class="mt-12 text-2xl">3. Security &amp; installer channels</h2>
      <p class="mt-3 text-default">
        Ferry stores site credentials locally using Windows DPAPI encryption, though no local storage mechanism can protect against a compromised host OS or user account. For a Store-signed install, use the <a :href="STORE_URL" target="_blank" rel="noopener" class="text-primary underline">Microsoft Store listing</a>. Direct <code class="font-mono text-[0.9em]">.exe</code> installers from <a :href="`${RELEASES_URL}/releases`" target="_blank" rel="noopener" class="text-primary underline">ThienNg65/ferry-release</a> are currently unsigned and may trigger Windows SmartScreen; always verify downloads come from official channels.
      </p>

      <h2 class="mt-12 text-2xl">4. Disclaimer of warranties &amp; limitation of liability</h2>
      <p class="mt-3 text-default">
        Ferry is provided <strong>"AS IS"</strong>, without warranty of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, uptime, or non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, data loss, or other liability arising from your use of Ferry, including file transfers, remote edits, deletions, or folder synchronization. Always maintain backups of critical files.
      </p>

      <h2 class="mt-12 text-2xl">5. Contact</h2>
      <p class="mt-3 text-default">
        Questions regarding licensing or terms can be submitted via <a :href="`${RELEASES_URL}/issues`" target="_blank" rel="noopener" class="text-primary underline">GitHub Issues on ThienNg65/ferry-release</a>.
      </p>
    </div>
  </article>
</template>
