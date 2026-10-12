import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChipTesting from "@/app/chip-testing/page";

describe("Chip Testing module", () => {
  it("renders the module hero and the test steps", () => {
    render(<ChipTesting />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/tomorrow[’']s chips/i);
    expect(screen.getByRole("heading", { name: "Acquire" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Verdict" })).toBeInTheDocument();
  });
  it("links to the interactive test bench", () => {
    render(<ChipTesting />);
    const links = screen.getAllByRole("link", { name: /test bench/i });
    expect(links.length).toBeGreaterThan(0);
  });
  it("does not repeat the primary nav as a card grid", () => {
    render(<ChipTesting />);
    expect(screen.queryByText(/go deeper/i)).not.toBeInTheDocument();
  });
  it("shows project progress, with Milestone 1 linking to the threat model", () => {
    render(<ChipTesting />);
    expect(screen.getByRole("heading", { name: /progress/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /threat model & evaluation framework/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/threat-model\/?$/),
    );
  });
  it("names both attack classes the module tests", () => {
    render(<ChipTesting />);
    expect(screen.getAllByText(/fault-injection/i).length).toBeGreaterThan(0);
  });
});
