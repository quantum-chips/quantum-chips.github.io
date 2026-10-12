// Project-level hero (home page = the umbrella project).
export const HERO = {
  // Kept short: a longer eyebrow wraps to two lines in the hero column.
  eyebrow: "UQ · QDSA Collaborative Research Grant",
  title: "Testing post-quantum cryptography for critical systems",
  lede:
    "A University of Queensland–led research project on the security of post-quantum cryptography in defence and other security-critical applications.",
  cta: { label: "Chip testing research", href: "/chip-testing/" },
};

// Submodule hero (the chip-testing module landing).
export const CHIP_HERO = {
  eyebrow: "Chip Security Testing",
  title: "Testing quantum-safe chips against physical attacks",
  lede:
    "We are developing automated side-channel and fault-injection tests for chips running post-quantum cryptography, using neural networks to analyse power and electromagnetic measurements.",
  cta: { label: "Try the test bench demo", href: "/demo/" },
};

// Plain-language case for non-experts. `close` is the project's own line and is set
// apart from the setup sentences.
export const PLAIN = {
  heading: "Why hardware security matters",
  lines: [
    "Encryption keeps your bank transfers, health records and government communications private.",
    "Future quantum computers could break widely used public-key cryptography, putting long-lived confidential data at risk.",
    "Post-quantum algorithms address that threat, but chips running them can still reveal secret keys through power consumption, electromagnetic emissions or timing.",
  ],
  close: "This project develops methods to detect and assess those weaknesses before deployment.",
};

export const BENEFICIARIES: string[] = [
  "Banking & finance",
  "Healthcare",
  "Government & defence",
  "Critical infrastructure",
];

export const PROBLEM_STATS: { value: string; label: string }[] = [
  { value: "51–70%", label: "Expert odds of a cryptographically relevant quantum computer within 15 years (Global Risk Institute, 2026)" },
  { value: "Harvest now", label: "Encrypted data captured today, decrypted after “Q-day”" },
  { value: "2035", label: "U.S. CNSA 2.0 deadline for full quantum-safe migration" },
];

export const IMPACT = {
  heading: "Research aims",
  lede: "The chip-testing work focuses on repeatable measurements, attack evaluation and a prototype for use with industry partners.",
  outcomes: [
    {
      title: "Automated testing",
      body: "Reduce manual work in trace alignment and leakage analysis so tests can be repeated as chip designs change.",
    },
    {
      title: "Measurable attack results",
      body: "Record whether an attack recovers a key, how many traces it needs and where leakage occurs. Compare results with and without countermeasures.",
    },
    {
      title: "Industry evaluation",
      body: "Work with SEMICON TREND to develop and evaluate a testing prototype for semiconductor applications.",
    },
  ],
  // trailingSlash is on in next.config.ts, so the fragment must follow the slash.
  cta: { label: "Contact the team", href: "/resources/#contact" },
};
