import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Team from "@/app/team/page";

describe("Team page", () => {
  it("renders a card per team member", () => {
    render(<Team />);
    expect(screen.getByText(/Principal Investigator/i)).toBeInTheDocument();
    expect(screen.getByText(/EM & Computer Vision/i)).toBeInTheDocument();
  });
});
