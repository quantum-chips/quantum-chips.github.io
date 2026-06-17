# Quantum-Safe Silicon Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a grant-facing research website for a project that tests quantum-safe chips via (simulated) side-channel analysis, with an interactive "Side-Channel Test Bench" demo as the centerpiece.

**Architecture:** Next.js (App Router) static site in TypeScript + Tailwind. A seeded, pure-function simulation module (`lib/`) feeds canvas/SVG visualization components on the demo page. All content lives in `content/` so copy is editable independent of layout. Design follows the approved "Measurement / Lab Bench" token system.

**Tech Stack:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v3.4, Framer Motion, Vitest + Testing Library (jsdom). No backend, no D3 (small custom scale helpers instead).

## Global Constraints

- Next.js App Router, no `src/` dir, import alias `@/*`. TypeScript strict mode on.
- Tailwind **v3.4** (config-file based), not v4.
- Design tokens (exact hex): `paper #F6F5F1`, `ink #14171C`, `graphite #5C6672`, `hairline #D9D7CF`, `instrument #0E7C86`. Heat ramp stops: `#180F3E`, `#7B2382`, `#D44842`, `#F6A21E`, `#FCFFA4`.
- Fonts via `next/font/google`: Space Grotesk (display), Source Serif 4 (body), IBM Plex Mono (data/eyebrows).
- Heat ramp colors appear **only** in data-viz and the hero accent; UI accent is `instrument`.
- All animation respects `prefers-reduced-motion`. All images have alt text. Keyboard focus visible.
- The demo must carry a visible "illustrative simulation" label. Demo data is synthetic and deterministic (seeded).
- Routes: `/`, `/problem`, `/demo`, `/method`, `/team`, `/resources`.
- Frequent commits (one per task minimum). Local git repo only — no pushing.

---

### Task 1: Project scaffold, tokens, fonts, test runner, base layout

**Files:**
- Create: project via `create-next-app` into the current empty directory
- Create: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx` (placeholder)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `lib/fonts.ts`
- Test: `app/__tests__/smoke.test.tsx`

**Interfaces:**
- Produces: Tailwind theme color names `paper|ink|graphite|hairline|instrument`; font CSS variables `--font-display`, `--font-body`, `--font-mono`; the `lib/fonts.ts` export `fontVars: string`.

- [ ] **Step 1: Scaffold Next.js into the current directory**

Run:
```bash
cd /Users/andrew/Desktop/quantum
npx create-next-app@15 . --typescript --eslint --app --no-src-dir --import-alias "@/*" --no-tailwind --use-npm
```
Expected: Next.js files created (`app/`, `package.json`, `tsconfig.json`). The directory already contains `docs/` — that is fine.

- [ ] **Step 2: Initialize git and install dependencies**

Run:
```bash
git init
npm install framer-motion
npm install -D tailwindcss@^3.4 postcss autoprefixer
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npx tailwindcss init -p
```
Expected: `tailwind.config.js`, `postcss.config.js` created; deps in `package.json`.

- [ ] **Step 3: Write `tailwind.config.ts`** (replace the generated `tailwind.config.js` — delete the `.js`, create the `.ts`)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F1",
        ink: "#14171C",
        graphite: "#5C6672",
        hairline: "#D9D7CF",
        instrument: "#0E7C86",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
```
Then `rm tailwind.config.js`.

- [ ] **Step 4: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }

body {
  background-color: #F6F5F1;
  color: #14171C;
  font-family: var(--font-body), Georgia, serif;
}

