"use client";
import { useState } from "react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Heatmap from "@/components/demo/Heatmap";
import CpaMatrix from "@/components/demo/CpaMatrix";
import TraceViewer from "@/components/demo/TraceViewer";
import VerdictPanel from "@/components/demo/VerdictPanel";
import { computeVerdict, type ChipId } from "@/lib/sidechannel-sim";

// Slider position 0..100 -> trace count on a log scale up to 1e6.
function posToTraces(pos: number): number {
  if (pos <= 0) return 0;
  return Math.round(Math.pow(10, (pos / 100) * 6));
}

function Readout({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="bg-surface p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-graphite">{k}</div>
      <div className={`mt-1 font-mono text-sm ${accent ? "text-instrument" : "text-ink"}`}>{v}</div>
    </div>
  );
}

function Screen({
  label,
  meta,
  footer,
  children,
}: {
  label: string;
  meta?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-ink/15 bg-[#0C1116] shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-white/55">
        <span className="flex items-center gap-2">
          <span className="text-uqpurple">●</span>
          {label}
        </span>
        {meta && <span className="text-instrument">{meta}</span>}
      </div>
      <div className="p-4">{children}</div>
      {footer && (
        <div className="border-t border-white/10 px-3 py-2 font-mono text-[10px] text-white/45">{footer}</div>
      )}
    </div>
  );
}

export default function Demo() {
  const [chip, setChip] = useState<ChipId>("A");
  const [pos, setPos] = useState(57); // ~2,600 traces (just past recovery)
  const traceCount = posToTraces(pos);
  const verdict = computeVerdict(chip, traceCount);
  const showBox = chip === "A" && verdict.recovered;
  const status =
    verdict.status === "leak" ? "KEY RECOVERED" : verdict.status === "secure" ? "SECURE — HOLDING" : "ACQUIRING";

  return (
    <main>
      <Container className="py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Eyebrow index="03">Side-channel test bench</Eyebrow>
          <span className="border border-[#F6A21E] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#F6A21E]">
            ⚠ Illustrative simulation
          </span>
        </div>
        <h1 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
          See which chip leaks its key.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-graphite">
          Switch between an unprotected and a masked chip, then sweep the number of captured traces and
          watch the correlation attack converge.
        </p>

        <div className="mt-6 border-l-2 border-uqpurple bg-surface p-5 shadow-card">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-uqpurple">What you&apos;re seeing</div>
          <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-ink">
            Chip A has no protection; Chip B is hardened. Drag the slider to let an attacker &ldquo;listen&rdquo;
            to the chip for longer. The unprotected chip eventually gives up its secret key; the protected one
            never does. Our project automates this whole test, so a chip can be certified before it is trusted.
          </p>
        </div>

        {/* Control deck */}
        <div className="mt-8 grid gap-px overflow-hidden border border-hairline bg-hairline shadow-card md:grid-cols-2">
          <div className="bg-surface p-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-graphite">Chip under test</div>
            <div
              role="group"
              aria-label="Select chip under test"
              className="mt-2 inline-flex border border-hairline"
            >
              {(["A", "B"] as ChipId[]).map((c, i) => (
                <button
                  key={c}
                  onClick={() => setChip(c)}
                  aria-pressed={chip === c}
                  className={`px-4 py-2 font-mono text-sm transition-colors duration-200 ${
                    i > 0 ? "border-l border-hairline" : ""
                  } ${
                    chip === c
                      ? "bg-instrument text-paper"
                      : "text-graphite hover:text-ink"
                  }`}
                >
                  Chip {c} — {c === "A" ? "unprotected" : "masked"}
                </button>
              ))}
            </div>

            <label className="mt-6 block">
              <div className="flex items-baseline justify-between font-mono text-xs text-graphite">
                <span>Traces captured</span>
                <span className="text-base text-ink">{traceCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Traces captured"
                className="mt-2 w-full accent-instrument"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-graphite/70">
                <span>1</span>
                <span>1,000,000</span>
              </div>
            </label>
          </div>

          {/* Telemetry */}
          <div className="grid grid-cols-2 gap-px bg-hairline">
            <Readout k="Chip" v={`${chip} · ${chip === "A" ? "unprotected" : "masked"}`} />
            <Readout k="Traces" v={traceCount.toLocaleString()} />
            <Readout k="Status" v={status} accent />
            <Readout k="Confidence" v={verdict.confidence.toFixed(2)} />
          </div>
        </div>

        {/* Screens */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Screen
            label="EM spatial scan"
            meta="32 × 24 probe"
            footer={showBox ? "CV localisation · crypto core flagged" : "scanning · no hotspot"}
          >
            <Heatmap chip={chip} traceCount={traceCount} />
            <div className="mt-4">
              <div
                className="h-2 w-full"
                style={{ background: "linear-gradient(90deg,#180F3E,#7B2382,#D44842,#F6A21E,#FCFFA4)" }}
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/45">
                <span>low leakage</span>
                <span>key-bearing signal</span>
              </div>
            </div>
          </Screen>

          <Screen label="CPA correlation" meta="64 × 96" footer="key-byte hypotheses (y) × time samples (x)">
            <CpaMatrix chip={chip} traceCount={traceCount} />
          </Screen>
        </div>

        <div className="mt-6">
          <Screen label="Power / EM trace" meta="400 samples" footer="annotated cryptographic operations">
            <TraceViewer chip={chip} />
          </Screen>
        </div>

        {/* Verdict */}
        <div className="mt-6 max-w-xl">
          <VerdictPanel chip={chip} traceCount={traceCount} />
        </div>
      </Container>
    </main>
  );
}
