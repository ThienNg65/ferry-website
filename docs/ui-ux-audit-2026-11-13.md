# UI/UX Audit: Ferry website (2026-11-13)

**Scope:** branch `feature/interactive-bg` with the uncommitted ambient background; the single landing page. **Design direction:** documented in `docs/design-system.md` ("night crossing", dark default, blue only, beacon amber for live status).
**Method:** dev server in the browser pane at 375×812, 768×1024 and 1440×900; DOM probes for overflow, tap targets, section map, reveal visibility and console; one real Tab press; source read of the ambient layer. Tags: **[Verified]** measured, **[Source]** read in code, **[Design]** judgement.
Not tested: Lighthouse, axe, screen reader, Firefox/Safari, light theme visually, 320px, real touch.

## 0. Product understanding
- **Purpose and users:** one static page that shows what Ferry (Windows SSH/SFTP app) does through coded demos, then gets the installer downloaded. Users are developers and sysadmins on desktop; some arrive on a phone to read, not install.
- **Journeys:** 1) land, understand, download; 2) land, scroll features, download; 3) hesitate on the unsigned installer, read the notice, FAQ or checksum, download; 4) compare against WinSCP and MobaXterm.
- **Must preserve:** unsigned-installer notice before every download entry point, honest claims, the download resolution and fallback, demo pause controls, no "alternative/replacement" wording.

## 1. Executive summary
The page is in good shape: no console errors, no horizontal scroll at three widths, every scroll reveal ends visible, the first Tab press lands on the header and the skip link works, and the ambient layer never blocks clicks. Nothing blocks the primary task (find the installer and download it). The most urgent problems are small: the key trust link next to the download button was a 19px target, and the design system still banned the animated layer that was just added.

- **Strengths:** clear hero, trust notice beside the CTA, calm blue palette, correct reduced-motion handling, 44px CTAs.
- **Weaknesses:** very long page (11.9k px desktop, 16.9k px at 375), ambient pulses run forever with no pause control, small targets in footnote links.
- **Opportunities:** shorten the features section on mobile, pause control for ambient motion.

## 2. Scorecard
| Category | Score | Justification |
|---|---|---|
| Visual Design | 8/10 | Consistent tokens, quiet background, clear hierarchy. |
| Usability & Navigation | 7/10 | Download one click away at all widths. Page length on mobile is the drag. |
| Interaction Quality | 7/10 | Demos have pause controls. Ambient pointer light is subtle and bounded to 12px. |
| Responsive Design | 8/10 | No overflow at 375/768/1440; extra paths and pulses drop on small screens. |
| Accessibility | 6/10 | Focus ring and skip link fine. Ambient pulses lack a pause control (F2); small footnote targets (F3). |
| Consistency & Design System | 7/10 | The design-system ban list contradicted the new layer (fixed, F1). |
| Product Polish | 7/10 | Good trust detail. No real app screenshot (already a known gap). |

## 3. Prioritised findings
| ID | Priority | Area | Finding | User impact | Recommendation | Effort |
|---|---|---|---|---|---|---|
| F1 | High | Design system | §9 banned "animated background layers" while the ambient layer animates [Verified, doc] | Reviewers will flag or revert the layer | Reword the ban to allow the ambient layer. **Fixed** | S |
| F2 | High | Accessibility | Ambient pulses loop forever (9s cycle) with no pause control; §10 requires one for motion over 5s [Source, `background.css`] | Motion-sensitive users who have not set reduced motion cannot stop it (WCAG 2.2.2) | Decision needed: either accept as decorative and write the exception into §10, or add a pause toggle, or run the pulse for a few cycles then stop. **Fixed**: one 4.5s pass per section entry, then still | S-M |
| F3 | Medium | Target size | "Details" (hero notice) and "Installation details" were 19px tall [Verified at 375 and 768] | Mis-taps on the link that explains the SmartScreen warning | Extend the hit area with `-my-3 inline-block py-3`. **Fixed**, now 47px with no layout change | S |
| F4 | Medium | Target size | Footnote source links ("WinSCP: tabs", "MIT licence" in the footer) are 19px tall and inline [Verified] | Hard to tap on phones; inline text links are allowed by WCAG 2.5.8 but not by this site's 44px rule | Put the sources in a list with padding, or amend §10 to exempt inline links. **Fixed**: sources are a wrapped list of 44px links; footer licence link has the F3 hit area | S |
| F5 | Medium | Length | 16.9k px tall at 375 (about 21 screens); features section is 4.9k px on desktop [Verified] | Visitors on phones may not reach the download section | [Design] Collapse feature demos on mobile or shorten the stack. Needs a product decision | L |
| F6 | Low | Docs | Design-system §11 says 320/375 were only inspected from CSS | Stale claim | Re-check at 320 when a narrower viewport is available | S |

## 4. Detail on High items
**F1** `docs/design-system.md` §9 listed "animated background layers" as banned, and §5 now documents the ambient layer. Reworded to "any animated background layer other than the ambient connection layer (section 5)".

**F2** `background.css` runs `ambient-signal` with `infinite` on two paths, only under `prefers-reduced-motion: no-preference`, on fine pointers at 40rem and up, and paused when the tab is hidden or the section is compare, faq or footer. The pulse is low contrast and thin, but it is auto-starting motion longer than 5 seconds. Fixed after review: the pulse group is keyed by section and runs one 4s pass (.5s stagger) on each section entry, so motion ends within 5 seconds and no pause control is needed.

## 5. Roadmap
**Quick wins:** F1, F3 (done). **P1:** F2, F4 (done). **P2:** F5, F6.

## 6. Validation
| Improvement | Manual | Automated |
|---|---|---|
| F3 | At 375 and 768, the two links measure at least 44px tall; notice paragraph height unchanged | Target-size probe from the skill |
| F2 | Reduced-motion emulation shows static lines; chosen pause or stop works | axe, WCAG 2.2.2 check |

## 7. Regression protection
Unsigned-installer notice before each download entry point; demos and their pause buttons; skip link and first Tab order; `scrollWidth <= innerWidth`; `npm test` and `npm run generate`.

## 8. Assumptions and limitations
Design direction taken from `docs/design-system.md`. Light theme, 320px, Firefox and Safari not exercised. Targets inside the demos were excluded because the design system documents a compact-size exception.
