# Ferry Motion Guide

**Architecture Baseline:** Ferry already runs a disciplined hybrid motion stack: CSS `@keyframes rise` for instant Hero LCP, `Lenis` + `GSAP ScrollTrigger` (`app/plugins/motion.client.ts`, `app/composables/useScrollMotion.ts`), CSS `interpolate-size: allow-keywords` for native `<details>`, `useDemoLoop` for live app demos, and `AmbientConnectionBackground` (`background.css`).  
**Contrast with OpenProject:** OpenProject relies on basic CSS transitions (`0.2s ease-in-out`), Bootstrap collapse/carousel transitions, and external S3 `<video>` embeds (which aborted during audit). Ferry's coded motion is far crisper—this guide standardizes timing, easing, scroll safety, and multi-page transitions.

---

## 1. Motion Principles

1. **Purpose Over Ornament:** Motion either **orientates** (directional tab swaps, sticky header elevation), **reveals state** (live terminal typing, log tailing, ambient connection pass), or **confirms action** (button label swap, copied checkmark).
2. **Instant Above-the-Fold Paint:** Never hide Hero LCP elements behind JS hydration (`gsap.from` on hero `h1`). Hero choreography uses pure CSS `.rise` (`animation-fill-mode: both`) so First Paint renders immediately.
3. **Zero-Network Reliability:** Prefer coded CSS/DOM state transitions (`useDemoLoop`, `.swap-next`/`.swap-prev`) over `.mp4`/`.gif` streams that fail under strict networks or blur `12px` UI text.
4. **Motion Ends Quickly:** Decorative background pulses (`AmbientConnectionBackground`) execute **one pass (4s + 0.5s stagger = 4.5s max)** per section entry, honoring WCAG 2.2.2 without needing a separate background pause button.

---

## 2. Timing, Easing & Token Reference

| Motion Category | Duration | Easing | Properties | Source / Implementation |
|---|---|---|---|---|
| **Micro-UI (links, buttons, border, color)** | `180ms–220ms` | `ease` / `cubic-bezier(.22, 1, .36, 1)` | `color`, `background-color`, `border-color`, `box-shadow`, `transform` | `main.css` (`.hover-lift`, `.btn-win`, `background.css` L128) |
| **Dropdown / Drawer Enter** | `200ms` | `power3.out` (`cubic-bezier(.22, 1, .36, 1)`) | `autoAlpha: 0→1`, `y: -8→0`, `scale: 0.98→1` | `SiteHeader.vue` `onMenuEnter` |
| **Dropdown / Drawer Leave** | `140ms` | `power2.in` | `autoAlpha: 1→0`, `y: 0→-6`, `scale: 1→0.98` | `SiteHeader.vue` `onMenuLeave` |
| **Hero CSS Entrance (`.rise`)** | `700ms` | `cubic-bezier(.2, .7, .2, 1)` | `opacity: 0→1`, `translateY(24px→0)` | `background.css` L114–116 (staggers: `0`, `80ms`, `140ms`, `200ms`, `280ms`) |
| **Below-the-Fold Scroll Reveal** | `620ms` | `power3.out` | `autoAlpha: 0→1`, `y: 22→0`, `stagger: 0.07s` | `useScrollMotion.ts` (`start: 'top 86%'`, `once: true`) |
| **Directional Tab / Demo Swap** | `220ms` | `cubic-bezier(.22, 1, .36, 1)` | `opacity`, `translateX(±18px)` / `translateY(8px)` | `background.css` L118–127 (`.swap-next`, `.swap-prev`) |
| **Accordion / `<details>` Disclosure** | `300ms` | `ease` | `block-size: 0 ↔ auto` via `interpolate-size: allow-keywords` | `background.css` L130–132 + `scheduleScrollTriggerRefresh(320)` |
| **Lenis Smooth Scroll** | `1100ms` | Exponential decay `1 - 2^(-10t)` | Scroll position (offset `-96px` for `SiteHeader`) | `motion.client.ts` L15–20, L67 |
| **Ambient Connection Pulse** | `4000ms` (+`500ms` stagger) | `ease-in-out` | `stroke-dashoffset: 6 → -94`, `opacity` | `background.css` L100–109 (desktop `≥ 64rem` + `pointer: fine` only) |
| **Sticky Docs Subheader / Page Transitions** | `180ms` | `ease-out` | `opacity`, subtle `translateY(6px→0)` | Recommended for Nuxt multi-page route transitions (`<NuxtPage>`) |

