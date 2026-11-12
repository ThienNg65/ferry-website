# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

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
