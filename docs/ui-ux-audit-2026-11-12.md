# Ferry landing page v0.1.0: UI/UX audit (2026-11-12)

Reviewed: commit `5bb22ca`, static build served from `.output/public`, in the browser at
1440×900 and 375×812. The rivals (termius.com, raycast.com, warp.dev/terminal) were reviewed
live the same day. Tags: **[Verified]** seen or measured in the browser, **[Source]** read in
code, **[Design]** judgement.

## Product and journeys
Ferry is a Windows SSH/SFTP desktop app for developers and sysadmins. The page has one job:
show the real app, then get the installer downloaded. Journeys:
1. Land → understand what Ferry is → download.
2. Land → compare the features → download.
3. Hesitate over trust (unsigned installer) → read the FAQ or the SHA-256 → download.
4. Share the link (Slack, X) → the preview card sells the click.

## 1. Executive summary
**Verdict: a solid, honest v1 that is not yet competitive on its first impression.** It builds,
it is fast, accessible and truthful, and its trust story (SHA-256, plain SmartScreen guidance) is
better than any of the three rivals. It loses to them on the two things that win a first visit:
how much product you see above the fold, and whether you can actually *read* what the product
does. Every screenshot is a full 1600 px window scaled down to 557–1173 px, so the features
being sold are 4–6 px text. Rivals show the UI large, cropped and often moving.

Strengths: real app imagery, a distinctive waterline from Ferry's own icon, a correct
download link with version, size and hash, a keyboard-correct tablist, no console errors, no
horizontal scroll.

Top weaknesses: (1) a client-side fetch failure can replace the good download link with the
fallback, and every visit makes 4 GitHub API calls; (2) only ~15% of the app window is visible
above the fold at 1440×900; (3) the feature screenshots are illegible; (4) the brief's "short
demonstrations" never made it in, so nothing moves; (5) link previews are broken because
`og:image` is relative.

## 2. Scorecard
| Category | Score | Why |
|---|---|---|
| Visual design and hierarchy | 6/10 | Clean tokens, good type. The hero headline takes 3 lines at 72 px and pushes the product below the fold; the screenshots all read as the same dark rectangle. |
| UX and journeys | 6/10 | Download is always one click away, and the FAQ answers the real objection. Feature value is told, not shown legibly. |
| Interaction | 7/10 | The tablist is correct (arrows, roving tabindex, inert panels). The only motion is a 16 px rise. |
| Responsive and a11y | 7/10 | One h1, skip link, 44 px targets, no overflow at 375. On mobile the 4th tab is off-screen with no cue. |
| Implementation | 6/10 | Small, readable components. The release composable is duplicated per caller (4 fetches) and can downgrade the link. |
| Polish and trust | 7/10 | The SHA-256 and SmartScreen panel are standout. Missing: OG image, "what's new", any social proof. |
| **Competitiveness vs rivals** | **5/10** | See section 5. |

## 3. Prioritised findings
| P | Area | Finding | User impact | Recommendation | Effort |
|---|---|---|---|---|---|
| P0 | Impl | The on-mount `refresh()` turns any client fetch failure into `null`, replacing the prerendered installer | A rate-limited visitor (or an office behind one NAT) sees "Download from GitHub Releases" and loses the direct link | Keep the old data on failure; fetch once per page | S |
| P0 | Impl | 4 identical `releases/latest` calls per page load [Verified] | Uses up GitHub's 60 requests/hour per IP 4× faster | One shared fetch (`useState` or a single `useAsyncData` caller passing props) | S |
| P1 | Visual | The hero shows ~15% of the app above the fold at 1440×900 [Verified] | "Product first" fails on first sight | Trim the h1 to 2 lines (`Your server workspace, simplified.` with "Meet Ferry." as the lead paragraph), cap it at ~56 px, cut the top padding; aim for ≥ 45% of the window above the fold | S |
| P1 | Content | Feature shots are full windows downscaled to 557 px [Verified]: dialogs and log lines are unreadable | The visitor can't see what sync, logs or connections actually look like | Crop each shot to its feature region (sync dialog, log pane, sites list), export at 2× the display width | M |
| P1 | Content | The "Files" tab reuses the hero image, and every tab's shot is ~70% the same file panes [Verified] | Switching tabs barely changes the picture, so the showcase feels static | Use a different, tighter crop per tab: terminal maximized, log pane maximized, monitor maximized | M |
| P1 | Journey | No short demos, though the brief asked for them | Rivals show motion (Termius video, Warp loops); Ferry looks static by comparison | Add 3 muted, looping 6–8 s clips (drag-drop transfer, log tail streaming, monitor ticking) as `<video>` with a poster image; static image under reduced motion | M |
| P1 | SEO/share | `og:image` is `/og.jpg` (relative) and there is no canonical [Verified] | Slack, X and LinkedIn previews show no image | Build absolute URLs from `runtimeConfig.public.siteUrl`; add `og:url` and canonical | S |
| P1 | Mobile | The tablist scrolls horizontally; "Monitor" is fully off-screen at 375 px with no cue [Verified] | Mobile users never find the 4th feature | Make it a 2×2 grid or a full-width segmented row below `lg` | S |
| P2 | Mobile | The header CTA "Download for Windows" on a phone downloads an `.exe` the phone can't run | Wasted download, confusing | Below `md`, link the header button to `#download` and add "Ferry runs on Windows. Open this page on your PC to install." there | S |
| P2 | Trust | No "what's new" and no social proof (stars, downloads) | Rivals lead with logos or ratings; Ferry has no outside signal | Show the latest release's top 3 changelog lines (already in the API payload) in DownloadPanel; add a GitHub link with download count once it's meaningful | S |
| P2 | Perf | `icon.png` is 306 KB for a 34 px render, twice per page [Verified] | Wasted bytes on the first view | 64 px WebP (~3 KB) | XS |
| P2 | Visual | The waterline's wave seam sits exactly under the window's middle, where the eye barely catches it | The one bold move is easy to miss | [Design] Lower the horizon to ~60% of the window and let the water gradient continue into the showcase without the flat band | S |

