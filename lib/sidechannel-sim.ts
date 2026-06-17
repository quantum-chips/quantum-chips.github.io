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
    tracesToRecover: recovered ? TRACES_TO_RECOVER_A : null,
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
