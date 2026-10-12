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
    body: "Clock drift and interface jitter shift captures in time. Filtering and alignment bring corresponding operations into the same sample positions. We plan to train neural networks to tolerate residual misalignment.",
  },
  {
    n: "03",
    title: "Analyze",
    learned: true,
    short: "Use neural networks to identify leakage, with CPA and TVLA as baselines.",
    body: "Neural networks learn leakage features from traces, reducing manual selection of leakage models and points of interest. The approach is intended for misaligned and masked traces. Correlation Power Analysis (CPA) and a TVLA leakage test provide baselines and cross-checks.",
  },
  {
    n: "04",
    title: "Localize",
    short: "Scan the chip with an EM probe to locate leakage.",
    body: "An EM probe scans an X/Y grid over the chip to build a spatial leakage heatmap. The proposed localisation stage uses computer vision to identify leakage regions, such as the cryptographic core, and assign a confidence score.",
  },
  {
    n: "05",
    title: "Verdict",
    short: "Report key recovery, trace count and leakage location.",
    body: "Record whether a key is recovered, the number of traces required and the location of leakage. Compare these results with and without countermeasures.",
  },
];

// /demo has an output panel for every stage except Align, whose result is folded
// into the Acquire trace.
export const demoAnchor = (n: string): string | null => (n === "02" ? null : `stage-${n}`);
