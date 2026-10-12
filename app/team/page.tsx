import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { TEAM } from "@/content/team";
import { BASE_PATH } from "@/lib/site";

export const metadata = { title: "Team" };

export default function Team() {
  return (
    <main>
      <PageHeader
        title="Project team"
        lede={
          <>
            Researchers and staff from the University of Queensland&apos;s Cyber Research Centre and industry
            partner SEMICON TREND, working on the QDSA-funded &ldquo;Transitioning to Quantum-Safe&rdquo; project.
          </>
        }
      />

      <Section bordered={false} flushTop>
        <div className="grid gap-x-12 md:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="flex gap-4 border-t border-line-strong py-7 sm:gap-5">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${BASE_PATH}${m.photo}`}
                  alt={`Portrait of ${m.name}`}
                  width={88}
                  height={88}
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-md object-cover sm:h-[88px] sm:w-[88px]"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-line-strong bg-panel text-base font-medium text-fg-muted sm:h-[88px] sm:w-[88px]"
                >
                  {m.initials}
                </div>
              )}
              <div className="min-w-0">
                <h2 className="text-lg font-medium text-fg">{m.name}</h2>
                <p className="mt-0.5 text-sm text-fg-muted">{m.role}</p>
                <p className="mt-1 text-xs leading-relaxed text-fg-subtle">{m.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{m.bio}</p>
                {m.profileUrl && (
                  <a
                    href={m.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    View profile <span aria-hidden>↗</span>
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
