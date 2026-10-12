// Ineffective fault analysis on ML-KEM decapsulation, step by step. Adapted from
// Figure 6 of the Milestone 1 report.
const STEPS = [
  { title: "Send a valid ciphertext", body: "Use a valid ML-KEM ciphertext as the input." },
  { title: "Inject a fault during decoding", body: "Timed to hit one bit of the message being decoded." },
  { title: "Observe decapsulation", body: "Record whether decapsulation succeeds or fails." },
  { title: "Collect key constraints", body: "Each outcome constrains the private key. Repeated observations can enable key recovery." },
];

export default function IfaFigure() {
  return (
    <figure className="m-0" aria-labelledby="ifa-caption">
      <ol className="grid gap-px overflow-hidden rounded-lg border border-line-strong bg-line-strong sm:grid-cols-2">
        {STEPS.map((s, i) => (
          <li key={s.title} className="bg-panel p-4">
            <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-sm font-medium text-fg">{s.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-3 grid gap-1.5 rounded-lg border border-line bg-panel p-4 font-mono text-xs text-fg-muted">
        <p className="flex flex-wrap items-center gap-x-3">
          <span className="text-fg">d[i] &lt; 0</span>
          <span aria-hidden>→</span> the fault flips the bit <span aria-hidden>→</span>
          <span className="inline-flex items-center gap-1.5 text-fg">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-fg" /> failure
          </span>
        </p>
        <p className="flex flex-wrap items-center gap-x-3">
          <span className="text-fg">d[i] ≥ 0</span>
          <span aria-hidden>→</span> no visible effect <span aria-hidden>→</span>
          <span className="inline-flex items-center gap-1.5 text-fg">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full border border-fg" /> success
          </span>
        </p>
      </div>
      <figcaption id="ifa-caption" className="mt-3 text-[13px] leading-relaxed text-fg-subtle">
        Ineffective fault analysis on ML-KEM decapsulation. Success and failure reveal information about the
        private key without exposing the faulty value. Adapted from Figure 6 of the Milestone 1 report.
      </figcaption>
    </figure>
  );
}
