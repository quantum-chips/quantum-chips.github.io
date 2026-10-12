import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Problem from "@/app/problem/page";

describe("Problem page", () => {
  it("renders the harvest-now framing", () => {
    render(<Problem />);
    expect(screen.getByText(/harvest now, decrypt later/i)).toBeInTheDocument();
  });
  it("renders a heading about side channels", () => {
    render(<Problem />);
    expect(screen.getByRole("heading", { name: /side-channel attacks/i })).toBeInTheDocument();
  });
  it("covers fault injection as well as side channels", () => {
    render(<Problem />);
    expect(screen.getByRole("heading", { name: /fault/i })).toBeInTheDocument();
  });
  it("walks through ineffective fault analysis step by step", () => {
    render(<Problem />);
    const figure = screen.getByRole("figure", { name: /ineffective fault analysis/i });
    expect(figure).toHaveTextContent(/success/i);
    expect(figure).toHaveTextContent(/failure/i);
  });
});
