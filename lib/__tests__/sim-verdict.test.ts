import { describe, it, expect } from "vitest";
import { computeVerdict, signalLevel, TRACES_TO_RECOVER_A } from "@/lib/sidechannel-sim";

describe("computeVerdict", () => {
  it("chip A is pending with few traces", () => {
    const v = computeVerdict("A", 100);
    expect(v.recovered).toBe(false);
    expect(v.status).toBe("pending");
  });
  it("chip A pending has null tracesToRecover", () => {
    expect(computeVerdict("A", 100).tracesToRecover).toBeNull();
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
