import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { TEAM } from "@/content/team";

export default function Team() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="05">People</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">The team</h1>
        <p className="mt-4 max-w-2xl text-graphite">Roster placeholders — swap in real names, photos, and bios.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="flex gap-5 border border-hairline/70 bg-surface p-6 shadow-card">
              <div className="h-16 w-16 shrink-0 border border-hairline bg-gradient-to-br from-paper to-hairline/40" aria-hidden />
              <div>
                <h2 className="font-display text-lg font-semibold">{m.name}</h2>
                <p className="font-mono text-xs uppercase tracking-wide text-instrument">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
