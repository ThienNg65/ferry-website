# Ferry website: design system and conventions

This is the reference for anyone reviewing or extending the site. It records what exists and why. If something is not covered here, ask before inventing it, and update this file when a decision is made.

Version 0.2.0, redesigned as "night crossing" (November 2026): dark by default with a light theme, six coded demos in full-width feature rows, Geist type and one shared spacing system. Source of truth for tokens is `app/assets/css/main.css`; for components it is `app/components/`.

## 1. What the site is

A single static page (Nuxt 4, `@nuxt/ui` v4, Tailwind CSS 4, generated with `nuxt generate`) for Ferry, a Windows app for working with remote servers over SSH and SFTP. The page has one job: show what the app does through working illustrations, then get the installer downloaded.

Positioning rules:

- Say what Ferry does for the user ("Transfer files, run commands, follow logs and watch your servers"). Never call it a replacement or alternative for another product.
- The installer is unsigned. Say so plainly and explain SmartScreen. Never claim it is signed. Ferry is MIT licensed, so "free" and the licence may be stated (FAQ, comparison table) as the v0.2 plan allows; make no telemetry or "no data collected" claim until the owner confirms it.
- Only claim behaviour the app really has. Check `ferry/CLAUDE.md` before adding a feature line.

## 2. Colour

Two themes. Dark (the night crossing) is the default; light (the day crossing) is the earlier palette. The toggle is `UColorModeButton` in the header and the choice is stored by `@nuxtjs/color-mode`. Tokens live in `app/assets/css/main.css` as Nuxt UI's own `--ui-*` variables under `:root` (light) and `.dark`, so `UButton`, `UIcon` and friends follow the theme. Components use the Nuxt UI utilities (`bg-default`, `bg-muted`, `bg-elevated`, `border-default`, `text-default`, `text-muted`, `text-highlighted`, `text-primary`) and the four custom ones below. Do not write raw hex values in components; the one exception is the `.demo` block in `main.css`, the fixed app palette of the coded demos (section 7). `background.css` also holds fixed colours for the horizon, as explained in section 5.

| Variable | Dark (`.dark`) | Light (`:root`) | Class | Use |
|---|---|---|---|---|
| `--ui-bg` | `#07111f` | `#eff8ff` | `bg-default` | Page |
| `--ui-bg-muted` | `#0a1728` | `#e3f1fe` | `bg-muted`, `.band` | Toned bands (example, download) |
| `--ui-bg-elevated` | `#0d1b30` | `#ffffff` | `bg-elevated` | Panels, table, nav pill |
| `--ui-border` | `#1c2e4a` | `#cfe3f7` | `border-default` | Hairlines |
| `--ui-text` | `#c9d6ea` | `#0e2240` | `text-default` | Body |
| `--ui-text-highlighted` | `#f2f6fd` | `#0e2240` | `text-highlighted` | Headings |
| `--ui-text-muted` | `#93a4bd` | `#4a5b72` | `text-muted` | Secondary text |
| `--ui-primary` | `#3d9bff` | `#0968d6` | `text-primary`, `bg-primary` | Links, primary button, focus ring |
| `--beacon` | `#ffb454` | `#a35400` | `text-beacon`, `bg-beacon` | Live status only: progress, cursor, "running", the last timeline step |
| `--water` | `#0b2247` | `#0d264d` | `bg-water` | Skip link background only, since the waterline was removed |
| `--on-water` / `--on-water-muted` | `#ffffff` / `#bfe2fe` | same | `text-on-water`, `text-on-water-muted` | Text on water |
| `--glow` | `rgb(61 155 255 / .35)` | `rgb(13 38 77 / .45)` | (in `.window`) | Shadow under windows |
| `--grid-line` | `rgb(147 197 253 / .07)` | `rgb(13 38 77 / .07)` | `.grid-fade` | Hairline grid in the hero |
| `--aura` | `rgb(61 155 255 / .26)` | `rgb(10 132 255 / .20)` | `.aura` | Bloom of light behind the hero window |
| `--pool` | `rgb(61 155 255 / .13)` | `rgb(10 132 255 / .10)` | `.pool` | Pool of light behind a feature demo |
| `--scroll-thumb` | `#24406b` | `#a9c8ea` | scrollbar | Scrollbar thumb |

