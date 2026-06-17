import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { PROBLEM_SECTIONS } from "@/content/problem";

export default function Problem() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="02">The problem</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Quantum computing breaks today&apos;s cryptography. The fix has to reach the chip.
        </h1>
        <div className="mt-12 grid gap-12">
          {PROBLEM_SECTIONS.map((s, i) => (
            <article key={s.heading} className="grid gap-3 border-t border-hairline pt-8 md:grid-cols-[8rem_1fr]">
              <span className="font-mono text-sm text-instrument">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
