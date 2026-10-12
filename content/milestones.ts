// Project progress. Only Milestone 1 has a date; later stages are described as the
// Milestone 1 report's conclusion describes them, without invented dates.
export type Milestone = { id: string; title: string; status: "Delivered" | "Next" | "Later"; when?: string; body: string; href?: string };

export const MILESTONES: Milestone[] = [
  {
    id: "M1",
    title: "Threat model & evaluation framework",
    status: "Delivered",
    when: "September 2026",
    body: "Structured review of side-channel and fault-injection attacks on ML-KEM and ML-DSA: 33 attack paths classified, and an attack-driven evaluation checklist.",
    href: "/threat-model/",
  },
  {
    id: "Next",
    title: "Reproducible, automated test procedures",
    status: "Next",
    body: "Turn the checklist into reproducible test cases and increasingly automated security testing for industrial PQC hardware.",
  },
  {
    id: "Later",
    title: "Benchmarking & certification-oriented assessment",
    status: "Later",
    body: "Systematic benchmarking of PQC implementations and a certification-oriented assessment approach for industrial chips, supporting deployment and commercial testing.",
  },
];
