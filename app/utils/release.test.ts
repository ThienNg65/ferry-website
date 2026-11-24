import { describe, expect, it } from 'vitest'
import { buildComparisonJsonLd, buildHomeJsonLd, buildLegalJsonLd, buildTourJsonLd } from '../composables/useSeoSchema'
import { keepInstaller, parseNotes, pickInstaller, releasesPage } from './release'
import type { GithubRelease } from './release'

const base = 'https://github.com/ThienNg65/ferry-release/releases/download/ferry-v1.3.2'
const exe = {
  name: 'Ferry-Setup-1.3.2.exe',
  size: 24117248,
  digest: 'sha256:6ee5263777d4767c9c4b3e0011d278e021b68c7536e4988be0ec38a1f709d53a',
  browser_download_url: `${base}/Ferry-Setup-1.3.2.exe`
}
const portable = {
  name: 'Ferry-Portable-1.3.2-win-x64.zip',
  size: 25165824,
  browser_download_url: `${base}/Ferry-Portable-1.3.2-win-x64.zip`
}
const blockmap = { ...exe, name: 'Ferry-Setup-1.3.2.exe.blockmap', browser_download_url: `${base}/Ferry-Setup-1.3.2.exe.blockmap` }

it('builds the releases-page fallback', () => {
  expect(releasesPage('ThienNg65/ferry-release')).toBe('https://github.com/ThienNg65/ferry-release/releases/latest')
})

describe('pickInstaller', () => {
  it('picks the exe and portable zip with version, size and sha256', () => {
    const r = pickInstaller({ published_at: '2026-11-21T04:56:41Z', html_url: 'https://github.com/ThienNg65/ferry-release/releases/tag/ferry-v1.3.2', assets: [blockmap, exe, portable] })
    expect(r).toMatchObject({
      url: exe.browser_download_url,
      version: '1.3.2',
      size: 24117248,
      portableUrl: portable.browser_download_url,
      portableSize: 25165824,
      notesUrl: 'https://github.com/ThienNg65/ferry-release/releases/tag/ferry-v1.3.2'
    })
    expect(r?.sha256).toBe('6ee5263777d4767c9c4b3e0011d278e021b68c7536e4988be0ec38a1f709d53a')
  })
  it('handles missing portable zip gracefully', () => {
    const r = pickInstaller({ assets: [exe] })
    expect(r?.portableUrl).toBeNull()
    expect(r?.portableSize).toBe(0)
  })
  it('never returns the blockmap', () => {
    expect(pickInstaller({ assets: [blockmap] })).toBeNull()
  })
  it('returns null when there is no installer or no release', () => {
    expect(pickInstaller({ assets: [] })).toBeNull()
    expect(pickInstaller(undefined)).toBeNull()
  })
  it('keeps the installer when the digest is missing', () => {
    expect(pickInstaller({ assets: [{ ...exe, digest: null }] })?.sha256).toBeNull()
  })
})

