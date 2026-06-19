import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the project hero and module CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/security-critical/i);
    expect(screen.getByRole("link", { name: /explore the chip module/i })).toBeInTheDocument();
  });
  it("lists the chip-testing module", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /chip security testing/i })).toBeInTheDocument();
  });
});
