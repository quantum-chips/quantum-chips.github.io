import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Heatmap from "@/components/demo/Heatmap";

describe("Heatmap", () => {
  it("renders an accessible canvas and a CV confidence label for a leaking chip", () => {
    render(<Heatmap chip="A" traceCount={50000} />);
    expect(screen.getByRole("img", { name: /electromagnetic leakage/i })).toBeInTheDocument();
    expect(screen.getByText(/LEAK/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.\d\d/)).toBeInTheDocument(); // confidence like 0.99
  });
  it("does not assert a leak for the masked chip", () => {
    render(<Heatmap chip="B" traceCount={1000000} />);
    expect(screen.queryByText(/LEAK/i)).not.toBeInTheDocument();
  });
});
