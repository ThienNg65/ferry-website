---
name: Ferry Website
description: Midnight Navy Minimal marketing site inspired by termius.com, showcasing Ferry's Modern Glass UI captures in a clear problem-solving flow.
colors:
  primary: "#3b93ff"
  primary-light: "#0968d6"
  neutral-bg: "#030816"
  neutral-muted: "#060d1e"
  neutral-elevated: "#0a1122"
  neutral-border: "rgba(148, 163, 184, 0.16)"
  ink: "#f8fafc"
  ink-body: "#cbd5e1"
  ink-muted: "#94a3b8"
  light-bg: "#fafbfd"
  light-muted: "#f2f5fa"
  light-elevated: "#ffffff"
  light-border: "#e2e8f0"
  light-ink: "#0b1220"
  light-body: "#334155"
  light-ink-muted: "#55647a"
  media-bg: "#070b14"
  glow-hero: "rgba(41, 128, 255, 0.16)"
  glow-cta: "rgba(41, 128, 255, 0.14)"
  glow-edge: "rgba(56, 189, 248, 0.22)"
  mesh-sky-dark: "rgba(56, 189, 248, 0.16)"
  mesh-violet-dark: "rgba(124, 58, 237, 0.14)"
  mesh-blue-dark: "rgba(59, 147, 255, 0.10)"
  mesh-cyan-dark: "rgba(14, 165, 233, 0.10)"
  mesh-sky-light: "rgba(56, 189, 248, 0.12)"
  mesh-violet-light: "rgba(139, 92, 246, 0.09)"
  mesh-blue-light: "rgba(59, 147, 255, 0.08)"
  mesh-cyan-light: "rgba(14, 165, 233, 0.08)"
typography:
  display:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  subhead:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  base:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Geist, 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "'Cascadia Code', Consolas, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  xs: "4px"
  badge: "5px"
  icon: "6px"
  logo: "7px"
  sm: "0.5rem"
  md: "12px"
  lg: "14px"
  xl: "16px"
  cta: "20px"
  pill: "9999px"
spacing:
  section-y: "clamp(4rem, 7vw, 7rem)"
  page-x: "74rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    height: "48px"
  card-elevated:
    backgroundColor: "{colors.neutral-elevated}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Ferry Website

## Overview

**Creative North Star: "Midnight Navy Minimal"**

A deep midnight navy canvas (`#030816`) paired with elevated `#0a1122` card surfaces, `1px` slate hairlines (`rgba(148, 163, 184, 0.16)`), two-tone muted-to-bright headings, and one electric blue accent (`#3b93ff`), matching the restraint and problem-solving clarity of `termius.com` while showcasing Ferry's real Modern Glass UI captures. A light theme toggle (`.light`, `#fafbfd`) remains available.

**Key Characteristics:**
- Dark-first midnight navy polarity so dark Modern Glass UI screenshots blend into the page naturally.
- Two-tone heading hierarchy (`.heading-muted` for the setup phrase, crisp `--ui-text-highlighted` for the key phrase).
- Real `1600×900` WebP Modern Glass screenshots throughout, paired with the optional 35-second MP4 tour dialog.

## Colors

### Primary
- **Electric Ferry Blue** (`#3b93ff` dark / `#0968d6` light): Primary buttons, links, active borders, and feature icons.

### Neutral
- **Midnight Navy Canvas** (`#030816`): Default page background.
- **Deep Slate Section** (`#060d1e`): Subtle alternating band surface.
- **Card Elevated** (`#0a1122`): Bento cards, security cards, and download spotlight banner.
- **Crisp Ink** (`#f8fafc`), **Body Slate** (`#cbd5e1`), and **Muted Slate** (`#94a3b8`): Verified `>= 4.5:1` contrast across text and button states.

## Typography

**Display & Body Font:** `Geist` (`'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif`)
**Mono Font:** `'Cascadia Code'` (`Consolas, ui-monospace, monospace`) — strictly for inline commands, paths, and filenames.

## Layout

- Max container width: `74rem` (`page-x`) with `1.25rem` / `2rem` inline padding.
- Section rhythm: `section-y` scales from `4rem` mobile to `7rem` desktop.
- Linear narrative: Hero → Workspace Tabs → Troubleshooting/Logs Split → Monitor Split → Migration & Connectivity Bento → Security Strip → Compare Table → Bottom CTA Card → FAQ → Footer.

## Elevation & Depth

**The Flat-By-Default Rule.** Cards rely on `1px` `--ui-border` hairlines on `#0a1122` rather than drop shadows; `--frame-shadow` is reserved for `.window` screenshot frames and the `.cta-card` bottom banner carries a subtle top blue edge glow.

## Shapes

- Controls & buttons: `0.5rem` (`rounded-lg`)
- Product frames & cards: `14px` (`rounded-[14px]`)
- Bottom CTA spotlight banner: `20px` (`rounded-[20px]`)

## Do's and Don'ts

### Do:
- **Do** keep copy plain, concrete, and focused on the real Windows server problem Ferry solves.
- **Do** route all public GitHub issues, releases, and licence links solely to `ThienNg65/ferry-release`.

### Don't:
- **Don't** add AI-style marketing buzzwords, decorative grid backgrounds, or coded UI simulations.
- **Don't** link to the private `ThienNg65/ferry` repository on public pages.
