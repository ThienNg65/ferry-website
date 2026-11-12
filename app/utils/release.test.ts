import { describe, expect, it } from 'vitest'
import { keepInstaller, parseNotes, pickInstaller, releasesPage } from './release'
import type { GithubRelease } from './release'

const base = 'https://github.com/ThienNg65/ferry-release/releases/download/ferry-v0.20.0'
const exe = {
  name: 'Ferry-Setup-0.20.0.exe',
  size: 94367374,
  digest: 'sha256:6ee5263777d4767c9c4b3e0011d278e021b68c7536e4988be0ec38a1f709d53a',
  browser_download_url: `${base}/Ferry-Setup-0.20.0.exe`
}
const blockmap = { ...exe, name: 'Ferry-Setup-0.20.0.exe.blockmap', browser_download_url: `${base}/Ferry-Setup-0.20.0.exe.blockmap` }

it('builds the releases-page fallback', () => {
  expect(releasesPage('ThienNg65/ferry-release')).toBe('https://github.com/ThienNg65/ferry-release/releases/latest')
})

describe('pickInstaller', () => {
  it('picks the exe with version, size and sha256', () => {
    const r = pickInstaller({ published_at: '2026-11-12T04:56:41Z', html_url: 'https://github.com/ThienNg65/ferry-release/releases/tag/ferry-v0.20.0', assets: [blockmap, exe] })
    expect(r).toMatchObject({ url: exe.browser_download_url, version: '0.20.0', size: 94367374, notesUrl: 'https://github.com/ThienNg65/ferry-release/releases/tag/ferry-v0.20.0' })
    expect(r?.sha256).toBe('6ee5263777d4767c9c4b3e0011d278e021b68c7536e4988be0ec38a1f709d53a')
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
    expect(pickInstaller({ assets: [null, 7, { name: 5 }, exe] } as never)?.version).toBe('0.20.0')
  })
  it('ignores metadata and blockmap assets', () => {
    expect(pickInstaller({ assets: [blockmap, { ...exe, name: 'latest.yml' }] })).toBeNull()
  })
  it('only trusts installers hosted on GitHub release downloads', () => {
    expect(pick({ ...exe, browser_download_url: 'http://github.com/o/r/releases/download/v1/Ferry-Setup-1.exe' })).toBeNull()
    expect(pick({ ...exe, browser_download_url: 'https://evil.test/github.com/o/r/releases/download/x' })).toBeNull()
    expect(pick({ ...exe, browser_download_url: 'https://github.com/o/r/releases/download/v1/Ferry-Setup-1.exe' })).not.toBeNull()
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
  const older = { published_at: '2026-11-01T00:00:00Z', assets: [{ ...exe, name: 'Ferry-Setup-0.19.0.exe' }] }
  it('never rolls back to an older release', () => {
    expect(keepInstaller({ published_at: '2026-11-12T04:56:41Z', assets: [exe] }, older)).toMatchObject({ assets: [exe] })
  })
  it('ignores garbage', () => {
    const good = { assets: [exe] }
    expect(keepInstaller(good, 'x' as never)).toBe(good)
    expect(keepInstaller(good, { assets: {} } as never)).toBe(good)
  })
  const good: GithubRelease = { published_at: '2026-11-12T04:56:41Z', assets: [exe] }
  it('keeps the installer baked at build time when the refresh fails', () => {
    expect(keepInstaller(good, null)).toBe(good)
  })
  it('keeps it when the refresh returns a release with no installer', () => {
    expect(keepInstaller(good, { assets: [blockmap] })).toBe(good)
  })
  it('takes the refreshed release when it has an installer', () => {
    const newer = { assets: [{ ...exe, name: 'Ferry-Setup-0.21.0.exe' }] }
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