/* Graph-paper substrate utility */
.graph-paper {
  background-image:
    linear-gradient(to right, #D9D7CF 1px, transparent 1px),
    linear-gradient(to bottom, #D9D7CF 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 1;
}

:focus-visible { outline: 2px solid #0E7C86; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 5: Write `lib/fonts.ts`**

```ts
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const fontVars = `${display.variable} ${body.variable} ${mono.variable}`;
```

- [ ] **Step 6: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Quantum-Safe Silicon — Testing chips against the quantum threat",
  description:
    "A research project testing new-generation quantum-safe chips for side-channel leakage before quantum attackers exist.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Write placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold">Quantum-Safe Silicon</h1>
    </main>
  );
}
```

- [ ] **Step 8: Configure Vitest — write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./vitest.setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

- [ ] **Step 9: Write `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 10: Add test script to `package.json`**

Add to the `"scripts"` object:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 11: Write the smoke test `app/__tests__/smoke.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the project name", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /quantum-safe silicon/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 12: Run the test**

Run: `npm test`
Expected: PASS (1 test).

- [ ] **Step 13: Verify the app builds**

Run: `npm run build`
Expected: Build completes with no type errors.

- [ ] **Step 14: Commit**

```bash
echo "node_modules/\n.next/\n*.log" > .gitignore
git add -A
git commit -m "chore: scaffold Next.js site with tokens, fonts, test runner"
```

---

### Task 2: Core utilities — seeded RNG and heat color ramp

**Files:**
- Create: `lib/rng.ts`, `lib/colorRamp.ts`
- Test: `lib/__tests__/rng.test.ts`, `lib/__tests__/colorRamp.test.ts`

**Interfaces:**
- Produces: `mulberry32(seed: number): () => number` (floats in [0,1)); `heatColor(t: number): string` → `"rgb(r, g, b)"`; `INFERNO_STOPS: [number,number,number][]`.

- [ ] **Step 1: Write failing test `lib/__tests__/rng.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { mulberry32 } from "@/lib/rng";

describe("mulberry32", () => {
  it("is deterministic for a given seed", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    expect(a()).toBe(b());
    expect(a()).toBe(b());
  });
  it("returns floats in [0,1)", () => {
    const r = mulberry32(7);
    for (let i = 0; i < 100; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
  it("produces different streams for different seeds", () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run lib/__tests__/rng.test.ts`
Expected: FAIL — cannot find module `@/lib/rng`.

- [ ] **Step 3: Implement `lib/rng.ts`**

```ts
// Mulberry32: a tiny, fast, deterministic PRNG. Good enough for illustrative sims.
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run lib/__tests__/rng.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing test `lib/__tests__/colorRamp.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { heatColor, INFERNO_STOPS } from "@/lib/colorRamp";

describe("heatColor", () => {
  it("returns the first stop at t=0", () => {
    const [r, g, b] = INFERNO_STOPS[0];
    expect(heatColor(0)).toBe(`rgb(${r}, ${g}, ${b})`);
  });
  it("returns the last stop at t=1", () => {
    const last = INFERNO_STOPS[INFERNO_STOPS.length - 1];
    expect(heatColor(1)).toBe(`rgb(${last[0]}, ${last[1]}, ${last[2]})`);
  });
  it("clamps out-of-range input", () => {
    expect(heatColor(-5)).toBe(heatColor(0));
    expect(heatColor(5)).toBe(heatColor(1));
  });
  it("interpolates to an intermediate color at t=0.5", () => {
    const out = heatColor(0.5);
    expect(out).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
  });
});
```

- [ ] **Step 6: Run to verify it fails**

Run: `npx vitest run lib/__tests__/colorRamp.test.ts`
Expected: FAIL — cannot find module `@/lib/colorRamp`.

- [ ] **Step 7: Implement `lib/colorRamp.ts`**

```ts
export type RGB = [number, number, number];

// Inferno-style stops (approved heat ramp): #180F3E #7B2382 #D44842 #F6A21E #FCFFA4
export const INFERNO_STOPS: RGB[] = [
  [24, 15, 62],
  [123, 35, 130],
  [212, 72, 66],
  [246, 162, 30],
  [252, 255, 164],
];

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

// t in [0,1] -> "rgb(r, g, b)" along the heat ramp.
export function heatColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const segments = INFERNO_STOPS.length - 1;
  const scaled = clamped * segments;
  const i = Math.min(Math.floor(scaled), segments - 1);
  const local = scaled - i;
  const c0 = INFERNO_STOPS[i];
  const c1 = INFERNO_STOPS[i + 1];
  const r = lerp(c0[0], c1[0], local);
  const g = lerp(c0[1], c1[1], local);
  const b = lerp(c0[2], c1[2], local);
  return `rgb(${r}, ${g}, ${b})`;
}
```

- [ ] **Step 8: Run to verify it passes**

Run: `npx vitest run lib/__tests__/colorRamp.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/rng.ts lib/colorRamp.ts lib/__tests__/rng.test.ts lib/__tests__/colorRamp.test.ts
git commit -m "feat: seeded RNG and heat color ramp utilities"
```

---

### Task 3: Simulation — verdict model and EM spatial heatmap

**Files:**
- Create: `lib/sidechannel-sim.ts`
- Test: `lib/__tests__/sim-verdict.test.ts`, `lib/__tests__/sim-emheatmap.test.ts`

**Interfaces:**
- Consumes: `mulberry32` from `@/lib/rng`.
- Produces (used by Tasks 4, 11, 12, 13):
  - `type ChipId = "A" | "B"`
  - `interface Verdict { recovered: boolean; tracesToRecover: number | null; confidence: number; status: "leak" | "secure" | "pending" }`
  - `computeVerdict(chip: ChipId, traceCount: number): Verdict`
  - `signalLevel(chip: ChipId, traceCount: number): number` (0..1, the leakage-recovery progress)
  - `interface EmHeatmap { cols: number; rows: number; values: number[]; cryptoCore: { x: number; y: number; w: number; h: number } }`
  - `generateEmHeatmap(chip: ChipId, traceCount: number, seed?: number): EmHeatmap`
  - Constant `TRACES_TO_RECOVER_A = 2100`

- [ ] **Step 1: Write failing test `lib/__tests__/sim-verdict.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { computeVerdict, signalLevel, TRACES_TO_RECOVER_A } from "@/lib/sidechannel-sim";

describe("computeVerdict", () => {
  it("chip A is pending with few traces", () => {
    const v = computeVerdict("A", 100);
    expect(v.recovered).toBe(false);
    expect(v.status).toBe("pending");
  });
  it("chip A recovers the key past the threshold", () => {
    const v = computeVerdict("A", TRACES_TO_RECOVER_A + 500);
    expect(v.recovered).toBe(true);
    expect(v.status).toBe("leak");
    expect(v.tracesToRecover).toBe(TRACES_TO_RECOVER_A);
  });
  it("chip B never recovers, even at 1e6 traces", () => {
    const v = computeVerdict("B", 1_000_000);
    expect(v.recovered).toBe(false);
    expect(v.status).toBe("secure");
    expect(v.tracesToRecover).toBeNull();
  });
  it("confidence is in [0,1] and rises with traces for chip A", () => {
    const low = computeVerdict("A", 500).confidence;
    const high = computeVerdict("A", 5000).confidence;
    expect(low).toBeGreaterThanOrEqual(0);
    expect(high).toBeLessThanOrEqual(1);
    expect(high).toBeGreaterThan(low);
  });
});

describe("signalLevel", () => {
  it("is ~0 for chip B regardless of traces", () => {
    expect(signalLevel("B", 1_000_000)).toBeLessThan(0.05);
  });
  it("approaches 1 for chip A with many traces", () => {
    expect(signalLevel("A", 50_000)).toBeGreaterThan(0.8);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run lib/__tests__/sim-verdict.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the verdict + signal portion of `lib/sidechannel-sim.ts`**

```ts
import { mulberry32 } from "@/lib/rng";

export type ChipId = "A" | "B";

export const TRACES_TO_RECOVER_A = 2100;

// Leakage-recovery progress in [0,1]. Chip A: saturating curve crossing ~1 near recovery.
// Chip B: stays near the noise floor forever (masked implementation).
export function signalLevel(chip: ChipId, traceCount: number): number {
  if (chip === "B") return Math.min(0.04, traceCount / 1e8); // negligible, never separates
  const n = Math.max(0, traceCount);
  // Saturating exponential: ~0.63 at the recovery point, ->1 after.
  return 1 - Math.exp(-n / TRACES_TO_RECOVER_A);
}

export interface Verdict {
  recovered: boolean;
  tracesToRecover: number | null;
  confidence: number;
  status: "leak" | "secure" | "pending";
}

export function computeVerdict(chip: ChipId, traceCount: number): Verdict {
  const confidence = signalLevel(chip, traceCount);
  if (chip === "B") {
    return { recovered: false, tracesToRecover: null, confidence, status: "secure" };
  }
  const recovered = traceCount >= TRACES_TO_RECOVER_A;
  return {
    recovered,
    tracesToRecover: recovered ? TRACES_TO_RECOVER_A : TRACES_TO_RECOVER_A,
    confidence,
    status: recovered ? "leak" : "pending",
  };
}

export interface EmHeatmap {
  cols: number;
  rows: number;
  values: number[]; // length cols*rows, each in [0,1]
  cryptoCore: { x: number; y: number; w: number; h: number }; // in grid cells
}

const EM_COLS = 32;
const EM_ROWS = 24;
const CRYPTO_CORE = { x: 19, y: 6, w: 8, h: 7 };

export function generateEmHeatmap(chip: ChipId, traceCount: number, seed = 1): EmHeatmap {
  const rand = mulberry32(seed);
  const level = signalLevel(chip, traceCount);
  const values = new Array(EM_COLS * EM_ROWS);
  for (let y = 0; y < EM_ROWS; y++) {
    for (let x = 0; x < EM_COLS; x++) {
      const base = 0.08 + rand() * 0.12; // quiet background leakage everywhere
      const inCore =
        x >= CRYPTO_CORE.x && x < CRYPTO_CORE.x + CRYPTO_CORE.w &&
        y >= CRYPTO_CORE.y && y < CRYPTO_CORE.y + CRYPTO_CORE.h;
      // Hotspot rises with leakage level; centered emphasis inside the core.
      let v = base;
      if (inCore) {
        const cx = CRYPTO_CORE.x + CRYPTO_CORE.w / 2;
        const cy = CRYPTO_CORE.y + CRYPTO_CORE.h / 2;
        const dist = Math.hypot(x - cx, y - cy) / (CRYPTO_CORE.w / 2);
        const falloff = Math.max(0, 1 - dist);
        v = base + level * (0.75 * falloff + 0.15);
      }
      values[y * EM_COLS + x] = Math.max(0, Math.min(1, v));
    }
  }
  return { cols: EM_COLS, rows: EM_ROWS, values, cryptoCore: CRYPTO_CORE };
}
```

- [ ] **Step 4: Run to verify the verdict test passes**

Run: `npx vitest run lib/__tests__/sim-verdict.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing test `lib/__tests__/sim-emheatmap.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { generateEmHeatmap } from "@/lib/sidechannel-sim";

describe("generateEmHeatmap", () => {
  it("returns a grid of the expected size with values in [0,1]", () => {
    const h = generateEmHeatmap("A", 5000);
    expect(h.values).toHaveLength(h.cols * h.rows);
    for (const v of h.values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
  it("is deterministic for the same seed", () => {
    const a = generateEmHeatmap("A", 5000, 9);
    const b = generateEmHeatmap("A", 5000, 9);
    expect(a.values).toEqual(b.values);
  });
  it("chip A shows a hotter crypto core than chip B at high trace counts", () => {
    const core = { x: 19 + 4, y: 6 + 3 }; // roughly the core center
    const idx = core.y * 32 + core.x;
    const a = generateEmHeatmap("A", 50000, 3).values[idx];
    const b = generateEmHeatmap("B", 50000, 3).values[idx];
    expect(a).toBeGreaterThan(b + 0.3);
  });
});
```

- [ ] **Step 6: Run to verify it passes**

Run: `npx vitest run lib/__tests__/sim-emheatmap.test.ts`
Expected: PASS (implementation already written in Step 3).

- [ ] **Step 7: Commit**

```bash
git add lib/sidechannel-sim.ts lib/__tests__/sim-verdict.test.ts lib/__tests__/sim-emheatmap.test.ts
git commit -m "feat: side-channel verdict model and EM spatial heatmap generator"
```

---

### Task 4: Simulation — CPA correlation matrix and power trace

**Files:**
- Modify: `lib/sidechannel-sim.ts` (append)
- Test: `lib/__tests__/sim-cpa.test.ts`, `lib/__tests__/sim-trace.test.ts`

**Interfaces:**
- Consumes: `signalLevel`, `ChipId` from this module; `mulberry32`.
- Produces (used by Tasks 11, 12, 13):
  - `interface CpaResult { hypotheses: number; samples: number; correctByte: number; peakSample: number; correlations: number[]; peakCorrelation: number }`
  - `generateCpaMatrix(chip: ChipId, traceCount: number, seed?: number): CpaResult`
  - `interface PowerTrace { samples: number[]; annotations: { sample: number; label: string }[] }`
  - `generatePowerTrace(chip: ChipId, seed?: number): PowerTrace`

- [ ] **Step 1: Write failing test `lib/__tests__/sim-cpa.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { generateCpaMatrix } from "@/lib/sidechannel-sim";

describe("generateCpaMatrix", () => {
  it("has dimensions hypotheses*samples and abs correlations in [0,1]", () => {
    const r = generateCpaMatrix("A", 5000);
    expect(r.correlations).toHaveLength(r.hypotheses * r.samples);
    for (const c of r.correlations) {
      expect(c).toBeGreaterThanOrEqual(0);
      expect(c).toBeLessThanOrEqual(1);
    }
  });
  it("chip A: correct byte peak rises above noise as traces grow", () => {
    const low = generateCpaMatrix("A", 200).peakCorrelation;
    const high = generateCpaMatrix("A", 50000).peakCorrelation;
    expect(high).toBeGreaterThan(low);
    expect(high).toBeGreaterThan(0.4);
  });
  it("chip B: peak stays in the noise band even at 1e6 traces", () => {
    const r = generateCpaMatrix("B", 1_000_000);
    expect(r.peakCorrelation).toBeLessThan(0.2);
  });
  it("is deterministic for the same seed", () => {
    expect(generateCpaMatrix("A", 5000, 5).correlations)
      .toEqual(generateCpaMatrix("A", 5000, 5).correlations);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run lib/__tests__/sim-cpa.test.ts`
Expected: FAIL — `generateCpaMatrix` is not exported.

- [ ] **Step 3: Append the CPA generator to `lib/sidechannel-sim.ts`**

```ts
const CPA_HYPOTHESES = 64; // key-byte hypotheses shown (downsampled for viz clarity)
const CPA_SAMPLES = 96; // time samples

export interface CpaResult {
  hypotheses: number;
  samples: number;
  correctByte: number;
  peakSample: number;
  correlations: number[]; // length hypotheses*samples, each abs-corr in [0,1]
  peakCorrelation: number;
}

export function generateCpaMatrix(chip: ChipId, traceCount: number, seed = 2): CpaResult {
  const rand = mulberry32(seed);
  const level = signalLevel(chip, traceCount); // 0..1
  const correctByte = 37 % CPA_HYPOTHESES;
  const peakSample = 58;
  // Noise band shrinks as traces accumulate (~1/sqrt(N)); signal for the correct
  // hypothesis grows with leakage level. Chip B has no signal so it stays in noise.
  const noiseFloor = 0.45 / Math.sqrt(Math.max(1, traceCount) / 50 + 1);
  const signalPeak = chip === "A" ? 0.15 + 0.65 * level : 0;

  const correlations = new Array(CPA_HYPOTHESES * CPA_SAMPLES);
  let peak = 0;
  for (let h = 0; h < CPA_HYPOTHESES; h++) {
    for (let s = 0; s < CPA_SAMPLES; s++) {
      let c = rand() * noiseFloor;
      if (h === correctByte) {
        const d = Math.abs(s - peakSample);
        const bump = signalPeak * Math.exp(-(d * d) / 18);
        c = Math.max(c, bump);
      }
      c = Math.max(0, Math.min(1, c));
      correlations[h * CPA_SAMPLES + s] = c;
      if (h === correctByte && c > peak) peak = c;
    }
  }
  return { hypotheses: CPA_HYPOTHESES, samples: CPA_SAMPLES, correctByte, peakSample, correlations, peakCorrelation: peak };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run lib/__tests__/sim-cpa.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing test `lib/__tests__/sim-trace.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { generatePowerTrace } from "@/lib/sidechannel-sim";

describe("generatePowerTrace", () => {
  it("returns a non-empty sample array with annotations", () => {
    const t = generatePowerTrace("A");
    expect(t.samples.length).toBeGreaterThan(100);
    expect(t.annotations.length).toBeGreaterThan(0);
    expect(t.annotations[0]).toHaveProperty("label");
  });
  it("is deterministic for the same seed", () => {
    expect(generatePowerTrace("A", 4).samples).toEqual(generatePowerTrace("A", 4).samples);
  });
});
```

- [ ] **Step 6: Run to verify it fails**

Run: `npx vitest run lib/__tests__/sim-trace.test.ts`
Expected: FAIL — `generatePowerTrace` not exported.

- [ ] **Step 7: Append the power-trace generator to `lib/sidechannel-sim.ts`**

```ts
export interface PowerTrace {
  samples: number[]; // normalized amplitude ~[-1,1]
  annotations: { sample: number; label: string }[];
}

export function generatePowerTrace(chip: ChipId, seed = 3): PowerTrace {
  const rand = mulberry32(seed);
  const N = 400;
  const samples = new Array<number>(N);
  // A periodic "round" structure with noise; chip A has sharper per-round spikes.
  const spike = chip === "A" ? 0.7 : 0.35;
  for (let i = 0; i < N; i++) {
    const round = Math.sin((i / N) * Math.PI * 16);
    const noise = (rand() - 0.5) * 0.3;
    const perRound = i % 50 < 4 ? spike : 0;
    samples[i] = Math.max(-1, Math.min(1, 0.4 * round + noise + perRound));
  }
  const annotations = [
    { sample: 25, label: "S-box" },
    { sample: 125, label: "NTT" },
    { sample: 225, label: "NTT" },
    { sample: 325, label: "key add" },
  ];
  return { samples, annotations };
}
```

- [ ] **Step 8: Run to verify it passes, then run the full suite**

Run: `npx vitest run lib/__tests__/sim-trace.test.ts && npm test`
Expected: All tests PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/sidechannel-sim.ts lib/__tests__/sim-cpa.test.ts lib/__tests__/sim-trace.test.ts
git commit -m "feat: CPA correlation matrix and power-trace generators"
```

---

### Task 5: Shared layout primitives — Nav, Footer, Eyebrow, Container

**Files:**
- Create: `components/Nav.tsx`, `components/Footer.tsx`, `components/Eyebrow.tsx`, `components/Container.tsx`
- Modify: `app/layout.tsx` (wrap children with Nav + Footer)
- Test: `components/__tests__/nav.test.tsx`

**Interfaces:**
- Produces: `<Nav />`, `<Footer />`, `<Eyebrow index?: string children />`, `<Container className? children />`. Nav links: Problem, Demo, Method, Team, Resources.

- [ ] **Step 1: Write failing test `components/__tests__/nav.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Nav from "@/components/Nav";

describe("Nav", () => {
  it("renders all primary links", () => {
    render(<Nav />);
    for (const label of ["Problem", "Demo", "Method", "Team", "Resources"]) {
      expect(screen.getByRole("link", { name: new RegExp(label, "i") })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/__tests__/nav.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/Container.tsx`**

```tsx
export default function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-5xl px-6 ${className}`}>{children}</div>;
}
```

- [ ] **Step 4: Implement `components/Eyebrow.tsx`**

```tsx
export default function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-graphite">
      {index ? <span className="text-instrument">[{index}]</span> : null} {children}
    </p>
  );
}
```

- [ ] **Step 5: Implement `components/Nav.tsx`**

```tsx
import Link from "next/link";
import Container from "./Container";

const LINKS = [
  { href: "/problem", label: "Problem" },
  { href: "/demo", label: "Demo" },
  { href: "/method", label: "Method" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Quantum-Safe<span className="text-instrument">·</span>Silicon
        </Link>
        <nav className="flex gap-6 font-mono text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-graphite hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 6: Implement `components/Footer.tsx`**

```tsx
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline py-10">
      <Container className="flex flex-col gap-2 font-mono text-xs text-graphite sm:flex-row sm:justify-between">
        <span>Quantum-Safe Silicon — research project</span>
        <span>Demo figures are illustrative simulations.</span>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 7: Wire Nav + Footer into `app/layout.tsx`**

Replace the `<body>` contents:
```tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// ...
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
```

- [ ] **Step 8: Run to verify the Nav test passes**

Run: `npx vitest run components/__tests__/nav.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components app/layout.tsx
git commit -m "feat: shared layout primitives (Nav, Footer, Eyebrow, Container)"
```

---

### Task 6: Content module + Home page

**Files:**
- Create: `content/site.ts` (shared strings, stats, steps)
- Modify: `app/page.tsx`
- Create: `components/StatCard.tsx`, `components/StepFlow.tsx`
- Test: `app/__tests__/home.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Eyebrow`.
- Produces: `content/site.ts` exports `HERO`, `PROBLEM_STATS: {value,label}[]`, `TEST_STEPS: {n,title,body}[]`.

- [ ] **Step 1: Create `content/site.ts`**

```ts
export const HERO = {
  eyebrow: "01 · TESTING QUANTUM-SAFE SILICON",
  title: "We break tomorrow's chips before tomorrow does.",
  lede:
    "Post-quantum algorithms are only as safe as the silicon that runs them. We side-channel test new-generation quantum-safe chips to find the leaks an attacker would — today.",
  cta: { label: "Explore the test bench", href: "/demo" },
};

export const PROBLEM_STATS: { value: string; label: string }[] = [
  { value: "~10–15 yrs", label: "Expert estimate to a cryptographically-relevant quantum computer" },
  { value: "Harvest now", label: "Encrypted data captured today, decrypted after “Q-day”" },
  { value: "2035", label: "U.S. CNSA 2.0 deadline for full quantum-safe migration" },
];

export const TEST_STEPS: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Acquire", body: "Capture power and electromagnetic traces while the chip runs its cryptographic operations." },
  { n: "02", title: "Analyze", body: "Correlate traces against key hypotheses (CPA) and run leakage assessment to expose secret-dependent signals." },
  { n: "03", title: "Verdict", body: "Localize leakage on the die and report whether — and how fast — a secret key can be recovered." },
];
```

- [ ] **Step 2: Implement `components/StatCard.tsx`**

```tsx
export default function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-hairline bg-white/40 p-5">
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <p className="mt-2 text-sm leading-snug text-graphite">{label}</p>
    </div>
  );
}
```

- [ ] **Step 3: Implement `components/StepFlow.tsx`**

```tsx
import { TEST_STEPS } from "@/content/site";

export default function StepFlow() {
  return (
    <ol className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
      {TEST_STEPS.map((s) => (
        <li key={s.n} className="bg-paper p-6">
          <span className="font-mono text-xs text-instrument">{s.n}</span>
          <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-graphite">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 4: Write failing test `app/__tests__/home.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the hero headline and CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/break tomorrow's chips/i);
    expect(screen.getByRole("link", { name: /explore the test bench/i })).toBeInTheDocument();
  });
  it("renders the three test steps", () => {
    render(<Home />);
    expect(screen.getByText(/Acquire/)).toBeInTheDocument();
    expect(screen.getByText(/Verdict/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run to verify it fails**

Run: `npx vitest run app/__tests__/home.test.tsx`
Expected: FAIL — Home still renders the placeholder.

- [ ] **Step 6: Implement `app/page.tsx`**

```tsx
import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import StatCard from "@/components/StatCard";
import StepFlow from "@/components/StepFlow";
import { HERO, PROBLEM_STATS } from "@/content/site";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="graph-paper absolute inset-0 opacity-40" aria-hidden />
        <Container className="relative grid gap-10 py-24 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow index={HERO.eyebrow.split(" · ")[0]}>{HERO.eyebrow.split(" · ")[1]}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{HERO.title}</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-graphite">{HERO.lede}</p>
            <Link
              href={HERO.cta.href}
              className="mt-8 inline-block border border-instrument px-5 py-3 font-mono text-sm text-instrument hover:bg-instrument hover:text-paper"
            >
              {HERO.cta.label} →
            </Link>
          </div>
          <div
            className="aspect-square w-full border border-hairline bg-gradient-to-br from-[#180F3E] via-[#7B2382] to-[#F6A21E]"
            aria-label="Lattice over a chip die with a side-channel heat sweep (placeholder for animated hero)"
            role="img"
          />
        </Container>
      </section>

      <Container className="py-20">
        <Eyebrow index="02">The problem</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PROBLEM_STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>

      <Container className="py-20">
        <Eyebrow index="03">How we test</Eyebrow>
        <div className="mt-6">
          <StepFlow />
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 7: Run to verify it passes**

Run: `npx vitest run app/__tests__/home.test.tsx`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx components/StatCard.tsx components/StepFlow.tsx content/site.ts app/__tests__/home.test.tsx
git commit -m "feat: home page with hero, problem stats, and test-step flow"
```

---

### Task 7: The Problem page (`/problem`)

**Files:**
- Create: `app/problem/page.tsx`, `content/problem.ts`
- Test: `app/__tests__/problem.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Eyebrow`.
- Produces: `content/problem.ts` export `PROBLEM_SECTIONS: {heading, body}[]`.

- [ ] **Step 1: Create `content/problem.ts`**

```ts
export const PROBLEM_SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "The math that quantum computers break",
    body: "Shor's algorithm lets a large fault-tolerant quantum computer factor integers and compute discrete logarithms efficiently — breaking RSA, Diffie-Hellman, and elliptic-curve cryptography, the public-key schemes behind nearly all secure communication today.",
  },
  {
    heading: "Why “when” matters less than you think",
    body: "Estimates for a cryptographically-relevant quantum computer cluster around ten to fifteen years, with a long tail of uncertainty. But the threat is already live: in a “harvest now, decrypt later” attack, an adversary records encrypted traffic today and decrypts it once the hardware exists. Any secret with a long shelf life is already exposed.",
  },
  {
    heading: "Post-quantum cryptography moves the problem to the chip",
    body: "NIST standardized quantum-resistant algorithms (ML-KEM, ML-DSA, SLH-DSA) in 2024, and migration deadlines now run to 2035. But a quantum-resistant algorithm is only as safe as the silicon that runs it: a perfect cipher on a leaky chip is not secure.",
  },
  {
    heading: "Side channels are the real attack surface",
    body: "Power consumption, electromagnetic emanations, and timing all leak secret-dependent information during computation. The regular arithmetic of lattice-based cryptography can even amplify this leakage. Testing chips for these physical weaknesses — before they ship — is the gap this project addresses.",
  },
];
```

- [ ] **Step 2: Write failing test `app/__tests__/problem.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Problem from "@/app/problem/page";

describe("Problem page", () => {
  it("renders the harvest-now framing", () => {
    render(<Problem />);
    expect(screen.getByText(/harvest now, decrypt later/i)).toBeInTheDocument();
  });
  it("renders a heading about side channels", () => {
    render(<Problem />);
    expect(screen.getByRole("heading", { name: /side channels/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npx vitest run app/__tests__/problem.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `app/problem/page.tsx`**

```tsx
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { PROBLEM_SECTIONS } from "@/content/problem";

export default function Problem() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="02">The problem</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight">
          Quantum computing breaks today's cryptography. The fix has to reach the chip.
        </h1>
        <div className="mt-12 grid gap-12">
          {PROBLEM_SECTIONS.map((s, i) => (
            <article key={s.heading} className="grid gap-3 border-t border-hairline pt-8 md:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-instrument">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run app/__tests__/problem.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/problem content/problem.ts app/__tests__/problem.test.tsx
git commit -m "feat: the problem page"
```

---

### Task 8: Method page (`/method`)

**Files:**
- Create: `app/method/page.tsx`
- Test: `app/__tests__/method.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Eyebrow`, `TEST_STEPS` from `content/site.ts`.

- [ ] **Step 1: Write failing test `app/__tests__/method.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Method from "@/app/method/page";

describe("Method page", () => {
  it("explains the CV localization step", () => {
    render(<Method />);
    expect(screen.getByText(/computer vision/i)).toBeInTheDocument();
  });
  it("lists the pipeline stages", () => {
    render(<Method />);
    expect(screen.getByRole("heading", { name: /Localize/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run app/__tests__/method.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `app/method/page.tsx`**

```tsx
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const PIPELINE = [
  { n: "01", title: "Acquire", body: "An oscilloscope captures power draw and an EM probe captures emanations while the target chip performs key-dependent operations. Thousands to millions of traces are collected." },
  { n: "02", title: "Align & process", body: "Traces are aligned and filtered so the same operation lines up sample-for-sample across captures — a prerequisite for statistical analysis." },
  { n: "03", title: "Analyze", body: "Correlation Power Analysis (CPA) scores each key-byte hypothesis against the traces; a leakage-assessment (TVLA) test flags secret-dependent signals independent of any specific attack." },
  { n: "04", title: "Localize", body: "An EM probe scans an X/Y grid over the die to build a spatial leakage heatmap. We apply computer vision to the resulting maps to detect and bound the leaking regions — typically the cryptographic core — and attach a confidence score." },
  { n: "05", title: "Verdict", body: "We report whether a key can be recovered, how many traces it took, and where on the die the leakage originates — the basis for comparing a protected chip against an unprotected one." },
];

export default function Method() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="04">Methodology</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight">
          From raw traces to a security verdict.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Our pipeline turns physical measurements of a running chip into evidence about whether its
          secrets leak. Each stage is reproducible and instrument-agnostic.
        </p>
        <ol className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline">
          {PIPELINE.map((p) => (
            <li key={p.n} className="grid gap-3 bg-paper p-8 md:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-instrument">{p.n}</span>
              <div>
                <h2 className="font-display text-2xl font-semibold">{p.title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run app/__tests__/method.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/method app/__tests__/method.test.tsx
git commit -m "feat: methodology page with five-stage pipeline"
```

---

### Task 9: Team page (`/team`) with placeholder data

**Files:**
- Create: `app/team/page.tsx`, `content/team.ts`
- Test: `app/__tests__/team.test.tsx`

**Interfaces:**
- Produces: `content/team.ts` export `TEAM: {name, role, bio}[]` (placeholder data, clearly editable).

- [ ] **Step 1: Create `content/team.ts`**

```ts
// Placeholder roster — replace name/role/bio and add a real photo path when available.
export const TEAM: { name: string; role: string; bio: string }[] = [
  { name: "Principal Investigator", role: "Lead, Hardware Security", bio: "Leads the side-channel evaluation programme and sets methodology." },
  { name: "Postdoctoral Researcher", role: "Side-Channel Analysis", bio: "Designs CPA and leakage-assessment campaigns against post-quantum cores." },
  { name: "PhD Researcher", role: "EM & Computer Vision", bio: "Builds the EM-scan rig and the vision pipeline that localizes leakage on the die." },
  { name: "Research Engineer", role: "Instrumentation", bio: "Maintains acquisition hardware and the trace-processing toolchain." },
];
```

- [ ] **Step 2: Write failing test `app/__tests__/team.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Team from "@/app/team/page";

describe("Team page", () => {
  it("renders a card per team member", () => {
    render(<Team />);
    expect(screen.getByText(/Principal Investigator/i)).toBeInTheDocument();
    expect(screen.getByText(/EM & Computer Vision/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npx vitest run app/__tests__/team.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `app/team/page.tsx`**

```tsx
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { TEAM } from "@/content/team";

export default function Team() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="05">People</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold">The team</h1>
        <p className="mt-4 max-w-2xl text-graphite">Roster placeholders — swap in real names, photos, and bios.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="flex gap-4 border border-hairline p-6">
              <div className="h-16 w-16 shrink-0 border border-hairline bg-white/50" aria-hidden />
              <div>
                <h2 className="font-display text-lg font-semibold">{m.name}</h2>
                <p className="font-mono text-xs uppercase tracking-wide text-instrument">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run app/__tests__/team.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/team content/team.ts app/__tests__/team.test.tsx
git commit -m "feat: team page with placeholder roster"
```

---

### Task 10: Resources page (`/resources`) — milestone timeline + reading list

**Files:**
- Create: `app/resources/page.tsx`, `content/resources.ts`
- Test: `app/__tests__/resources.test.tsx`

**Interfaces:**
- Produces: `content/resources.ts` exports `MILESTONES: {date, title}[]`, `READING: {title, where, href}[]`.

- [ ] **Step 1: Create `content/resources.ts`**

```ts
export const MILESTONES: { date: string; title: string }[] = [
  { date: "Aug 2024", title: "NIST finalizes FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA)" },
  { date: "Mar 2025", title: "NIST selects HQC as a backup, math-diverse key-encapsulation mechanism" },
  { date: "Sep 2026", title: "FIPS 140-2 sunset — modules validate under FIPS 140-3" },
  { date: "2027", title: "NSA CNSA 2.0: PQC required for new national security systems" },
  { date: "2035", title: "CNSA 2.0: full quantum-safe migration deadline" },
];

export const READING: { title: string; where: string; href: string }[] = [
  { title: "First 3 finalized post-quantum encryption standards", where: "NIST", href: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards" },
  { title: "Side-channel & fault-injection attacks on Kyber/Dilithium (survey)", where: "IACR ePrint 2022/737", href: "https://eprint.iacr.org/2022/737.pdf" },
  { title: "Post-Quantum Cryptography & Quantum-Safe Security: a survey", where: "arXiv 2510.10436", href: "https://arxiv.org/pdf/2510.10436" },
  { title: "CNSA 2.0 explainer", where: "Entrust", href: "https://www.entrust.com/resources/learn/what-is-cnsa-2-0" },
];
```

- [ ] **Step 2: Write failing test `app/__tests__/resources.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Resources from "@/app/resources/page";

describe("Resources page", () => {
  it("renders the NIST 2024 milestone", () => {
    render(<Resources />);
    expect(screen.getByText(/FIPS 203/)).toBeInTheDocument();
  });
  it("renders external reading links", () => {
    render(<Resources />);
    const link = screen.getByRole("link", { name: /finalized post-quantum encryption standards/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("nist.gov"));
  });
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npx vitest run app/__tests__/resources.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `app/resources/page.tsx`**

```tsx
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { MILESTONES, READING } from "@/content/resources";

export default function Resources() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="06">Background & resources</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold">Milestones & reading</h1>

        <h2 className="mt-12 font-display text-2xl font-semibold">Field milestones</h2>
        <ol className="mt-6 border-l border-hairline">
          {MILESTONES.map((m) => (
            <li key={m.date} className="relative ml-6 pb-8">
              <span className="absolute -left-[1.65rem] top-1 h-2 w-2 rounded-full bg-instrument" aria-hidden />
              <div className="font-mono text-xs uppercase tracking-wide text-instrument">{m.date}</div>
              <p className="mt-1 text-lg leading-snug text-ink">{m.title}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 font-display text-2xl font-semibold">Selected reading</h2>
        <ul className="mt-6 grid gap-3">
          {READING.map((r) => (
            <li key={r.href} className="border border-hairline p-4">
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-medium text-instrument hover:underline">
                {r.title}
              </a>
              <span className="ml-2 font-mono text-xs text-graphite">— {r.where}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl font-semibold">Contact</h2>
        <p className="mt-3 text-graphite">For collaboration or funding enquiries, replace this with a real address.</p>
      </Container>
    </main>
  );
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npx vitest run app/__tests__/resources.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/resources content/resources.ts app/__tests__/resources.test.tsx
git commit -m "feat: resources page with milestone timeline and reading list"
```

---

### Task 11: Demo widgets — Heatmap (EM + CV overlay) and CpaMatrix canvases

**Files:**
- Create: `components/demo/Heatmap.tsx`, `components/demo/CpaMatrix.tsx`
- Test: `components/__tests__/heatmap.test.tsx`

**Interfaces:**
- Consumes: `generateEmHeatmap`, `generateCpaMatrix`, `computeVerdict`, `ChipId` from `@/lib/sidechannel-sim`; `heatColor` from `@/lib/colorRamp`.
- Produces: `<Heatmap chip traceCount />` (renders a `<canvas role="img">` with the EM map + an SVG CV bounding box around the crypto core labeled with confidence); `<CpaMatrix chip traceCount />` (renders a `<canvas role="img">`).

- [ ] **Step 1: Write failing test `components/__tests__/heatmap.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Heatmap from "@/components/demo/Heatmap";

describe("Heatmap", () => {
  it("renders an accessible canvas and a CV confidence label for a leaking chip", () => {
    render(<Heatmap chip="A" traceCount={50000} />);
    expect(screen.getByRole("img", { name: /electromagnetic leakage/i })).toBeInTheDocument();
    expect(screen.getByText(/LEAK/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.\d\d/)).toBeInTheDocument(); // confidence like 0.99
  });
  it("does not assert a leak for the masked chip", () => {
    render(<Heatmap chip="B" traceCount={1000000} />);
    expect(screen.queryByText(/LEAK/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/__tests__/heatmap.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/demo/Heatmap.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { generateEmHeatmap, computeVerdict, type ChipId } from "@/lib/sidechannel-sim";
import { heatColor } from "@/lib/colorRamp";

const CELL = 14; // px per grid cell

export default function Heatmap({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const map = generateEmHeatmap(chip, traceCount);
  const verdict = computeVerdict(chip, traceCount);
  const W = map.cols * CELL;
  const H = map.rows * CELL;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    for (let y = 0; y < map.rows; y++) {
      for (let x = 0; x < map.cols; x++) {
        ctx.fillStyle = heatColor(map.values[y * map.cols + x]);
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
  }, [map, chip, traceCount]);

  const core = map.cryptoCore;
  const showBox = chip === "A" && verdict.confidence > 0.3;

  return (
    <figure className="relative inline-block border border-hairline">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label={`Electromagnetic leakage heatmap of chip ${chip}`}
        className="block"
      />
      {showBox && (
        <svg className="pointer-events-none absolute inset-0" width={W} height={H} aria-hidden>
          <rect
            x={core.x * CELL}
            y={core.y * CELL}
            width={core.w * CELL}
            height={core.h * CELL}
            fill="none"
            stroke="#FCFFA4"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          <text x={core.x * CELL} y={core.y * CELL - 4} fill="#FCFFA4" className="font-mono" fontSize="11">
            LEAK · crypto core · {verdict.confidence.toFixed(2)}
          </text>
        </svg>
      )}
      <figcaption className="border-t border-hairline bg-paper px-2 py-1 font-mono text-[10px] text-graphite">
        EM spatial leakage {showBox ? "· CV hotspot detected" : "· no hotspot"}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run components/__tests__/heatmap.test.tsx`
Expected: PASS. (Canvas drawing is a no-op under jsdom; the test checks the accessible label, the CV box text, and the confidence number, which do not depend on pixel output.)

- [ ] **Step 5: Implement `components/demo/CpaMatrix.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { generateCpaMatrix, type ChipId } from "@/lib/sidechannel-sim";
import { heatColor } from "@/lib/colorRamp";

export default function CpaMatrix({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const r = generateCpaMatrix(chip, traceCount);
  const cw = 5;
  const ch = 6;
  const W = r.samples * cw;
  const H = r.hypotheses * ch;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    for (let h = 0; h < r.hypotheses; h++) {
      for (let s = 0; s < r.samples; s++) {
        ctx.fillStyle = heatColor(r.correlations[h * r.samples + s]);
        ctx.fillRect(s * cw, h * ch, cw, ch);
      }
    }
  }, [r, chip, traceCount]);

  return (
    <figure className="border border-hairline">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label={`CPA correlation heatmap for chip ${chip}: key-byte hypotheses by time sample`}
        className="block"
      />
      <figcaption className="border-t border-hairline bg-paper px-2 py-1 font-mono text-[10px] text-graphite">
        CPA · hypotheses × time · peak {r.peakCorrelation.toFixed(2)}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/demo/Heatmap.tsx components/demo/CpaMatrix.tsx components/__tests__/heatmap.test.tsx
git commit -m "feat: EM heatmap (with CV overlay) and CPA matrix demo widgets"
```

---

### Task 12: Demo widgets — TraceViewer and VerdictPanel

**Files:**
- Create: `components/demo/TraceViewer.tsx`, `components/demo/VerdictPanel.tsx`
- Test: `components/__tests__/verdictPanel.test.tsx`

**Interfaces:**
- Consumes: `generatePowerTrace`, `computeVerdict`, `ChipId` from `@/lib/sidechannel-sim`.
- Produces: `<TraceViewer chip />` (SVG polyline trace with annotations); `<VerdictPanel chip traceCount />` (text-based verdict; testable without canvas).

- [ ] **Step 1: Write failing test `components/__tests__/verdictPanel.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VerdictPanel from "@/components/demo/VerdictPanel";

describe("VerdictPanel", () => {
  it("shows KEY RECOVERED for chip A past the threshold", () => {
    render(<VerdictPanel chip="A" traceCount={5000} />);
    expect(screen.getByText(/key recovered/i)).toBeInTheDocument();
  });
  it("shows pending for chip A below the threshold", () => {
    render(<VerdictPanel chip="A" traceCount={200} />);
    expect(screen.getByText(/acquiring/i)).toBeInTheDocument();
  });
  it("shows no exploitable leakage for chip B", () => {
    render(<VerdictPanel chip="B" traceCount={1000000} />);
    expect(screen.getByText(/no exploitable leakage/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/__tests__/verdictPanel.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/demo/VerdictPanel.tsx`**

```tsx
import { computeVerdict, type ChipId } from "@/lib/sidechannel-sim";

export default function VerdictPanel({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const v = computeVerdict(chip, traceCount);

  let label: string;
  let tone: string;
  if (v.status === "leak") {
    label = `⛔ KEY RECOVERED in ~${v.tracesToRecover?.toLocaleString()} traces`;
    tone = "border-[#D44842] text-[#D44842]";
  } else if (v.status === "secure") {
    label = "✅ No exploitable leakage (> 1,000,000 traces)";
    tone = "border-instrument text-instrument";
  } else {
    label = `… Acquiring — ${Math.round(v.confidence * 100)}% toward recovery`;
    tone = "border-graphite text-graphite";
  }

  return (
    <div className={`border-2 ${tone} p-4 font-mono text-sm`}>
      <div className="text-xs uppercase tracking-widest text-graphite">Verdict — Chip {chip}</div>
      <div className="mt-1 text-base">{label}</div>
    </div>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run components/__tests__/verdictPanel.test.tsx`
Expected: PASS.

- [ ] **Step 5: Implement `components/demo/TraceViewer.tsx`**

```tsx
"use client";
import { generatePowerTrace, type ChipId } from "@/lib/sidechannel-sim";

export default function TraceViewer({ chip }: { chip: ChipId }) {
  const t = generatePowerTrace(chip);
  const W = 720;
  const H = 120;
  const pts = t.samples
    .map((v, i) => `${(i / (t.samples.length - 1)) * W},${H / 2 - (v * H) / 2.2}`)
    .join(" ");

  return (
    <figure className="border border-hairline bg-paper">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Power/EM trace for chip ${chip}`}>
        <polyline points={pts} fill="none" stroke="#14171C" strokeWidth={1} />
        {t.annotations.map((a) => {
          const x = (a.sample / (t.samples.length - 1)) * W;
          return (
            <g key={a.sample}>
              <line x1={x} y1={0} x2={x} y2={H} stroke="#0E7C86" strokeWidth={0.5} strokeDasharray="2 2" />
              <text x={x + 2} y={12} fontSize="9" fill="#0E7C86" className="font-mono">{a.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="border-t border-hairline px-2 py-1 font-mono text-[10px] text-graphite">
        Power/EM trace · annotated operations
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/demo/TraceViewer.tsx components/demo/VerdictPanel.tsx components/__tests__/verdictPanel.test.tsx
git commit -m "feat: trace viewer and verdict panel demo widgets"
```

---

### Task 13: Demo page assembly — controls + interactive wiring (`/demo`)

**Files:**
- Create: `app/demo/page.tsx` (client component with controls and state)
- Test: `app/__tests__/demo.test.tsx`

**Interfaces:**
- Consumes: `Heatmap`, `CpaMatrix`, `TraceViewer`, `VerdictPanel`, `Container`, `Eyebrow`, `ChipId`.
- State: `chip: ChipId`, `traceCount: number` (slider maps a 0–100 position to 0–1,000,000 traces on a log-ish scale).

- [ ] **Step 1: Write failing test `app/__tests__/demo.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Demo from "@/app/demo/page";

describe("Demo page", () => {
  it("shows the illustrative-simulation label", () => {
    render(<Demo />);
    expect(screen.getByText(/illustrative simulation/i)).toBeInTheDocument();
  });
  it("flips the verdict to secure when Chip B is selected", async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole("button", { name: /chip b/i }));
    expect(screen.getByText(/no exploitable leakage/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run app/__tests__/demo.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `app/demo/page.tsx`**

```tsx
"use client";
import { useState } from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Heatmap from "@/components/demo/Heatmap";
import CpaMatrix from "@/components/demo/CpaMatrix";
import TraceViewer from "@/components/demo/TraceViewer";
import VerdictPanel from "@/components/demo/VerdictPanel";
import type { ChipId } from "@/lib/sidechannel-sim";

// Slider position 0..100 -> trace count on a log scale up to 1e6.
function posToTraces(pos: number): number {
  if (pos <= 0) return 0;
  return Math.round(Math.pow(10, (pos / 100) * 6)); // 10^0 .. 10^6
}

export default function Demo() {
  const [chip, setChip] = useState<ChipId>("A");
  const [pos, setPos] = useState(40); // ~2,500 traces
  const traceCount = posToTraces(pos);

  return (
    <main>
      <Container className="py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Eyebrow index="03">Side-channel test bench</Eyebrow>
          <span className="border border-[#F6A21E] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#F6A21E]">
            ⚠ Illustrative simulation
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold">Watch a key leak — or hold.</h1>

        {/* Controls */}
        <div className="mt-8 grid gap-6 border border-hairline p-6 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex gap-2" role="group" aria-label="Select chip under test">
            {(["A", "B"] as ChipId[]).map((c) => (
              <button
                key={c}
                onClick={() => setChip(c)}
                aria-pressed={chip === c}
                className={`border px-4 py-2 font-mono text-sm ${
                  chip === c ? "border-instrument bg-instrument text-paper" : "border-hairline text-graphite"
                }`}
              >
                Chip {c} — {c === "A" ? "unprotected" : "masked"}
              </button>
            ))}
          </div>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs text-graphite">
              Traces captured: {traceCount.toLocaleString()}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Number of traces captured"
              className="accent-instrument"
            />
          </label>
        </div>

        {/* Panels */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-graphite">EM spatial heatmap + CV</h2>
            <Heatmap chip={chip} traceCount={traceCount} />
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-graphite">CPA correlation</h2>
            <CpaMatrix chip={chip} traceCount={traceCount} />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-graphite">Power / EM trace</h2>
          <TraceViewer chip={chip} />
        </div>

        <div className="mt-6 max-w-md">
          <VerdictPanel chip={chip} traceCount={traceCount} />
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run app/__tests__/demo.test.tsx`
Expected: PASS.

- [ ] **Step 5: Run the full suite and build**

Run: `npm test && npm run build`
Expected: all tests PASS; production build succeeds.

- [ ] **Step 6: Commit**

```bash
git add app/demo app/__tests__/demo.test.tsx
git commit -m "feat: interactive side-channel test bench demo page"
```

---

### Task 14: Hero signature animation + scroll reveals (reduced-motion safe)

**Files:**
- Create: `components/HeroVisual.tsx`
- Modify: `app/page.tsx` (replace the static hero panel with `<HeroVisual />`)
- Test: `components/__tests__/heroVisual.test.tsx`

**Interfaces:**
- Produces: `<HeroVisual />` — a client component rendering the lattice grid + animated heat sweep over a die. Uses Framer Motion; under `prefers-reduced-motion` it renders a static composed frame. Must expose `role="img"` with an alt label so the test (no motion in jsdom) passes.

- [ ] **Step 1: Write failing test `components/__tests__/heroVisual.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroVisual from "@/components/HeroVisual";

describe("HeroVisual", () => {
  it("renders an accessible labelled visual", () => {
    render(<HeroVisual />);
    expect(screen.getByRole("img", { name: /lattice.*chip|chip.*lattice/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run components/__tests__/heroVisual.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/HeroVisual.tsx`**

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const W = 480;
  const H = 480;
  const step = 40;
  const lines = [];
  for (let x = 0; x <= W; x += step) lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} stroke="#FFFFFF" strokeOpacity={0.15} />);
  for (let y = 0; y <= H; y += step) lines.push(<line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} stroke="#FFFFFF" strokeOpacity={0.15} />);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-square w-full"
      role="img"
      aria-label="A mathematical lattice over a chip die with a side-channel heat sweep"
    >
      <defs>
        <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#180F3E" />
          <stop offset="55%" stopColor="#7B2382" />
          <stop offset="100%" stopColor="#F6A21E" />
        </linearGradient>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FCFFA4" stopOpacity="0" />
          <stop offset="50%" stopColor="#FCFFA4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FCFFA4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#die)" />
      {/* die crypto-core block */}
      <rect x={W * 0.58} y={H * 0.24} width={W * 0.26} height={H * 0.3} fill="#000" fillOpacity={0.2} stroke="#FCFFA4" strokeOpacity={0.4} />
      {/* lattice grid + nodes */}
      {lines}
      {/* heat sweep */}
      {reduce ? (
        <rect x={W * 0.3} width={W * 0.4} height={H} fill="url(#sweep)" />
      ) : (
        <motion.rect
          width={W * 0.4}
          height={H}
          fill="url(#sweep)"
          initial={{ x: -W * 0.4 }}
          animate={{ x: W }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
}
```

- [ ] **Step 4: Replace the static hero panel in `app/page.tsx`**

Replace the `<div ... role="img" />` placeholder panel (the gradient square) with:
```tsx
import HeroVisual from "@/components/HeroVisual";
// ...inside the hero grid, second column:
          <HeroVisual />
```

- [ ] **Step 5: Run to verify the hero test passes and the home test still passes**

Run: `npx vitest run components/__tests__/heroVisual.test.tsx app/__tests__/home.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/HeroVisual.tsx app/page.tsx components/__tests__/heroVisual.test.tsx
git commit -m "feat: animated lattice-over-die hero with reduced-motion fallback"
```

---

### Task 15: Polish pass — accessibility, responsive, performance, final verification

**Files:**
- Modify: any files needing fixes found during review
- Create: `README.md`

**Interfaces:** none new.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests PASS. Fix any failures before continuing.

- [ ] **Step 2: Production build + start, then walk every route**

Run: `npm run build && npm run start`
Then in a browser open `/`, `/problem`, `/demo`, `/method`, `/team`, `/resources`. Confirm: no console errors; nav works; demo slider + chip toggle visibly change the heatmaps and verdict.

- [ ] **Step 3: Accessibility & reduced-motion check**

- Tab through each page: focus ring (instrument color) visible on all links/buttons/slider.
- In OS settings enable "reduce motion"; reload `/` and `/demo`; confirm the hero sweep is static and no looping animation runs.
- Confirm every `<canvas>`/`<svg>` visual has an `aria-label` (grep: `role="img"` should each have `aria-label`).

- [ ] **Step 4: Responsive check**

Resize to 375px width. Confirm: nav remains usable, hero stacks, demo panels stack to one column, no horizontal overflow.

- [ ] **Step 5: Write `README.md`**

```markdown
# Quantum-Safe Silicon — project site

Next.js + TypeScript + Tailwind. A grant-facing research site with an interactive,
**illustrative** side-channel test-bench demo.

## Develop
    npm install
    npm run dev        # http://localhost:3000

## Test
    npm test

## Build
    npm run build && npm run start

## Structure
- `app/` — routes (/, /problem, /demo, /method, /team, /resources)
- `components/` — layout + demo widgets
- `content/` — editable page copy and data (team, milestones, reading)
- `lib/` — seeded simulation (`sidechannel-sim.ts`), RNG, color ramp

## Notes
- All demo figures are synthetic simulations, clearly labelled. Replace the
  generators in `lib/sidechannel-sim.ts` with real trace data to go live.
- Team roster, lab name, and logo are placeholders.
```

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: polish pass, README, accessibility and responsive fixes"
```

---

## Self-Review

**1. Spec coverage:**
- Design tokens / fonts / Direction A → Task 1. ✓
- Heat ramp as data-only color language → Tasks 2, 11. ✓
- Sitemap (6 routes) → Tasks 6–10, 13. ✓
- Home (hero, problem snapshot, how-we-test, CTA) → Tasks 6, 14. ✓
- Problem page (Shor, HNDL, chip attack surface) → Task 7. ✓
- Method pipeline incl. CV localization → Task 8. ✓
- Team placeholders → Task 9. ✓
- Resources timeline + reading → Task 10. ✓
- Demo: EM heatmap + CV bounding boxes, CPA matrix, trace viewer, verdict, chip A/B toggle, trace slider, "illustrative simulation" label → Tasks 11–13. ✓
- Seeded, swappable simulation module, unit-tested → Tasks 2–4. ✓
- Animated lattice↔leakage hero + reduced-motion → Task 14. ✓
- Accessibility/responsive/performance baseline → Task 15. ✓

**2. Placeholder scan:** No "TODO/TBD/implement later". Team/PI labels are intentional content placeholders (concrete strings), not plan gaps.

**3. Type consistency:** `ChipId`, `Verdict`, `EmHeatmap`, `CpaResult`, `PowerTrace`, `signalLevel`, `computeVerdict`, `generateEmHeatmap`, `generateCpaMatrix`, `generatePowerTrace`, `heatColor`, `mulberry32`, `TRACES_TO_RECOVER_A` are defined in Tasks 2–4 and consumed with matching signatures in Tasks 11–14. Heatmap grid constant (32 cols) used in the EM test matches `EM_COLS`. ✓
