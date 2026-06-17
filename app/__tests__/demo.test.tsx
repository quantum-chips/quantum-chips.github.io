import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Demo from "@/app/demo/page";

describe("Demo page", () => {
  it("shows the illustrative-simulation label", () => {
    render(<Demo />);
    expect(screen.getByText(/illustrative simulation/i)).toBeInTheDocument();
  });
  it("flips the verdict to secure when Chip B is selected", async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole("button", { name: /chip b/i }));
    expect(screen.getByText(/no exploitable leakage/i)).toBeInTheDocument();
  });
});
