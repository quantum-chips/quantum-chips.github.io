import { TEST_STEPS } from "@/content/site";

export default function StepFlow() {
  return (
    <ol className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
      {TEST_STEPS.map((s) => (
        <li key={s.n} className="bg-surface p-8">
          <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-graphite">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
