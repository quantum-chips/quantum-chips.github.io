"use client";
import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Segmented from "@/components/Segmented";
import Heatmap from "@/components/demo/Heatmap";
import CpaMatrix from "@/components/demo/CpaMatrix";
import TraceViewer from "@/components/demo/TraceViewer";
import VerdictPanel from "@/components/demo/VerdictPanel";
import MaskingFigure from "@/components/MaskingFigure";
import { computeVerdict, recoveryThreshold, type ChipId, type Algorithm } from "@/lib/sidechannel-sim";
import { HEAT_STOPS } from "@/lib/colorRamp";
import { PIPELINE, demoAnchor } from "@/content/pipeline";

// Slider position 0..100 -> trace count on a log scale up to 1e6.
function posToTraces(pos: number): number {
  if (pos <= 0) return 0;
  return Math.round(Math.pow(10, (pos / 100) * 6));
}

// Autoplay: sweep Chip A from 1 trace to a million (it gives up its key around
// 2,100), rest, then do the same for the masked Chip B (it never does), and loop.
const TICK_MS = 80;
const SWEEP = 100; // slider steps per sweep
const HOLD = 15; // ticks to rest on the end of each sweep
const PHASE = SWEEP + 1 + HOLD;

function frameAt(tick: number): { chip: ChipId; pos: number } {
  const t = tick % (2 * PHASE);
  return { chip: t < PHASE ? "A" : "B", pos: Math.min(t % PHASE, SWEEP) };
}

// Assume reduced motion until the browser says otherwise, so nothing moves before
// hydration — or at all, for visitors who asked for less motion.
function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const mq = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    setReduce(mq ? mq.matches : false);
    if (!mq) return;
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden>
      {playing ? (
        <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" />
      ) : (
        <path d="M2.5 1l6 4-6 4z" fill="currentColor" />
      )}
    </svg>
  );
}

// The shared pipeline, with the output panel on this page each stage jumps to.
const STAGES = PIPELINE.map((s) => ({ n: s.n, name: s.title, anchor: demoAnchor(s.n) }));

const CHIPS: { id: ChipId; note: string }[] = [
  { id: "A", note: "unprotected" },
  { id: "B", note: "masked" },
];

const LEGEND = `linear-gradient(90deg, ${HEAT_STOPS.map((c) => `rgb(${c.join(",")})`).join(", ")})`;

// One stage's output, as a screen inside the app window.
function Screen({
  stage,
  label,
  meta,
  footer,
  children,
}: {
  stage: string;
  label: string;
  meta?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div id={`stage-${stage}`} className="scroll-mt-24 overflow-hidden rounded-md border border-line bg-raised">
      <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[11px] text-fg-subtle">
        <span>{label}</span>
        {meta && <span>{meta}</span>}
      </div>
      <div className="p-3">{children}</div>
      {footer && <div className="border-t border-line px-3 py-2 font-mono text-[11px] text-fg-subtle">{footer}</div>}
    </div>
  );
}

function wordFor(status: "leak" | "secure" | "pending") {
  return status === "leak" ? "key recovered" : status === "secure" ? "key not recovered" : "below recovery threshold";
}

