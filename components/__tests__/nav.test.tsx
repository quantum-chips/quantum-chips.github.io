import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Nav from "@/components/Nav";

vi.mock("next/navigation", () => ({ usePathname: () => "/method/" }));

describe("Nav", () => {
  it("renders all primary links", () => {
    render(<Nav />);
    for (const label of ["Chip Testing", "Problem", "Threat Model", "Method", "Demo", "Team", "Resources"]) {
      expect(screen.getByRole("link", { name: new RegExp(label, "i") })).toBeInTheDocument();
    }
  });

  it("marks the current route with aria-current", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Method" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Team" })).not.toHaveAttribute("aria-current");
  });
});
