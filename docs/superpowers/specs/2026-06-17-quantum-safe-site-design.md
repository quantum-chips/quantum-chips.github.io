# Design Spec — "Quantum-Safe Silicon" Research Project Website

**Date:** 2026-06-17
**Status:** Approved (design direction A)
**Author:** drafted with Claude Code via superpowers:brainstorming

---

## 1. Overview

A web presence for a research project that **tests new-generation quantum-safe ("post-quantum") chips** for resistance to attacks — specifically by performing **side-channel analysis** to find whether the silicon leaks secret keys, even when the underlying cryptography (NIST ML-KEM / ML-DSA, etc.) is mathematically quantum-resistant.

The site's job is to **communicate serious research to a grant-facing / research-lab audience**: peers, reviewers, and funders. Tone: rigorous, calm, high-signal, evidence-led — a precision measurement instrument crossed with a research publication. The data visualizations are the decoration; nothing is decorative for its own sake.

### Goals
- Establish credibility and clarity of the research problem and method.
- Make the **side-channel testing demo** the memorable centerpiece (simulated but realistic).
- Provide a durable home for background, milestones, publications, team, and contact.

### Non-goals (YAGNI)
- No real hardware integration or live data acquisition.
- No auth, CMS, or backend in v1 (static/SSG).
- No e-commerce / product funnel (this is research, not a product launch).

---

## 2. Audience & framing decisions

- **Audience:** Research lab / grant-facing. Heavier on methodology, rigor, publications.
- **Demo:** **Simulated / illustrative** — driven by a seeded synthetic-data generator, clearly labeled "illustrative simulation," and architected so real CSV traces can be swapped in later.
- **CV angle (resolved):** Computer-vision-style **bounding boxes + confidence scores** overlaid on a chip die image, localizing leaking regions ("the crypto core leaks at 0.94 confidence").
- **Team/branding (resolved):** Use clear placeholders for team names/bios, project/lab name, and logo until real assets are provided.

---

## 3. Design system (Direction A — "Measurement / Lab Bench")

Grounded in the subject's own vernacular: silicon die floorplans, graph-paper instrumentation, monospace coordinates, oscilloscope traces, and a real scientific heat-ramp. Deliberately avoids the "dark + neon acid-green" cyber cliché and the broadsheet cliché.

### Color tokens
```
Paper        #F6F5F1   page background (cool off-white, not "cream")
Ink          #14171C   primary text
Graphite     #5C6672   secondary text, structure, axis labels
Hairline     #D9D7CF   graph-paper rules, borders
Instrument   #0E7C86   primary accent: links, CTAs, "secure / pass" state
Heat ramp (data-viz + hero accent ONLY) — inferno-style:
  #180F3E -> #7B2382 -> #D44842 -> #F6A21E -> #FCFFA4
  (cool/violet = low leakage; hot/amber = high leakage = "fail")
```
The heat-ramp doubles as the pass/fail semantic language: cool = secure, hot = leakage detected.

### Type roles (via next/font)
- **Display:** Space Grotesk — geometric, technical, characterful.
- **Body:** Source Serif 4 — publication gravitas for editorial passages.
- **Mono / data:** IBM Plex Mono — trace labels, byte indices, coordinates, section eyebrows (e.g. `[02 · THE PROBLEM]`).

### Signature element
**Lattice ↔ Leakage hero:** a clean mathematical lattice grid (the lattice crypto being protected) over a chip die, with a side-channel "heat" sweep animating across it — fusing *math we protect* with *physical leakage we test* in one orchestrated moment.

### Motion
One orchestrated hero animation; scroll-reveals for section entrances; micro-interactions on demo controls. All respect `prefers-reduced-motion` (fall back to a static composed frame). No scattered effects.

### Quality baseline (non-negotiable)
Responsive to mobile; visible keyboard focus; alt text on all imagery; reduced-motion honored; Lighthouse pass; static-export / deploy-ready.

---

## 4. Sitemap & pages

Next.js App Router, six routes.

```
/            Home — hero + problem snapshot + how-it-works + demo teaser + CTA
/problem     About / The Problem — quantum threat, HNDL, why chip-level testing
/demo        Side-Channel Test Bench — the interactive simulated demo (centerpiece)
/method      Methodology / The Science — testing pipeline, heatmaps & CV explained
/team        People (placeholders)
/resources   Background, standards, milestone timeline, reading list, contact
```

