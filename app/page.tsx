import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import StatCard from "@/components/StatCard";
import StepFlow from "@/components/StepFlow";
import { HERO, PROBLEM_STATS } from "@/content/site";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="graph-paper absolute inset-0 opacity-40" aria-hidden />
        <Container className="relative grid gap-10 py-24 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow index={HERO.eyebrow.split(" · ")[0]}>{HERO.eyebrow.split(" · ")[1]}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{HERO.title}</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-graphite">{HERO.lede}</p>
            <Link
              href={HERO.cta.href}
              className="mt-8 inline-block border border-instrument px-5 py-3 font-mono text-sm text-instrument hover:bg-instrument hover:text-paper"
            >
              {HERO.cta.label} →
            </Link>
          </div>
          <div
            className="aspect-square w-full border border-hairline bg-gradient-to-br from-[#180F3E] via-[#7B2382] to-[#F6A21E]"
            aria-label="Lattice over a chip die with a side-channel heat sweep (placeholder for animated hero)"
            role="img"
          />
        </Container>
      </section>

      <Container className="py-20">
        <Eyebrow index="02">The problem</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PROBLEM_STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>

      <Container className="py-20">
        <Eyebrow index="03">How we test</Eyebrow>
        <div className="mt-6">
          <StepFlow />
        </div>
      </Container>
    </main>
  );
}
