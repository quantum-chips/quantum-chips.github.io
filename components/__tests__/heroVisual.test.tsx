import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroVisual from "@/components/HeroVisual";

describe("HeroVisual", () => {
  it("renders an accessible labelled visual", () => {
    render(<HeroVisual />);
    expect(screen.getByRole("img", { name: /lattice.*chip|chip.*lattice/i })).toBeInTheDocument();
  });
});
