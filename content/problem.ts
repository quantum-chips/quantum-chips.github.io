// `figure` names an illustration rendered under the section's text.
export const PROBLEM_SECTIONS: { heading: string; body: string; figure?: "ifa" }[] = [
  {
    heading: "The math that quantum computers break",
    body: "Shor's algorithm lets a large fault-tolerant quantum computer factor integers and compute discrete logarithms efficiently — breaking RSA, Diffie-Hellman, and elliptic-curve cryptography, the public-key schemes behind nearly all secure communication today.",
  },
  {
    heading: "Why “when” matters less than you think",
    body: "In the Global Risk Institute's 2026 expert survey, a cryptographically relevant quantum computer is “quite possible” within ten years (28–49%) and “likely” within fifteen (51–70%). But the threat is already live: in a “harvest now, decrypt later” attack, an adversary records encrypted traffic today and decrypts it once the hardware exists. Any secret with a long shelf life is already exposed.",
  },
  {
    heading: "Post-quantum cryptography moves the problem to the chip",
    body: "NIST standardized quantum-resistant algorithms (ML-KEM, ML-DSA, SLH-DSA) in 2024, and migration deadlines now run to 2035. But a quantum-resistant algorithm is only as safe as the silicon that runs it: a perfect cipher on a leaky chip is not secure.",
  },
  {
    heading: "Side channels leak what the maths protects",
    body: "Power consumption, electromagnetic emanations, and timing all leak secret-dependent information during computation. The regular arithmetic of lattice-based cryptography can even amplify this leakage. Testing chips for these physical weaknesses — before they ship — is the gap this project addresses.",
  },
  {
    heading: "Fault injection is the other half",
    figure: "ifa",
    body: "Side channels are passive: the attacker only listens. Fault-injection attacks are active — a precisely timed disturbance corrupts a computation or skips a check. On ML-DSA, skipping a single final comparison can make a forged signature verify. Our threat review covers both kinds, because a chip has to withstand both.",
  },
];
