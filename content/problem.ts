export const PROBLEM_SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "The math that quantum computers break",
    body: "Shor's algorithm lets a large fault-tolerant quantum computer factor integers and compute discrete logarithms efficiently — breaking RSA, Diffie-Hellman, and elliptic-curve cryptography, the public-key schemes behind nearly all secure communication today.",
  },
  {
    heading: "Why “when” matters less than you think",
    body: "Estimates for a cryptographically-relevant quantum computer cluster around ten to fifteen years, with a long tail of uncertainty. But the threat is already live: in a “harvest now, decrypt later” attack, an adversary records encrypted traffic today and decrypts it once the hardware exists. Any secret with a long shelf life is already exposed.",
  },
  {
    heading: "Post-quantum cryptography moves the problem to the chip",
    body: "NIST standardized quantum-resistant algorithms (ML-KEM, ML-DSA, SLH-DSA) in 2024, and migration deadlines now run to 2035. But a quantum-resistant algorithm is only as safe as the silicon that runs it: a perfect cipher on a leaky chip is not secure.",
  },
  {
    heading: "Side channels are the real attack surface",
    body: "Power consumption, electromagnetic emanations, and timing all leak secret-dependent information during computation. The regular arithmetic of lattice-based cryptography can even amplify this leakage. Testing chips for these physical weaknesses — before they ship — is the gap this project addresses.",
  },
];
