"use client";
import { useEffect, useMemo, useRef } from "react";
import { generateEmHeatmap, computeVerdict, type ChipId, type Algorithm } from "@/lib/sidechannel-sim";
import { heatColor } from "@/lib/colorRamp";

const CELL = 14; // px per grid cell (intrinsic resolution)

export default function Heatmap({
  chip,
  traceCount,
  algo = "ML-KEM",
}: {
  chip: ChipId;
  traceCount: number;
  algo?: Algorithm;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const map = useMemo(() => generateEmHeatmap(chip, traceCount, undefined, algo), [chip, traceCount, algo]);
  const verdict = useMemo(() => computeVerdict(chip, traceCount, algo), [chip, traceCount, algo]);
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
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label={`Electromagnetic leakage heatmap of chip ${chip}`}
        className="block h-auto w-full"
      />
      {showBox && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden
        >
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
    </div>
  );
}
