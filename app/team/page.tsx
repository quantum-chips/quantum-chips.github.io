import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { TEAM } from "@/content/team";

export const metadata = { title: "Team" };

export default function Team() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="05">People</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">The team</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-graphite">
          The project is led from the University of Queensland&apos;s Cyber Research Centre, in
          partnership with SEMICON TREND PTY LTD.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="flex gap-5 border border-hairline/70 bg-surface p-6 shadow-card">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  width={76}
                  height={76}
                  loading="lazy"
                  className="h-[76px] w-[76px] shrink-0 border border-hairline object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-[76px] w-[76px] shrink-0 items-center justify-center border border-hairline bg-gradient-to-br from-paper to-hairline/50 font-display text-lg font-bold tracking-tight text-graphite"
                >
                  {m.initials}
                </div>
              )}
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold tracking-tight">{m.name}</h2>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-instrument">{m.role}</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-graphite">{m.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{m.bio}</p>
                {m.profileUrl && (
                  <a
                    href={m.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-mono text-xs text-instrument underline-offset-4 hover:underline"
                  >
                    Profile →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
