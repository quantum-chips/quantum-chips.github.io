export const HERO = {
  eyebrow: "Transitioning to Quantum-Safe · a QDSA defence project",
  module: "Module · Quantum-Safe Chip Security Testing",
  title: "Security-critical systems are going quantum-safe. We make sure they actually are.",
  lede:
    "A University of Queensland–led project under the Queensland Defence Science Alliance, accelerating the transition to post-quantum cryptography for security-critical and defence applications. This site covers one module: side-channel security testing of the quantum-safe chips that run it.",
  cta: { label: "Explore the test bench", href: "/demo" },
};

export const PLAIN = {
  heading: "Why it matters",
  body: "Encryption keeps your bank transfers, health records and government communications private. A powerful quantum computer could one day break the encryption we use today — and attackers are already storing scrambled data now to unscramble it later. The fix is a new generation of “quantum-safe” chips. But even with unbreakable maths, a chip can quietly leak its secret keys through tiny physical signals such as its power use. We find those leaks automatically, so flawed chips never reach the systems people depend on.",
};

export const BENEFICIARIES: string[] = [
  "Banking & finance",
  "Healthcare",
  "Government & defence",
  "Critical infrastructure",
];

export const PROBLEM_STATS: { value: string; label: string }[] = [
  { value: "~10–15 yrs", label: "Expert estimate to a cryptographically-relevant quantum computer" },
  { value: "Harvest now", label: 'Encrypted data captured today, decrypted after "Q-day"' },
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
    {
      title: "Protecting critical systems",
      body: "Trustworthy quantum-safe chips underpin the banking, healthcare, government and infrastructure systems people depend on.",
    },
  ],
  cta: { label: "Discuss a collaboration", href: "/resources#contact" },
};

export const TEST_STEPS: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Acquire", body: "Capture power and electromagnetic traces while the chip runs its cryptographic operations." },
  { n: "02", title: "Analyze", body: "Correlate traces against key hypotheses (CPA) and run leakage assessment to expose secret-dependent signals." },
  { n: "03", title: "Verdict", body: "Localize leakage on the die and report whether — and how fast — a secret key can be recovered." },
];
