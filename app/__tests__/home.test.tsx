import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the project hero and module CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/post-quantum cryptography/i);
    expect(screen.getByRole("link", { name: /chip testing research/i })).toBeInTheDocument();
  });
  it("lists the chip-testing module", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /chip security testing/i })).toBeInTheDocument();
  });
  it("names the sectors that benefit only once", () => {
    render(<Home />);
    expect(screen.getAllByText(/healthcare/i)).toHaveLength(1);
  });
});
