import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { TEAM } from "@/content/team";

export default function Team() {
  return (
    <main>
      <Container className="py-20">
        <Eyebrow index="05">People</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold">The team</h1>
        <p className="mt-4 max-w-2xl text-graphite">Roster placeholders — swap in real names, photos, and bios.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="flex gap-4 border border-hairline p-6">
              <div className="h-16 w-16 shrink-0 border border-hairline bg-white/50" aria-hidden />
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
