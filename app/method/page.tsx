import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const PIPELINE = [
  { n: "01", title: "Acquire", body: "An oscilloscope captures power draw and an EM probe captures emanations while the target chip performs key-dependent operations. Thousands to millions of traces are collected." },
  { n: "02", title: "Align & process", body: "Traces are aligned and filtered so the same operation lines up sample-for-sample across captures — a prerequisite for statistical analysis." },
  { n: "03", title: "Analyze", body: "Correlation Power Analysis (CPA) scores each key-byte hypothesis against the traces; a leakage-assessment (TVLA) test flags secret-dependent signals independent of any specific attack." },
  { n: "04", title: "Localize", body: "An EM probe scans an X/Y grid over the die to build a spatial leakage heatmap. We apply computer vision to the resulting maps to detect and bound the leaking regions — typically the cryptographic core — and attach a confidence score." },
  { n: "05", title: "Verdict", body: "We report whether a key can be recovered, how many traces it took, and where on the die the leakage originates — the basis for comparing a protected chip against an unprotected one." },
];

export default function Method() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="04">Methodology</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight">
          From raw traces to a security verdict.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Our pipeline turns physical measurements of a running chip into evidence about whether its
          secrets leak. Each stage is reproducible and instrument-agnostic.
        </p>
        <ol className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline">
          {PIPELINE.map((p) => (
            <li key={p.n} className="grid gap-3 bg-paper p-8 md:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-instrument">{p.n}</span>
              <div>
                <h2 className="font-display text-2xl font-semibold">{p.title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
