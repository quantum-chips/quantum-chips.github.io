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
    expect(screen.getByRole("heading", { name: /side channels/i })).toBeInTheDocument();
  });
});
