"use client";
import { useEffect, useMemo, useRef } from "react";
import { generateCpaMatrix, type ChipId } from "@/lib/sidechannel-sim";
import { heatColor } from "@/lib/colorRamp";

export default function CpaMatrix({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const r = useMemo(() => generateCpaMatrix(chip, traceCount), [chip, traceCount]);
  const cw = 5;
  const ch = 6;
  const W = r.samples * cw;
  const H = r.hypotheses * ch;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    for (let h = 0; h < r.hypotheses; h++) {
      for (let s = 0; s < r.samples; s++) {
        ctx.fillStyle = heatColor(r.correlations[h * r.samples + s]);
        ctx.fillRect(s * cw, h * ch, cw, ch);
      }
    }
  }, [r]);

  return (
    <figure className="border border-hairline">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label={`CPA correlation heatmap for chip ${chip}: key-byte hypotheses by time sample`}
        className="block"
      />
      <figcaption className="border-t border-hairline bg-paper px-2 py-1 font-mono text-[10px] text-graphite">
        CPA · hypotheses × time · peak {r.peakCorrelation.toFixed(2)}
      </figcaption>
    </figure>
  );
}
