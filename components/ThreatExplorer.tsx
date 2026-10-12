"use client";
import { useState } from "react";
import Segmented from "./Segmented";
import AttackSurface, { type StepKey } from "./AttackSurface";
import { THREATS, stepOf, type Algorithm, type AttackClass } from "@/content/threats";

type AlgoFilter = "all" | Algorithm;
type ClassFilter = "all" | "sca" | "fia";

const CLASS_LABEL: Record<AttackClass, string> = {
  SCA: "Side-channel",
  "SCA-assisted CCA": "Side-channel + CCA",
  FIA: "Fault injection",
};

// Every attack path from the Milestone 1 review: the step diagram on top, the
// filterable table below, sharing one set of filters. A real table on desktop; on
// narrow screens each row stacks into a block.
export default function ThreatExplorer() {
  const [algo, setAlgo] = useState<AlgoFilter>("all");
  const [cls, setCls] = useState<ClassFilter>("all");
  const [step, setStep] = useState<StepKey>(null);

  // Picking a step narrows to its algorithm; clearing it undoes that too.
  const pickStep = (s: StepKey) => {
    setStep(s);
    setAlgo(s ? s.algorithm : "all");
  };
  // A step belongs to one algorithm; choosing another algorithm drops it.
  const pickAlgo = (v: AlgoFilter) => {
    setAlgo(v);
    if (step && v !== step.algorithm) setStep(null);
  };

  const rows = THREATS.filter(
    (t) =>
      (algo === "all" || t.algorithm === algo) &&
      (cls === "all" || (cls === "fia" ? t.category === "FIA" : t.category !== "FIA")) &&
      (!step || (t.algorithm === step.algorithm && stepOf(t) === step.step)),
  );

  return (
    <div>
      <AttackSurface selected={step} onSelect={pickStep} />

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Segmented
          label="Algorithm"
          value={algo}
          onChange={pickAlgo}
          options={[
            ["all", "Both algorithms"],
            ["ML-KEM", "ML-KEM"],
            ["ML-DSA", "ML-DSA"],
          ]}
        />
        <Segmented
          label="Attack class"
          value={cls}
          onChange={setCls}
          options={[
            ["all", "All attacks"],
            ["sca", "Side-channel"],
            ["fia", "Fault injection"],
          ]}
        />
        {step && (
          <button
            type="button"
            onClick={() => pickStep(null)}
            aria-label={`Clear step: ${step.algorithm} ${step.step}`}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-lift px-3 py-1.5 text-[13px] text-fg transition-colors duration-150 ease-out hover:bg-raised"
          >
            {step.algorithm} · {step.step}
            <span aria-hidden className="text-fg-subtle">×</span>
          </button>
        )}
        <p aria-live="polite" className="font-mono text-xs text-fg-subtle sm:ml-auto">
          {rows.length} of {THREATS.length} paths
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-line-strong">
        <table aria-label="Attack paths" className="w-full text-left text-sm">
          <thead className="border-b border-line bg-panel font-mono text-[11px] uppercase tracking-wider text-fg-subtle max-md:hidden">
            <tr>
              <th scope="col" className="px-4 py-3 font-normal">Step</th>
              <th scope="col" className="px-4 py-3 font-normal">Class</th>
              <th scope="col" className="px-4 py-3 font-normal">Attack</th>
              <th scope="col" className="px-4 py-3 font-normal">Target</th>
              <th scope="col" className="px-4 py-3 font-normal">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((t, i) => (
              <tr key={`${t.algorithm}-${t.procedure}-${t.attack}-${i}`} className="align-top max-md:block max-md:px-4 max-md:py-4">
                <td className="px-4 py-3.5 max-md:block max-md:p-0">
                  <span className="font-mono text-[11px] text-fg-subtle">{t.algorithm}</span>
                  <span className="block text-fg">{t.procedure}</span>
                </td>
                <td className="px-4 py-3.5 max-md:mt-2 max-md:block max-md:p-0">
                  <span className="inline-block whitespace-nowrap rounded-full border border-line-strong px-2 py-0.5 font-mono text-[11px] text-fg-muted">
                    {CLASS_LABEL[t.category]}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-medium text-fg max-md:mt-2 max-md:block max-md:p-0">{t.attack}</td>
                <td className="px-4 py-3.5 text-fg-muted max-md:mt-1 max-md:block max-md:p-0">{t.target}</td>
                <td className="px-4 py-3.5 text-fg-muted max-md:mt-1 max-md:block max-md:p-0">
                  {t.ineffective && (
                    <span className="mb-1 mr-2 inline-block rounded-full border border-line-strong px-2 py-0.5 font-mono text-[11px] text-fg-subtle">
                      ineffective
                    </span>
                  )}
                  {t.outcome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