The `brand-50` to `brand-950` scale stays as Nuxt UI's `primary` scale (`app/app.config.ts`: `primary: 'brand'`, `neutral: 'slate'`); the `--ui-primary` overrides above pick the exact text-safe shade per theme.

Rules:

- Ferry blue is the only brand accent. Beacon amber is never decoration; it marks only something live.
- Text on water uses `on-water` or `on-water-muted`, never `text-primary` (the light primary fails on water).
- Measured contrast (WCAG ratio). Dark: body on page 12.89, on elevated 11.75; muted on page 7.47, on elevated 6.81; primary on page 6.61, on elevated 6.03; beacon on page 10.74. Light: body on page 14.79; muted on page 6.45, on muted band 6.03; primary on page 4.93, on muted band 4.61, on elevated 5.30; beacon on page 5.11. Water: white 15.74 (dark) / 14.98 (light), on-water-muted 11.64 / 11.08. Primary button: white on `#0968d6` 5.30, slate-900 on `#3d9bff` 6.23. Keep every text pair at 4.5:1 or better and re-measure when a colour changes.
- The global `body` and heading rules sit in `@layer base` so utility classes can override them.

## 3. Typography

Fonts load through `@nuxt/fonts` (Google provider, downloaded at build, served from the site). No runtime request goes to Google.

