import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Heatmap from "@/components/demo/Heatmap";

describe("Heatmap", () => {
  it("renders an accessible canvas and a CV confidence label for a leaking chip", () => {
    render(<Heatmap chip="A" traceCount={50000} />);
    expect(screen.getByRole("img", { name: /electromagnetic leakage/i })).toBeInTheDocument();
    expect(screen.getByText(/LEAK/i, { selector: "text" })).toBeInTheDocument();
    expect(screen.getByText(/[01]\.\d\d/)).toBeInTheDocument(); // confidence like 0.99 or 1.00
  });
  it("does not assert a leak for the masked chip", () => {
    render(<Heatmap chip="B" traceCount={1000000} />);
    expect(screen.queryByText(/LEAK/i, { selector: "text" })).not.toBeInTheDocument();
  });
  it("chip A below the recovery threshold shows no leak box", () => {
    render(<Heatmap chip="A" traceCount={1000} />);
    expect(screen.queryByText(/LEAK/i, { selector: "text" })).not.toBeInTheDocument();
  });
});
