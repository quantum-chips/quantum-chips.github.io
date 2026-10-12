import { computeVerdict, type ChipId, type Algorithm } from "@/lib/sidechannel-sim";

// The run's verdict. State is carried by an indicator dot and the wording, never
// by colour alone: accent = key recovered, hollow ring = holding, pulse = still acquiring.
export default function VerdictPanel({
  chip,
  traceCount,
  algo = "ML-KEM",
}: {
  chip: ChipId;
  traceCount: number;
  algo?: Algorithm;
}) {
  const v = computeVerdict(chip, traceCount, algo);

  let label: string;
  let tone: string;
  let dot: string;
  let bar: string;
  if (v.status === "leak") {
    label = `Key recovered in ~${v.tracesToRecover?.toLocaleString("en-US")} traces`;
    tone = "text-accent";
    dot = "bg-accent";
    bar = "bg-accent";
  } else if (v.status === "secure") {
    label = "No exploitable leakage (> 1,000,000 traces)";
    tone = "text-fg";
    dot = "border border-fg";
    bar = "bg-fg-muted";
  } else {
    label = `Acquiring — ${Math.round(v.confidence * 100)}% toward recovery`;
    tone = "text-fg-muted";
    dot = "animate-pulse bg-fg-muted";
    bar = "bg-fg-muted";
  }

  return (
    <div className="rounded-md border border-line bg-raised p-4">
      <div className="flex items-center justify-between font-mono text-[11px] text-fg-subtle">
        <span>Verdict · Chip {chip}</span>
        <span>conf {v.confidence.toFixed(2)}</span>
      </div>
      <p className={`mt-2.5 flex items-start gap-2 text-[15px] font-medium leading-snug ${tone}`}>
        <span aria-hidden className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${dot}`} />
        {label}
      </p>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-lift" aria-hidden>
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.round(v.confidence * 100)}%` }} />
      </div>
    </div>
  );
}
