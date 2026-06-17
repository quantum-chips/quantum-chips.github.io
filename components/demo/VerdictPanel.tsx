import { computeVerdict, type ChipId } from "@/lib/sidechannel-sim";

export default function VerdictPanel({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const v = computeVerdict(chip, traceCount);

  let label: string;
  let tone: string;
  if (v.status === "leak") {
    label = `⛔ KEY RECOVERED in ~${v.tracesToRecover?.toLocaleString()} traces`;
    tone = "border-[#D44842] text-[#D44842]";
  } else if (v.status === "secure") {
    label = "✅ No exploitable leakage (> 1,000,000 traces)";
    tone = "border-instrument text-instrument";
  } else {
    label = `… Acquiring — ${Math.round(v.confidence * 100)}% toward recovery`;
    tone = "border-graphite text-graphite";
  }

  return (
    <div className={`border-2 ${tone} p-4 font-mono text-sm`}>
      <div className="text-xs uppercase tracking-widest text-graphite">Verdict — Chip {chip}</div>
      <div className="mt-1 text-base">{label}</div>
    </div>
  );
}
