"use client";
import { useEffect, useMemo, useRef } from "react";
import { generateEmHeatmap, computeVerdict, type ChipId } from "@/lib/sidechannel-sim";
import { heatColor } from "@/lib/colorRamp";

const CELL = 14; // px per grid cell

export default function Heatmap({ chip, traceCount }: { chip: ChipId; traceCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const map = useMemo(() => generateEmHeatmap(chip, traceCount), [chip, traceCount]);
  const verdict = useMemo(() => computeVerdict(chip, traceCount), [chip, traceCount]);
  const W = map.cols * CELL;
  const H = map.rows * CELL;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    for (let y = 0; y < map.rows; y++) {
      for (let x = 0; x < map.cols; x++) {
        ctx.fillStyle = heatColor(map.values[y * map.cols + x]);
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
  }, [map]);

  const core = map.cryptoCore;
  const showBox = chip === "A" && verdict.recovered;

  return (
    <figure className="relative inline-block border border-hairline">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label={`Electromagnetic leakage heatmap of chip ${chip}`}
        className="block"
      />
      {showBox && (
        <svg className="pointer-events-none absolute inset-0" width={W} height={H} aria-hidden>
          <rect
            x={core.x * CELL}
            y={core.y * CELL}
            width={core.w * CELL}
            height={core.h * CELL}
            fill="none"
            stroke="#FCFFA4"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          <text x={core.x * CELL} y={core.y * CELL - 4} fill="#FCFFA4" className="font-mono" fontSize="11">
            LEAK · crypto core · {verdict.confidence.toFixed(2)}
          </text>
        </svg>
      )}
      <figcaption className="border-t border-hairline bg-paper px-2 py-1 font-mono text-[10px] text-graphite">
        EM spatial leakage {showBox ? "· CV hotspot detected" : "· no hotspot"}
      </figcaption>
    </figure>
  );
}
