"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const W = 480;
  const H = 480;
  const step = 40;
  const lines = [];
  for (let x = 0; x <= W; x += step) lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} stroke="#FFFFFF" strokeOpacity={0.15} />);
  for (let y = 0; y <= H; y += step) lines.push(<line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} stroke="#FFFFFF" strokeOpacity={0.15} />);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-square w-full"
      role="img"
      aria-label="A mathematical lattice over a chip die with a side-channel heat sweep"
    >
      <defs>
        <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#180F3E" />
          <stop offset="55%" stopColor="#7B2382" />
          <stop offset="100%" stopColor="#F6A21E" />
        </linearGradient>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FCFFA4" stopOpacity="0" />
          <stop offset="50%" stopColor="#FCFFA4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FCFFA4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#die)" />
      {/* die crypto-core block */}
      <rect x={W * 0.58} y={H * 0.24} width={W * 0.26} height={H * 0.3} fill="#000" fillOpacity={0.2} stroke="#FCFFA4" strokeOpacity={0.4} />
      {/* lattice grid + nodes */}
      {lines}
      {/* heat sweep */}
      {reduce ? (
        <rect x={W * 0.3} width={W * 0.4} height={H} fill="url(#sweep)" />
      ) : (
        <motion.rect
          width={W * 0.4}
          height={H}
          fill="url(#sweep)"
          initial={{ x: -W * 0.4 }}
          animate={{ x: W }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
}
