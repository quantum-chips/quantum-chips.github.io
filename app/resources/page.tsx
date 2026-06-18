import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { MILESTONES, HARDWARE, READING, DIRECTIONS, GLOSSARY } from "@/content/resources";

export const metadata = { title: "Related Work & Background" };

export default function Resources() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="06">Related work &amp; background</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
          The field this project builds on.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-graphite">
          Quantum-safe algorithms are standardised and the first chips that implement them are
          shipping. What is missing is a rigorous way to test that silicon for side-channel leakage.
          Below: how the field arrived here, the chips now in scope, and the literature we build on.
        </p>

        {/* Plain-language glossary */}
        <div className="mt-12 border-l-2 border-uqpurple bg-surface p-6 shadow-card md:p-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-uqpurple">Key terms</div>
          <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term}>
                <dt className="font-display text-sm font-semibold text-ink">{g.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-graphite">{g.def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Timeline */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">How the field got here</h2>
        <ol className="mt-6 border-l border-hairline">
          {MILESTONES.map((m) => (
            <li key={m.date} className="relative ml-6 pb-8">
              <span className="absolute -left-[1.65rem] top-1.5 h-2 w-2 rounded-full bg-uqpurple" aria-hidden />
              <div className="font-mono text-xs uppercase tracking-wide text-uqpurple">{m.date}</div>
              <p className="mt-1 max-w-2xl text-lg leading-snug text-ink">{m.title}</p>
            </li>
          ))}
        </ol>

        {/* Hardware in scope */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Quantum-safe chips in the wild</h2>
        <p className="mt-3 max-w-2xl text-graphite">The class of targets this project is built to evaluate.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {HARDWARE.map((h) => (
            <a
              key={h.name}
              href={h.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-hairline/70 bg-surface p-5 shadow-card transition-shadow duration-300 hover:shadow-none"
            >
              <div className="font-display text-base font-semibold tracking-tight text-ink group-hover:text-instrument">
                {h.name}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{h.what}</p>
            </a>
          ))}
        </div>

        {/* Reading, categorized */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Selected reading</h2>
        <div className="mt-6 grid gap-10">
          {READING.map((group) => (
            <section key={group.category}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-uqpurple">{group.category}</h3>
              <ul className="mt-4 grid gap-3">
                {group.items.map((r) => (
                  <li
                    key={r.href}
                    className="border border-hairline/70 bg-surface p-4 shadow-card transition-shadow duration-300 hover:shadow-none"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-instrument underline-offset-4 hover:underline"
                      >
                        {r.title}
                      </a>
                      <span className="font-mono text-xs text-graphite">— {r.where}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-graphite">{r.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Open directions */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Open directions</h2>
        <ul className="mt-6 grid gap-3">
          {DIRECTIONS.map((d) => (
            <li key={d} className="flex gap-3 text-graphite">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-uqpurple" />
              <span className="max-w-2xl leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>

        {/* Contact */}
        <h2 id="contact" className="mt-16 scroll-mt-24 font-display text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-3 text-graphite">
          For collaboration or funding enquiries, replace this with a real address.
        </p>
      </Container>
    </main>
  );
}
