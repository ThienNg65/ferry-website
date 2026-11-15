# Ferry UX Architecture & Visitor Journeys

**Baseline:** Ferry currently operates as a single-route landing page (`app/app.vue`, `11.9k px` desktop / `16.9k px` mobile) with 6 sections (`HeroWaterline`, `FeatureExplorer`, `RealWorldExample`, `CompareTable`, `DownloadPanel`, `FaqList`).  
**Evolution Goal:** Preserve the instant single-page conversion loop while adopting OpenProject's clear separation of **Discovery → Interactive Proof → Verification/Download → Technical Docs → Release History**, cutting mobile scroll fatigue and strengthening developer trust.

---

## 1. Proposed Information Architecture & Sitemap

```
/                         → Flagship Landing (Hero + FeatureExplorer + RealWorldExample + Compare + Download + FAQ)
├── /download             → Dedicated Download, SHA-256 Verification & SmartScreen Walkthrough (optional deep link from hero/header)
├── /releases             → Structured Release Notes & Changelog (mirrors OpenProject /docs/release-notes/ cadence, powered by GitHub Releases)
└── /docs                 → Technical Documentation Hub (mirrors OpenProject /docs/ 3-column reading shell)
    ├── /docs/getting-started     → First connection, host-key prompt, SSH key/agent setup
    ├── /docs/smartscreen         → Unsigned installer explanation, Get-FileHash verification, publisher roadmap
    ├── /docs/import              → Importing sites from WinSCP, PuTTY, and ~/.ssh/config
    └── /docs/modules             → Files, Transfers, Terminal, Logs, Monitor reference
```

> **Scope Discipline (Lazy-Senior Check):** Do NOT build OpenProject's 10-industry hubs, blog magazine, pricing calculator, or customer logo walls. Ferry is a free MIT Windows SSH/SFTP desktop tool—every route must directly help a developer evaluate, trust, install, or configure Ferry.

---

## 2. Navigation System (Global + Local + Mobile)

### 2.1 Global Header (`SiteHeader.vue` — `64px` Floating Pill)
Retain Ferry's signature floating pill (`sticky top-4 max-w-5xl rounded-full`) and grouped dropdown pattern, refined with lessons from OpenProject:
- **Left:** Ferry mark + `Ferry` wordmark (`/`).
- **Center (Desktop `lg+` / `1024px+`):**
  - `Explore` dropdown (`Features` `/#features`, `Workflow` `/#example`, `Compare` `/#compare`)
  - `Docs` direct link (`/docs/getting-started`) *or* `Resources` dropdown (`Setup docs` `/docs`, `Releases` `/releases`, `FAQ` `/#faq`, `GitHub` repo)
- **Right:** `UColorModeButton` (Dark/Light crossing toggle) + Primary CTA (`Download` → `#download` on `/` or `/download` from subpages).
- **Tablet & Mobile (`< 1024px`):** Collapses into Menu toggle + Wordmark + Theme toggle + Download button inside a full-width pill, opening a touch-safe (`min-h-11`) grouped drawer (`Escape` + outside-click dismissible).

### 2.2 Local Wayfinding (Learned from OpenProject)
1. **Top Breadcrumbs on Subpages (Adapt from OpenProject `/docs/`):** OpenProject puts marketing breadcrumbs only in the footer (bad discoverability), while `/docs/` puts them cleanly at the top of `<main>`. Ferry subpages (`/docs/...`, `/releases`, `/download`) MUST display a compact breadcrumb bar at the top of `<main>` (`Home / Docs / Getting started`).
2. **Mobile Sticky Section Pill / TOC Accordion (Adapt from OpenProject `/collaboration-software-features/` & `/docs/`):**
   - On `/docs/...` `< lg`, render a sticky bar below the pill header with two `min-h-11` buttons: `Menu` (opens left docs tree drawer) and `On this page` (expands in-page heading accordion).
   - On `/`, keep `FeatureExplorer` stage tabs (`1. Connect`, `2. Move & Run`, `3. Observe`) compact and sticky or horizontally scrollable so phone visitors can jump modules without scrolling 16,900px (`docs/ui-ux-audit-2026-11-13.md` F5).
3. **Global Footer (`SiteFooter.vue`):** Retain the 3-column semantic `<nav>` layout (`Product`, `Releases`, `Docs & Help`), MIT licence note, and `Back to top` anchor.

---

## 3. Page Composition Templates

