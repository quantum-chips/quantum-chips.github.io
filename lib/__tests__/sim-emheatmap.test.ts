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
