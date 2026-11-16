# Ferry Implementation Roadmap

**Scope:** Prioritized, dependency-ordered roadmap translating the OpenProject reference audit into concrete improvements for `ferry-website` (Nuxt 4, `@nuxt/ui` v4, Tailwind CSS v4, GSAP + Lenis).  
**Constraint:** No implementation occurs in this research phase; this roadmap governs the next development phase.

---

## 1. Priority & Dependency Overview

```
Phase 1 (P0 — Landing UX, Mobile Length & Trust Clarity)
  ├── P0-1: Mobile height reduction & text-before-demo enforcement in FeatureExplorer / RealWorldExample
  ├── P0-2: Mobile sticky section jump bar on `/` (adapted from OpenProject Product Overview subnav)
  └── P0-3: Elevate SHA-256 + SmartScreen verification UX & copyable Get-FileHash CodeBlock
          │
          ▼
Phase 2 (P1 — Multi-Page Architecture: Docs, Releases & Dedicated Download/Verify)
  ├── P1-1: Shared CodeBlock, CalloutBox & BreadcrumbBar primitives
  ├── P1-2: 3-Column Documentation Layout + /docs/getting-started, /docs/smartscreen, /docs/import
  ├── P1-3: /releases changelog page (fed by GitHub Releases API + fallback)
  └── P1-4: SiteHeader & SiteFooter navigation updates for multi-route discovery
          │
          ▼
Phase 3 (P2 — Polish, Accessibility Proof & Verification Automation)
  ├── P2-1: /docs/accessibility (or FAQ/Docs section) documenting WCAG 2.2 AA & keyboard model
  ├── P2-2: Multi-viewport & reduced-motion Playwright/Chromium verification pass (320, 390, 768, 1440)
  └── P2-3: Update docs/design-system.md & CHANGELOG.md for next release
```

---

## 2. Detailed Phase Breakdown & Acceptance Criteria

### Phase 1 — P0: Landing Tightening, Mobile Ergonomics & Trust Clarity

