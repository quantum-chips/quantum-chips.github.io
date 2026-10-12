# Site redesign — Linear-style modern tool

**Date:** 2026-10-12
**Status:** Implemented (replaces the "Measurement / Lab Bench" system in `2026-06-17-quantum-safe-site-design.md`)
**Process:** web-design-engineer skill (ConardLi/garden-skills): redesign · overhaul, direction chosen from three schools (Tufte, Dieter Rams/Braun, Linear) on a side-by-side board.

## Direction

Present the chip-testing module the way a security tool presents itself: the page looks like the software. Warm near-black ground, hairline borders, one accent, mono chips, and a real product shot under each hero. Copy stays research-honest; all demo figures stay labelled illustrative.

## Tokens (`tailwind.config.ts`)

| Token | Value | Use |
|---|---|---|
| `ground` | `#08090A` | page background (not "base": that collides with the `text-base` font-size utility) |
| `panel` / `raised` / `lift` | `#16171C` / `#1E1F25` / `#26272E` | cards and product panels / cards inside panels / hover and pressed |
| `fg` / `fg-muted` / `fg-subtle` | `#F7F8F8` / `#9CA3AF` / `#7F8691` | text levels. `fg-subtle` is lighter than Linear's `#6B7280`, which fails AA for small text here |
| `line` / `line-strong` | white at 6% / 10% | hairlines; translucent, so they work on every surface |
| `accent` | `#F5A524` | the only saturated colour |

**Accent rule.** Keep it under ~5% of pixels. It marks findings and state only: key recovered, the "learned" stages, the delivered milestone, live dots, focus ring, text selection. Leakage data uses a ramp built from it (`lib/colorRamp.ts`: panel → `#5C3C16` → accent → `#FFE2A8`), so data and UI share one colour.

## Type

Geist (400/500/600) and Geist Mono (400/500) via `next/font`. Headlines: 600, tight tracking (−0.025 to −0.035em), `clamp()` sizes — hero up to 64px, page headers up to 56px, section h2 up to 36px. Body 16–18px. Mono only for labels, readouts and data, never below 11px. `Headline` keeps hyphenated words ("quantum-safe") from breaking at the hyphen.

## Shape, depth, motion

Radius 6 / 12 / 16, never above 16. One shadow (`shadow-raised`) on product panels; everything else is flat with hairlines. Hover 150ms ease-out. No scroll animations. The only motion is the verdict's pending pulse, and `prefers-reduced-motion` removes it.

## Components

- `Hero` (statement + product shot) for `/` and `/chip-testing`. `PageHeader` for inner pages.
- `Section`: a real `h2` plus an optional intro. No eyebrow labels; the heading says what the section is.
- `ButtonLink` (primary white / secondary outline), `TextLink`, `Pill`, `Segmented`, `StatBand`.
- Product shots render live from the simulator, not mock-ups: `StackVisual` on home, `RunPanel` on the module page.

**Not used:** left-border callout cards, emoji, a card per list item, purple gradients, decorative labels ("LIVE", "FIG.01").

## Editorial refinement (13 October 2026)

Use direct research language and descriptive headings: "Project team", "Testing methodology" and "Research aims". Avoid advertising slogans, anthropomorphism and unqualified promises of security. Describe ongoing prototype work as an approach under development; keep completed milestones distinct from research aims.

The team uses a directory layout with portraits and dividing rules. Home-page research aims use plain columns, and application areas are text rather than badges. Category pills are optional on inner pages; hero labels have no status dot.

The demo reports synthetic key-recovery outcomes and a simulated score. Failure to recover a key in the simulation is not described as proof that a chip is secure. Keep the illustrative and AI-generated asset labels visible.

## Content sources

- `content/pipeline.ts` is the single source for the five test stages. `/method`, `/chip-testing` and `/demo` all read it.
- `content/threats.ts`, `framework.ts` and `milestones.ts` come from the Milestone 1 report, "Automating Security Testing of Quantum-Safe Chips" (W. Zhang, Sep 2026). The report's content is summarised on the site; the PDF itself is not published.
- The Q-day figure comes from the Global Risk Institute, *Quantum Threat Timeline Report 2025* (published 9 Mar 2026): 28–49% within 10 years, 51–70% within 15.
- Not on the public site by decision: preliminary experimental results, until they are reviewed for release.

## Figures and images

- **Report figures, redrawn natively** (not embedded: the originals are light, multi-colour, with text baked in). Figures 1–2 became `AttackSurface` on `/threat-model`, which also filters the attack table. Figure 4 became `MaskingFigure` on `/demo`, Figure 6 `IfaFigure` on `/problem`. Figures 3, 5 and 7 stay in the report.
- **Device illustrations**: `public/images/bench-*.webp` and `device-open-*.webp`, AI-generated with Codex image generation (gpt-image) and captioned as such. Replace them with real bench photos under the same names.
- **Prompt rules**, so new images match: studio product photography; warm near-black ground `#08090A`; one amber accent `#F5A524` as the only saturated colour; low-key light from one soft warm key; generic, unbranded USB-A form-factor device. No text, logos, people, glowing circuits, or blue/purple/neon. 3:2 landscape.

## IA

Nav: Chip Testing · Problem · Threat Model · Method · Demo · Team · Resources. `/threat-model` is new (Milestone 1). Routes and the `/resources/#contact` anchor are otherwise unchanged.
