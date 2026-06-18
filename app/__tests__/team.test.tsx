import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Team from "@/app/team/page";

describe("Team page", () => {
  it("renders the project leads", () => {
    render(<Team />);
    expect(screen.getByRole("heading", { name: /Naipeng Dong/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Ryan Ko/i })).toBeInTheDocument();
  });

  it("renders the industry partner organisation", () => {
    render(<Team />);
    expect(screen.getAllByText(/SEMICON TREND PTY LTD/i).length).toBeGreaterThan(0);
  });

  it("links members with a public profile to that profile", () => {
    render(<Team />);
    const link = screen.getAllByRole("link", { name: /profile/i })[0];
    expect(link).toHaveAttribute("href", expect.stringContaining("cyber.uq.edu.au"));
  });
});
