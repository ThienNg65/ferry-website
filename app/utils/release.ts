export const RELEASE_REPO = 'ThienNg65/ferry-release'
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
  notesUrl: string
  notes: string[]
}

const INSTALLER = /^Ferry-Setup-(.+)\.exe$/

/** Picks the Windows installer from a GitHub release. Never matches the .blockmap. */
export function pickInstaller(release: GithubRelease | null | undefined): Installer | null {
  const asset = release?.assets?.find((a) => INSTALLER.test(a.name))
  if (!asset) return null
  const version = INSTALLER.exec(asset.name)![1]!
  const sha256 = asset.digest?.startsWith('sha256:') ? asset.digest.slice(7) : null
  return {
    url: asset.browser_download_url,
    version,
    date: release?.published_at ?? '',
    size: asset.size,
    sha256,
    notesUrl: release?.html_url ?? '',
    notes: parseNotes(release?.body)
  }
}

/** First 3 bullet lines of a release body as plain text. Markdown and tags are stripped; render with {{ }}, never v-html. */
export function parseNotes(body: string | null | undefined): string[] {
  return (body ?? '')
    .split(/\r?\n/)
    .map((l) => /^\s*[-*+]\s+(.*)$/.exec(l)?.[1])
    .filter((l): l is string => !!l)
    .map((l) => l
      .replace(/<[^>]*>/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim())
    .filter(Boolean)
    .slice(0, 3)
}

/** A refresh only replaces the baked release when it really has an installer, so a failed fetch never downgrades the link. */
export function keepInstaller<T extends GithubRelease>(current: T | null, next: T | null): T | null {
  return pickInstaller(next) ? next : current
}
