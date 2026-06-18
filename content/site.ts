export const HERO = {
  eyebrow: "01 · TESTING QUANTUM-SAFE SILICON",
  title: "We break tomorrow's chips before tomorrow does.",
  lede:
    "Post-quantum algorithms are only as safe as the silicon that runs them. We side-channel test new-generation quantum-safe chips to find the leaks an attacker would — today.",
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

export const TEST_STEPS: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Acquire", body: "Capture power and electromagnetic traces while the chip runs its cryptographic operations." },
  { n: "02", title: "Analyze", body: "Correlate traces against key hypotheses (CPA) and run leakage assessment to expose secret-dependent signals." },
  { n: "03", title: "Verdict", body: "Localize leakage on the die and report whether — and how fast — a secret key can be recovered." },
];
