import { TEST_STEPS } from "@/content/site";

export default function StepFlow() {
  return (
    <ol className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
      {TEST_STEPS.map((s) => (
        <li key={s.n} className="bg-surface p-8">
          <span className="font-mono text-xs tracking-[0.2em] text-uqpurple">{s.n}</span>
          <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-graphite">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
