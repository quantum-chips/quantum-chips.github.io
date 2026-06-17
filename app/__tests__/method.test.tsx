import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Method from "@/app/method/page";

describe("Method page", () => {
  it("explains the CV localization step", () => {
    render(<Method />);
    expect(screen.getByText(/computer vision/i)).toBeInTheDocument();
  });
  it("lists the pipeline stages", () => {
    render(<Method />);
    expect(screen.getByRole("heading", { name: /Localize/i })).toBeInTheDocument();
  });
});
