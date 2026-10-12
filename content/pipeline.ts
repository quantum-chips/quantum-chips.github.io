// The five-stage testing pipeline. Single source for /method (full text), the
// /chip-testing summary (`short`) and the /demo stage strip — keep it that way
// so the three views can't drift apart again.
//
// AI is described as the approach, not a demonstrated result: nothing has been
// shown on a packaged production device yet.

// `learned`: stages a neural network takes over from the specialist.
export type Stage = { n: string; title: string; short: string; body: string; learned?: boolean };

export const PIPELINE: Stage[] = [
  {
    n: "01",
    title: "Acquire",
    short: "Capture power and EM traces while the chip runs ML-KEM or ML-DSA.",
    body: "An oscilloscope records the chip's power draw and an EM probe its emanations while it performs key-dependent operations. Thousands to millions of traces are collected.",
  },
  {
    n: "02",
    title: "Align",
    learned: true,
    short: "Line traces up so each operation falls at the same sample.",
    body: "Clock drift and interface jitter shift every capture slightly, so traces are filtered and aligned until the same operation lines up sample-for-sample. A specialist normally tunes this by hand; we train neural networks that tolerate the misalignment that remains.",
  },
  {
    n: "03",
    title: "Analyze",
    learned: true,
    short: "Neural networks learn where the key leaks; CPA and TVLA cross-check.",
    body: "Classical analysis needs an expert to pick a leakage model and the points in a trace worth attacking. Our neural networks learn both from the traces themselves — the deep-learning approach that copes with misaligned and masked traces where hand-tuned attacks struggle. Correlation Power Analysis (CPA) and a TVLA leakage test run alongside as baselines and cross-checks.",
  },
  {
    n: "04",
    title: "Localize",
    short: "Scan the chip with an EM probe and flag where the leakage comes from.",
    body: "An EM probe scans an X/Y grid over the chip to build a spatial leakage heatmap. We apply computer vision to the resulting maps to detect and bound the leaking regions — typically the cryptographic core — and attach a confidence score.",
  },
  {
    n: "05",
    title: "Verdict",
    short: "Report whether the key falls, after how many traces, and where.",
    body: "We report whether a key can be recovered, how many traces it took, and where on the chip the leakage originates — the basis for comparing a protected chip against an unprotected one.",
  },
];

// /demo has an output panel for every stage except Align, whose result is folded
// into the Acquire trace.
export const demoAnchor = (n: string): string | null => (n === "02" ? null : `stage-${n}`);
