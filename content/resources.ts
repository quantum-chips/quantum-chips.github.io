export const MILESTONES: { date: string; title: string }[] = [
  { date: "Aug 2024", title: "NIST finalizes FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA)" },
  { date: "Mar 2025", title: "NIST selects HQC as a backup, math-diverse key-encapsulation mechanism" },
  { date: "Sep 2026", title: "FIPS 140-2 sunset — modules validate under FIPS 140-3" },
  { date: "2027", title: "NSA CNSA 2.0: PQC required for new national security systems" },
  { date: "2035", title: "CNSA 2.0: full quantum-safe migration deadline" },
];

export const READING: { title: string; where: string; href: string }[] = [
  { title: "First 3 finalized post-quantum encryption standards", where: "NIST", href: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards" },
  { title: "Side-channel & fault-injection attacks on Kyber/Dilithium (survey)", where: "IACR ePrint 2022/737", href: "https://eprint.iacr.org/2022/737.pdf" },
  { title: "Post-Quantum Cryptography & Quantum-Safe Security: a survey", where: "arXiv 2510.10436", href: "https://arxiv.org/pdf/2510.10436" },
  { title: "CNSA 2.0 explainer", where: "Entrust", href: "https://www.entrust.com/resources/learn/what-is-cnsa-2-0" },
];
