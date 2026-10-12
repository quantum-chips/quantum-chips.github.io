import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import StatBand from "@/components/StatBand";
import ThreatExplorer from "@/components/ThreatExplorer";
import TextLink from "@/components/TextLink";
import { THREATS, TRACE_MODELS, FINDINGS, THREAT_SOURCE } from "@/content/threats";

export const metadata = { title: "Threat Model" };

// Counts come from the transcribed tables, so the headline figures can't drift
// from the data underneath them.
const fia = THREATS.filter((t) => t.category === "FIA").length;
const procedures = new Set(THREATS.map((t) => `${t.algorithm} ${t.procedure.split(",")[0]}`)).size;

export default function ThreatModel() {
  return (
    <main>
      <PageHeader
        pill="Threat model · Milestone 1"
        title="Where quantum-safe chips break."
        lede="Our first milestone: a structured review of published side-channel and fault-injection attacks on ML-KEM and ML-DSA, classified by the step they target, what they need and what they get. It is the map every test case is drawn from."
      >
        <StatBand
          stats={[
            { value: String(THREATS.length), label: "attack paths classified across ML-KEM and ML-DSA" },
            { value: `${THREATS.length - fia} / ${fia}`, label: "side-channel / fault-injection paths" },
            { value: String(procedures), label: "procedures covered, from key generation to verification" },
          ]}
        />
      </PageHeader>

      <Section title="What the review found">
        <ol className="divide-y divide-line border-y border-line">
          {FINDINGS.map((f, i) => (
            <li key={f.title} className="grid gap-2 py-6 md:grid-cols-[3rem_minmax(0,18rem)_1fr] md:gap-8">
              <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-base font-medium text-fg">{f.title}</h3>
              <p className="leading-relaxed text-fg-muted">{f.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="attacks"
        title="Where the attacks land"
        intro={`ML-KEM and ML-DSA each run in three steps. Pick one to see its attacks; the table below lists all ${THREATS.length} paths, transcribed from the report. Side-channel attacks listen to the chip; fault-injection attacks disturb it.`}
      >
        <ThreatExplorer />
      </Section>

      <Section
        title="Does the secret repeat?"
        intro="Whether the same secret is processed again decides the attack model: a fresh key or nonce must be read from one trace, a reused key can be averaged over many."
      >
        <div className="overflow-x-auto rounded-lg border border-line-strong">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-line bg-panel font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
              <tr>
                <th scope="col" className="px-4 py-3 font-normal">Procedure</th>
                <th scope="col" className="px-4 py-3 font-normal">Secret</th>
                <th scope="col" className="px-4 py-3 font-normal">Reused?</th>
                <th scope="col" className="px-4 py-3 font-normal">Trace model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {TRACE_MODELS.map((m) => (
                <tr key={`${m.procedure}-${m.secret}`}>
                  <td className="px-4 py-3 text-fg">{m.procedure}</td>
                  <td className="px-4 py-3 text-fg-muted">{m.secret}</td>
                  <td className="px-4 py-3 text-fg-muted">{m.reused}</td>
                  <td className={`px-4 py-3 font-mono text-xs ${m.model.startsWith("Multi") ? "text-fg" : "text-fg-muted"}`}>
                    {m.model}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="From threat model to test">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
            Each path becomes a test case in an attack-driven checklist, measured with metrics that fit its
            mechanism — trace counts for side channels, detection and bypass rates for faults.
          </p>
          <TextLink href="/method/">How each attack becomes a test</TextLink>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-[13px] text-fg-subtle">Source: {THREAT_SOURCE}.</p>
      </Section>
    </main>
  );
}