### Home (`/`)
Hero (Lattice↔Leakage signature) → Problem snapshot (3 stat cards: Q-day, HNDL, 2035 deadline) → How we test (3 steps: acquire → analyze → verdict) → Demo teaser (mini live heatmap linking to `/demo`) → CTA (collaborate / fund / contact).

### The Problem (`/problem`)
Narrative: Shor's algorithm → what breaks (RSA/ECC) → Q-day timelines & shrinking qubit estimates → **HNDL** as the reason to act now → why the chip is the real attack surface (perfect math can sit on leaky silicon). Editorial serif body, monospace pull-stats, one inline trace graphic.

### Method (`/method`)
Numbered pipeline: **Acquire** (power/EM traces) → **Align/Process** → **Analyze** (CPA correlation + TVLA leakage test) → **Localize** (EM spatial heatmap + CV hotspot detection) → **Verdict**. Each step gets a small visual + honest explanation of heatmaps and the CV step.

### Team (`/team`)
Placeholder cards (photo, name, role, one-line bio) in the design system. Easy to populate later.

### Resources (`/resources`)
Milestone timeline (NIST FIPS 203/204/205 — Aug 2024; HQC selection 2025; NSA CNSA 2.0 deadlines 2027/2030/2035; FIPS 140-2 sunset Sep 2026), annotated reading list, and contact. Content sourced from the project's literature review.

---

## 5. Centerpiece — "Side-Channel Test Bench" (`/demo`)

Fully simulated, clearly labeled *illustrative simulation*, driven by a seeded generator. Tells the grant-winning story: **our method distinguishes a secure chip from a vulnerable one.**

### Controls
- **Chip toggle:** Chip A (unprotected) vs Chip B (masked/protected).
- **Trace-count slider:** 0 → ~10^6 traces.

### Panels
1. **EM spatial heatmap + CV overlay** — die floorplan with leakage heat overlay and CV-style bounding boxes + confidence scores localizing the leaking crypto core ("the head map" + CV angle).
2. **CPA correlation heatmap** — key-byte hypothesis × time sample; correct key byte emerges from noise as trace count rises.
3. **Power/EM trace viewer** — oscilloscope-style waveform with annotated operations/rounds.
4. **Verdict panel** — Chip A: "KEY RECOVERED in ~N traces" (hot/fail); Chip B: "no exploitable leakage (>10^6)" (cool/pass).

### Behavior (the money shots)
- Dragging the trace slider makes the CPA heatmap **converge** and flips the verdict once a threshold is crossed.
- Toggling A→B shows leakage collapse to flat — secure vs vulnerable, side by side.

---

## 6. Technical architecture

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Fonts:** `next/font` (Space Grotesk, Source Serif 4, IBM Plex Mono).
- **Data viz:** HTML `<canvas>` for heatmaps/traces (performant); SVG for CV bounding boxes over the die image; D3 for scales/axes only.
- **Animation:** Framer Motion (hero + scroll reveals), with reduced-motion fallbacks.
- **Simulation module:** `lib/sidechannel-sim.ts` — seeded, deterministic, pure functions producing power traces, CPA correlation matrices, and EM spatial leakage maps. Swappable for real CSV later. Unit-tested (TDD).
- **Content:** MDX or typed TS in `content/` so copy stays editable independent of layout.

### Proposed structure
```
app/                routes: /, /problem, /demo, /method, /team, /resources
components/         Nav, Footer, Hero, StatCard, StepFlow, Timeline,
                    demo/: Heatmap, CpaMatrix, TraceViewer, DieOverlay, VerdictPanel
content/            page copy (MDX/TS), team data, timeline data, reading list
lib/                sidechannel-sim.ts, scales, color-ramp, utils
styles/             tailwind config + design tokens
```

---

## 7. Build phases

1. **Scaffold** — Next + TS + Tailwind, fonts, design tokens, layout/Nav/Footer.
2. **Static pages** — Home, Problem, Method, Team, Resources with real copy + placeholders.
3. **Simulation core** — `sidechannel-sim.ts` + unit tests (TDD).
4. **Demo widgets** — Heatmap, CpaMatrix, TraceViewer, DieOverlay+CV, VerdictPanel wired to controls.
5. **Hero + motion** — Lattice↔Leakage animation + scroll reveals + reduced-motion.
6. **Polish** — self-critique vs brief, accessibility, performance, responsive.

---

## 8. Open items / assumptions

- Git is **not** initialized in this directory; spec is saved but not committed. Initialize + commit on request.
- Team bios, project/lab name, and logo are placeholders pending real assets.
- Demo data is synthetic; module designed so real traces can replace it.
