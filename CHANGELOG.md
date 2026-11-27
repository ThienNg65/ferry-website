# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## Unreleased

### Added

- Midnight Navy Minimal redesign (`DESIGN.md`, `PRODUCT.md`) with dark-first default (`#030816`) and light-mode toggle (`.light`), modeled on `termius.com` structure and two-tone heading hierarchy.
- Newest Frosted Glass Ferry icon (`public/ferry-glass.svg`, `public/favicon.ico`, `public/icon.webp`, `public/apple-touch-icon.png`, `public/site.webmanifest`) and regenerated `1200x630` Modern Glass `public/og.jpg`.
- Real `1600x900` WebP Modern Glass UI captures (`public/media/*.webp`) across a linear problem-solving flow (`HeroSection`, `WorkspaceSection`, `ProblemSplitsSection`, `MigrationBentoSection`, `SecuritySection`) and the 35-second 1080p MP4 product tour (`public/media/ferry-launch-demo-35s.mp4`) inside `PromoVideoModal`.
- Full `v1.3.2+` product and distribution sync: Microsoft Store (`9PJPWK568P53`), Direct `.exe` + Portable `.zip` (`pickInstaller` in `app/utils/release.ts`), in-place remote file editing, Folder Sync & Compare, and File Visibility Filters.
- Static SEO & legal routes: `/privacy`, `/terms`, `/vs/winscp`, `/vs/termius`, `/vs/mobaxterm`, `/vs/filezilla`, plus `public/robots.txt`, `public/sitemap.xml`, and `SoftwareApplication`, `WebSite`, `FAQPage`, and `BreadcrumbList` JSON-LD schemas.

### Changed

- Rewrote the home, `/vs/*` and `/tour` copy and meta descriptions in plain developer language, shortened the `/vs/*` descriptions to fit search results, and added "Free" and "live log tail" to the home title. Replaced the social preview image with a branded card (headline, keyword badges, app screenshot).

### Removed

- Retired coded HTML/CSS UI demos (`Demo*`, `HeroDemo`, `useDemoLoop`, `demoData`), decorative `background.css` (`.grid-fade`), `AmbientConnectionBackground.vue`, `MobileSectionNav.vue`, `SpotlightSurface.vue`, `.btn-win` hover label swaps, and `CodeBlock.vue`.

### Fixed

- Routed all public GitHub, release, issue, and licence links exclusively to `ThienNg65/ferry-release`.
- Fixed missing `absolute` positioning on `LogRail` markers in `DemoLogs.vue`.

## 0.2.0 (2026-11-12)

### Added

- A "How Ferry compares" table against WinSCP and MobaXterm, with a note on when another tool fits better and the sources checked in November 2026.
- A "A deploy broke at 6 pm" walkthrough where each step links to the matching feature tab.
- A feature explorer with six modules (files, transfers, terminal, logs, monitor, connections) and their named sub-features.
- The download panel now shows the system requirements and "What's new" from the latest release.
- Three new FAQ answers: is Ferry free, what if development stops, and what Ferry isn't for.
- Changelog and licence links in the header and footer.

### Changed

- The hero headline is shorter, so more of the real app shows on the first screen.
- Showcase and feature screenshots are cropped to the part they sell and are readable at normal size.
- The four showcase tabs now fit on a phone in a 2x2 grid.
- On a phone the header button goes to the download section instead of downloading an installer that cannot run there.
- Link previews now use absolute image and page addresses.
- The header icon is a 64 px WebP instead of a 306 KB PNG.

### Fixed

- The page makes one request to GitHub instead of four.
- A failed refresh no longer replaces the direct installer link with the releases page.

### Removed

- The "Built for the rest of the job" section, replaced by the feature explorer.

## 0.1.0 (2026-11-12)

### Added

- First version of the Ferry landing page: a static Nuxt 4 site with a waterline hero, a four-tab product showcase, feature rows, a download panel, a FAQ and a footer.
- Download button that links to the newest `Ferry-Setup-*.exe` from the Ferry release repository, shows its version, date, size and SHA-256, and falls back to the releases page if GitHub cannot be reached.
- Plain notice that the installer is not code-signed yet, with the SmartScreen steps.
- Twelve new screenshots of the real app, as JPEG and WebP, plus the social preview image, icon and favicon.
- Design system and review guide in `docs/design-system.md`.
- Unit tests for choosing the installer from a release.
