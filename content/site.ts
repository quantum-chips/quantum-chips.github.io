// Project-level hero (home page = the umbrella project).
export const HERO = {
  // Kept short: a longer eyebrow wraps to two lines in the hero column.
  eyebrow: "A QDSA defence research project",
  title: "Security-critical systems are going quantum-safe. We make sure they actually are.",
  lede:
    "A University of Queensland–led project under the Queensland Defence Science Alliance, accelerating the transition to post-quantum cryptography for security-critical and defence applications.",
  cta: { label: "Explore the chip module", href: "/chip-testing/" },
};

// Submodule hero (the chip-testing module landing).
export const CHIP_HERO = {
  eyebrow: "Module · Chip Security Testing",
  title: "We break tomorrow’s chips before tomorrow does.",
  lede:
    "This module tests new-generation quantum-safe chips against side-channel and fault-injection attacks, with neural networks reading the measurements — finding the weaknesses an attacker would, today.",
  cta: { label: "Open the test bench", href: "/demo/" },
};

// Plain-language case for non-experts. `close` is the project's own line and is set
// apart from the setup sentences.
export const PLAIN = {
  heading: "Why it matters",
  lines: [
    "Encryption keeps your bank transfers, health records and government communications private.",
    "A powerful quantum computer could one day break the encryption we use today — and attackers are already storing scrambled data now to unscramble it later.",
    "The fix is a new generation of “quantum-safe” chips. But even with unbreakable maths, a chip can quietly leak its secret keys through tiny physical signals such as its power use.",
  ],
  close: "We find those leaks automatically, so flawed chips never reach the systems people depend on.",
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
  heading: "Impact & outcomes",
  lede: "If quantum-safe chips ship with hidden side-channel leaks, the move to post-quantum security fails quietly: the maths is sound, but the secrets still escape. This project makes that failure visible and fixable, automatically.",
  outcomes: [
    {
      title: "Faster, repeatable assurance",
      body: "Automated testing turns a slow, expert-only audit into a process that can run early and often, so weak chips are caught before they ship.",
    },
    {
      title: "A clear security result",
      body: "Every chip gets evidence: whether a secret key can be recovered, how easily, and where on the chip it leaks.",
    },
    {
      title: "A path to market",
      body: "Developed with industry partner SEMICON TREND to move from a research prototype toward a tool the semiconductor industry can adopt.",
    },
  ],
  // trailingSlash is on in next.config.ts, so the fragment must follow the slash.
  cta: { label: "Discuss a collaboration", href: "/resources/#contact" },
};
