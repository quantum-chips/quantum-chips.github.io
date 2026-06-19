import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChipTesting from "@/app/chip-testing/page";

describe("Chip Testing module", () => {
  it("renders the module hero and the test steps", () => {
    render(<ChipTesting />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/tomorrow's chips/i);
    expect(screen.getByText(/Acquire/)).toBeInTheDocument();
    expect(screen.getByText(/Verdict/)).toBeInTheDocument();
  });
  it("links to the interactive test bench", () => {
    render(<ChipTesting />);
    const links = screen.getAllByRole("link", { name: /test bench/i });
    expect(links.length).toBeGreaterThan(0);
  });
});
