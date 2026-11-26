export const GOOGLE_ADS_CONVERSION_SEND_TO = 'AW-18597036336/VL9qCOfphMAdELCC4aNF'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Fires the Google Ads download/Store conversion event, safely handling SSR, ad blockers, and optional redirect callbacks. */
export function trackAdsConversion(onDone?: () => void, timeoutMs = 600): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    onDone?.()
    return
  }

  if (!onDone) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      transport_type: 'beacon'
    })
    return
  }

  let settled = false
  let timer: number | undefined
  const finish = () => {
    if (settled) return
    settled = true
    if (timer !== undefined) window.clearTimeout(timer)
    onDone()
  }

  timer = window.setTimeout(finish, timeoutMs)
  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
    transport_type: 'beacon',
    event_callback: finish,
    event_timeout: timeoutMs
  })
}