| ID | Task | Dependencies | Reference Pattern | Acceptance Criteria |
|---|---|---|---|---|
| **P0-1** | **Tighten Mobile Vertical Rhythm & Text-Before-Demo Ordering** (`FeatureExplorer.vue`, `RealWorldExample.vue`) | None | OpenProject Task Mgmt mobile stacking ([Audit F-03](file:///c:/toys/ferry-dev/ferry-website/docs/REFERENCE_SITE_AUDIT.md#L127)) & Ferry audit F5 | 1. On `< 640px`, every feature module renders heading/summary *above* `DemoWindow`.<br>2. Sub-feature detail lists collapse cleanly behind a `min-h-11` `<details>` toggle on phones (open by default at `lg+`), reducing mobile page height below `12,000px` (down from `16.9k px`).<br>3. `scheduleScrollTriggerRefresh(320)` fires on every `<details>` toggle. |
| **P0-2** | **Sticky Mobile Section / Stage Bar** (`FeatureExplorer.vue` or `/` local nav) | P0-1 | OpenProject Product Overview sticky/dropdown subnav ([Audit F-01](file:///c:/toys/ferry-dev/ferry-website/docs/REFERENCE_SITE_AUDIT.md#L125)) | 1. Phone/tablet visitors can jump between `#features`, `#example`, `#compare`, `#download`, and `#faq` or switch `FeatureExplorer` modules in ≤ 2 taps.<br>2. Zero horizontal page overflow at `320px` and `390px` (`scrollWidth <= innerWidth`).<br>3. All triggers meet `min-h-11` (`44px`). |
| **P0-3** | **Upgrade `DownloadPanel` Verification Block** (`DownloadPanel.vue`, `CodeBlock` prototype) | None | OpenProject Security & Docker copyable blocks ([Audit F-05](file:///c:/toys/ferry-dev/ferry-website/docs/REFERENCE_SITE_AUDIT.md#L129)) | 1. `Get-FileHash` PowerShell snippet renders inside an `overflow-x-auto` `Cascadia Code` block with a `min-h-11` Copy button and `aria-live="polite"` "Copied" feedback.<br>2. Unsigned-installer + SmartScreen honesty copy remains visible *before* download and accurately notes that SHA-256 verifies file integrity, not Authenticode signing.<br>3. `useLatestRelease()` fallback (`NUXT_PUBLIC_RELEASE_REPO=ThienNg65/no-such-repo`) still passes cleanly. |

---

### Phase 2 — P1: Multi-Page Docs, Releases & Shared Primitives

| ID | Task | Dependencies | Reference Pattern | Acceptance Criteria |
|---|---|---|---|---|
| **P1-1** | **Extract Shared Primitives (`BreadcrumbBar`, `CodeBlock`, `CalloutBox`, `DocsShell`)** | P0-3 | OpenProject 3-col Docs & GitHub-style callouts ([Audit F-02](file:///c:/toys/ferry-dev/ferry-website/docs/REFERENCE_SITE_AUDIT.md#L126)) | 1. Zero raw hex outside `.demo` and `background.css`; `CalloutBox` uses semantic `--ui-primary` / `--beacon` tokens.<br>2. All text pairs pass `≥ 4.5:1` contrast in both `.dark` and `:root` light modes.<br>3. `CodeBlock` scrolls internally on `390px` without expanding document width. |
| **P1-2** | **Launch `/docs` Hub & Core Guides** (`/docs`, `/docs/getting-started`, `/docs/smartscreen`, `/docs/import`) | P1-1 | OpenProject `/docs/` + `/docs/user-guide/...` | 1. Desktop (`1024px+`) renders 3-column layout: sticky left nav tree (`240px`), `70ch` center prose, sticky right `On this page` TOC (`220px`).<br>2. Mobile/Tablet (`< 1024px`) collapses sidebars into sticky `Menu` drawer + `On this page` `<details>` accordion.<br>3. Every docs page ends with Prev/Next links and a calm return path to `/#download`.<br>4. Static prerender (`npm run generate`) outputs static HTML for every route. |
| **P1-3** | **Launch `/releases` Changelog Page** | P1-1 | OpenProject `/docs/release-notes/17/17-9-0/` ([Audit F-07](file:///c:/toys/ferry-dev/ferry-website/docs/REFERENCE_SITE_AUDIT.md#L131)) | 1. Displays latest release metadata (version, UTC date, size, SHA-256, release notes as plain text—never `v-html`) plus link to all GitHub releases.<br>2. Build never fails if GitHub API is unreachable or rate-limited. |
| **P1-4** | **Update `SiteHeader` & `SiteFooter` Multi-Route Navigation** | P1-2, P1-3 | OpenProject dual-route header (adapted without `1200px` collapse) | 1. `SiteHeader` routes cleanly between `/` anchors and `/docs`, `/releases` (fixing anchor links from subpages to `/#features`, `/#download`).<br>2. Desktop nav remains visible down to `1024px` (`lg`), collapsing cleanly below `1024px`.<br>3. `SiteFooter` includes working links to `/docs` and `/releases`. |

---

### Phase 3 — P2: Polish, Accessibility Transparency & QA Gates

| ID | Task | Dependencies | Reference Pattern | Acceptance Criteria |
|---|---|---|---|---|
| **P2-1** | **Document Accessibility & Keyboard Model (`/docs/accessibility` or section in `/docs`)** | P1-2 | OpenProject `/accessibility/` ([Audit F-09](file:///c:/toys/ferry-dev/ferry-website/docs/REFERENCE_SITE_AUDIT.md#L133)) | 1. Accurately states Ferry website's WCAG 2.2 AA practices, keyboard shortcuts, `prefers-reduced-motion` behavior, and link to report accessibility issues on GitHub. |
| **P2-2** | **Cross-Viewport & Theme Verification** | P1-4, P2-1 | Audit protocol (`320`, `390`, `768`, `1440`) | 1. Zero horizontal overflow at `320px`, `390px`, `768px`, and `1440px` in both dark and light themes.<br>2. `prefers-reduced-motion: reduce` verified: Lenis off, GSAP skipped, demos show finished state with working interactive filters/sorts.<br>3. First-Tab skip link, `:focus-visible` `3px` outline, zero console errors, `npx vitest run`, `npx vue-tsc --noEmit -p .nuxt/tsconfig.app.json`, and `npm run generate` all pass. |
| **P2-3** | **Update `docs/design-system.md` & `CHANGELOG.md`** | P2-2 | Ferry repo conventions | 1. New utilities, components, routes, and contrast measurements recorded in `docs/design-system.md`. |

---

## 3. Non-Negotiable Release Gates (From `docs/design-system.md` §13)

Before any phase ships to production:
1. No raw hex outside `.demo` and `background.css`; only `Geist` + `Cascadia Code`; no banned items (all-caps eyebrows, trailing `→` on buttons, gradient blobs, "alternative/replacement" phrasing, unverified telemetry claims).
2. All text/background pairs `≥ 4.5:1`; all interactive controls `≥ 44px` (`min-h-11`), except documented `.demo` dense rows with `.hit` extended touch areas.
3. Demos mirror only verified Ferry capabilities (`Files`, `Transfers`, `Terminal`, `Logs`, `Monitor`, `Connections`).
4. `npm test` (`vitest`), `vue-tsc`, and `npm run generate` pass cleanly—including with `NUXT_PUBLIC_RELEASE_REPO=ThienNg65/no-such-repo`.
