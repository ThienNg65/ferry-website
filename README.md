# Ferry website

The landing page for [Ferry](https://github.com/ThienNg65/ferry-release), a Windows app for working with remote servers over SSH and SFTP.

Nuxt 4, `@nuxt/ui` v4 and Tailwind CSS 4, generated as a static site.

## Develop

```bash
npm install --registry=https://registry.npmjs.org
npm run dev        # http://localhost:3000
npm test           # vitest: release-picking, SEO schema, and motion tests
npm run generate   # static site into .output/public
npx serve .output/public
```

## How the Download button works

`useLatestRelease()` asks the GitHub API for `ThienNg65/ferry-release/releases/latest` and `pickInstaller()` (in `app/utils/release.ts`) picks the `Ferry-Setup-*.exe` asset, never the `.blockmap`. The version, date, size and SHA-256 (from the asset digest) are baked into the HTML at build time. The page asks again once in the browser, so a release published after the last deploy still gets the newest link (GitHub caches the API for about 60 seconds; without JavaScript the baked link stays until the next deploy). The picked asset must be hosted on `github.com/.../releases/download/`, fully uploaded, and the refresh never replaces a newer release with an older one. A malformed response counts as "no installer".

If the API fails, is rate limited, or the release has no installer, the button reads "Download from GitHub Releases" and links to `/releases/latest`. The build never fails because of the API.

The repository is `runtimeConfig.public.releaseRepo`. To test the fallback:

```bash
NUXT_PUBLIC_RELEASE_REPO=ThienNg65/no-such-repo npm run generate
```

## Screenshots and Media

`public/media/` holds dark-theme WebP captures of the app (`public/media/light/` holds light-theme twins) along with the `ferry-launch-demo-35s.mp4` tour video. Keep all captures free of real hostnames, usernames and paths.

## Deploy on Vercel

Import the repository. Vercel detects Nuxt. If you set it by hand:

- Build command: `npm run generate`
- Output directory: `.output/public`

No environment variables are required (`runtimeConfig.public.siteUrl` defaults to `https://www.ferryssh.com`). Override `NUXT_PUBLIC_SITE_URL` only when deploying to a non-production or preview domain.

## Notes

The direct NSIS installer is not code-signed yet, and the page says so (recommending the signed Microsoft Store build when a trusted install is preferred). Do not describe Ferry as a replacement for another product; the page speaks about what Ferry does.

## Design and conventions

See [DESIGN.md](DESIGN.md) and [docs/design-system.md](docs/design-system.md) for tokens, fonts, patterns and the review checklist. Changes are listed in [CHANGELOG.md](CHANGELOG.md).
