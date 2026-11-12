# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## 0.1.0 (2026-11-12)

### Added

- First version of the Ferry landing page: a static Nuxt 4 site with a waterline hero, a four-tab product showcase, feature rows, a download panel, a FAQ and a footer.
- Download button that links to the newest `Ferry-Setup-*.exe` from the Ferry release repository, shows its version, date, size and SHA-256, and falls back to the releases page if GitHub cannot be reached.
- Plain notice that the installer is not code-signed yet, with the SmartScreen steps.
- Twelve new screenshots of the real app, as JPEG and WebP, plus the social preview image, icon and favicon.
- Design system and review guide in `docs/design-system.md`.
- Unit tests for choosing the installer from a release.