---

## 3. Guardrails & Technical Rules

### 3.1 FOUC & No-JS Safety (`html.motion-ready`)
- `app.vue` / inline `<head>` script sets `html.motion-ready` **only** when `prefers-reduced-motion: no-preference`.
- `html.motion-ready .reveal-pre { opacity: 0; }` ensures below-the-fold elements don't flash before GSAP runs, while users with JS disabled or `prefers-reduced-motion: reduce` immediately see `opacity: 1`.
- GSAP `onStart` / `onEnter` removes `.reveal-pre` and calls `clearProps: 'transform,opacity,visibility'` so sticky children inside revealed containers work cleanly.

### 3.2 Transform-Free Sticky Ancestors
- **Critical Rule:** Never apply `transform`, `perspective`, or `filter` on an ancestor of `position: sticky` elements (`RealWorldExample` right demo column, Docs left sidebar & right TOC, `CompareTable` sticky first column).
- `useSectionReveal` MUST call `clearProps: 'transform,opacity,visibility'` on completion and NEVER attach persistent transforms to sticky wrappers.

### 3.3 Accordion Height + ScrollTrigger Sync
- Any `<details>` toggle (`DownloadPanel`, `FaqList`, mobile `FeatureExplorer` accordions, mobile Docs TOC) changes document height over `300ms`. Always invoke `scheduleScrollTriggerRefresh(320)` on `@toggle` so downstream `ScrollTrigger` start/end coordinates stay accurate.

### 3.4 Demo Crispness (No 3D Tilt)
- Keep `HeroDemo` scroll settle strictly 2D (`scale: 0.985 → 1`, `scrub: 0.45`). Never apply `rotateX`/`rotateY` 3D transforms to `.demo` windows—Windows `12px` UI text and `Cascadia Code` glyphs blur on subpixel 3D rasterization.

---

## 4. Accessibility & `prefers-reduced-motion` Contract

| Condition | Behavior Required |
|---|---|
| `prefers-reduced-motion: reduce` | 1. Disable `Lenis` smooth scrolling (`stopLenis()`).<br>2. Skip GSAP spatial reveals (`useSectionReveal` strips `.reveal-pre` immediately).<br>3. Disable `.rise`, `.hover-lift` `translateY`, `.btn-win` text slide, `.swap-*` X/Y translation, chevron rotation, and `.demo` keyframe animations (resting state = finished state).<br>4. Disable `AmbientConnectionBackground` pulses and pointer light tracking (static SVG only).<br>5. **Keep** `color`, `background-color`, and `border-color` transitions (`200ms ease`) so interactive affordances stay legible. |
| **Motion > 5s (WCAG 2.2.2)** | Continuous demos (`HeroDemo`, `DemoLogs`, `DemoMonitor`) MUST retain visible, `min-h-11` Pause/Play controls (`aria-pressed`). Ambient background pass completes in `4.5s`. |
| **Hidden Browser Tab** | Pause `useDemoLoop` and `AmbientConnectionBackground` (`data-paused`) on `visibilitychange` when `document.hidden === true`. |
| **Keyboard Focus & Scroll** | Smooth anchor jumps (`lenis.scrollTo(target, { offset: -96 })`) MUST follow up with `target.focus({ preventScroll: true })` (as implemented in `DownloadPanel.vue` and `motion.client.ts`). |