export default function Demo() {
  const [chip, setChip] = useState<ChipId>("A");
  const [algo, setAlgo] = useState<Algorithm>("ML-KEM");
  // Before autoplay starts (and with reduced motion) the page rests here: ~2,600
  // traces, just past recovery.
  const [pos, setPos] = useState(57);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const tick = useRef(0);
  const autoStarted = useRef(false);

  // Start once, as soon as we know motion is welcome; stop if that changes.
  useEffect(() => {
    if (reduceMotion) {
      setPlaying(false);
      return;
    }
    if (autoStarted.current) return;
    autoStarted.current = true;
    tick.current = 0;
    setChip("A");
    setPos(0);
    setPlaying(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      tick.current += 1;
      const f = frameAt(tick.current);
      setChip(f.chip);
      setPos(f.pos);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  // Resume from whatever is on screen.
  const togglePlay = () => {
    if (!playing) tick.current = (chip === "A" ? 0 : PHASE) + pos;
    setPlaying(!playing);
  };

  const traceCount = posToTraces(pos);
  const verdict = computeVerdict(chip, traceCount, algo);
  const showBox = chip === "A" && verdict.recovered;

  return (
    <main>
      <PageHeader
        pill="Test bench · illustrative simulation"
        title="Side-channel testing demo"
        lede="Compare simulated traces from an unprotected chip (A) and a masked chip (B). Select ML-KEM or ML-DSA and adjust the trace count to see how the modelled attack behaves. All traces and results are synthetic."
      />

      <Section bordered={false} flushTop>
        <div className="overflow-hidden rounded-lg border border-line-strong bg-panel shadow-raised">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 font-mono text-xs text-fg-subtle">
            <span className="flex items-center gap-2">
              {playing && <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />}
              Run · Chip {chip} · {algo}
            </span>
            <span className="flex items-center gap-3">
              <span className="hidden sm:inline">{traceCount.toLocaleString("en-US")} traces</span>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause demo" : "Play demo"}
                className="inline-flex items-center gap-1.5 rounded-sm border border-line-strong px-2 py-1 text-fg-muted transition-colors duration-150 ease-out hover:bg-raised hover:text-fg"
              >
                <PlayIcon playing={playing} />
                <span aria-hidden>{playing ? "Pause" : "Play"}</span>
              </button>
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[18rem_1fr]">
            {/* Controls + verdict */}
            <div className="space-y-6 border-b border-line p-5 lg:border-b-0 lg:border-r">
              <div>
                <div className="mb-2 font-mono text-[11px] text-fg-subtle">Algorithm</div>
                <Segmented
                  label="Select algorithm under test"
                  value={algo}
                  onChange={setAlgo}
                  options={[
                    ["ML-KEM", "ML-KEM"],
                    ["ML-DSA", "ML-DSA"],
                  ]}
                />
                <div className="mt-2 text-[13px] text-fg-subtle">
                  {algo === "ML-KEM" ? "Key encapsulation (Kyber)" : "Digital signatures (Dilithium)"}
                </div>
              </div>

              <div>
                <div className="mb-2 font-mono text-[11px] text-fg-subtle">Chip under test</div>
                <div role="group" aria-label="Select chip under test" className="grid gap-1">
                  {CHIPS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={chip === c.id}
                      onClick={() => {
                        setPlaying(false);
                        setChip(c.id);
                      }}
                      className={`flex items-center justify-between rounded-sm border px-3 py-2 text-sm transition-colors duration-150 ease-out ${
                        chip === c.id ? "border-line-strong bg-lift text-fg" : "border-transparent text-fg-muted hover:text-fg"
                      }`}
                    >
                      <span>Chip {c.id}</span>
                      <span className="font-mono text-[11px] text-fg-subtle">{c.note}</span>
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] text-fg-subtle">Traces captured</span>
                  <span className="font-mono text-base text-fg">{traceCount.toLocaleString("en-US")}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={pos}
                  onChange={(e) => {
                    setPlaying(false);
                    setPos(Number(e.target.value));
                  }}
                  aria-label="Traces captured"
                  className="mt-3 w-full accent-accent"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px] text-fg-subtle">
                  <span>1</span>
                  <span>1,000,000</span>
                </div>
              </label>

              <div id="stage-05" className="scroll-mt-24">
                <VerdictPanel chip={chip} traceCount={traceCount} algo={algo} />
              </div>
            </div>

            {/* Stage outputs, in pipeline order */}
            <div className="space-y-3 p-3 md:p-4">
              <ol aria-label="Testing pipeline" className="flex flex-wrap items-center gap-1.5">
                {STAGES.map((s, i) => {
                  const isVerdict = s.n === "05";
                  const tone =
                    isVerdict && verdict.status === "leak"
                      ? "border-accent/40 text-accent"
                      : "border-line-strong text-fg-muted";
                  const inner = (
                    <span className={`flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[13px] ${tone}`}>
                      <span>{s.name}</span>
                      {isVerdict && <span className="font-mono text-[11px]">{wordFor(verdict.status)}</span>}
                    </span>
                  );
                  return (
                    <li key={s.n} className="flex items-center">
                      {s.anchor ? (
                        <a href={`#${s.anchor}`} className="transition-opacity hover:opacity-80">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                      {i < STAGES.length - 1 && (
                        <span aria-hidden className="mx-1 hidden text-fg-subtle sm:inline">
                          →
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              <Screen stage="01" label="Acquire · power & EM trace" meta="400 samples" footer="raw capture, aligned & filtered">
                <TraceViewer chip={chip} algo={algo} />
              </Screen>

              <div className="grid gap-3 xl:grid-cols-2">
                <Screen
                  stage="03"
                  label="Analyze · CPA correlation"
                  meta="64 × 96"
                  footer="key-byte hypotheses (y) × time samples (x)"
                >
                  <CpaMatrix chip={chip} traceCount={traceCount} algo={algo} />
                </Screen>

                <Screen
                  stage="04"
                  label="Localize · EM spatial scan"
                  meta="32 × 24 probe"
                  footer={showBox ? "CV localisation · crypto core flagged" : "scanning · no hotspot"}
                >
                  <Heatmap chip={chip} traceCount={traceCount} algo={algo} />
                  <div className="mt-3">
                    <div className="h-1.5 w-full rounded-full" style={{ background: LEGEND }} />
                    <div className="mt-1 flex justify-between font-mono text-[11px] text-fg-subtle">
                      <span>low leakage</span>
                      <span>key-bearing signal</span>
                    </div>
                  </div>
                </Screen>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Masking and first-order leakage"
        intro="Masking uses random shares to reduce the dependence between individual measurements and a secret. Higher-order attacks can combine several trace samples, so the effect of masking is evaluated by repeating attacks with and without it."
      >
        <MaskingFigure />
      </Section>

      <Section
        title="ML-KEM and ML-DSA comparison"
        intro="Compare the two algorithms at the same trace count. The simulation assigns different leakage locations and recovery thresholds to illustrate how attack results can vary."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {(["ML-KEM", "ML-DSA"] as Algorithm[]).map((a) => {
            const v = computeVerdict(chip, traceCount, a);
            const tone = v.status === "leak" ? "text-accent" : v.status === "secure" ? "text-fg" : "text-fg-subtle";
            return (
              <div key={a} className="overflow-hidden rounded-lg border border-line bg-panel">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px] text-fg-subtle">
                  <span>
                    <span className="text-fg">{a}</span> · {a === "ML-KEM" ? "key exchange" : "signatures"}
                  </span>
                  {chip === "A" && <span>Recovery threshold · {recoveryThreshold(a).toLocaleString("en-US")} traces</span>}
                </div>
                <div className="p-4">
                  <Heatmap chip={chip} traceCount={traceCount} algo={a} />
                </div>
                <div className={`border-t border-line px-4 py-2.5 font-mono text-[11px] ${tone}`}>
                  {wordFor(v.status)} · simulated score {v.confidence.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