describe('pickInstaller with bad data', () => {
  const pick = (a: unknown) => pickInstaller({ assets: [a as typeof exe] })
  it('survives malformed releases', () => {
    expect(pickInstaller({ assets: {} } as never)).toBeNull()
    expect(pickInstaller({ assets: 'x' } as never)).toBeNull()
    expect(pickInstaller('x' as never)).toBeNull()
    expect(pickInstaller({ assets: [null, 7, { name: 5 }, exe] } as never)?.version).toBe('1.3.2')
  })
  it('ignores metadata and blockmap assets', () => {
    expect(pickInstaller({ assets: [blockmap, { ...exe, name: 'latest.yml' }] })).toBeNull()
  })
  it('only trusts installers hosted on GitHub release downloads', () => {
    expect(pick({ ...exe, browser_download_url: base.replace('https', 'http') + '/' + exe.name })).toBeNull()
    expect(pick({ ...exe, browser_download_url: 'https://evil.test/github.com/ThienNg65/ferry-release/releases/download/x/' + exe.name })).toBeNull()
  })
  it('only trusts the configured repo and the asset’s own file name', () => {
    const other = { ...exe, browser_download_url: `https://github.com/other/repo/releases/download/v1/${exe.name}` }
    expect(pick(other)).toBeNull()
    expect(pickInstaller({ assets: [other] }, 'other/repo')).not.toBeNull()
    expect(pick({ ...exe, browser_download_url: `${base}/something-else.exe` })).toBeNull()
  })
  it('ignores untrusted portable zips', () => {
    const evilZip = { ...portable, browser_download_url: 'https://evil.test/Ferry-Portable-1.3.2-win-x64.zip' }
    expect(pickInstaller({ assets: [exe, evilZip] })?.portableUrl).toBeNull()
  })
  it('skips assets that are not fully uploaded', () => {
    expect(pick({ ...exe, state: 'starter' })).toBeNull()
    expect(pick({ ...exe, state: 'uploaded' })).not.toBeNull()
  })
  it('keeps only a well-formed sha256', () => {
    expect(pick({ ...exe, digest: 'sha256:abc' })?.sha256).toBeNull()
    expect(pick({ ...exe, digest: 'sha1:' + 'a'.repeat(40) })?.sha256).toBeNull()
    expect(pick({ ...exe, digest: 'sha256:' + 'A'.repeat(64) })?.sha256).toBe('a'.repeat(64))
  })
  it('drops unusable size, date and notes link instead of showing junk', () => {
    const r = pickInstaller({ published_at: 'not a date', html_url: 'javascript:alert(1)', assets: [{ ...exe, size: 0 }] })
    expect(r).toMatchObject({ size: 0, date: '', notesUrl: '' })
  })
})

describe('keepInstaller (client refresh)', () => {
  const older = { published_at: '2026-11-01T00:00:00Z', assets: [{ ...exe, name: 'Ferry-Setup-1.3.0.exe' }] }
  it('never rolls back to an older release', () => {
    expect(keepInstaller({ published_at: '2026-11-21T04:56:41Z', assets: [exe] }, older)).toMatchObject({ assets: [exe] })
  })
  it('keeps a dated baked release when the refresh has no usable date', () => {
    const baked: GithubRelease = { published_at: '2026-11-21T04:56:41Z', assets: [exe] }
    expect(keepInstaller(baked, { assets: [{ ...exe, name: 'Ferry-Setup-1.3.0.exe', browser_download_url: `${base}/Ferry-Setup-1.3.0.exe` }] })).toBe(baked)
    expect(keepInstaller(baked, { published_at: 'junk', assets: [exe] })).toBe(baked)
  })
  it('takes the refresh when the baked release has no date, or when dates are equal', () => {
    const next: GithubRelease = { published_at: '2026-11-21T04:56:41Z', assets: [exe] }
    expect(keepInstaller({ assets: [exe] }, next)).toBe(next)
    expect(keepInstaller({ ...next }, next)).toBe(next)
  })
  it('takes the refresh over a malformed baked release', () => {
    const next: GithubRelease = { published_at: '2026-11-21T04:56:41Z', assets: [exe] }
    expect(keepInstaller({ assets: {} } as never, next)).toBe(next)
  })
  it('ignores garbage', () => {
    const good = { assets: [exe] }
    expect(keepInstaller(good, 'x' as never)).toBe(good)
    expect(keepInstaller(good, { assets: {} } as never)).toBe(good)
  })
  const good: GithubRelease = { published_at: '2026-11-21T04:56:41Z', assets: [exe] }
  it('keeps the installer baked at build time when the refresh fails', () => {
    expect(keepInstaller(good, null)).toBe(good)
  })
  it('keeps it when the refresh returns a release with no installer', () => {
    expect(keepInstaller(good, { assets: [blockmap] })).toBe(good)
  })
  it('takes the refreshed release when it has an installer', () => {
    const newer = { published_at: '2026-11-25T00:00:00Z', assets: [{ ...exe, name: 'Ferry-Setup-1.3.3.exe', browser_download_url: `${base}/Ferry-Setup-1.3.3.exe` }] }
    expect(keepInstaller(good, newer)).toBe(newer)
  })
  it('takes the refresh when nothing was baked', () => {
    expect(keepInstaller(null, good)).toBe(good)
  })
})

