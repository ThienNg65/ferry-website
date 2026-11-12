import type { GithubRelease } from '~/utils/release'

/** Resolves the newest installer: baked in at prerender, re-fetched once on mount, falls back to the releases page. */
export function useLatestRelease() {
  const repo = useRuntimeConfig().public.releaseRepo
  const page = releasesPage(repo)

  const { data, refresh } = useAsyncData(
    'latest-release',
    () => $fetch<GithubRelease>(`https://api.github.com/repos/${repo}/releases/latest`).catch(() => null),
    { default: () => null }
  )
  onMounted(() => refresh())

  const installer = computed(() => pickInstaller(data.value))
  return {
    installer,
    href: computed(() => installer.value?.url ?? page),
    label: computed(() => (installer.value ? 'Download for Windows' : 'Download from GitHub Releases')),
    releasesUrl: page,
    notesUrl: computed(() => installer.value?.notesUrl || page)
  }
}
