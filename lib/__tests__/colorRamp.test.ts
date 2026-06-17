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
