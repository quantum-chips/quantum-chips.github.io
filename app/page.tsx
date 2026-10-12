import Hero from "@/components/Hero";
import Section from "@/components/Section";
import StackVisual from "@/components/StackVisual";
import ButtonLink from "@/components/ButtonLink";
import TextLink from "@/components/TextLink";
import { HERO, PLAIN, BENEFICIARIES, IMPACT } from "@/content/site";
import { PROJECT } from "@/content/project";

export default function Home() {
  return (
    <main>
      <Hero
        pill={HERO.eyebrow}
        title={HERO.title}
        lede={HERO.lede}
        actions={
          <>
            <ButtonLink href={HERO.cta.href}>
              {HERO.cta.label} <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink href={IMPACT.cta.href} variant="secondary">
              {IMPACT.cta.label}
            </ButtonLink>
          </>
        }
      >
        <StackVisual />
      </Hero>

      <Section id="about" title={PROJECT.fullTitle} intro={PROJECT.mission}>
        {/* gap-px over a hairline-coloured ground draws the grid rules. */}
        <dl className="grid gap-px overflow-hidden rounded-lg border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT.facts.map((f) => (
            <div key={f.k} className="bg-ground p-5">
              <dt className="font-mono text-xs text-fg-subtle">{f.k}</dt>
              <dd className="mt-1.5 text-[15px] leading-snug text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fg-subtle">{PROJECT.funding}</p>
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed text-fg-muted">{PROJECT.moduleNote}</p>
          <TextLink href="/chip-testing/">Chip Security Testing</TextLink>
        </div>
      </Section>

      <Section title={PLAIN.heading}>
        <p className="max-w-3xl text-[clamp(1.25rem,2.4vw,1.625rem)] leading-snug tracking-[-0.01em] text-fg-subtle">
          {PLAIN.lines.join(" ")} <span className="text-fg">{PLAIN.close}</span>
        </p>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Who depends on it">
          {BENEFICIARIES.map((b) => (
            <li key={b} className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-fg-muted">
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Impact & outcomes" intro={IMPACT.lede}>
        <div className="grid gap-3 md:grid-cols-3">
          {IMPACT.outcomes.map((o) => (
            <div key={o.title} className="rounded-lg border border-line bg-panel p-6">
              <h3 className="text-base font-medium text-fg">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{o.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href={IMPACT.cta.href}>
            {IMPACT.cta.label} <span aria-hidden>→</span>
          </ButtonLink>
        </div>
      </Section>
    </main>
  );
}
