import { describe, expect, it } from 'vitest'
import { pickInstaller } from './release'

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
