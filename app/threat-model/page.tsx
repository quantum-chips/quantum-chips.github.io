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
        title="Physical attacks on ML-KEM and ML-DSA"
        lede="The first project milestone reviews published side-channel and fault-injection attacks on ML-KEM and ML-DSA. Attacks are classified by the procedure targeted, attacker requirements and outcome. The review guides the evaluation checklist."
      >
        <StatBand
          stats={[
            { value: String(THREATS.length), label: "attack paths classified across ML-KEM and ML-DSA" },
            { value: `${THREATS.length - fia} / ${fia}`, label: "side-channel / fault-injection paths" },
            { value: String(procedures), label: "procedures covered, from key generation to verification" },
          ]}
        />
      </PageHeader>

      <Section title="Review findings">
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
        title="Attacks by procedure"
        intro={`ML-KEM and ML-DSA each have three procedures. Select a procedure to see the relevant attacks. The table lists ${THREATS.length} attack paths transcribed from the report, covering side-channel leakage and fault injection.`}
      >
        <ThreatExplorer />
      </Section>

      <Section
        title="Secret reuse and trace models"
        intro="The trace model depends on whether a secret is reused. Attacks on a fresh key or nonce must use a single trace; attacks on a reused key can combine multiple traces."
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

      <Section title="Test design">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
            The checklist assigns each attack path a test case and relevant metrics, including trace counts
            for side-channel attacks and detection and bypass rates for fault injection.
          </p>
          <TextLink href="/method/">Testing methodology</TextLink>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-[13px] text-fg-subtle">Source: {THREAT_SOURCE}.</p>
      </Section>
    </main>
  );
}