### Template A: Flagship Landing (`/`)
1. **Hero (`HeroWaterline`):** `h1` task headline → 2-sentence SSH/SFTP value prop → Primary `Download for Windows` + Secondary `See the features` → Honest version + unsigned/SmartScreen single-line notice (`min-h-11` hit area on `Details`) → Interactive `HeroDemo` window → 4 factual pills (`SSH and SFTP only`, `Windows 10 and 11, 64-bit`, `MIT licence`, `No account needed`).
2. **Feature Explorer (`FeatureExplorer`):** Grouped workflow stages (`1. Connect` · `2. Move & Run` · `3. Observe`), module pills (`Connections`, `Files`, `Transfers`, `Terminal`, `Logs`, `Monitor`), split layout with **text-before-demo** on mobile (OpenProject F-03), interactive `Demo*` window on right/left, collapsible `<details>` feature list on mobile to trim vertical height.
3. **Real-World Workflow (`RealWorldExample` — `.band`):** 5-step deploy debugging sequence (`<ol>`) on left + sticky coded demo on right. On mobile, render the active step controls inline above the demo so users don't lose context scrolling.
4. **Comparison (`CompareTable`):** Factual table vs WinSCP & MobaXterm (`Ferry` column elevated via `bg-primary/10` + `.surface-specular`, sticky first column inside `role="region"` horizontal scroller) + "When another tool fits better" honesty block.
5. **Download & Verification (`DownloadPanel` — `.band`):** App icon → `Get Ferry for Windows` → Version/size/date → Requirements → `What's new` `<details>` → `Installation & file verification` `<details>` (or expanded by default when navigated via `#install-details`) with SmartScreen explanation + copyable SHA-256 + `Get-FileHash` command.
6. **FAQ (`FaqList`):** `max-w-3xl` native `<details>` accordions answering licensing, unsigned status, WinSCP/PuTTY import, and connection security.

### Template B: 3-Column Documentation (`/docs/...`)
Adopted directly from OpenProject's `/docs/user-guide/...` and `/docs/installation-and-operations/...`:
- **Left Column (`240px`, sticky):** Collapsible section groups (`Getting started`, `Verification & SmartScreen`, `SSH & Import`, `Modules`) with active link highlight (`border-l-2 border-primary text-highlighted`).
- **Center Column (`minmax(0, 1fr)`, max `70ch` prose):** Top breadcrumb → `h1` → Optional summary table (`Topic | Summary`) → Step-by-step prose, copyable code blocks (`Cascadia Code`, `overflow-x-auto` container), and Ferry `Note` / `Caution` callouts → Prev / Next article footer + "Return to Download" CTA card.
- **Right Column (`220px`, sticky):** `On this page` scroll-spy anchor list (`h2`/`h3`) + direct link to `Report doc issue on GitHub`.

### Template C: Release Notes (`/releases`) & Verification (`/download`)
- Mirrors OpenProject's `/docs/release-notes/17/17-9-0/` clarity: version badge + release date + direct installer link + SHA-256 copy box + categorized changes (`Added`, `Changed`, `Fixed`) + GitHub Releases link.

---

## 4. Core Visitor Journeys & Conversion Loop

| Persona / Journey | Entry | Friction OpenProject Solves | Ferry Flow |
|---|---|---|---|
| **1. Evaluate & Download** | `/` Hero | Needs proof it actually works before downloading an `.exe` | Click around `HeroDemo` → scan 4 facts → click `Download for Windows` → browser downloads `Ferry-Setup-*.exe` |
| **2. SmartScreen Hesitation** | Hero notice or `#download` | Unsigned `.exe` triggers Windows SmartScreen warning | Click `Details` (`#install-details`) → smooth-scroll + focus opens SmartScreen card → copy `Get-FileHash` & SHA-256 or open `/docs/smartscreen` → verify & install |
| **3. Workflow Deep-Dive** | Nav `Explore` or `#features` | Needs to confirm jump hosts, `tail -F`, or PuTTY import | Switch stage tabs (`1. Connect` → `3. Observe`) → interact with `DemoLogs` / `DemoMonitor` / `DemoSites` → click `Read setup docs` or `Download` |
| **4. Sysadmin Due Diligence** | Footer / Header `Releases` or `Docs` | Needs changelog & MIT source proof before team adoption | Inspect `/releases` + `/docs/getting-started` → verify SHA-256 & GitHub release tag → return via sticky header `Download` CTA |
