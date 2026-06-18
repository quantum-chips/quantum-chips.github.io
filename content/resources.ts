export const MILESTONES: { date: string; title: string }[] = [
  { date: "1994", title: "Shor's algorithm shows a quantum computer could break RSA and elliptic-curve cryptography" },
  { date: "2016", title: "NIST opens the Post-Quantum Cryptography standardisation process" },
  { date: "May 2019", title: "Gidney & Ekerå estimate ~20 million noisy qubits and 8 hours to break RSA-2048" },
  { date: "Jul 2022", title: "First algorithms selected: Kyber, Dilithium, Falcon and SPHINCS+" },
  { date: "Aug 2022", title: "SIKE, a NIST finalist, is broken on a single classical PC; NIST drops it" },
  { date: "Sep 2023", title: "Signal ships PQXDH — post-quantum key agreement at billion-user scale" },
  { date: "Feb 2024", title: "Apple brings PQ3 quantum-secure encryption to iMessage" },
  { date: "Aug 2024", title: "NIST finalises FIPS 203 (ML-KEM), 204 (ML-DSA) and 205 (SLH-DSA)" },
  { date: "Nov 2024", title: "Chrome enables hybrid ML-KEM in TLS for all desktop users" },
  { date: "Dec 2024", title: "Google's Willow chip demonstrates below-threshold quantum error correction" },
  { date: "Mar 2025", title: "NIST selects HQC as a backup, code-based key-encapsulation mechanism" },
  { date: "May 2025", title: "Gidney re-estimates the RSA-2048 break at under 1 million qubits — a ~20× drop" },
  { date: "Sep 2026", title: "FIPS 140-2 sunset — cryptographic modules validate under FIPS 140-3" },
  { date: "2027 → 2035", title: "NSA CNSA 2.0 window: PQC required for new systems by 2027, full migration by 2035" },
];

// Quantum-safe chips and IP now reaching the market — the class of targets this project tests.
export const HARDWARE: { name: string; what: string; href: string }[] = [
  {
    name: "SEALSQ Quantum Shield QS7001",
    what: "RISC-V secure element with ML-KEM and ML-DSA in silicon; pursuing FIPS 140-3 and Common Criteria.",
    href: "https://quantumcomputingreport.com/sealsq-unveils-quantum-shield-qs7001-first-chip-with-hardware-embedded-nist-pqc-algorithms/",
  },
  {
    name: "PQShield PQPlatform",
    what: "Post-quantum hardware IP and accelerators, plus an early PQC silicon test chip for vendors.",
    href: "https://pqshield.com/products/",
  },
  {
    name: "Infineon PSOC Control C3",
    what: "Microcontrollers with autonomous hardware accelerators and post-quantum support.",
    href: "https://www.infineon.com/market-news/2025/INFCSS202508-137",
  },
];

export type Ref = { title: string; where: string; href: string; note: string };

export const READING: { category: string; items: Ref[] }[] = [
  {
    category: "Standards & policy",
    items: [
      {
        title: "First three finalized post-quantum encryption standards",
        where: "NIST · 2024",
        href: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards",
        note: "FIPS 203/204/205 — the algorithms our target chips implement.",
      },
      {
        title: "CNSA 2.0 — quantum-resistant requirements",
        where: "NSA · via Entrust",
        href: "https://www.entrust.com/resources/learn/what-is-cnsa-2-0",
        note: "The 2027–2035 migration deadlines driving hardware adoption.",
      },
    ],
  },
  {
    category: "The quantum threat",
    items: [
      {
        title: "Harvest now, decrypt later",
        where: "overview",
        href: "https://en.wikipedia.org/wiki/Harvest_now,_decrypt_later",
        note: "Why data with a long shelf life is already exposed.",
      },
      {
        title: "How to factor 2048-bit RSA in 8 hours using 20 million noisy qubits",
        where: "Gidney & Ekerå · arXiv 1905.09749",
        href: "https://arxiv.org/abs/1905.09749",
        note: "The landmark hardware estimate for breaking RSA with Shor's algorithm.",
      },
      {
        title: "How to factor 2048-bit RSA with less than a million noisy qubits",
        where: "Gidney · arXiv 2505.15917",
        href: "https://arxiv.org/abs/2505.15917",
        note: "Re-estimated ~20× lower in 2025 — the threat bar keeps dropping.",
      },
      {
        title: "NIST finalist SIKE cracked on a classical PC",
        where: "Castryck & Decru · 2022",
        href: "https://www.securityweek.com/nist-post-quantum-algorithm-finalist-cracked-using-classical-pc/",
        note: "Even a standardisation finalist fell — why crypto-agility and continuous testing matter.",
      },
    ],
  },
  {
    category: "Migration in the real world",
    items: [
      {
        title: "Quantum resistance and the Signal protocol (PQXDH)",
        where: "Signal · 2023",
        href: "https://signal.org/blog/pqxdh/",
        note: "Post-quantum key agreement deployed to a billion users.",
      },
      {
        title: "iMessage with PQ3: quantum-secure messaging at scale",
        where: "Apple Security · 2024",
        href: "https://security.apple.com/blog/imessage-pq3/",
        note: "Hybrid Kyber + elliptic-curve encryption in a mass-market product.",
      },
      {
        title: "Chrome switches to ML-KEM for post-quantum TLS",
        where: "The Hacker News · 2024",
        href: "https://thehackernews.com/2024/09/google-chrome-switches-to-ml-kem-for.html",
        note: "Hybrid ML-KEM key exchange shipped to all desktop users.",
      },
    ],
  },
  {
    category: "Side-channel & hardware testing — our focus",
    items: [
      {
        title: "Side-channel & fault-injection attacks on Kyber/Dilithium",
        where: "ACM TECS · 2023",
        href: "https://dl.acm.org/doi/10.1145/3603170",
        note: "Foundational survey of the attacks this project automates against.",
      },
      {
        title: "Machine learning and side-channel attacks on PQC",
        where: "IACR ePrint 2025/1754",
        href: "https://eprint.iacr.org/2025/1754.pdf",
        note: "ML profiling that can defeat low-order masking countermeasures.",
      },
      {
        title: "Evaluating the side-channel security of post-quantum hardware IP",
        where: "eShard",
        href: "https://www.eshard.com/blog/pqshield-eshard-mlkem-security-test",
        note: "A practical ML-KEM evaluation on FPGA — a template for our methodology.",
      },
      {
        title: "Side-channel attacks on post-quantum cryptography",
        where: "Semiconductor Engineering",
        href: "https://semiengineering.com/side-channel-attacks-on-post-quantum-cryptography/",
        note: "An accessible primer on why standardised math still leaks in silicon.",
      },
    ],
  },
  {
    category: "Surveys & landscape",
    items: [
      {
        title: "Post-Quantum Cryptography & Quantum-Safe Security: a survey",
        where: "arXiv 2510.10436",
        href: "https://arxiv.org/abs/2510.10436",
        note: "End-to-end landscape, from threat to implementation security.",
      },
      {
        title: "Lattice-based cryptographic accelerators for the post-quantum era",
        where: "MDPI Electronics",
        href: "https://www.mdpi.com/2079-9292/15/2/475",
        note: "Hardware-acceleration techniques (FPGA/ASIC) for the schemes we test.",
      },
    ],
  },
];

export const DIRECTIONS: string[] = [
  "A standardised, reproducible side-channel test methodology for PQC hardware — the gap this project targets.",
  "Masking and constant-time implementations at acceptable area and energy cost.",
  "Crypto-agility in silicon: swapping algorithms without re-spinning hardware if a scheme is broken.",
];
