import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StackVisual from "@/components/StackVisual";

describe("StackVisual", () => {
  it("renders an accessible labelled figure of the project stack", () => {
    render(<StackVisual />);
    expect(screen.getByRole("img", { name: /stack/i })).toBeInTheDocument();
  });

  it("names every layer, marking the silicon layer as this site's module", () => {
    render(<StackVisual />);
    for (const layer of ["Applications", "Protocols", "Algorithms", "Silicon"]) {
      expect(screen.getByText(layer)).toBeInTheDocument();
    }
    expect(screen.getByText(/this module/i)).toBeInTheDocument();
  });
});
