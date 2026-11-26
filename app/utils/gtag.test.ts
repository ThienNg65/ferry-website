import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GOOGLE_ADS_CONVERSION_SEND_TO, trackAdsConversion } from './gtag'

describe('trackAdsConversion', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('calls window.gtag with beacon transport when onDone is omitted', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { gtag, setTimeout, clearTimeout })

    trackAdsConversion()

    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      transport_type: 'beacon'
    })
  })

  it('calls onDone once via event_callback and does not double-fire when fallback timer elapses', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { gtag, setTimeout, clearTimeout })
    const onDone = vi.fn()

    trackAdsConversion(onDone, 600)

    const payload = gtag.mock.calls[0]?.[2] as { event_callback: () => void, event_timeout: number }
    expect(payload.event_timeout).toBe(600)
    payload.event_callback()
    vi.advanceTimersByTime(1000)

    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('falls back to calling onDone after timeoutMs when event_callback is never invoked', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { gtag, setTimeout, clearTimeout })
    const onDone = vi.fn()

    trackAdsConversion(onDone, 600)
    vi.advanceTimersByTime(599)
    expect(onDone).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('calls onDone immediately without throwing when window.gtag is missing', () => {
    vi.stubGlobal('window', { setTimeout, clearTimeout })
    const onDone = vi.fn()

    expect(() => trackAdsConversion(onDone)).not.toThrow()
    expect(onDone).toHaveBeenCalledTimes(1)
  })
})
