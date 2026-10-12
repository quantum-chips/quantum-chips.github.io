// Why the masked chip holds: correlation for each key guess under first-order CPA,
// without and with masking. Adapted from Figure 4 of the Milestone 1 report; the
// bars are a fixed illustration, not measurements.
const GUESSES = 24;
const KEY = 15; // index of the correct guess

// Deterministic, irregular noise in [0, 1): the same bars on server and client, with
// no sawtooth that could read as a trend.
const noise = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const PANELS = [
  {
    title: "Without masking",
    body: "The correct key guess has a higher correlation with the power trace than the other guesses.",
    bars: Array.from({ length: GUESSES }, (_, i) => (i === KEY ? 0.94 : 0.08 + 0.2 * noise(i, 1))),
    result: "Key recovered",
    leak: true,
  },
  {
    title: "With masking",
    body: "Fresh randomness reduces the correlation between individual measurements and the secret.",
    bars: Array.from({ length: GUESSES }, (_, i) => 0.08 + 0.22 * noise(i, 2)),
    result: "No clear correlation peak",
    leak: false,
  },
];

export default function MaskingFigure() {
  return (
    <figure className="m-0" aria-labelledby="masking-caption">
      <div className="grid gap-3 md:grid-cols-2">
        {PANELS.map((p) => (
          <div key={p.title} className="rounded-lg border border-line bg-panel p-5">
            <h3 className="text-[15px] font-medium text-fg">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            <div aria-hidden className="mt-5 flex h-28 items-end gap-[3px] border-b border-line-strong">
              {p.bars.map((b, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-[2px] ${p.leak && i === KEY ? "bg-accent" : "bg-lift"}`}
                  style={{ height: `${Math.round(b * 100)}%` }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[11px] text-fg-subtle">
              <span>key guesses →</span>
              <span>correlation ↑</span>
            </div>
            <p className={`mt-4 flex items-center gap-2 text-sm font-medium ${p.leak ? "text-accent" : "text-fg"}`}>
              <span aria-hidden className={`h-2 w-2 rounded-full ${p.leak ? "bg-accent" : "border border-fg"}`} />
              {p.result}
            </p>
          </div>
        ))}
      </div>
      <figcaption id="masking-caption" className="mt-3 text-[13px] leading-relaxed text-fg-subtle">
        Masking against correlation power analysis: correlation for each key guess, illustrative. Adapted from
        Figure 4 of the Milestone 1 report.
      </figcaption>
    </figure>
  );
}
