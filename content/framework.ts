// Attack-driven evaluation framework from the Milestone 1 report (Section VI).
// Each attack in content/threats.ts becomes a test case with metrics suited to its
// mechanism — no single generic security score.

export const FLOW: { title: string; body: string }[] = [
  { title: "Threat model", body: "An attack from the review: its target operation and the attacker capability it needs." },
  { title: "Test case", body: "A configuration: acquisition or fault parameters, metrics, expected countermeasure behaviour." },
  { title: "Measurement / fault injection", body: "Capture traces from the running chip, or disturb it at the targeted step." },
  { title: "Metric calculation", body: "The attack-specific measures: trace count, SNR, fault success, bypass rate…" },
  { title: "Assessment result", body: "Recovered or not, detected or not — recorded in the checklist row." },
];

export type MetricGroup = { id: string; title: string; intro: string; items: { name: string; what: string }[] };

export const METRICS: MetricGroup[] = [
  {
    id: "sca",
    title: "Side-channel",
    intro: "Leakage detectability and practical attack success. Profiled attacks (SASCA, templates) and non-profiled ones (CPA) are measured on their own terms.",
    items: [
      { name: "Trace count", what: "Traces needed to recover the targeted secret." },
      { name: "Signal-to-noise ratio", what: "Strength of exploitable leakage relative to measurement noise." },
      { name: "Leakage / correlation score", what: "Statistical strength of the link between predicted leakage and measured traces." },
      { name: "Key-recovery success rate", what: "Share of repeated experiments in which the secret is recovered." },
      { name: "Profiling requirement", what: "Whether a clone or controlled device is needed to train a leakage model." },
      { name: "Trace model", what: "Single-trace or multi-trace." },
    ],
  },
  {
    id: "fia",
    title: "Fault injection",
    intro: "Separates inducing a fault from exploiting it: a fault that lands but is caught, or never released, is not a break.",
    items: [
      { name: "Fault injection success rate", what: "Attempts in which the fault alters the intended computation or control flow." },
      { name: "Fault detection rate", what: "Successful faults caught by the countermeasure." },
      { name: "Faulty output release rate", what: "Faulty signatures, keys or outputs that reach the attacker." },
      { name: "Verification bypass rate", what: "Invalid or forged inputs accepted under fault injection." },
      { name: "Effective fault window", what: "The timing interval in which a fault has the intended effect." },
      { name: "Fault precision", what: "Spatial, instruction, coefficient or memory-bit precision required." },
    ],
  },
  {
    id: "countermeasures",
    title: "Countermeasures",
    intro: "A protection is judged by repeating the same attack before and after it is enabled — not by whether it is present.",
    items: [
      { name: "Masking", what: "Trace count, correlation and key-recovery rate, before vs after." },
      { name: "Shuffling", what: "Whether SASCA or template recovery survives randomised operation order." },
      { name: "Dynamic loop counter", what: "Whether skipped loops or comparisons are detected before output is released." },
      { name: "Verify after sign", what: "Whether faulty signatures are discarded instead of released." },
      { name: "NTT twiddle check", what: "Whether corrupted twiddle constants are detected." },
      { name: "Sanity checks", what: "Whether malformed ciphertexts and abnormal states are rejected." },
    ],
  },
];

// What an attacker needs in practice (report §6.5): two attacks with the same
// impact can need very different access and equipment.
export const FEASIBILITY: string[] = [
  "A profiling (clone) device or not",
  "Number of traces or fault attempts",
  "Timing precision for capture or injection",
  "Spatial or memory precision of the fault",
  "Physical access to the device and measurement points",
  "Known-input or chosen-input capability",
  "Whether the same long-term secret must be reused",
];

// Representative rows of the attack-driven checklist (report Table 9).
export const CHECKLIST: {
  attack: string;
  procedure: string;
  target: string;
  metrics: string;
  countermeasure: string;
  result: string;
}[] = [
  { attack: "SASCA_NTT", procedure: "Key generation / signing", target: "NTT over secret-dependent values", metrics: "Trace count; key-recovery success; profiling requirement", countermeasure: "Shuffling / masking", result: "Recovered or not; traces required" },
  { attack: "CPA", procedure: "Signing", target: "Point-wise ŝ₁ ∘ ĉ multiplication", metrics: "Correlation; trace count; key-recovery rate", countermeasure: "Masking", result: "Peak correlation; recovery result" },
  { attack: "Zero_Nonce_Detect", procedure: "Signing", target: "Sampling of y", metrics: "Signatures required; classifier success; key recovery", countermeasure: "Masking", result: "Detected zero positions; recovery result" },
  { attack: "Loop abort fault", procedure: "Signing", target: "Sampling loop of y", metrics: "Fault success; detection rate; faulty-output release", countermeasure: "Dynamic loop counter", result: "Detected or not; signature released or blocked" },
  { attack: "Skip addition", procedure: "Signing", target: "Addition of y into z", metrics: "Fault success; faulty-output release; key leakage", countermeasure: "Verify_Add", result: "Affected coefficients; release result" },
  { attack: "NTT twiddle fault", procedure: "Signing / verification", target: "NTT twiddle constants", metrics: "Fault detection; faulty-output or bypass rate", countermeasure: "NTT twiddle check", result: "Detected or not; security effect" },
  { attack: "Skip_C_Compare", procedure: "Verification", target: "Final c = c̄ comparison", metrics: "Verification-bypass rate", countermeasure: "Dynamic loop counter / redundancy", result: "Forged signature accepted or rejected" },
  { attack: "IFA / fault correction", procedure: "Decapsulation", target: "Message decoding / ciphertext memory", metrics: "Fault success; timing window; key-recovery constraints", countermeasure: "Shuffled decode / sanity check", result: "Success/failure pattern; recovery result" },
];
