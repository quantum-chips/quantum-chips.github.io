// `figure` names an illustration rendered under the section's text.
export const PROBLEM_SECTIONS: { heading: string; body: string; figure?: "ifa" }[] = [
  {
    heading: "Quantum threats to public-key cryptography",
    body: "Shor's algorithm lets a large fault-tolerant quantum computer factor integers and compute discrete logarithms efficiently. Such a computer could break RSA, Diffie-Hellman and elliptic-curve cryptography, which are widely used to secure communications.",
  },
  {
    heading: "Long-term confidentiality",
    body: "In the Global Risk Institute's 2026 expert survey, a cryptographically relevant quantum computer is “quite possible” within ten years (28–49%) and “likely” within fifteen (51–70%). In a “harvest now, decrypt later” attack, an adversary records encrypted traffic today for decryption once such hardware exists. Information that must remain confidential for years is therefore at risk before these computers are available.",
  },
  {
    heading: "Security of hardware implementations",
    body: "NIST standardized quantum-resistant algorithms (ML-KEM, ML-DSA, SLH-DSA) in 2024, and migration deadlines now run to 2035. Hardware implementing these algorithms also needs protection against physical attacks that exploit information leakage or disrupt computation.",
  },
  {
    heading: "Side-channel attacks",
    body: "Power consumption, electromagnetic emanations and timing can reveal secret-dependent information during computation. The regular arithmetic of lattice-based cryptography can amplify this leakage. This project develops tests for these weaknesses in hardware before deployment.",
  },
  {
    heading: "Fault-injection attacks",
    figure: "ifa",
    body: "Fault-injection attacks use a precisely timed disturbance to corrupt a computation or skip a check. On ML-DSA, skipping a single final comparison can make a forged signature verify. Our threat review covers fault injection alongside passive side-channel attacks.",
  },
];
