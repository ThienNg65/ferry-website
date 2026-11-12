# Ferry website: design system and conventions

This is the reference for anyone reviewing or extending the site. It records what exists and why. If something is not covered here, ask before inventing it, and update this file when a decision is made.

Version 0.2.0. Source of truth for tokens is `app/assets/css/main.css`; for components it is `app/components/`.

## 1. What the site is

A single static page (Nuxt 4, `@nuxt/ui` v4, Tailwind CSS 4, generated with `nuxt generate`) for Ferry, a Windows app for working with remote servers over SSH and SFTP. The page has one job: show the real app, then get the installer downloaded.

Positioning rules:

- Say what Ferry does for the user ("Transfer files, run commands, follow logs and watch your servers"). Never call it a replacement or alternative for another product.
- The installer is unsigned. Say so plainly and explain SmartScreen. Never claim it is signed. Ferry is MIT licensed, so "free" and the licence may be stated (FAQ, comparison table) as the v0.2 plan allows; make no telemetry or "no data collected" claim until the owner confirms it.
- Only claim behaviour the app really has. Check `ferry/CLAUDE.md` before adding a feature line.

## 2. Colour

Defined in `app/assets/css/main.css` under `@theme static`. Do not write raw hex values in components; use the token class.

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `brand-50` to `brand-950` | copied from the app's `main.css` | `bg-brand-500` etc. | Nuxt UI `primary` scale |
| `sky` | `#EFF8FF` | `bg-sky` | Page background, header, footer |
| `haze` | `#BFE2FE` | `bg-haze`, `text-haze` | Hero sky wash, download band (50% opacity), secondary text on `deep` |
| `ink` | `#0E2240` | `text-ink`, `border-ink/15` | Headings and body text |
| `slate-ink` | `#4A5B72` | `text-slate-ink` | Secondary text on light backgrounds |
| `ferry` | `#0A84FF` | `border-ferry`, focus ring | Accent for decoration and focus only |
| `ferry-text` | `#0968D6` | `text-ferry-text` | Links on light backgrounds, primary button fill |
| `deep` | `#0D264D` | `bg-deep` | The "water": hero lower half and the showcase band |

Rules:

- One accent. `ferry` is the only saturated colour. No second accent, no gradients other than the hero's sky wash (`from-sky via-sky to-haze`).
- Text on light uses `ink` or `slate-ink`. Links and the primary button use `ferry-text` because `ferry` itself is too light for text (the primary fill is `#0968D6`, white on it measures 5.3:1).
- Measured contrast: `slate-ink` on `sky` 6.45, on the download band 5.79; `ferry-text` on `sky` 4.93; `haze` on `deep` 11.08; white on `deep` 14.98. Keep every text pair at 4.5:1 or better and re-measure when a colour changes.
- Nuxt UI is set to `primary: 'brand'`, `neutral: 'slate'` in `app/app.config.ts`. `--ui-primary` is `ferry-text`.
- Light mode only. Colour mode is forced to light (`nuxt.config.ts`). No dark theme in v1.

## 3. Typography

Fonts load through `@nuxt/fonts` (Google provider, downloaded at build, served from the site). No runtime request goes to Google.

| Role | Family | Weights | Variable | Where |
|---|---|---|---|---|
| Display | Bricolage Grotesque | 600, 700 | `--font-display` | `h1`, `h2`, `h3`, the wordmark |
| Body and UI | Instrument Sans | 400, 500, 600 | `--font-sans` | Everything else |
| Mono | JetBrains Mono | 400 | `--font-mono` | Only real code or file content (the SHA-256) |

Rules:

- Never use mono for decorative labels, and never add another family.
- Base size is 17px (`html { font-size: 17px }`), body line-height 1.6, headings line-height 1.1 and tracking `-0.02em`.
- Scale (ratio 1.25, in rem of the 17px base): `text-step-0` 1.0625, `text-step-1` 1.3125, `text-step-2` 1.6875, `text-step-3` 2.0625, `text-step-4` 2.625, `text-step-5` 3.25. The hero `h1` is `clamp(2.6rem, 6vw, 4.5rem)`.
- Use `text-step-4` for section headings, `text-step-3` for row headings, `text-step-1` for lead text and list titles. Small print is `text-sm` or `text-xs`.
- Measure: paragraphs stop at `max-w-[60ch]` (hero, rows) or `max-w-[68ch]` (the notice).
- Sentence case everywhere. No ALL-CAPS eyebrows, no single highlighted word inside a headline.

## 4. Layout and spacing

