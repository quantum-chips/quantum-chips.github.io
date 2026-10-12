import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import TextLink from "@/components/TextLink";
import IfaFigure from "@/components/IfaFigure";
import { PROBLEM_SECTIONS } from "@/content/problem";

export const metadata = { title: "The Problem" };

export default function Problem() {
  return (
    <main>
      <PageHeader pill="The problem" title="Quantum computing breaks today’s cryptography. The fix has to reach the chip." />

      <Section bordered={false} flushTop>
        <ol className="divide-y divide-line border-y border-line">
          {PROBLEM_SECTIONS.map((s, i) => (
            <li key={s.heading} className="grid gap-3 py-10 md:grid-cols-[3rem_minmax(0,20rem)_1fr] md:gap-10">
              <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-xl font-medium leading-snug tracking-[-0.01em] text-fg">{s.heading}</h2>
              <div>
                <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">{s.body}</p>
                {s.figure === "ifa" && (
                  <div className="mt-8">
                    <IfaFigure />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <TextLink href="/threat-model/">Every known attack path</TextLink>
          <TextLink href="/method/">How we test for them</TextLink>
        </div>
      </Section>
    </main>
  );
}
