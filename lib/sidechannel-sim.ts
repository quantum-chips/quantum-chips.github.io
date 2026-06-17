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
