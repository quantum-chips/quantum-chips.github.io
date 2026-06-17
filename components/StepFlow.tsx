import { TEST_STEPS } from "@/content/site";

export default function StepFlow() {
  return (
    <ol className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
      {TEST_STEPS.map((s) => (
        <li key={s.n} className="bg-paper p-6">
          <span className="font-mono text-xs text-instrument">{s.n}</span>
          <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-graphite">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
