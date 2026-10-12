import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Method from "@/app/method/page";

describe("Method page", () => {
  it("explains the CV localization step", () => {
    render(<Method />);
    expect(screen.getByText(/computer vision/i)).toBeInTheDocument();
  });
  it("lists the pipeline stages", () => {
    render(<Method />);
    expect(screen.getByRole("heading", { name: /Localize/i })).toBeInTheDocument();
  });
  it("lays out the attack-driven evaluation framework from Milestone 1", () => {
    render(<Method />);
    for (const step of ["Threat model", "Test case", "Metric calculation", "Assessment result"]) {
      expect(screen.getAllByText(step).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("table", { name: /checklist/i })).toBeInTheDocument();
  });
  it("measures side channels, faults and countermeasures separately", () => {
    render(<Method />);
    for (const group of ["Side-channel", "Fault injection", "Countermeasures"]) {
      expect(screen.getByRole("heading", { name: group })).toBeInTheDocument();
    }
  });
  it("describes the AI-assisted analysis, not only classical CPA/TVLA", () => {
    render(<Method />);
    expect(screen.getAllByText(/neural network/i).length).toBeGreaterThan(0);
  });
});