## 4. Detail on the P0s
**Stale-link downgrade** [Source], `app/composables/useLatestRelease.ts:9-13`. `$fetch(...).catch(() => null)`
plus `onMounted(() => refresh())` means a 403 rate limit on the client overwrites the good
prerendered `data` with `null`. `pickInstaller(null)` then returns `null`, and all three buttons
switch to the fallback. Fix: in the client refresh, only assign when the new result has an
installer; otherwise keep the baked value.

**Fetch fan-out** [Verified], `performance.getEntriesByType('resource')` shows 4 calls to
`/releases/latest` within 2 ms of each other. `SiteHeader`, `HeroWaterline` and `DownloadPanel`
each call `useLatestRelease()`, and each registers its own `onMounted(refresh)`. Fix: run the
refresh once (a module-level flag, or call the composable in `app.vue` and `provide` the result).

## 5. Competitive read
| | Termius | Raycast | Warp | Ferry v0.1 |
|---|---|---|---|---|
| Product above the fold | Partial: live DOM UI starts at the fold | Little (animated launcher) | Partial | ~15% of the window |
| Legible product detail | High: UI built in HTML, crisp | High | Video | **Low**: downscaled full windows |
| Motion / demo | Yes | Heavy (to a fault) | Video + loops | One 16 px rise |
| Social proof | Ratings, FAQ | Huge brand | Logo wall, open-source badge | None |
| Trust in the download | Store badges | Signed app | `winget` command | **Best**: version, size, SHA-256, honest SmartScreen copy |
| Speed / simplicity | Heavy | Heavy | Medium | **Best**: static, ~6 k px page, no JS needed to read it |
| Identity | Generic dark navy | Strong | Strong (mono, paper) | Medium: the waterline is distinctive but under-played |

**Bottom line:** on trust, speed and honesty Ferry already wins. On first-glance "I want that",
it's behind all three, and the gap comes almost entirely from screenshot presentation, not
missing features. The P1 items close most of that gap without new dependencies.

## 6. Roadmap
**Quick wins (≤ 1 hour each):** both P0s, the absolute OG/canonical URLs, the hero h1 trim, the
mobile tab grid, the icon size, the mobile header CTA.
**P1 (larger):** re-crop all feature shots to their regions at 2×; record 3 short loops with
the same CDP setup (`Page.startScreencast` → ffmpeg → webm/mp4 + poster).
**P2:** "what's new" from the release body, a waterline tweak, social proof once there are numbers.

## 7. Validation
- P0: block `api.github.com` in devtools, reload, and the direct `.exe` link must stay; the
  resource timing shows 1 call.
- Hero: at 1440×900, measure `window bottom ≥ 0.45 × window height` visible in the viewport.
- Shots: every text line in a showcase image ≥ 9 px when rendered (zoom check at 1440).
- OG: check the deployed URL with the X/LinkedIn post inspector.
- Mobile: all 4 tabs visible at 320 and 375 without scrolling sideways.
- Re-run this audit's probes: no console errors, `scrollWidth == innerWidth`, no target < 44 px.

## Regression protection
Keep the tablist keyboard behaviour, the SHA-256 and SmartScreen panel, the fallback to the
releases page when the API truly has no installer, the reduced-motion handling, and the skip link.

## Limitations
Tablet (768) not walked; no screen reader pass; no Lighthouse run; the rate-limit downgrade is
proven from code, not reproduced. The copy claims (terminal themes, history, edit in place,
environment colours) were spot-checked against `ferry/src`; they exist.

## Process note
The build session committed to `main` (`5bb22ca`) although its brief said no commits. Nothing
was pushed. It also captured 13 shots instead of the planned 8 and replaced the old images in
`ferry/public` and `ferry-release/assets` (uncommitted there, as planned).
