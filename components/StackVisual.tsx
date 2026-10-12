import { heatColor } from "@/lib/colorRamp";

// Home-page product shot: where the chip-testing module sits in the project's
// stack. Three layers above are plain; the silicon layer — this site's module —
// carries a strip of the same leakage ramp the test bench uses.
const LAYERS = [
  { name: "Applications", sub: "Defence & critical systems" },
  { name: "Protocols", sub: "TLS · key exchange · signatures" },
  { name: "Algorithms", sub: "ML-KEM · ML-DSA (NIST PQC)" },
  { name: "Silicon", sub: "PQC hardware" },
];

// A fixed, hand-shaped leakage profile (no randomness, so server and client render
// the same markup): quiet on the left, a hotspot two-thirds of the way across.
const STRIP = Array.from({ length: 40 }, (_, i) => {
  const hot = Math.exp(-((i - 27) ** 2) / 18);
  const ripple = ((i * 37) % 11) / 60;
  return Math.min(1, 0.08 + ripple + 0.85 * hot);
});

export default function StackVisual() {
  return (
    <figure
      role="img"
      aria-label="Project stack: applications, protocols, algorithms and silicon. Chip security testing focuses on the silicon layer."
      className="m-0 overflow-hidden rounded-lg border border-line-strong bg-panel shadow-raised"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-fg-subtle">
        <span>Project stack</span>
        <span>4 layers</span>
      </div>
      <ol className="grid gap-2 p-3 md:p-4">
        {LAYERS.map((l, i) => {
          const silicon = i === LAYERS.length - 1;
          return (
            <li
              key={l.name}
              className={`grid items-center gap-x-6 gap-y-2 rounded-md border px-4 py-3.5 md:grid-cols-[180px_1fr_auto] ${
                silicon ? "border-accent/40 bg-raised" : "border-line bg-ground/40"
              }`}
            >
              <span className="text-[15px] font-medium text-fg">{l.name}</span>
              <span className="font-mono text-xs text-fg-muted">{l.sub}</span>
              {silicon ? (
                <span className="inline-flex items-center gap-2 justify-self-start font-mono text-xs text-accent md:justify-self-end">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Chip security testing
                </span>
              ) : (
                <span aria-hidden className="hidden md:block" />
              )}
              {silicon && (
                <div aria-hidden className="flex h-3 gap-px overflow-hidden rounded-[3px] md:col-span-3">
                  {STRIP.map((t, j) => (
                    <span key={j} className="flex-1" style={{ background: heatColor(t) }} />
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