| Role | Family | Weights | Variable | Where |
|---|---|---|---|---|
| Headings and body | Geist | 400, 500, 600, 700 | `--font-sans` | Everything, wordmark included |
| Mono | Cascadia Code (the app's own mono) | 400 | `--font-mono` | Real code or file content (the SHA-256, `Get-FileHash`) and the terminal and log text inside the demos |

Rules:

- Never use mono for decorative labels, and never add another family. There is no display family.
- Base: `html { font-size: 16px }`, body `1.125rem` / line-height 1.65.
- Scale (set in the `@layer base` heading rules and the `@theme` text tokens): `h1` `clamp(2.75rem, 5.6vw, 4.5rem)`, 700, `-0.035em`, 1.05; `h2` `clamp(2rem, 3.4vw, 2.75rem)`, 700, `-0.025em`, 1.12; `h3` `clamp(1.625rem, 2.4vw, 2.125rem)`, 600, `-0.02em`, 1.2; `text-lead` 1.25rem / 1.6; body 1.125rem / 1.65; `text-small` 0.9375rem / 1.5. The old `text-step-*` tokens are gone.
- Demo UI text uses the app's stack (`'Segoe UI Variable', 'Segoe UI', system-ui`) at 12 to 13px and Cascadia Code for terminal and log text, so demos look like the app.
- Measure: text never wider than 68ch (`max-w-[60ch]` for lead text, `max-w-[68ch]` for the notices).
- Sentence case everywhere. No ALL-CAPS eyebrows, no single highlighted word inside a headline.

## 4. Layout and spacing

The rhythm is defined once in `main.css` with Tailwind `@utility`, so sections cannot drift:

| Utility | Value |
|---|---|
| `section-y` | `padding-block: 7rem`, `10rem` from `lg` |
| `page-x` | `max-w-7xl` (1280px), `px-6`, `lg:px-8` |
| `stack-head` | heading to lead 1.25rem; head block to content 3.5rem, 4.5rem from `lg` |

- Nav pill: `sticky top-4`, `max-w-5xl`, 64px tall, `rounded-full border-default bg-elevated/75 backdrop-blur-md`. `html { scroll-padding-top: 6rem }` keeps anchors clear of it.
- Hero: `pt-24 lg:pt-32`, lead `mt-7`, CTA row `mt-10`, demo `mt-20` (capped at `68rem`), facts row `mt-14`.
- Feature rows: `gap-14 lg:gap-24` between text and demo, `mt-28 lg:mt-40` between rows, text column `max-w-[30rem]`, sub-feature list `gap-y-6`.
- Timeline steps `space-y-12`. Compare table cells `px-5 py-4`, text 1rem; note box `p-8`, `mt-12`. Download panel `p-8 lg:p-14`, `lg:gap-20`. FAQ summary `py-5`, answer `pb-6`, list `mt-12`. Footer `py-20`, `gap-14`.
- The hero and the features head are centred; every other section is left-aligned. The FAQ is narrower on purpose: `max-w-3xl`.
- Corner radius by role: windows and media `rounded-[14px]`, panels `rounded-[20px]`, controls `rounded-[10px]`, nav and chips `rounded-full`. `--ui-radius` stays 0.5rem for other Nuxt UI parts.
- `.window` (global, `main.css`): 1px `--ui-border` border, 14px radius, `overflow: hidden`, `box-shadow: 0 40px 120px -30px var(--glow)`. `DemoWindow` applies it.

## 5. Background, motion and scrollbar

All of it lives in `app/assets/css/background.css`. The background is deliberately quiet, in the manner of openproject.org: a flat page with a few soft layers. The earlier waterline, chart contours and lit horizon were removed in November 2026 because they read as busy.

Background layers (all static):

1. Grid: `.grid-fade`, an `aria-hidden` div as the first child of the hero (`relative isolate overflow-x-clip`). A 64px hairline grid in `--grid-line`, masked so it fades out towards the edges.
2. Aura: `.aura`, an `aria-hidden` div behind the hero window, one bloom of light in `--aura`.
3. Pools: `.pool` on each feature block, with `.pool-flip` when the demo is on the left and `.pool-center` for the wide blocks. The features section needs `overflow-x-clip`.
4. Bands: `.band` on `#example` and `#download` (muted background plus hairline borders).

Motion (none of it runs under `prefers-reduced-motion`):

- `.rise`: the hero's page-load sequence. Headline, lead, buttons, version line and window fade up in turn; set the delay with `style="--d: 160ms"`.
- `.reveal`, `.reveal-l`, `.reveal-r`: content fades and slides in as it scrolls into view. This is CSS only (`animation-timeline: view()`); browsers without it show the content with no animation. Put it on content blocks, not on a `.pool` element.
- Links, buttons and FAQ summaries transition colour over 200ms; FAQ answers open and close smoothly where the browser can animate to `auto`.
- The coded demos keep their own motion through `useDemoLoop` (section 7).

Scrollbar: 12px, rounded thumb in `--scroll-thumb`, primary colour on hover, transparent track. Firefox gets `scrollbar-color` and `scrollbar-width: thin`.

## 6. Components

Components in page order. Each stays presentational and short. Only `app.vue` calls `useLatestRelease()` and passes what each component needs as props.

| Component | Job | Notes |
|---|---|---|
| `SiteHeader` | Floating pill: wordmark, Features, Compare, Download, FAQ, GitHub, theme toggle, Download button | Below `md` the button links to `#download`. The toggle is wrapped in `<ClientOnly>` with a same-size placeholder |
| `HeroWaterline` | Headline, lead, CTA ("See the features" links to `#features`), version line, grid, aura, hero demo and facts row | `h1` is the only `h1`. The name is historical |
| `HeroDemo` | The whole Ferry window, auto-cycling, built from the `demo/` pieces | Files on top, a dock with Transfers, Terminal and Log Tail |
| `FeatureExplorer` | `#features`: six blocks. Files and Connections are wide (centred heading, one large demo, details in a row beneath); Transfers, Terminal, Logs and Monitor are split (short text column with a checked list beside the demo, sides alternating) | Each block is `#module-<id>`. A module is wide when it has `wide: true` |
| `RealWorldExample` | "A deploy broke at 6 pm": five steps as buttons on the left, and the matching coded demo (Files, Logs, Terminal, Monitor) on the right | A real sequence, so a numbered `<ol>` is allowed here only. Buttons use `aria-pressed`; the demo swaps with the `swap` transition |
| `CompareTable` | Honest comparison with WinSCP and MobaXterm | See section 7. No box around the table: hairlines between rows, and the Ferry column lifted as one tinted card with the app icon |
| `DownloadPanel` | Centred call to action (app icon, heading, button, size and date, requirements, links) over two quiet cards: "What's new" with the SHA-256 and copy button, and the unsigned notice | Notes render as text, never `v-html`. Without an installer only the notice card shows |
| `FaqList` | Native `<details>` list | No JavaScript |
| `SiteFooter` | Wordmark, "Ferry on GitHub" button, three link columns, then a bottom bar with the copyright and MIT licence line and "Back to top" | Footer headings are `h2` styled small. The year is set at build time |
| `demo/DemoWindow` | App chrome (title bar, Search pill, site tab), slot, optional pause button, caption slot | `bare` drops the chrome so a demo can sit inside another |
| `demo/DemoFiles`, `DemoTransfers`, `DemoTerminal`, `DemoLogs`, `DemoMonitor`, `DemoSites` | The six demos | Each mirrors a real app view (section 7). `compact` is used by the hero |

Shared code: `app/composables/useDemoLoop.ts` (timer, visibility and pause logic), `app/utils/demoData.ts` (made-up sample data, `filterLogs`, `sortProcesses`) with `demoData.test.ts`.

Nuxt UI is used sparingly: `UApp`, `UButton`, `UIcon`, `UColorModeButton`. VueUse comes with Nuxt UI and is imported explicitly from `@vueuse/core`.

## 7. Patterns

### Coded demos

- The page carries no real screenshot or recording of the app (only `og.jpg`). Two sentences say so: the features lead ("Six tools share one connection to your server. The windows below are working illustrations built for this page, so click around.") and the hero caption ("An illustration of the Ferry window. It is built in code, not recorded."). A wrong label or control in a demo would be a false claim, so check each against the app source in `ferry/src/renderer/src/`.
- Every demo is wrapped in `DemoWindow` (`<figure role="group">` with a label), which gives the `.window` border and glow.
- The fixed app palette is the `.demo` block in `main.css` (the app is dark in both site themes). Raw hex is allowed only there. Container queries (`.pane`) drop the Modified and Permissions columns when a pane is narrow.
- What each one mirrors and what the visitor can do: Files (hero view; click a local file to send it), Transfers (`TransferQueue`, `TransferItem`, `HistoryDialog`; Retry on the failed row, history filter All, Done, Error, Cancelled), Terminal (`TerminalView`; Replay), Logs (`LogTailViewer`; filters All, Errors, Warnings+, Info+, Debug really filter, pause), Monitor (`MonitorPanel`, `ProcessTable`; click Name, RAM or CPU% to sort), Connections (`SessionManagerView`; the search box filters, Quick Connect is display only with disabled inputs).
- Real `<button>`s and inputs with labels; decorative parts are `aria-hidden`; nothing focusable sits inside an `aria-hidden` node. Dense list rows and filter pills are 24 to 28px tall and get an extended hit area (`.hit`); the controls that stand alone (tabs, pause, Replay, search) are 44px.
- Motion runs through `useDemoLoop`: only while the demo is on screen, not paused and not under reduced motion; the interval starts in `onMounted` so the prerender exits. Continuous demos (hero, Logs, Monitor) have a pause button. Every animated element's resting style is its finished state, so under `prefers-reduced-motion` the finished state shows, nothing moves and the controls still work.
- Show nothing the app does not do, and never take a real host or password.

### Download resolution

- `app/utils/release.ts` holds the pure `pickInstaller(release)`: matches `^Ferry-Setup-(.+)\.exe$`, never the `.blockmap`, reads the SHA-256 from the asset `digest` (`sha256:` prefix), returns `null` when there is no installer. It also requires a `github.com/.../releases/download/` URL and a fully uploaded asset, keeps the SHA-256 only when it is 64 hex characters, and drops an unusable size, date or notes link. `keepInstaller` never replaces a newer baked release with an older one.
- The SHA-256 comes from the same GitHub release, so the copy says it proves the file is intact, not who built it, and that GitHub's "Verified" badge is not code signing.
- `useLatestRelease()` fetches `api.github.com/repos/<repo>/releases/latest` at prerender (baked into the HTML), refreshes once on mount, and on any failure falls back to the releases page with the label "Download from GitHub Releases".
- The repo is `runtimeConfig.public.releaseRepo` (default `ThienNg65/ferry-release`). The build must never fail because of the API.
- `app/utils/release.test.ts` covers the exe pick, the blockmap being ignored, a missing asset and a missing digest. Keep it passing.

### Comparison table

- Cells are copied from `.claude/plan/landing-page-v2-plan.md`. Do not add, upgrade or soften a cell; re-check the source first and update the "Checked" date.
- A real `<table>` with a `<caption>` (screen-reader only), `scope` headers and text in every cell. Icons are decoration (`aria-hidden`); a cell starting "Yes" gets a check, "No" a dash, anything else text only.
- The Ferry column is lit: `bg-primary/10`, `border-x border-primary/40`, a primary-coloured header and `text-primary` check icons. The table wrapper is `bg-elevated border-default rounded-[20px]`. The first column is sticky. The table scrolls sideways inside its own wrapper (`role="region"`, `tabindex="0"`, labelled), never the page.
- Under it: "When another tool fits better" and a sources footnote saying "Checked November 2026".

## 8. Copy

- Name user tasks in plain, active words ("Follow a log as it is written"), not product-speak.
- Button labels say exactly what happens: "Download for Windows". No trailing arrow.
- No `A · B · C` meta strings; write a sentence ("Version 0.20.0 for Windows 10 and 11, 64-bit.").
- No numbered 01/02/03 markers.
- British-leaning spelling is used in places ("colour"); keep the page consistent with itself.

## 9. Banned list

Do not add: all-caps eyebrows, a single highlighted word in a headline, `→` appended to buttons, numbered step markers, hover-lift cards, gradient blobs, beacon used as decoration, animated background layers, reveals that need JavaScript, analytics, pricing claims, Inter, a display typeface or system-default type.

## 10. Accessibility floor

- One `h1`, no skipped heading levels, a skip link (`.skip-link`, first focusable element), landmarks (`header`, `main`, `nav`, `footer`).
- Visible focus: 3px `var(--ui-primary)` outline with 3px offset on `:focus-visible` (global in `main.css`).
- Touch targets at least 44px (`min-h-11`), including the buttons. The exception is the dense rows and pills inside the demos, which keep the app's compact size and get an extended hit area (section 7).
- Contrast at least 4.5:1 (see section 2).
- `prefers-reduced-motion: reduce` turns off the rise animation, the chevron rotation and smooth scrolling (global rule in `main.css`) and shows every demo's finished state without movement.
- Anything that moves for more than 5 seconds has a pause control (the hero, Logs and Monitor).
- FAQ uses native `<details>`; keep it that way.

## 11. Responsive

Reviewed at 320, 375, 768, 1024 and 1440 widths. On phones the demo windows scale to full width (a pane shows names only below about 14rem) and feature rows stack with text first. The in-app browser used for review cannot go below 450px, so 320 and 375 were only inspected from the CSS.

## 12. Build and release of the site

- `npm run dev`, `npm test`, `npm run generate`, then serve `.output/public`.
- Vercel: framework Nuxt, build `npm run generate`, output `.output/public`. No required environment variables.
- Versioning follows `CHANGELOG.md` and `package.json`. Update both for every release.

## 13. Review checklist

Before approving a change, confirm:

1. No raw hex outside the `.demo` block and `background.css`, no new font, no new accent, nothing from the banned list.
2. Text pairs still at 4.5:1 or better, including text inside the demos; targets as described in section 10.
3. Each demo uses the real app's labels and shows nothing the app does not do.
4. Section padding computes to 160px at 1440 and feature rows are 160px apart.
5. `npx vitest run` and `npm run generate` pass, and the built `index.html` contains the current `Ferry-Setup-x.y.z.exe` link.
6. Building with a wrong `NUXT_PUBLIC_RELEASE_REPO` still gives the releases-page fallback.
7. No console errors, no horizontal scroll, checked in both themes. The theme toggle survives a reload without shifting the header.
8. The page never says "alternative" or "replacement", and never says "signed" except in "not code-signed" or "code-signing".

## 14. Known gaps

- The page has no real screenshot of the app. The demos are illustrations, partly inferred from captures that were deleted with the old media (terminal colours, zinc surfaces).
- Sources for the Mobatek 10.6 blog post and the KIT HPC docs are named in the footnote without links (no URL in the plan).
- `NUXT_PUBLIC_SITE_URL` default (`https://ferry-website.vercel.app`) is a placeholder.
- Telemetry: the page makes no claim; the owner has not confirmed that Ferry sends no usage data.
- There is no root `tsconfig.json`, so `npx nuxi typecheck` cannot run; use `npx vue-tsc --noEmit -p .nuxt/tsconfig.app.json` after `nuxt prepare`.
- Only `demoData.ts` has unit tests; the demo components are timer-driven presentation and are checked in the browser.
