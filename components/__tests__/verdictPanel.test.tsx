import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VerdictPanel from "@/components/demo/VerdictPanel";

describe("VerdictPanel", () => {
  it("shows KEY RECOVERED for chip A past the threshold", () => {
    render(<VerdictPanel chip="A" traceCount={5000} />);
    expect(screen.getByText(/key recovered/i)).toBeInTheDocument();
  });
  it("shows pending for chip A below the threshold", () => {
    render(<VerdictPanel chip="A" traceCount={200} />);
    expect(screen.getByText(/acquiring/i)).toBeInTheDocument();
  });
  it("shows no exploitable leakage for chip B", () => {
    render(<VerdictPanel chip="B" traceCount={1000000} />);
    expect(screen.getByText(/no exploitable leakage/i)).toBeInTheDocument();
  });
});
