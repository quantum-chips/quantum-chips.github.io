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
