import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { MILESTONES, HARDWARE, READING, DIRECTIONS, GLOSSARY } from "@/content/resources";

export const metadata = { title: "Related Work & Background" };

export default function Resources() {
  return (
    <main>
      <PageHeader
        pill="Resources"
        title="Background and resources"
        lede="Key terms, research milestones, hardware examples and literature relevant to physical-attack testing of post-quantum hardware."
      />

      <Section title="Key terms" bordered={false} flushTop>
        <dl className="grid gap-px overflow-hidden rounded-lg border border-line-strong bg-line-strong sm:grid-cols-2">
          {GLOSSARY.map((g, i) => (
            // With an odd count the last term spans both columns, so no empty cell
            // shows the rule colour underneath.
            <div
              key={g.term}
              className={`bg-ground p-5 ${i === GLOSSARY.length - 1 && GLOSSARY.length % 2 ? "sm:col-span-2" : ""}`}
            >
              <dt className="text-[15px] font-medium text-fg">{g.term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{g.def}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Key milestones">
        <ol className="divide-y divide-line border-y border-line">
          {MILESTONES.map((m) => (
            <li key={m.date} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <span className="font-mono text-xs leading-6 text-fg-subtle">{m.date}</span>
              <p className="leading-relaxed text-fg">{m.title}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Post-quantum hardware" intro="Examples of the hardware this project aims to evaluate.">
        <div className="grid gap-3 md:grid-cols-3">
          {HARDWARE.map((h) => (
            <a
              key={h.name}
              href={h.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-line bg-panel p-5 transition-colors duration-150 ease-out hover:border-line-strong hover:bg-raised"
            >
              <div className="text-[15px] font-medium text-fg">
                {h.name}
                <span aria-hidden className="ml-1.5 text-fg-subtle transition-colors group-hover:text-fg">
                  ↗
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{h.what}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Selected reading">
        <div className="grid gap-12">
          {READING.map((group) => (
            <section key={group.category} className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
              <h3 className="text-sm font-medium text-fg-muted">{group.category}</h3>
              <ul className="divide-y divide-line border-y border-line">
                {group.items.map((r) => (
                  <li key={r.href} className="py-4">
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg underline-offset-4 transition-colors hover:underline"
                    >
                      {r.title}
                    </a>
                    <span className="ml-2 font-mono text-[11px] text-fg-subtle">{r.where}</span>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{r.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      <Section title="Research directions">
        <ol className="grid gap-3 md:grid-cols-3">
          {DIRECTIONS.map((d, i) => (
            <li key={d} className="rounded-lg border border-line p-5">
              <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" title="Contact">
        <div className="rounded-lg border border-line-strong bg-panel p-6 md:p-8">
          <p className="max-w-2xl text-lg leading-relaxed text-fg">
            For enquiries about hardware testing, the evaluation framework or research collaboration, contact
            the project team.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-muted">
            Contact information is available through the investigator profiles on the{" "}
            <Link href="/team/" className="text-fg underline underline-offset-4">
              team page
            </Link>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