- Page container: `mx-auto max-w-6xl px-4 sm:px-6` (16px gutter on phones, 24px from `sm`).
- Section rhythm: `py-24` for content sections, `pb-24` for the showcase, hero `pt-10 sm:pt-16 pb-24`.
- Left-aligned text, grid based. Rows use `grid lg:grid-cols-2 gap-8 lg:gap-14`, alternating image side with `lg:order-*`.
- The FAQ is narrower on purpose: `max-w-3xl`.
- Corner radius: `rounded-xl` for screenshots, `rounded-lg` for the notice and tabs, `--ui-radius` 0.5rem for Nuxt UI parts.
- Screenshots carry a hairline border and a tinted shadow (`shadow-deep/20` on light, `shadow-black/40` on dark). The hero window uses `shadow-[0_30px_80px_-20px_rgba(13,38,77,0.55)]`.

## 5. The one bold move: the waterline

Spend all boldness here and keep the rest quiet. In `HeroWaterline.vue`:

- The top of the page is sky (`sky` into `haze`).
- The real Ferry window straddles a horizon. A `::before` on the figure paints `deep` from the window's vertical middle (`top: 50%`) down to 6rem below the hero (`bottom: -6rem`, the hero's bottom padding), at full viewport width.
- A `::after` draws a 12px wave edge (inline SVG, `fill #0d264d`) on top of that water.
- The water then becomes the showcase section (`bg-deep`), so the page runs from light to dark in one continuous scroll.
- Motion: the window rises 16px over 600ms on load (`@keyframes rise`). This is the only orchestrated motion.

If you change the hero padding, change the `bottom: -6rem` offset to match.

## 6. Components

Ten components, in page order. Each stays presentational and under about 150 lines. Only `app.vue` calls `useLatestRelease()` and passes what each component needs as props.

| Component | Job | Notes |
|---|---|---|
| `SiteHeader` | Sticky header: wordmark, anchor links incl. Changelog, Download button | Below `md` the button links to `#download` |
| `HeroWaterline` | Headline, lead, CTA, version line, the waterline window | `h1` is the only `h1`. `fetchpriority="high"`, no lazy load |
| `ProductShowcase` | Dark band with a tablist and four screenshots | See section 7. `#tab-<id>` links select a tab |
| `RealWorldExample` | "A deploy broke at 6 pm": five numbered steps, each linking to a showcase tab | A real sequence, so a native `<ol>` is allowed here only |
| `FeatureExplorer` | Six modules as alternating image/text rows with a `<dl>` of named sub-features | No card grid |
| `CompareTable` | Honest comparison with WinSCP and MobaXterm | See section 7 |
| `DownloadPanel` | Download button, size, date, requirements, "What's new", SHA-256, unsigned notice | Notes render as text, never `v-html` |
| `FaqList` | Native `<details>` list | No JavaScript. Chevron rotates via `group-open` |
| `SiteFooter` | Link columns incl. Changelog and Licence | Footer headings are `h2` styled small |

Nuxt UI is used sparingly: `UApp`, `UButton`, `UIcon`. Reach for a Nuxt UI component before writing a new control, but keep the page light.

## 7. Patterns

### Showcase tablist (WAI-ARIA)

- `role="tablist"` with `aria-orientation="vertical"`; buttons are `role="tab"` with `aria-selected`, `aria-controls` and roving `tabindex` (0 on the active tab, -1 on the others).
- Keys: Arrow Down/Right next, Arrow Up/Left previous (both wrap), Home first, End last. Focus follows selection.
- Panels are stacked in one grid cell and cross-fade (`opacity`, 300ms). Inactive panels get `inert` and `aria-hidden`.
- From `lg` the tab shows its description; below `lg` the tab row scrolls horizontally and the description moves above the image.
- Only changes on click or key. Nothing animates on scroll.

### Download resolution

- `app/utils/release.ts` holds the pure `pickInstaller(release)`: matches `^Ferry-Setup-(.+)\.exe$`, never the `.blockmap`, reads the SHA-256 from the asset `digest` (`sha256:` prefix), returns `null` when there is no installer.
- `useLatestRelease()` fetches `api.github.com/repos/<repo>/releases/latest` at prerender (baked into the HTML), refreshes once on mount, and on any failure falls back to the releases page with the label "Download from GitHub Releases".
- The repo is `runtimeConfig.public.releaseRepo` (default `ThienNg65/ferry-release`). The build must never fail because of the API.
- `app/utils/release.test.ts` covers the exe pick, the blockmap being ignored, a missing asset and a missing digest. Keep it passing.

### Comparison table

- Cells are copied from `.claude/plan/landing-page-v2-plan.md`. Do not add, upgrade or soften a cell; re-check the source first and update the "Checked" date.
- A real `<table>` with a `<caption>` (screen-reader only), `scope` headers and text in every cell. Icons are decoration (`aria-hidden`); a cell starting "Yes" gets a check, "No" a dash, anything else text only.
- The Ferry column is tinted `haze`. The first column is sticky. The table scrolls sideways inside its own wrapper (`role="region"`, `tabindex="0"`, labelled), never the page.
- Under it: "When another tool fits better" and a sources footnote saying "Checked November 2026".

