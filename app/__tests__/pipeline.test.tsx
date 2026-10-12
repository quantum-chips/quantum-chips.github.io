import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PIPELINE } from "@/content/pipeline";
import Method from "@/app/method/page";
import ChipTesting from "@/app/chip-testing/page";
import Demo from "@/app/demo/page";

// One pipeline, three views. The stage list used to be written out separately on
// each page and had drifted (3 steps on one, 5 on another, "Align & process" vs
// "Align"); every view now reads content/pipeline.ts.
describe("testing pipeline", () => {
  it("has the five stages in order", () => {
    expect(PIPELINE.map((s) => s.title)).toEqual(["Acquire", "Align", "Analyze", "Localize", "Verdict"]);
  });

  it.each([
    ["method", Method],
    ["chip-testing", ChipTesting],
    ["demo", Demo],
  ])("the %s page shows every stage", (_, Page) => {
    render(<Page />);
    for (const s of PIPELINE) {
      expect(screen.getAllByText(new RegExp(`^${s.title}$`, "i")).length).toBeGreaterThan(0);
    }
  });
});
