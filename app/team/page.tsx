import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { TEAM } from "@/content/team";
import { BASE_PATH } from "@/lib/site";

export const metadata = { title: "Team" };

export default function Team() {
  return (
    <main>
      <PageHeader
        pill="Team"
        title="The people behind it."
        lede={
          <>
            The chip-testing module is led from the University of Queensland&apos;s Cyber Research Centre, with
            industry partner SEMICON TREND — part of the QDSA-funded &ldquo;Transitioning to Quantum-Safe&rdquo;
            project.
          </>
        }
      />

      <Section bordered={false} flushTop>
        <div className="grid gap-3 md:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="flex gap-5 rounded-lg border border-line bg-panel p-6">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${BASE_PATH}${m.photo}`}
                  alt={`Portrait of ${m.name}`}
                  width={72}
                  height={72}
                  loading="lazy"
                  className="h-[72px] w-[72px] shrink-0 rounded-md object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-md border border-line-strong bg-raised text-base font-medium text-fg-muted"
                >
                  {m.initials}
                </div>
              )}
              <div className="min-w-0">
                <h2 className="text-base font-medium text-fg">{m.name}</h2>
                <p className="mt-0.5 text-sm text-fg-muted">{m.role}</p>
                <p className="font-mono text-[11px] text-fg-subtle">{m.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{m.bio}</p>
                {m.profileUrl && (
                  <a
                    href={m.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    Profile →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
