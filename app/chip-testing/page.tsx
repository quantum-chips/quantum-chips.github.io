import Hero from "@/components/Hero";
import Section from "@/components/Section";
import StatBand from "@/components/StatBand";
import StepFlow from "@/components/StepFlow";
import RunPanel from "@/components/RunPanel";
import Milestones from "@/components/Milestones";
import BenchFigure from "@/components/BenchFigure";
import ButtonLink from "@/components/ButtonLink";
import TextLink from "@/components/TextLink";
import { CHIP_HERO, PROBLEM_STATS } from "@/content/site";

export const metadata = { title: "Chip Security Testing" };

export default function ChipTesting() {
  return (
    <main>
      <Hero
        pill={CHIP_HERO.eyebrow}
        title={CHIP_HERO.title}
        lede={CHIP_HERO.lede}
        actions={
          <>
            <ButtonLink href={CHIP_HERO.cta.href}>
              {CHIP_HERO.cta.label} <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink href="/method/" variant="secondary">
              How it works
            </ButtonLink>
          </>
        }
      >
        <RunPanel />
      </Hero>

      <Section
        title="Built for the chip as it ships"
        intro="The target is a secure element sealed inside a USB-form-factor device, not a bare die or a development board. That is harder to measure, and closer to what an attacker actually gets."
      >
        <BenchFigure />
      </Section>

      <Section title="Why it needs testing">
        <StatBand stats={PROBLEM_STATS} />
        <div className="mt-6">
          <TextLink href="/problem/">The problem in full</TextLink>
        </div>
      </Section>

      {/* One line per stage from content/pipeline.ts; the full text lives on /method. */}
      <Section
        title="How we test"
        intro="Every attack in the threat model becomes a test case. Side-channel cases run through five stages; the two that normally need a specialist’s hand — aligning traces and deciding what to attack — are learned by neural networks."
      >
        <StepFlow />
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <TextLink href="/method/">Full methodology</TextLink>
          <TextLink href="/threat-model/">Threat model</TextLink>
        </div>
      </Section>

      <Section
        title="Progress"
        intro="Milestone 1 is delivered: the threat model and the evaluation framework every test is built from."
      >
        <Milestones />
      </Section>
    </main>
  );
}
