import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import StatCard from "@/components/StatCard";
import StepFlow from "@/components/StepFlow";
import HeroVisual from "@/components/HeroVisual";
import { HERO, PLAIN, BENEFICIARIES, PROBLEM_STATS, IMPACT } from "@/content/site";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-hairline">
        <div
          className="graph-paper absolute inset-0 opacity-30 [mask-image:radial-gradient(120%_90%_at_70%_30%,#000,transparent)]"
          aria-hidden
        />
        <Container className="relative grid items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-36">
          <div>
            <Eyebrow index={HERO.eyebrow.split(" · ")[0]}>{HERO.eyebrow.split(" · ")[1]}</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-[1.04] tracking-tight md:text-6xl">
              {HERO.title}
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-graphite">{HERO.lede}</p>
            <Link
              href={HERO.cta.href}
              className="group mt-9 inline-flex items-center gap-2.5 border border-instrument px-6 py-3 font-mono text-sm text-instrument transition-colors duration-200 hover:bg-instrument hover:text-paper"
            >
              {HERO.cta.label}
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <figure className="m-0">
            <div className="border border-hairline bg-surface p-3 shadow-card">
              <HeroVisual />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
              <span>Fig.01 — lattice / EM sweep</span>
              <span className="flex items-center gap-1.5 text-instrument">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-instrument" />
                live
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <Container className="py-20">
        <div className="border-l-2 border-uqpurple bg-surface p-8 shadow-card md:p-10">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-uqpurple">{PLAIN.heading}</div>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-ink">{PLAIN.body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {BENEFICIARIES.map((b) => (
              <span key={b} className="border border-hairline bg-paper px-3 py-1 font-mono text-xs text-graphite">
                {b}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <Container className="py-24">
        <Eyebrow index="02">The problem</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {PROBLEM_STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>

      <Container className="py-24">
        <Eyebrow index="03">How we test</Eyebrow>
        <div className="mt-8">
          <StepFlow />
        </div>
      </Container>

      <section className="border-t border-hairline bg-surface">
        <Container className="py-24">
          <Eyebrow index="04">Impact &amp; outcomes</Eyebrow>
          <p className="mt-6 max-w-3xl text-pretty font-display text-2xl font-semibold leading-snug tracking-tight text-ink">
            {IMPACT.lede}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {IMPACT.outcomes.map((o) => (
              <div key={o.title} className="border border-hairline/70 bg-paper p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{o.body}</p>
              </div>
            ))}
          </div>
          <Link
            href={IMPACT.cta.href}
            className="group mt-10 inline-flex items-center gap-2.5 border border-instrument px-6 py-3 font-mono text-sm text-instrument transition-colors duration-200 hover:bg-instrument hover:text-paper"
          >
            {IMPACT.cta.label}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </section>
    </main>
  );
}
