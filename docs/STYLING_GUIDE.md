# Ferry Styling Guide & Token Architecture

**Source of Truth:** [app/assets/css/main.css](file:///c:/toys/ferry-dev/ferry-website/app/assets/css/main.css), [app/assets/css/background.css](file:///c:/toys/ferry-dev/ferry-website/app/assets/css/background.css), [docs/design-system.md](file:///c:/toys/ferry-dev/ferry-website/docs/design-system.md)  
**Stack:** Nuxt 4 · `@nuxt/ui` v4 · Tailwind CSS v4 (`@theme` + `@utility`)

---

## 1. Color System & Semantic Tokens

Ferry maintains **dual-theme parity** (Dark "Night Crossing" default + Light "Day Crossing" opt-in) via CSS custom properties mapped to `@nuxt/ui` `--ui-*` tokens. Raw hex values are **forbidden** inside `.vue` components—use semantic classes (`bg-default`, `bg-muted`, `bg-elevated`, `border-default`, `text-default`, `text-highlighted`, `text-muted`, `text-primary`, `text-beacon`) exclusively.

### 1.1 Core Surface, Text & Brand Tokens

| Token | Dark (`.dark` — Default) | Light (`:root`) | Tailwind / Utility | Contrast & Role |
|---|---|---|---|---|
| `--ui-bg` | `#07111f` | `#eff8ff` | `bg-default` | Primary page canvas |
| `--ui-bg-muted` | `#0a1728` | `#e3f1fe` | `bg-muted`, `.band` | Toned bands, table stripes, docs sidebars |
| `--ui-bg-elevated` | `#0d1b30` | `#ffffff` | `bg-elevated` | Floating nav pill, cards, callouts, comparison wrapper |
| `--ui-border` | `#1c2e4a` | `#cfe3f7` | `border-default` | `1px` structural hairlines & dividers |
| `--ui-text` | `#c9d6ea` | `#0e2240` | `text-default` | Body prose (`12.89:1` dark / `14.79:1` light) |
| `--ui-text-highlighted` | `#f2f6fd` | `#0e2240` | `text-highlighted` | Headings, active nav, primary labels |
| `--ui-text-muted` | `#93a4bd` | `#4a5b72` | `text-muted` | Secondary copy, captions, metadata (`≥ 6.03:1`) |
| `--ui-primary` | `#3d9bff` | `#0968d6` | `text-primary`, `bg-primary` | Links, primary CTAs, focus ring (`≥ 4.61:1` light, `≥ 6.03:1` dark) |
| `--beacon` | `#ffb454` | `#a35400` | `text-beacon`, `bg-beacon` | **Live status only** (active cursor, running transfer, current step) |

### 1.2 Atmospheric & Surface Effects (`main.css` & `background.css`)

| Token | Dark | Light | Purpose |
|---|---|---|---|
| `--glow` | `rgb(61 155 255 / .35)` | `rgb(13 38 77 / .45)` | `.window` & `.hover-lift` elevation shadow |
| `--aura` | `rgb(61 155 255 / .26)` | `rgb(10 132 255 / .20)` | Hero radial bloom behind primary demo |
| `--pool` | `rgb(61 155 255 / .13)` | `rgb(10 132 255 / .10)` | Directional pool behind feature demos |
| `--spotlight` | `rgb(61 155 255 / .12)` | `rgb(9 104 214 / .09)` | Pointer hover sheen (`SpotlightSurface`) |
| `--specular` | `rgb(255 255 255 / .08)` | `rgb(255 255 255 / .75)` | `1px` top inset highlight (`.surface-specular`) |
| `--grid-line` | `rgb(147 197 253 / .07)` | `rgb(13 38 77 / .07)` | `64px` hero architectural grid |

### 1.3 Proposed Semantic Extensions for Multi-Page Docs & Trust Hubs
Adapted from OpenProject's Docs Tip/Note/Warning callouts while staying strictly within Ferry's blue/beacon/neutral palette (no unmeasured emerald/red SaaS clutter):

| Semantic Role | Surface | Border Accent | Icon / Label Color | Usage |
|---|---|---|---|---|
| **Note / Info Callout** | `bg-primary/8` | `border-l-2 border-primary` | `text-primary` | Setup tips, host-key explanations, SSH config notes |
| **Caution / SmartScreen Notice** | `bg-beacon/10` | `border-l-2 border-beacon` | `text-beacon` | Unsigned installer / SmartScreen expectations, breaking release notes |
| **Code Block Frame** | Uses `.demo` palette (`#1b1c1f`, `#2c2e33`, `#e5e7eb`) | `border border-default` | `text-muted` header + copy button | Shell commands (`Get-FileHash`, `~/.ssh/config`) in docs & verification |

> **Accessibility Gate:** Every new text/surface pairing MUST measure `≥ 4.5:1` for normal text and `≥ 3.0:1` for large text / UI borders in **both** `.dark` and `:root` light themes.

---

## 2. Typography Scale & Rules

- **Sans (`--font-sans`):** `'Geist', 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif` (weights `400, 500, 600, 700`, self-hosted via `@nuxt/fonts`).
- **Mono (`--font-mono`):** `'Cascadia Code', Consolas, ui-monospace, monospace` (weight `400`). Reserved strictly for real code, CLI commands, SHA-256 digests, and terminal/log output inside `.demo`. **Never** use mono for decorative labels or eyebrows.

### 2.1 Marketing & Landing Scale (`@layer base` + `@theme`)

| Role | Size | Weight | Line Height | Tracking | Measure Cap |
|---|---|---|---|---|---|
| `h1` (Hero) | `clamp(2.75rem, 5.6vw, 4.5rem)` (`44px–72px`) | `700` | `1.05` | `-0.035em` | `max-w-[22ch]` |
| `h2` (Section) | `clamp(2rem, 3.4vw, 2.75rem)` (`32px–44px`) | `700` | `1.12` | `-0.025em` | `max-w-[28ch]` |
| `h3` (Sub-block) | `clamp(1.625rem, 2.4vw, 2.125rem)` (`26px–34px`) | `600` | `1.2` | `-0.02em` | — |
| `text-lead` | `1.25rem` (`20px`) | `400` | `1.6` | `normal` | `max-w-[60ch]` |
| Body | `1.125rem` (`18px`) | `400` | `1.65` | `normal` | `max-w-[68ch]` |
| `text-small` | `0.9375rem` (`15px`) | `400`–`500` | `1.5` | `normal` | `max-w-[68ch]` |

### 2.2 Technical Documentation Scale (New Template Extension)
Inspired by OpenProject's readable `/docs/` center column and `/blog/` `~800px` editorial measure, adapted to Geist:
- **Docs `h1`:** `clamp(2rem, 3vw, 2.5rem)` (`32px–40px`), `700`, `1.15`, `-0.025em`.
- **Docs `h2`:** `1.5rem` (`24px`), `600`, `1.25`, `-0.02em`, `mt-10 pb-2 border-b border-default`.
- **Docs `h3`:** `1.1875rem` (`19px`), `600`, `1.35`.
- **Docs Prose:** `1rem` (`16px`), `1.65` line-height, `max-w-[70ch]` (`~760px`).
- **Sidebar / TOC Links:** `0.875rem` (`14px`) visual label inside `min-h-11` (`44px`) touch-safe wrappers on mobile/tablet drawers, or `min-h-9` with comfortable vertical spacing on fine-pointer desktop sidebars (keeping mobile touch targets `≥ 44px`).
- **Demo UI Interior (`.demo`):** `'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif` at `12px` (`13px` at `≥ 640px`), fixed dark app palette (`#1b1c1f`).

---

## 3. Spacing, Layout Grid & Radii

### 3.1 Global Rhythm Utilities (`main.css`)
- **Container (`page-x`):** `max-w-7xl` (`80rem` / `1280px`), horizontal padding `1.5rem` (`24px`) mobile, `2rem` (`32px`) at `lg` (`1024px+`).
- **Section Rhythm (`section-y`):** `padding-block: 7rem` (`112px`) mobile, `10rem` (`160px`) at `lg` (`1024px+`). *Note:* Subpages or compact mobile sections may introduce a documented `@utility section-y-compact` (`4rem` / `6rem`) for dense documentation/release hubs while keeping landing sections at `section-y`.
- **Header Stack (`stack-head`):** `margin-bottom: 3.5rem` (`4.5rem` at `lg`), `1.25rem` gap between heading and lead.
- **Anchor Offset:** `html { scroll-padding-top: 6rem; }` (`96px`) clears the `64px` floating pill header (`top-4`).

### 3.2 Breakpoint Strategy
Unlike OpenProject's Bootstrap `.navbar-expand-xl` (`1200px` collapse that strips desktop navigation on `1024px` / `768px`), Ferry uses Tailwind v4 mobile-first breakpoints:
- `< 640px` (`320px–639px`): Single-column stack, compact demo panes, mobile nav drawer, mobile TOC accordion.
- `md` (`768px` tablet): 2-column grids where spacious (footer, verification cards, comparison sidebars); mobile nav drawer preserved cleanly for touch ergonomics.
- `lg` (`1024px+` desktop): Full pill nav, 2-column feature/workflow splits (`gap-14 lg:gap-24`), 3-column docs shell (`240px` left tree + `minmax(0, 1fr)` center + `220px` right TOC).
- `xl` (`1280px+`): Maximum container width (`1280px`) with generous breathing room.

### 3.3 Corner Radius Tokens (Strict Role Mapping)
- **Pill Navigation & Chips:** `rounded-full` (`9999px`) — *only* for `SiteHeader` pill, nav buttons, and status chips (never rectangular buttons).
- **Panels & Cards (`SpotlightSurface`, FAQ, Download cards):** `rounded-[20px]` (`20px`).
- **Product Windows & Code Frames (`.window`, `DemoWindow`):** `rounded-[14px]` (`14px`).
- **Controls & Primary Buttons:** `rounded-[10px]` (`10px`) — crisp hardware/tool feel, distinguishing Ferry from OpenProject's `50rem` SaaS pill buttons.
- **Dropdown Popovers:** `rounded-[16px]` (`16px`).
- **Focus Ring (`:focus-visible`):** `outline: 3px solid var(--ui-primary); outline-offset: 3px; border-radius: 4px;`.

---

## 4. Layout Templates Summary

1. **Marketing Landing (`/`):** Centered Hero + `FeatureExplorer` + Left-aligned `RealWorldExample` (`.band`) + `CompareTable` + `DownloadPanel` (`.band`) + Centered-narrow `FaqList` (`max-w-3xl`).
2. **Technical Docs (`/docs/...`):** Compact top band with breadcrumb + `h1` → 3-column grid (`lg:grid-cols-[240px_minmax(0,1fr)_220px] gap-10`). On `< lg`, sidebars collapse into a **Sticky Subheader Bar** (`Navigation` drawer button + `On this page` accordion).
3. **Trust / Download / Release Hub (`/download`, `/releases`):** Narrow centered hero (`max-w-[44rem]`) with primary action + verification/changelog cards (`max-w-[52rem]`) + `.band` alternation, zero marketing bloat.
