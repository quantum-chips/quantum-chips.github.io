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
