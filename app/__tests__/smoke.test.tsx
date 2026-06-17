import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the project name", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /break tomorrow's chips/i })).toBeInTheDocument();
  });
});
