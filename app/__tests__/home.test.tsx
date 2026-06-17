import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the hero headline and CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/break tomorrow's chips/i);
    expect(screen.getByRole("link", { name: /explore the test bench/i })).toBeInTheDocument();
  });
  it("renders the three test steps", () => {
    render(<Home />);
    expect(screen.getByText(/Acquire/)).toBeInTheDocument();
    expect(screen.getByText(/Verdict/)).toBeInTheDocument();
  });
});
