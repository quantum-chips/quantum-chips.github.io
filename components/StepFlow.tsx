import { PIPELINE } from "@/content/pipeline";

// Compact view of the pipeline: one line per stage. The full text lives on /method.
export default function StepFlow() {
  return (
    <ol className="grid overflow-hidden rounded-lg border border-line-strong bg-panel md:grid-cols-5">
      {PIPELINE.map((s) => (
        <li key={s.n} className="border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
          <div className="flex h-6 items-center justify-between font-mono text-[11px] text-fg-subtle">
            <span>{s.n}</span>
            {/* The module's differentiator: the one thing in this strip that gets the accent. */}
            {s.learned && (
              <span className="rounded-full border border-accent/30 px-2 py-0.5 text-accent">learned</span>
            )}
          </div>
          <h3 className="mt-4 text-base font-medium text-fg">{s.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.short}</p>
        </li>
      ))}
    </ol>
  );
}
