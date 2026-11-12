import { describe, expect, it } from 'vitest'
import { keepInstaller, parseNotes, pickInstaller } from './release'

const exe = {
  name: 'Ferry-Setup-0.20.0.exe',
  size: 94367374,
  digest: 'sha256:6ee5263777d4767c9c4b3e0011d278e021b68c7536e4988be0ec38a1f709d53a',
  browser_download_url: 'https://example.test/Ferry-Setup-0.20.0.exe'
}
const blockmap = { ...exe, name: 'Ferry-Setup-0.20.0.exe.blockmap', browser_download_url: 'https://example.test/x.blockmap' }

describe('pickInstaller', () => {
  it('picks the exe with version, size and sha256', () => {
    const r = pickInstaller({ published_at: '2026-11-12T04:56:41Z', html_url: 'https://example.test/rel', assets: [blockmap, exe] })
    expect(r).toMatchObject({ url: exe.browser_download_url, version: '0.20.0', size: 94367374, notesUrl: 'https://example.test/rel' })
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

describe('keepInstaller (client refresh)', () => {
  const good = { published_at: '2026-11-12T04:56:41Z', assets: [exe] }
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
