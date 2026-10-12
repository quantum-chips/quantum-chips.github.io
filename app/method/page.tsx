import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import TextLink from "@/components/TextLink";
import { PIPELINE, demoAnchor } from "@/content/pipeline";
import { FLOW, METRICS, FEASIBILITY, CHECKLIST } from "@/content/framework";
import { THREATS, THREAT_SOURCE } from "@/content/threats";

export const metadata = { title: "Methodology" };

export default function Method() {
  return (
    <main>
      <PageHeader
        pill="Method"
        title="Every known attack becomes a test."
        lede="We turn the threat model into an attack-driven checklist: each side-channel or fault-injection attack on ML-KEM and ML-DSA becomes a test case with its own measurements and pass/fail criteria. No single security score."
      >
        <ol className="grid overflow-hidden rounded-lg border border-line-strong bg-panel md:grid-cols-5">
          {FLOW.map((f, i) => (
            <li key={f.title} className="relative border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-[15px] font-medium text-fg">{f.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </li>
          ))}
        </ol>
      </PageHeader>

      <Section
        id="pipeline"
        title="The side-channel measurement pipeline"
        intro="Side-channel test cases run through five stages, from raw traces to a verdict. The steps a specialist would normally tune by hand — aligning traces, choosing a leakage model, picking where to look — are learned by neural networks."
      >
        <ol className="divide-y divide-line border-y border-line">
          {PIPELINE.map((p) => (
            <li key={p.n} className="grid gap-3 py-7 md:grid-cols-[3rem_12rem_1fr] md:gap-8">
              <span className="font-mono text-xs text-fg-subtle">{p.n}</span>
              <div className="flex items-center gap-3 md:flex-col md:items-start">
                <h3 className="text-lg font-medium text-fg">{p.title}</h3>
                {p.learned && (
                  <span className="rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[11px] text-accent">learned</span>
                )}
              </div>
              <div>
                <p className="max-w-2xl leading-relaxed text-fg-muted">{p.body}</p>
                {demoAnchor(p.n) && (
                  <Link
                    href={`/demo/#${demoAnchor(p.n)}`}
                    className="mt-3 inline-block text-sm text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    See it in the test bench →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="metrics"
        title="What we measure"
        intro="Metrics follow the attack mechanism. Inducing a fault is not the same as exploiting it, and a countermeasure counts only if the same attack gets measurably harder."
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {METRICS.map((g) => (
            <div key={g.id} className="rounded-lg border border-line bg-panel p-6">
              <h3 className="text-base font-medium text-fg">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{g.intro}</p>
              <dl className="mt-5 divide-y divide-line border-t border-line">
                {g.items.map((m) => (
                  <div key={m.name} className="py-3">
                    <dt className="text-sm text-fg">{m.name}</dt>
                    <dd className="mt-0.5 text-[13px] leading-relaxed text-fg-subtle">{m.what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12">
          <div>
            <h3 className="text-base font-medium text-fg">What an attacker needs</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Two attacks with the same impact can need very different access. Each test also records how hard it
              was to mount.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {FEASIBILITY.map((f) => (
              <li key={f} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-fg-muted">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="checklist"
        title="The checklist"
        intro="Representative rows. Each one is a test: what is attacked, how success is measured, which countermeasure is checked, and what gets recorded."
      >
        <div className="overflow-x-auto rounded-lg border border-line-strong">
          <table aria-label="Attack-driven evaluation checklist" className="w-full min-w-[56rem] text-left text-sm">
            <thead className="border-b border-line bg-panel font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
              <tr>
                {["Attack", "Step", "Target", "Primary metrics", "Countermeasure", "Recorded result"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {CHECKLIST.map((c) => (
                <tr key={c.attack} className="align-top">
                  <td className="px-4 py-3.5 font-medium text-fg">{c.attack}</td>
                  <td className="px-4 py-3.5 text-fg-muted">{c.procedure}</td>
                  <td className="px-4 py-3.5 text-fg-muted">{c.target}</td>
                  <td className="px-4 py-3.5 text-fg-muted">{c.metrics}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-fg">{c.countermeasure}</td>
                  <td className="px-4 py-3.5 text-fg-muted">{c.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-fg-subtle">Framework and checklist from the {THREAT_SOURCE}.</p>
          <TextLink href="/threat-model/">All {THREATS.length} attack paths</TextLink>
        </div>
      </Section>
    </main>
  );
}
