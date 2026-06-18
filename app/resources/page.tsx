import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { MILESTONES, READING } from "@/content/resources";

export const metadata = { title: "Background & Resources" };

export default function Resources() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="06">Background & resources</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">Milestones &amp; reading</h1>

        <h2 className="mt-12 font-display text-2xl font-semibold">Field milestones</h2>
        <ol className="mt-6 border-l border-hairline">
          {MILESTONES.map((m) => (
            <li key={m.date} className="relative ml-6 pb-8">
              <span className="absolute -left-[1.65rem] top-1 h-2 w-2 rounded-full bg-instrument" aria-hidden />
              <div className="font-mono text-xs uppercase tracking-wide text-instrument">{m.date}</div>
              <p className="mt-1 text-lg leading-snug text-ink">{m.title}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 font-display text-2xl font-semibold">Selected reading</h2>
        <ul className="mt-6 grid gap-3">
          {READING.map((r) => (
            <li key={r.href} className="border border-hairline/70 bg-surface p-4 shadow-card transition-shadow duration-300 hover:shadow-none">
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-medium text-instrument underline-offset-4 hover:underline">
                {r.title}
              </a>
              <span className="ml-2 font-mono text-xs text-graphite">— {r.where}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl font-semibold">Contact</h2>
        <p className="mt-3 text-graphite">For collaboration or funding enquiries, replace this with a real address.</p>
      </Container>
    </main>
  );
}
