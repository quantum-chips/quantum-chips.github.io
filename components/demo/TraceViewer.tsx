"use client";
import { generatePowerTrace, type ChipId, type Algorithm } from "@/lib/sidechannel-sim";

export default function TraceViewer({ chip, algo = "ML-KEM" }: { chip: ChipId; algo?: Algorithm }) {
  const t = generatePowerTrace(chip, undefined, algo);
  const W = 720;
  const H = 130;
  const pts = t.samples
    .map((v, i) => `${(i / (t.samples.length - 1)) * W},${H / 2 - (v * H) / 2.2}`)
    .join(" ");

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Power/EM trace for chip ${chip}`}
      className="block"
    >
      {/* faint scope grid */}
      <g stroke="#FFFFFF" strokeOpacity="0.06">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={(i * W) / 8} y1={0} x2={(i * W) / 8} y2={H} />
        ))}
      </g>
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#FFFFFF" strokeOpacity="0.12" />
      <polyline points={pts} fill="none" stroke="#0E7C86" strokeWidth={1.3} />
      {t.annotations.map((a) => {
        const x = (a.sample / (t.samples.length - 1)) * W;
        return (
          <g key={a.sample}>
            <line x1={x} y1={0} x2={x} y2={H} stroke="#FCFFA4" strokeOpacity={0.35} strokeDasharray="2 3" />
            <text x={x + 3} y={13} fontSize="9" fill="#FCFFA4" className="font-mono">
              {a.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
