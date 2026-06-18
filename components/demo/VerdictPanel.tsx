import { computeVerdict, type ChipId } from "@/lib/sidechannel-sim";

export default function VerdictPanel({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const v = computeVerdict(chip, traceCount);

  let label: string;
  let tone: string;
  let bar: string;
  if (v.status === "leak") {
    label = `⛔ KEY RECOVERED in ~${v.tracesToRecover?.toLocaleString()} traces`;
    tone = "border-[#D44842] text-[#D44842]";
    bar = "bg-[#D44842]";
  } else if (v.status === "secure") {
    label = "✅ No exploitable leakage (> 1,000,000 traces)";
    tone = "border-instrument text-instrument";
    bar = "bg-instrument";
  } else {
    label = `… Acquiring — ${Math.round(v.confidence * 100)}% toward recovery`;
    tone = "border-graphite text-graphite";
    bar = "bg-graphite";
  }

  return (
    <div className={`border-2 ${tone} bg-surface p-5 font-mono`}>
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-graphite">
        <span>Verdict — Chip {chip}</span>
        <span>conf {v.confidence.toFixed(2)}</span>
      </div>
      <div className="mt-2 text-base leading-snug">{label}</div>
      <div className="mt-4 h-1.5 w-full overflow-hidden bg-hairline" aria-hidden>
        <div className={`h-full ${bar}`} style={{ width: `${Math.round(v.confidence * 100)}%` }} />
      </div>
    </div>
  );
}