### Video

Not in v0.2 (deferred). If loops return: `autoplay muted loop playsinline preload="metadata"`, a poster, a keyboard-operable pause button, and the poster only under `prefers-reduced-motion`.

### Images

- Real app screenshots only. No illustrations, mock terminals or fake UI.
- v0.2 crops are exported at 2x their displayed width (`showcase-*` 2000x1250, `feature-*` as cropped). Older shots are 1600x1000 and are used only for the hero and the terminal until recaptured. Every screenshot is saved as `public/screens/<name>.jpg` with a `<name>.webp` twin, used through `<picture>` with explicit `width="1600" height="1000"`.
- Above the fold: eager, hero `fetchpriority="high"`. Everything else `loading="lazy"`.
- Alt text describes what the picture shows in a full sentence. The wordmark icon is decorative (`alt=""`).
- Content rules for new shots: capture from the Docker test server, use made-up files and `example.com` hosts, local folder under a neutral path (the current set uses `C:\ferry-demo`). No real hostnames, usernames, emails, secrets or home-directory paths. Open every image and check it before keeping it.
- Set before v0.2: `files`, `terminal`, `logs`, `monitor`, `sync`, `connection`, `palette`, `settings-appearance`, `settings-terminal`, `settings-network`, `history`, `customized`. `palette`, `settings-appearance`, `settings-network` and `customized` are captured but not used on the page yet. `og.jpg` (1200x630) is cropped from `files.jpg`.

## 8. Copy

- Name user tasks in plain, active words ("Follow a log as it is written"), not product-speak.
- Button labels say exactly what happens: "Download for Windows". No trailing arrow.
- No `A · B · C` meta strings; write a sentence ("Version 0.20.0 for Windows 10 and 11, 64-bit.").
- No numbered 01/02/03 markers.
- British-leaning spelling is used in places ("colour"); keep the page consistent with itself.

## 9. Banned list

Do not add: all-caps eyebrows, a single highlighted word in a headline, `→` appended to buttons, numbered step markers, scroll-triggered reveals, hover-lift cards, gradient blobs, a second accent colour, a dark mode, analytics, pricing claims, Inter or system-default display type.

## 10. Accessibility floor

- One `h1`, no skipped heading levels, a skip link (`.skip-link`, first focusable element), landmarks (`header`, `main`, `nav`, `footer`).
- Visible focus: 3px `ferry` outline with 3px offset on `:focus-visible` (global in `main.css`).
- Touch targets at least 44px (`min-h-11`), including the buttons. Verified: no interactive element under 44px at 1440.
- Contrast at least 4.5:1 (see section 2).
- `prefers-reduced-motion: reduce` turns off the rise animation, the tab cross-fade, the chevron rotation and smooth scrolling (global rule in `main.css`).
- FAQ uses native `<details>`; keep it that way.

## 11. Responsive

Reviewed at 320, 375, 768, 1024 and 1440 widths. On phones the window scales to full width, the showcase tabs become a horizontal row above the image, and feature rows stack with text first. The in-app browser used for review cannot go below 450px, so 320 and 375 were only inspected from the CSS.

## 12. Build and release of the site

- `npm run dev`, `npm test`, `npm run generate`, then serve `.output/public`.
- Vercel: framework Nuxt, build `npm run generate`, output `.output/public`. No required environment variables.
- Versioning follows `CHANGELOG.md` and `package.json`. Update both for every release.

## 13. Review checklist

Before approving a change, confirm:

1. No raw hex, no new font, no new accent, nothing from the banned list.
2. Text pairs still at 4.5:1 or better; targets still 44px or larger.
3. Images are real captures with alt text, width/height, and correct loading.
4. The tablist still works with Arrow, Home and End keys.
5. `npx vitest run` and `npm run generate` pass, and the built `index.html` contains the current `Ferry-Setup-x.y.z.exe` link.
6. Building with a wrong `NUXT_PUBLIC_RELEASE_REPO` still gives the releases-page fallback.
7. No console errors, no horizontal scroll.
8. The page still never says "alternative", "signed" or "free".

## 14. Known gaps (v0.2.0)

- The Terminal showcase and explorer image is still the v0.1 `terminal.jpg`; a fresh crop could not be captured (the dev app's terminal pane drew off-screen after a viewport resize).
- No video this round (deferred by the owner).
- Sources for the Mobatek 10.6 blog post and the KIT HPC docs are named in the footnote without links (no URL in the plan).
- `NUXT_PUBLIC_SITE_URL` default (`https://ferry-website.vercel.app`) is a placeholder.
- Telemetry: the page makes no claim; the owner has not confirmed that Ferry sends no usage data.
