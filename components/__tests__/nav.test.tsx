import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Nav from "@/components/Nav";

describe("Nav", () => {
  it("renders all primary links", () => {
    render(<Nav />);
    for (const label of ["Problem", "Demo", "Method", "Team", "Resources"]) {
      expect(screen.getByRole("link", { name: new RegExp(label, "i") })).toBeInTheDocument();
    }
  });
});
