import { faqItems } from '../utils/comparisons'
import { STORE_URL } from '../utils/release'

export interface TourChapter {
  id: string
  label: string
  name: string
  startOffset: number
  endOffset: number
  summary: string
}

export const tourChapters: readonly TourChapter[] = [
  {
    id: 'import',
    label: '0:00 Import',
    name: 'Import saved sessions',
    startOffset: 0,
    endOffset: 6,
    summary: 'Import saved hosts, ports, usernames, and private key paths from WinSCP, PuTTY, and ~/.ssh/config in one step.'
  },
  {
    id: 'dual-pane',
    label: '0:06 Dual-pane',
    name: 'Dual-pane SFTP & folder sync',
    startOffset: 6,
    endOffset: 14,
    summary: 'Browse Windows and Linux folders side by side, preview one-way folder sync changes, and edit remote files in place.'
  },
  {
    id: 'logs-terminal',
    label: '0:14 Logs & Terminal',
    name: 'Live tail -F logs & SSH terminal',
    startOffset: 14,
    endOffset: 23,
    summary: 'Run commands in the embedded SSH terminal while streaming live tail -F logs filtered by Error and Warning levels.'
  },
  {
    id: 'monitor',
    label: '0:23 Monitor',
    name: 'Server CPU, RAM & process monitor',
    startOffset: 23,
    endOffset: 35,
    summary: 'Check CPU load, memory, swap, disk usage and running processes over your open SSH connection, with no agent on the server.'
  }
]

export function buildHomeJsonLd(siteUrl: string, version?: string) {
  const base = siteUrl.replace(/\/$/, '')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      name: 'Ferry',
      alternateName: ['ferryssh.com', 'Ferry for Windows', 'Ferry App'],
      url: `${base}/`,
      description: 'Free Windows SSH and SFTP client with dual-pane file transfer, a built-in SSH terminal, live tail -F logs and a server monitor in one app.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: 'Ferry',
      url: `${base}/`,
      logo: `${base}/icon-512.png`,
      sameAs: [
        STORE_URL,
        'https://github.com/ThienNg65/ferry-release'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Ferry',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'SSH and SFTP Client',
      operatingSystem: 'Windows 10, Windows 11 (64-bit)',
      ...(version ? { softwareVersion: version } : {}),
      fileSize: '23MB',
      isAccessibleForFree: true,
      keywords: 'Windows SFTP client, Windows SSH client, WinSCP alternative, PuTTY alternative, live log tail, server resource monitor',
      author: {
        '@type': 'Person',
        name: 'ThienNg65',
        url: 'https://github.com/ThienNg65/ferry-release'
      },
      publisher: {
        '@id': `${base}/#organization`
      },
      sameAs: [
        STORE_URL,
        'https://github.com/ThienNg65/ferry-release'
      ],
      url: `${base}/`,
      downloadUrl: STORE_URL,
      installUrl: STORE_URL,
      image: `${base}/og.jpg`,
      screenshot: [
        `${base}/media/files-terminal.webp`,
        `${base}/media/folder-sync.webp`,
        `${base}/media/log-tail.webp`,
        `${base}/media/monitor.webp`,
        `${base}/media/code-editor.webp`
      ],
      featureList: [
        'Dual-pane local and remote SFTP file browser',
        'Import saved sessions from WinSCP, PuTTY, and ~/.ssh/config',
        'Built-in SSH terminal in every server tab',
        'Live remote tail -F log viewer with level filters and overview rail',
        'Live CPU, memory, disk, and process monitor over SSH',
        'One-way folder sync with preview and folder compare',
        'In-place remote file editor',
        'Windows DPAPI credential encryption with no accounts or telemetry'
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer
        }
      }))
    }
  ]
}

export function buildComparisonJsonLd(siteUrl: string, slug: string, title: string, description: string, competitor: string) {
  const base = siteUrl.replace(/\/$/, '')
  const url = `${base}/vs/${slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ferry', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: `${base}/#compare` },
        { '@type': 'ListItem', position: 3, name: `Ferry vs. ${competitor}`, item: url }
      ]
    }
  ]
}

export function buildLegalJsonLd(siteUrl: string, path: string, title: string, description: string, label: string) {
  const base = siteUrl.replace(/\/$/, '')
  const url = `${base}${path}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ferry', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: label, item: url }
      ]
    }
  ]
}

export function buildTourJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, '')
  const url = `${base}/tour`
  const title = 'Ferry for Windows - 35-Second Launch Tour'
  const description = 'Watch Ferry import saved WinSCP and PuTTY sessions, transfer files in dual-pane SFTP, run SSH commands, follow live tail -F logs, and monitor server CPU and memory in 35 seconds.'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ferry', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: '35-Second Product Tour', item: url }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: title,
      description,
      thumbnailUrl: [
        `${base}/og.jpg`,
        `${base}/media/files-terminal.webp`
      ],
      uploadDate: '2026-11-12T00:00:00+00:00',
      duration: 'PT35S',
      contentUrl: `${base}/media/ferry-launch-demo-35s.mp4`,
      embedUrl: url,
      potentialAction: {
        '@type': 'SeekToAction',
        target: `${url}?t={seek_to_second_number}`,
        'startOffset-input': 'required name=seek_to_second_number'
      },
      hasPart: tourChapters.map(c => ({
        '@type': 'Clip',
        name: c.name,
        startOffset: c.startOffset,
        endOffset: c.endOffset,
        url: `${url}?t=${c.startOffset}`
      }))
    }
  ]
}
