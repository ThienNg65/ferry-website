export const RELEASE_REPO = 'ThienNg65/ferry-release'
export const RELEASES_URL = `https://github.com/${RELEASE_REPO}`
export const STORE_URL = 'https://apps.microsoft.com/detail/9PJPWK568P53'
export const releasesPage = (repo: string): string => `https://github.com/${repo}/releases/latest`

export interface GithubAsset {
  name: string
  size: number
  digest?: string | null
  browser_download_url: string
}

export interface GithubRelease {
  published_at?: string
  html_url?: string
  body?: string | null
  assets?: GithubAsset[]
}

export interface Installer {
  url: string
  version: string
  date: string
  size: number
  sha256: string | null
  portableUrl: string | null
  portableSize: number
  notesUrl: string
  notes: string[]
}

const INSTALLER = /^Ferry-Setup-(.+)\.exe$/
const PORTABLE = /^Ferry-Portable-(.+)-win-x64\.zip$/
const SHA256 = /^sha256:([0-9a-f]{64})$/i

function isTrustedAsset(a: Partial<GithubAsset & { state: string }> | undefined | null, pattern: RegExp, prefix: string): a is GithubAsset {
  return typeof a?.name === 'string' && pattern.test(a.name)
    && typeof a.browser_download_url === 'string'
    && a.browser_download_url.toLowerCase().startsWith(prefix) && a.browser_download_url.endsWith(`/${a.name}`)
    && (a.state === undefined || a.state === 'uploaded')
}

/** Picks the Windows installer (and optional portable ZIP) from a GitHub release. Never matches the .blockmap. */
export function pickInstaller(release: GithubRelease | null | undefined, repo: string = RELEASE_REPO): Installer | null {
  const assets: unknown = release?.assets
  if (!Array.isArray(assets)) return null
  const prefix = `https://github.com/${repo}/releases/download/`.toLowerCase()
  const typed = assets as Partial<GithubAsset & { state: string }>[]
  const asset = typed.find(a => isTrustedAsset(a, INSTALLER, prefix))
  if (!asset) return null
  const portable = typed.find(a => isTrustedAsset(a, PORTABLE, prefix))
  const published = release?.published_at
  const notesUrl = release?.html_url
  return {
    url: asset.browser_download_url,
    version: INSTALLER.exec(asset.name)![1]!,
    date: published && !Number.isNaN(Date.parse(published)) ? published : '',
    size: Number.isFinite(asset.size) && asset.size > 0 ? asset.size : 0,
    sha256: SHA256.exec(asset.digest ?? '')?.[1]?.toLowerCase() ?? null,
    portableUrl: portable ? portable.browser_download_url : null,
    portableSize: portable && Number.isFinite(portable.size) && portable.size > 0 ? portable.size : 0,
    notesUrl: typeof notesUrl === 'string' && notesUrl.startsWith('https://github.com/') ? notesUrl : '',
    notes: parseNotes(release?.body)
  }
}

/** First 3 bullet lines of a release body as plain text. Markdown and tags are stripped; render with {{ }}, never v-html. */
export function parseNotes(body: string | null | undefined): string[] {
  return (body ?? '')
    .split(/\r?\n/)
    .map(l => /^\s*[-*+]\s+(.*)$/.exec(l)?.[1])
    .filter((l): l is string => !!l)
    .map(l => l
      .replace(/<[^>]*>/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim())
    .filter(Boolean)
    .slice(0, 3)
}

/** A refresh only replaces the baked release when it has an installer and is not older, so neither a failed fetch nor a stale cached response downgrades the link. */
export function keepInstaller<T extends GithubRelease>(current: T | null, next: T | null, repo: string = RELEASE_REPO): T | null {
  const picked = pickInstaller(next, repo)
  if (!picked) return current
  const have = pickInstaller(current, repo)
  // Without a trustworthy date on the refresh we cannot show it is newer than a dated baked release.
  if (have?.date && (!picked.date || Date.parse(picked.date) < Date.parse(have.date))) return current
  return next
}
