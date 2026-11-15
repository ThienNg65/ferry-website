# Ferry Design Direction: "Night Crossing" Evolved

**Document Role:** Creative direction and product-specific visual identity for Ferry's next website phase, synthesizing verified patterns from the OpenProject audit while staying unmistakably distinct.  
**Product:** Ferry — a fast, MIT-licensed Windows desktop app for working with Linux servers over SSH and SFTP (`Files`, `Transfers`, `Terminal`, `Logs`, `Monitor`, `Connections`).

---

## 1. Strategic Positioning: Why Ferry Is Not OpenProject

OpenProject is a **web-based, multi-tenant enterprise SaaS + self-hosted platform** selling seat licenses across 10 industries. Its website reflects that commercial reality: bright white pages, curved marketing waves, green "Start free trial" pills, 36 enterprise logos, pricing sliders, and competitor "alternative" SEO pages.

Ferry is the opposite archetype: **a focused, single-binary Windows engineering instrument**—free, MIT-licensed, zero-account, and built around one SSH connection doing real server work.

| Dimension | OpenProject Pattern | Ferry's Distinct Identity |
|---|---|---|
| **Visual Temperament** | Light corporate SaaS (`#ffffff` + navy `#183c73` + green `#278c1b`) | **Precision Nocturnal Instrument ("Night Crossing")**: deep harbor navy (`#07111f`) by default with full Day Crossing (`#eff8ff`) light parity |
| **Product Proof** | Static screenshots, S3 videos (fragile), 96-card feature sprawl | **Live Coded App Windows (`Demo*`)**: interactive, zero-network, pixel-sharp HTML/CSS mirrors of Ferry's actual views |
| **Brand Accent** | Navy + cyan + green CTA + plan-tier colors | **Ferry Blue** (`#3d9bff` dark / `#0968d6` light) as sole interactive accent; **Beacon Amber** (`#ffb454` / `#a35400`) strictly for live/active telemetry |
| **Typography** | `Lato` corporate sans, all-caps tracked eyebrows | **Geist** (clean geometric precision, sentence case only, zero all-caps eyebrows) + **Cascadia Code** strictly for hashes, terminal, and logs |
| **Voice & Framing** | Sales-led ("#1 Open Source Alternative", "Start free trial") | **Task-led & Candid** ("Transfer files, run commands, follow logs and watch your servers"; plain SmartScreen honesty; never "alternative/replacement") |

---

## 2. Core Creative Pillars

### Pillar 1: "Show the Instrument Working" (Coded Demos Over Marketing Fluff)
- **What we adopt/adapt from OpenProject:** OpenProject's strongest feature pages pair a task-focused headline with an immediate visual proof (`Task list`, `Gantt charts`, `Baseline comparison`) and let visitors inspect sub-workflows via interactive tabs/carousels.
- **How Ferry elevates it:** Never replace Ferry's coded `DemoWindow` components with blurred mockups or external S3 videos (which broke in OpenProject's audit). Instead, expand the **interactive workflow proof**—letting users switch tasks (`Connect` → `Move & Run` → `Observe`), trigger real filters/retries/sorts inside the frame, and jump directly to the matching workflow step without reading walls of marketing copy.

### Pillar 2: "Radical Honesty as a Trust Signal" (Developer-Grade Credibility)
- **What we adapt from OpenProject:** OpenProject's `/security-and-privacy/` and `/accessibility/` pages earn institutional trust not with generic "100% Secure" badges, but with concrete verifiable facts: encryption specs, PGP fingerprint, audit references, and public issue trackers.
- **How Ferry applies it:** Because Ferry's Windows installer is currently **unsigned**, trust is the #1 conversion hurdle. Elevate verification from a collapsed footnote into a first-class, calm confidence builder:
  - Plainly state SmartScreen behavior *before* download (never hide it).
  - Present the **live SHA-256 checksum** with one-click copy and the exact `Get-FileHash` PowerShell command in `Cascadia Code`.
  - Link directly to the MIT source repository, GitHub release assets, and build/release notes—turning open source from a badge into verifiable proof.

### Pillar 3: "Architectural Calm at Multi-Page Scale"
- **What we learn from OpenProject:** OpenProject separates *discovery* (`/`), *feature exploration* (`/collaboration-software-features/`), *installation & verification* (`/download-and-installation/`), *documentation* (`/docs/`), and *release history* (`/docs/release-notes/`) into distinct, purpose-built templates.
- **How Ferry adapts it:** Ferry's current single landing page stretches to `~11,900px` on desktop and `~16,900px` on mobile (`docs/ui-ux-audit-2026-11-13.md` F5). Rather than cloning OpenProject's 200+ page sprawl, Ferry should evolve into a **focused 4-route hub**:
  1. **Landing (`/`)**: Tightened hero + interactive `FeatureExplorer` + `RealWorldExample` + concise `CompareTable` + `DownloadPanel` + `FaqList` (trimmed mobile vertical bloat).
  2. **Docs & Setup (`/docs/...`)**: Clean 3-column OpenProject-inspired technical guide (SSH keys, jump hosts, host-key verification, SmartScreen walkthrough, WinSCP/PuTTY import) with left tree + right "On this page" TOC + copyable commands.
  3. **Download & Verify (`/download`)** *(or enhanced anchor hub + dedicated verification page)*: OS requirements, release selector, SHA-256 verification steps, SmartScreen visual guide, and portable/installer notes.
  4. **Releases & Changelog (`/releases`)**: Clean release-notes timeline fed by `ThienNg65/ferry-release` so sysadmins can audit what changed before upgrading.

### Pillar 4: "Harbor Signal" Spatial Atmosphere
- **Preserving Ferry's Signature:** Keep the quiet **Night Crossing** spatial language: `1px` hairline borders (`--ui-border`), subtle `.grid-fade` hero geometry, soft `--aura` and `--pool` radial blooms, `.surface-specular` top highlights, and the restrained `AmbientConnectionBackground` (source → relay → destination, pulsing ≤ 5s on section entry).
- **What we avoid from OpenProject:** No curved SVG wave dividers, no 64px asymmetric corner cutouts, no stock office photography, no noisy 36-logo walls, and no green pill buttons competing with Ferry Blue.

---

## 3. Brand Personality & Copy Rules

1. **Sentence case everywhere:** No `ALL CAPS` tracked eyebrows (`DATA SOVEREIGNTY` → never).
2. **Concrete verbs, zero hype:** "Follow a log as it is written", "Verify the installer before you run it", "One SSH connection, six tools".
3. **No competitive trash talk:** Speak positively about what Ferry does; keep comparison rows strictly factual and source-dated (`Checked November 2026`), never using "alternative" or "replacement".
4. **No trailing `→` on buttons:** Labels describe the exact outcome ("Download for Windows", "Read setup guide", "Copy SHA-256").
5. **No unverified claims:** Never claim zero telemetry until confirmed by the product owner; never claim code-signing while unsigned.
