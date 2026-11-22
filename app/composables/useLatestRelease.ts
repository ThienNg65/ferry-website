import type { GithubRelease } from '~/utils/release'

/** Call once per page/layout. Baked in at prerender, refreshed once on mount; a failed refresh keeps the baked installer. */
export function useLatestRelease() {
  const repo = useRuntimeConfig().public.releaseRepo
  const page = releasesPage(repo)
  const api = `https://api.github.com/repos/${repo}/releases/latest`

  const { data } = useAsyncData('latest-release', () => $fetch<GithubRelease>(api).catch(() => null), { default: () => null })
  onMounted(async () => {
    const next = await $fetch<GithubRelease>(api).catch(() => null)
    data.value = keepInstaller(data.value, next, repo)
  })

  const installer = computed(() => pickInstaller(data.value, repo))
  return {
    installer,
    href: computed(() => installer.value?.url ?? page),
    portableHref: computed(() => installer.value?.portableUrl ?? page),
    label: computed(() => (installer.value ? 'Download for Windows' : 'Download from GitHub Releases')),
    releasesUrl: page,
    notesUrl: computed(() => installer.value?.notesUrl || page)
  }
}
