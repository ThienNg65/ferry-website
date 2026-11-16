# Ferry Component Guide

**Stack:** Nuxt 4 · `@nuxt/ui` v4 (`UApp`, `UButton`, `UIcon`, `UColorModeButton`) · Tailwind CSS v4 · `@vueuse/core`  
**Scope:** Reusable component inventory combining Ferry's existing components with new/evolved patterns adapted from the OpenProject audit.

---

## 1. Navigation & Chrome Components

### 1.1 `SiteHeader` (Existing — Evolved)
- **Reference:** OpenProject sticky header flip + Ferry floating pill ([SiteHeader.vue](file:///c:/toys/ferry-dev/ferry-website/app/components/SiteHeader.vue)).
- **Specs:** `sticky top-4 z-50`, `h-16` (`64px`), `max-w-5xl`, `rounded-full border backdrop-blur-md`, `.surface-specular`. Past `36px` scroll, tightens border/bg (`border-primary/25 bg-elevated/90 shadow-lg`).
- **States:**
  - *Default / Hover / Focus-visible:* `min-h-11` (`44px`) nav triggers, `3px solid var(--ui-primary)` focus ring.
  - *Expanded Dropdown:* `aria-expanded="true"`, chevron `rotate-180 text-primary`, `rounded-[16px]` popover; dismisses on `Escape`, click outside, or link activation.
  - *Mobile (`< lg` / `1024px`):* Compact pill with hamburger toggle + `UColorModeButton` + `Download` action; expands full-width grouped menu drawer.
- **Adaptation from OpenProject:** Keep collapse at `1024px` (`lg`), avoiding OpenProject's premature `1200px` collapse on tablets.

### 1.2 `BreadcrumbBar` (New — Adopted from OpenProject `/docs/`)
- **Usage:** Top of `<main>` on all subpages (`/docs/...`, `/download`, `/releases`). Never footer-only.
- **Specs:** `<nav aria-label="Breadcrumb">`, `text-small text-muted`, `/` chevron separators (`aria-hidden="true"`), current item with `aria-current="page"` in `text-highlighted font-medium`, links `min-h-11` or `-my-2 inline-flex items-center py-2` for touch compliance.

### 1.3 `StickySubnav` (New — Adapted from OpenProject Product Overview & Docs)
- **Usage:** Long/deep pages (`/docs/...`, optional mobile jump bar on `/`).
- **Desktop (`lg+`):** Left docs tree (`w-60 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto`) + right `On this page` TOC (`w-56 sticky top-24`). Active item marks `border-l-2 border-primary text-highlighted font-medium`.
- **Mobile (`< lg`):** Collapses into a single compact sticky strip below `SiteHeader` with two `min-h-11` controls: `Docs menu` (drawer trigger) and `On this page` (`<details>` or controlled panel listing `h2`/`h3` anchors).

---

## 2. Hero, Showcase & Feature Components

### 2.1 `HeroWaterline` (Existing)
- **Structure:** `.grid-fade` backdrop → centered `h1` (`max-w-[22ch]`) → `text-lead` → primary `UButton` (`Download for Windows`, `min-h-12`, `rounded-[10px]`, `.btn-win`) + secondary `See the features` → version/SmartScreen honesty block → `.aura` + `HeroDemo` (`max-w-[68rem]`) → 4-item facts strip.
- **Responsive:** At `390px`, CTAs wrap cleanly (`flex-wrap`), facts stack `1–2` columns, `HeroDemo` fills width with container-query pane simplification.

### 2.2 `FeatureExplorer` (Existing — Evolved for Mobile Length)
- **Reference:** OpenProject Data Sovereignty vertical tabs + Task Management text-before-image mobile stacking.
- **Desktop (`lg+`):** Grouped stage selector (`1. Connect`, `2. Move & Run`, `3. Observe`) with animated underline indicator (`indicatorRef`) + 2-column split (sub-feature list on left, live `Demo*` window + `.pool` on right) + `#module-<id>` hash deep-linking.
- **Mobile (`< lg`) Refinement (P0):**
  - Always order **Module Heading + Sub-features → `DemoWindow`** (text-before-demo, matching OpenProject F-03).
  - Wrap sub-feature detail bullets inside a collapsed-by-default `<details>` (`Show details`) on `< 640px` while keeping the module switcher + live `DemoWindow` immediately visible—cutting mobile scroll height significantly (`ui-ux-audit-2026-11-13.md` F5).

### 2.3 `DemoWindow` & `Demo*` Suite (Existing — Core Differentiator)
- **Why Better Than OpenProject:** Zero network dependency, sharp at all DPIs, interactive (`DemoFiles` click-to-send, `DemoTransfers` Retry + history filter, `DemoTerminal` Replay, `DemoLogs` level filter + Pause, `DemoMonitor` column sort + Pause, `DemoSites` search filter).
- **Specs:** Wrapped in `<figure role="group">` with `.window` (`rounded-[14px] border-default shadow glow`), fixed `.demo` dark palette (`#1b1c1f`), `.pane` container queries dropping `Modified`/`Permissions` below `24rem`/`36rem`, `.hit` extended touch areas on compact `24–28px` rows, `min-h-11` standalone controls, Pause button on all loops > 5s.

### 2.4 `RealWorldExample` (Existing)
- **Desktop:** 5-step `<ol>` in `SpotlightSurface` cards on left; sticky `DemoWindow` on right (ancestor stays transform-free). Clicking/activating a step swaps the demo (`Files` → `Logs` → `Terminal` → `Monitor` → `Transfers`).
- **Mobile (`< lg`):** Keep step selector pill/accordion tightly paired above the demo preview so the user sees the demo update without scrolling back and forth.

---

## 3. Trust, Comparison & Conversion Components

### 3.1 `CompareTable` (Existing — Reinforced)
- **Reference:** OpenProject `.table-responsive` sticky first column.
- **Specs:** Semantic `<table>` with `sr-only` `<caption>`, `scope="col"` / `scope="row"`, Ferry column highlighted (`bg-primary/10 border-x border-primary/40`), first column sticky inside `role="region" tabindex="0"` horizontal scroll wrapper (never overflows page at `390px`).
- **Under Table:** "When another tool fits better" `SpotlightSurface` note + dated sources list (`min-h-11` links).

### 3.2 `DownloadPanel` & `VerificationCard` (Existing + Extension)
- **Specs:** `.band` section, centered CTA (`DownloadPanel.vue`) + `What's new` `<details>` + `Installation & file verification` `<details>` (`#install-details`).
- **Verification UX (Adapted from OpenProject Security & Docker Docs):**
  - Plain SmartScreen notice *before* download action.
  - Read-only `Cascadia Code` SHA-256 readout + `Get-FileHash .\Ferry-Setup-x.y.z.exe -Algorithm SHA256` snippet with `Copy` button (`aria-live="polite"` "Copied" feedback, `min-h-11` target).
  - Explicit caveat: checksum verifies GitHub release file integrity, not Windows Authenticode signing.

### 3.3 `CodeBlock` & `CalloutBox` (New — Adapted from OpenProject Docs)
- **`CodeBlock`:** Uses `.demo` dark frame (`rounded-[14px] border border-default`), optional filename/shell label (`PowerShell`, `bash`, `~/.ssh/config`), `overflow-x-auto` inner `<pre><code>` in `Cascadia Code` (never breaks `390px` viewport), and `min-h-11` top-right Copy button (`useClipboard`).
- **`CalloutBox`:** Variants `note` (`border-primary bg-primary/8`, info icon) and `caution` (`border-beacon bg-beacon/10`, alert icon). Sentence-case title + `max-w-[68ch]` body.

### 3.4 `FaqList` & `SiteFooter` (Existing)
- **`FaqList`:** `max-w-3xl`, native `<details>` with `SpotlightSurface` and `scheduleScrollTriggerRefresh(320)` on `@toggle`.
- **`SiteFooter`:** `py-20`, `gap-14`, 4-column desktop grid (`1.6fr repeat(3, 1fr)`), `min-h-11` links, MIT licence link with extended `-my-3 py-3` hit area, `Back to top` smooth anchor.
