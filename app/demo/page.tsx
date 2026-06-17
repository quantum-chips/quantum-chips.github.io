"use client";
import { useState } from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Heatmap from "@/components/demo/Heatmap";
import CpaMatrix from "@/components/demo/CpaMatrix";
import TraceViewer from "@/components/demo/TraceViewer";
import VerdictPanel from "@/components/demo/VerdictPanel";
import type { ChipId } from "@/lib/sidechannel-sim";

// Slider position 0..100 -> trace count on a log scale up to 1e6.
function posToTraces(pos: number): number {
  if (pos <= 0) return 0;
  return Math.round(Math.pow(10, (pos / 100) * 6)); // 10^0 .. 10^6
}

export default function Demo() {
  const [chip, setChip] = useState<ChipId>("A");
  const [pos, setPos] = useState(57); // ~2,600 traces (just past recovery)
  const traceCount = posToTraces(pos);

  return (
    <main>
      <Container className="py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Eyebrow index="03">Side-channel test bench</Eyebrow>
          <span className="border border-[#F6A21E] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#F6A21E]">
            ⚠ Illustrative simulation
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold">Watch a key leak — or hold.</h1>

        {/* Controls */}
        <div className="mt-8 grid gap-6 border border-hairline p-6 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex gap-2" role="group" aria-label="Select chip under test">
            {(["A", "B"] as ChipId[]).map((c) => (
              <button
                key={c}
                onClick={() => setChip(c)}
                aria-pressed={chip === c}
                className={`border px-4 py-2 font-mono text-sm ${
                  chip === c ? "border-instrument bg-instrument text-paper" : "border-hairline text-graphite"
                }`}
              >
                Chip {c} — {c === "A" ? "unprotected" : "masked"}
              </button>
            ))}
          </div>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs text-graphite">
              Traces captured: {traceCount.toLocaleString()}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Traces captured"
              className="accent-instrument"
            />
          </label>
        </div>

        {/* Panels */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-graphite">EM spatial heatmap + CV</h2>
            <Heatmap chip={chip} traceCount={traceCount} />
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-graphite">CPA correlation</h2>
            <CpaMatrix chip={chip} traceCount={traceCount} />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-graphite">Power / EM trace</h2>
          <TraceViewer chip={chip} />
        </div>

        <div className="mt-6 max-w-md">
          <VerdictPanel chip={chip} traceCount={traceCount} />
        </div>
      </Container>
    </main>
  );
}