describe('release notes', () => {
  const body = '## What changed\n\n- **Sync**: preview before [copying](https://x.test)\n* Fixed `tail -F` restart\n+ Faster list\n- Fourth line\n\nPlain paragraph'
  it('keeps the first 3 bullet lines as plain text', () => {
    expect(parseNotes(body)).toEqual(['Sync: preview before copying', 'Fixed tail -F restart', 'Faster list'])
  })
  it('never keeps markup', () => {
    expect(parseNotes('- <img src=x onerror=alert(1)> hi')).toEqual(['hi'])
  })
  it('returns an empty list without a body', () => {
    expect(parseNotes(undefined)).toEqual([])
  })
  it('puts the notes on the installer', () => {
    expect(pickInstaller({ body: '- One', assets: [exe] })?.notes).toEqual(['One'])
  })
})

describe('useSeoSchema JSON-LD', () => {
  const site = 'https://www.ferryssh.com/'

  it('builds WebSite, Organization, SoftwareApplication and FAQPage on home', () => {
    const schemas = buildHomeJsonLd(site, '1.3.2')
    const types = schemas.map(s => s['@type'])
    expect(types).toEqual(['WebSite', 'Organization', 'SoftwareApplication', 'FAQPage'])
    const website = schemas[0] as { alternateName: string[], url: string }
    expect(website.url).toBe('https://www.ferryssh.com/')
    expect(website.alternateName).toContain('ferryssh.com')
    const org = schemas[1] as { '@id': string, logo: string }
    expect(org['@id']).toBe('https://www.ferryssh.com/#organization')
    expect(org.logo).toBe('https://www.ferryssh.com/icon-512.png')
    const app = schemas[2] as { softwareVersion: string, publisher: { '@id': string } }
    expect(app.softwareVersion).toBe('1.3.2')
    expect(app.publisher['@id']).toBe('https://www.ferryssh.com/#organization')
  })

  it('builds 3-item BreadcrumbList on comparison pages matching visible breadcrumb', () => {
    const schemas = buildComparisonJsonLd(site, 'winscp', 'Ferry vs. WinSCP', 'desc', 'WinSCP')
    const crumbs = schemas[1] as { itemListElement: Array<{ position: number, name: string, item: string }> }
    expect(crumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Ferry', item: 'https://www.ferryssh.com/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.ferryssh.com/#compare' },
      { '@type': 'ListItem', position: 3, name: 'Ferry vs. WinSCP', item: 'https://www.ferryssh.com/vs/winscp' }
    ])
  })

  it('builds legal BreadcrumbList cleanly', () => {
    const schemas = buildLegalJsonLd(site, '/privacy', 'Privacy', 'desc', 'Privacy Policy')
    const crumbs = schemas[1] as { itemListElement: Array<{ position: number, name: string, item: string }> }
    expect(crumbs.itemListElement).toHaveLength(2)
    expect(crumbs.itemListElement[1]?.item).toBe('https://www.ferryssh.com/privacy')
  })

  it('builds VideoObject with SeekToAction and 4 Clip key moments on /tour', () => {
    const schemas = buildTourJsonLd(site)
    const video = schemas.find(s => s['@type'] === 'VideoObject') as {
      duration: string
      contentUrl: string
      hasPart: Array<{ '@type': string, startOffset: number, endOffset: number, url: string }>
    }
    expect(video.duration).toBe('PT35S')
    expect(video.contentUrl).toBe('https://www.ferryssh.com/media/ferry-launch-demo-35s.mp4')
    expect(video.hasPart).toHaveLength(4)
    expect(video.hasPart[0]?.startOffset).toBe(0)
    expect(video.hasPart[3]?.endOffset).toBe(35)
    expect(video.hasPart[2]?.url).toBe('https://www.ferryssh.com/tour?t=14')
  })
})
