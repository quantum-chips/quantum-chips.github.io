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
              Testing methodology
            </ButtonLink>
          </>
        }
      >
        <RunPanel />
      </Hero>

      <Section
        title="Testing packaged devices"
        intro="The target is a secure element inside a USB-form-factor device. Testing through the device packaging introduces measurement constraints that are relevant to attacks on deployed hardware."
      >
        <BenchFigure />
      </Section>

      <Section title="The case for hardware testing">
        <StatBand stats={PROBLEM_STATS} />
        <div className="mt-6">
          <TextLink href="/problem/">Research background</TextLink>
        </div>
      </Section>

      {/* One line per stage from content/pipeline.ts; the full text lives on /method. */}
      <Section
        title="Testing approach"
        intro="The threat model defines the attacks to evaluate. The proposed side-channel workflow has five stages, with neural networks supporting trace alignment and leakage analysis."
      >
        <StepFlow />
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <TextLink href="/method/">Full methodology</TextLink>
          <TextLink href="/threat-model/">Threat model</TextLink>
        </div>
      </Section>

      <Section
        title="Progress"
        intro="Milestone 1 is complete, covering the threat model and evaluation framework. The next stage is to develop reproducible, automated test procedures."
      >
        <Milestones />
      </Section>
    </main>
  );
}
