import Link from "next/link";
import Heatmap from "@/components/demo/Heatmap";
import { PIPELINE } from "@/content/pipeline";
import { computeVerdict } from "@/lib/sidechannel-sim";

// Module product shot: one finished run of the test bench, rendered from the same
// simulator the /demo page drives — so the picture is the product, not a mock-up.
const CHIP = "A" as const;
const ALGO = "ML-KEM" as const;
const TRACES = 2630;

export default function RunPanel() {
  const v = computeVerdict(CHIP, TRACES, ALGO);
  const log = [
    { stage: "acquire", text: `${TRACES.toLocaleString("en-US")} traces · power + EM` },
    { stage: "align", text: "traces aligned" },
    { stage: "analyze", text: "leakage in key-dependent operations" },
    { stage: "localize", text: "hotspot over the crypto core" },
  ];

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-lg border border-line-strong bg-panel shadow-raised md:grid md:grid-cols-[220px_1fr]">
        <div className="border-b border-line p-3 md:border-b-0 md:border-r">
          <div className="px-2 pb-2 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            Run · Chip {CHIP} · {ALGO}
          </div>
          <ol className="grid gap-0.5 text-sm">
            {PIPELINE.map((s, i) => {
              const last = i === PIPELINE.length - 1;
              return (
                <li
                  key={s.n}
                  className={`flex items-center justify-between rounded-sm px-2 py-1.5 ${
                    last ? "bg-raised text-fg" : "text-fg-muted"
                  }`}
                >
                  <span>{s.title}</span>
                  <span className={`font-mono text-[11px] ${last ? "text-accent" : "text-fg-subtle"}`}>
                    {last ? "key recovered" : "done"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="grid gap-3 p-3 md:p-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-md border border-line bg-raised p-3">
            <div className="mb-2.5 flex justify-between font-mono text-[11px] text-fg-subtle">
              <span>EM scan · 32 × 24</span>
              <span>illustrative</span>
            </div>
            <Heatmap chip={CHIP} traceCount={TRACES} algo={ALGO} />
          </div>
          <div className="flex flex-col rounded-md border border-line bg-raised p-3">
            <div className="mb-2.5 flex justify-between font-mono text-[11px] text-fg-subtle">
              <span>Run log</span>
              <span>chip {CHIP}</span>
            </div>
            <ol className="grid gap-1.5 font-mono text-xs leading-relaxed">
              {log.map((l) => (
                <li key={l.stage} className="text-fg-muted">
                  <span className="text-fg">{l.stage}</span> {l.text}
                </li>
              ))}
            </ol>
            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-line bg-line lg:mt-auto">
              {[
                ["Verdict", "Key recovered"],
                ["Traces", `~${v.tracesToRecover?.toLocaleString("en-US")}`],
                ["Confidence", v.confidence.toFixed(2)],
              ].map(([k, val], i) => (
                <div key={k} className="bg-panel p-2.5">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{k}</dt>
                  <dd className={`mt-1 text-sm font-medium ${i === 0 ? "text-accent" : "text-fg"}`}>{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[13px] text-fg-subtle">
        <span>Illustrative run of the test bench: Chip {CHIP}, unprotected, {ALGO}.</span>
        <Link href="/demo/" className="text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline">
          Run it yourself →
        </Link>
      </figcaption>
    </figure>
  );
}
