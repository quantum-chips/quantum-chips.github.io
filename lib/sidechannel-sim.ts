import { mulberry32 } from "@/lib/rng";

export type ChipId = "A" | "B";

// The chip runs two NIST post-quantum algorithms. Each uses different hardware
// blocks and operations, so its leakage signature differs: a different region of
// the die leaks, the CPA peak sits at a different time, and key recovery needs a
// different number of traces.
export type Algorithm = "ML-KEM" | "ML-DSA";

export const TRACES_TO_RECOVER_A = 2100; // ML-KEM recovery threshold (chip A)

interface AlgoConfig {
  recover: number; // traces to recover the key on the unprotected chip
  core: { x: number; y: number; w: number; h: number }; // leaking region on the die
  peakSample: number; // CPA peak location in time
  correctByte: number; // correct key-byte hypothesis
  seedOffset: number; // decorrelates the two algorithms' noise
  traceFreq: number; // operation cadence in the power trace
  annotations: { sample: number; label: string }[];
}

const ALGO_CONFIG: Record<Algorithm, AlgoConfig> = {
  "ML-KEM": {
    recover: TRACES_TO_RECOVER_A,
    core: { x: 19, y: 6, w: 8, h: 7 },
    peakSample: 58,
    correctByte: 37,
    seedOffset: 0,
    traceFreq: 16,
    annotations: [
      { sample: 25, label: "NTT" },
      { sample: 140, label: "pointwise" },
      { sample: 240, label: "INTT" },
      { sample: 340, label: "decode" },
    ],
  },
  "ML-DSA": {
    recover: 3600,
    core: { x: 5, y: 13, w: 10, h: 7 },
    peakSample: 33,
    correctByte: 51,
    seedOffset: 1000,
    traceFreq: 12,
    annotations: [
      { sample: 30, label: "expand A" },
      { sample: 150, label: "NTT" },
      { sample: 255, label: "sample y" },
      { sample: 360, label: "reject" },
    ],
  },
};

// Leakage-recovery progress in [0,1]. Chip A: saturating curve crossing ~0.63 at
// the algorithm's recovery point, ->1 after. Chip B: stays near the noise floor.
export function signalLevel(chip: ChipId, traceCount: number, algo: Algorithm = "ML-KEM"): number {
  if (chip === "B") return Math.min(0.04, traceCount / 1e8); // negligible, never separates
  const n = Math.max(0, traceCount);
  return 1 - Math.exp(-n / ALGO_CONFIG[algo].recover);
}

// Traces needed to recover the key on the unprotected chip, per algorithm.
export function recoveryThreshold(algo: Algorithm = "ML-KEM"): number {
  return ALGO_CONFIG[algo].recover;
}

export interface Verdict {
  recovered: boolean;
  tracesToRecover: number | null;
  confidence: number;
  status: "leak" | "secure" | "pending";
}

export function computeVerdict(chip: ChipId, traceCount: number, algo: Algorithm = "ML-KEM"): Verdict {
  const confidence = signalLevel(chip, traceCount, algo);
  if (chip === "B") {
    return { recovered: false, tracesToRecover: null, confidence, status: "secure" };
  }
  const recover = ALGO_CONFIG[algo].recover;
  const recovered = traceCount >= recover;
  return {
    recovered,
    tracesToRecover: recovered ? recover : null,
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

export function generateEmHeatmap(
  chip: ChipId,
  traceCount: number,
  seed = 1,
  algo: Algorithm = "ML-KEM",
): EmHeatmap {
  const cfg = ALGO_CONFIG[algo];
  const rand = mulberry32(seed + cfg.seedOffset);
  const level = signalLevel(chip, traceCount, algo);
  const core = cfg.core;
  const values = new Array(EM_COLS * EM_ROWS);
  for (let y = 0; y < EM_ROWS; y++) {
    for (let x = 0; x < EM_COLS; x++) {
      const base = 0.08 + rand() * 0.12; // quiet background leakage everywhere
      const inCore =
        x >= core.x && x < core.x + core.w && y >= core.y && y < core.y + core.h;
      // Hotspot rises with leakage level; centered emphasis inside the core.
      let v = base;
      if (inCore) {
        const cx = core.x + core.w / 2;
        const cy = core.y + core.h / 2;
        const dist = Math.hypot(x - cx, y - cy) / (core.w / 2);
        const falloff = Math.max(0, 1 - dist);
        v = base + level * (0.75 * falloff + 0.15);
      }
      values[y * EM_COLS + x] = Math.max(0, Math.min(1, v));
    }
  }
  return { cols: EM_COLS, rows: EM_ROWS, values, cryptoCore: core };
}

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

export function generateCpaMatrix(
  chip: ChipId,
  traceCount: number,
  seed = 2,
  algo: Algorithm = "ML-KEM",
): CpaResult {
  const cfg = ALGO_CONFIG[algo];
  const rand = mulberry32(seed + cfg.seedOffset);
  const level = signalLevel(chip, traceCount, algo); // 0..1
  const correctByte = cfg.correctByte % CPA_HYPOTHESES;
  const peakSample = cfg.peakSample;
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

export interface PowerTrace {
  samples: number[]; // normalized amplitude ~[-1,1]
  annotations: { sample: number; label: string }[];
}

export function generatePowerTrace(chip: ChipId, seed = 3, algo: Algorithm = "ML-KEM"): PowerTrace {
  const cfg = ALGO_CONFIG[algo];
  const rand = mulberry32(seed + cfg.seedOffset);
  const N = 400;
  const samples = new Array<number>(N);
  // A periodic "round" structure with noise; chip A has sharper per-round spikes.
  const spike = chip === "A" ? 0.7 : 0.35;
  for (let i = 0; i < N; i++) {
    const round = Math.sin((i / N) * Math.PI * cfg.traceFreq);
    const noise = (rand() - 0.5) * 0.3;
    const perRound = i % 50 < 4 ? spike : 0;
    samples[i] = Math.max(-1, Math.min(1, 0.4 * round + noise + perRound));
  }
  return { samples, annotations: cfg.annotations };
}
