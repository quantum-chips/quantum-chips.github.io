import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import Demo from "@/app/demo/page";

const slider = () => screen.getByRole("slider", { name: /traces captured/i }) as HTMLInputElement;

describe("Demo page", () => {
  it("shows the illustrative-simulation label", () => {
    render(<Demo />);
    expect(screen.getByText(/illustrative simulation/i)).toBeInTheDocument();
  });
  it("explains why the masked chip holds", () => {
    render(<Demo />);
    expect(screen.getByRole("figure", { name: /masking/i })).toBeInTheDocument();
  });
  it("flips the verdict to secure when Chip B is selected", async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole("button", { name: /chip b/i }));
    expect(screen.getByText(/no exploitable leakage/i)).toBeInTheDocument();
  });
});

describe("Demo autoplay", () => {
  afterEach(() => {
    vi.useRealTimers();
    // jsdom has no matchMedia; remove any stub a test installed.
    delete (window as { matchMedia?: unknown }).matchMedia;
  });

  it("plays on its own: the trace count advances with no input", () => {
    vi.useFakeTimers();
    render(<Demo />);
    const start = slider().value;
    act(() => vi.advanceTimersByTime(2000));
    expect(slider().value).not.toBe(start);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  it("goes on to show the masked chip holding", () => {
    vi.useFakeTimers();
    render(<Demo />);
    act(() => vi.advanceTimersByTime(12_000)); // past chip A's sweep
    expect(screen.getByRole("button", { name: /chip b/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("hands control to the visitor as soon as they move the slider", () => {
    vi.useFakeTimers();
    render(<Demo />);
    fireEvent.change(slider(), { target: { value: "30" } });
    act(() => vi.advanceTimersByTime(2000));
    expect(slider().value).toBe("30");
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("stays still when the visitor prefers reduced motion", () => {
    vi.useFakeTimers();
    window.matchMedia = ((query: string) => ({
      matches: query.includes("reduce"),
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
    render(<Demo />);
    const start = slider().value;
    act(() => vi.advanceTimersByTime(2000));
    expect(slider().value).toBe(start);
  });
});
