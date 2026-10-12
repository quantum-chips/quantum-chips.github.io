import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RunPanel from "@/components/RunPanel";

describe("RunPanel", () => {
  it("shows the simulator's EM scan, not a stand-in picture", () => {
    render(<RunPanel />);
    expect(screen.getByRole("img", { name: /electromagnetic leakage/i })).toBeInTheDocument();
  });

  it("reports the run's verdict and says it is illustrative", () => {
    render(<RunPanel />);
    expect(screen.getAllByText(/key recovered/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/illustrative run/i)).toBeInTheDocument();
  });

  it("links through to the interactive test bench", () => {
    render(<RunPanel />);
    expect(screen.getByRole("link", { name: /run it yourself/i })).toHaveAttribute(
      "href",
      // next/link drops the trailing slash outside the Next build (trailingSlash is a build option).
      expect.stringMatching(/^\/demo\/?$/),
    );
  });
});
