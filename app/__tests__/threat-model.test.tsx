import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ThreatModel from "@/app/threat-model/page";
import { THREATS } from "@/content/threats";

describe("threat model data (Milestone 1 report, Tables 2 and 3)", () => {
  it("transcribes all 33 attack paths", () => {
    expect(THREATS).toHaveLength(33);
    expect(THREATS.filter((t) => t.algorithm === "ML-KEM")).toHaveLength(17);
    expect(THREATS.filter((t) => t.algorithm === "ML-DSA")).toHaveLength(16);
  });

  it("splits into side-channel and fault-injection paths", () => {
    expect(THREATS.filter((t) => t.category === "FIA")).toHaveLength(16);
    expect(THREATS.filter((t) => t.category !== "FIA")).toHaveLength(17);
  });
});

describe("Threat Model page", () => {
  const rows = () => within(screen.getByRole("table", { name: /attack paths/i })).getAllByRole("row");

  it("lists every attack path by default", () => {
    render(<ThreatModel />);
    expect(rows()).toHaveLength(1 + 33); // header + paths
  });

  it("filters by algorithm and attack class", async () => {
    const user = userEvent.setup();
    render(<ThreatModel />);
    await user.click(screen.getByRole("button", { name: "ML-DSA" }));
    await user.click(screen.getByRole("button", { name: "Fault injection" }));
    expect(rows()).toHaveLength(1 + 9);
    expect(screen.getByRole("button", { name: "ML-DSA" })).toHaveAttribute("aria-pressed", "true");
  });

  it("narrows the table to one step when it is picked in the attack-surface diagram", async () => {
    const user = userEvent.setup();
    render(<ThreatModel />);
    await user.click(screen.getByRole("button", { name: /ml-kem decapsulation/i }));
    expect(rows()).toHaveLength(1 + 10);
    await user.click(screen.getByRole("button", { name: /clear step/i }));
    expect(rows()).toHaveLength(1 + 33);
  });

  it("cites the Milestone 1 report as its source", () => {
    render(<ThreatModel />);
    expect(screen.getAllByText(/milestone 1 report/i).length).toBeGreaterThan(0);
  });
});
