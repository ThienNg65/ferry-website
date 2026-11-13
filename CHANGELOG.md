# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## Unreleased

### Changed

- The page now has one continuous, quiet background of fine blue lines that run from your computer to your servers, with soft signal pulses, that follows the section you are reading and, in the hero on desktop, reacts gently to the mouse. Phones and tablets get a still version, and so do visitors who prefer reduced motion.
- The unsigned-installer notice appears before the download button in the hero and download section, and the header Download button links to that section. The protocol FAQ is merged into one question, and the FAQ is ordered around compatibility, protocols, security, licensing, installation and updates.
- Redesigned the page with dark and light themes. Six working demos in code replace the videos and screenshots, the type is now Geist, and sections have more room. The page also has a calmer background, content that fades in as you scroll, and a scrollbar in the site colours.

### Fixed

- The download button only uses the Ferry installer from the Ferry GitHub releases, and an older, undated or malformed release response can no longer replace a newer valid link.
- The size no longer says "About 90 MB" in fixed text, and a missing size, date or checksum is left out instead of showing a broken value.
- The unsigned-installer notice clearly explains why Windows SmartScreen may warn about Ferry's not-yet-code-signed installer.

### Removed

- The "Installation & file verification" panel and "Choosing the right tool" recommendation block, while keeping the installer warning and comparison sources.
- Visible "interactive preview" and "sample data" captions surrounding the demos; accessible demo labels remain.

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
