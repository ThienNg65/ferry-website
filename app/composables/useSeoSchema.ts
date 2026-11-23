import { faqItems } from '~/utils/comparisons'
import { STORE_URL } from '~/utils/release'

export function buildHomeJsonLd(siteUrl: string, version?: string) {
  const base = siteUrl.replace(/\/$/, '')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ferry',
      url: `${base}/`,
      description: 'Windows SSH and SFTP client combining dual-pane file transfer, built-in SSH terminal, live tail -F logs, and server monitor in one app.'
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
        { '@type': 'ListItem', position: 2, name: `Ferry vs. ${competitor}`, item: url }
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
