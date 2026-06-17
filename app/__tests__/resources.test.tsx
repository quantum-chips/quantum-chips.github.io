import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Resources from "@/app/resources/page";

describe("Resources page", () => {
  it("renders the NIST 2024 milestone", () => {
    render(<Resources />);
    expect(screen.getByText(/FIPS 203/)).toBeInTheDocument();
  });
  it("renders external reading links", () => {
    render(<Resources />);
    const link = screen.getByRole("link", { name: /finalized post-quantum encryption standards/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("nist.gov"));
  });
});
