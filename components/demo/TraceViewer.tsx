"use client";
import { generatePowerTrace, type ChipId } from "@/lib/sidechannel-sim";

export default function TraceViewer({ chip }: { chip: ChipId }) {
  const t = generatePowerTrace(chip);
  const W = 720;
  const H = 120;
  const pts = t.samples
    .map((v, i) => `${(i / (t.samples.length - 1)) * W},${H / 2 - (v * H) / 2.2}`)
    .join(" ");

  return (
    <figure className="border border-hairline bg-paper">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Power/EM trace for chip ${chip}`}>
        <polyline points={pts} fill="none" stroke="#14171C" strokeWidth={1} />
        {t.annotations.map((a) => {
          const x = (a.sample / (t.samples.length - 1)) * W;
          return (
            <g key={a.sample}>
              <line x1={x} y1={0} x2={x} y2={H} stroke="#0E7C86" strokeWidth={0.5} strokeDasharray="2 2" />
              <text x={x + 2} y={12} fontSize="9" fill="#0E7C86" className="font-mono">{a.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="border-t border-hairline px-2 py-1 font-mono text-[10px] text-graphite">
        Power/EM trace · annotated operations
      </figcaption>
    </figure>
  );
}
