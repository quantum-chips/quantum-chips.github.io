import { STEPS, THREATS, stepOf, type Algorithm } from "@/content/threats";

export type StepKey = { algorithm: Algorithm; step: string } | null;

const ROWS: { algorithm: Algorithm; role: string }[] = [
  { algorithm: "ML-KEM", role: "Key exchange" },
  { algorithm: "ML-DSA", role: "Signatures" },
];

// Where the attack paths land: each algorithm's three steps (report Figures 1–2),
// one square per path — filled for side-channel, outlined for fault injection — so
// the shape, not a colour, carries the class. Picking a step filters the table.
export default function AttackSurface({
  selected,
  onSelect,
}: {
  selected: StepKey;
  onSelect: (s: StepKey) => void;
}) {
  return (
    <div className="grid gap-5">
      {ROWS.map((r) => {
        const steps = STEPS.filter((s) => s.algorithm === r.algorithm);
        return (
          <div key={r.algorithm} className="grid gap-3 md:grid-cols-[8rem_1fr]">
            <div className="flex items-baseline gap-2 md:flex-col md:justify-center md:gap-0.5">
              <span className="text-[15px] font-medium text-fg">{r.algorithm}</span>
              <span className="font-mono text-[11px] text-fg-subtle">{r.role}</span>
            </div>
            <ol className="grid gap-2 md:grid-cols-3 md:gap-7">
              {steps.map((s, i) => {
                const paths = THREATS.filter((t) => t.algorithm === s.algorithm && stepOf(t) === s.step);
                const fia = paths.filter((t) => t.category === "FIA").length;
                const sca = paths.length - fia;
                const active = selected?.algorithm === s.algorithm && selected.step === s.step;
                return (
                  <li key={s.step} className="relative flex">
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-label={`${s.algorithm} ${s.step}: ${paths.length} attack paths`}
                      onClick={() => onSelect(active ? null : { algorithm: s.algorithm, step: s.step })}
                      className={`w-full rounded-md border p-4 text-left transition-colors duration-150 ease-out ${
                        active ? "border-line-strong bg-lift" : "border-line bg-panel hover:bg-raised"
                      }`}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-fg">{s.step}</span>
                        <span className="font-mono text-[11px] text-fg-subtle">{paths.length} paths</span>
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-fg-muted">{s.does}</span>
                      <span aria-hidden className="mt-3 flex flex-wrap gap-1">
                        {Array.from({ length: sca }, (_, k) => (
                          <span key={`s${k}`} className="h-2.5 w-2.5 rounded-[2px] bg-fg-muted" />
                        ))}
                        {Array.from({ length: fia }, (_, k) => (
                          <span key={`f${k}`} className="h-2.5 w-2.5 rounded-[2px] border border-fg-muted" />
                        ))}
                      </span>
                    </button>
                    {i < steps.length - 1 && (
                      <span aria-hidden className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-fg-subtle md:block">
                        →
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
      <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-fg-subtle md:pl-[8.75rem]">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-[2px] bg-fg-muted" /> side-channel path
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-[2px] border border-fg-muted" /> fault-injection path
        </span>
      </p>
    </div>
  );
}
