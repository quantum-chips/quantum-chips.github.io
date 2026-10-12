// Threat model from the Milestone 1 report, "Automating Security Testing of
// Quantum-Safe Chips" (W. Zhang, September 2026): a structured literature review
// of side-channel (SCA) and fault-injection (FIA) attacks on ML-KEM and ML-DSA.
// Rows transcribe the report's Tables 2 and 3 in order; Table 1 is TRACE_MODELS.

export type Algorithm = "ML-KEM" | "ML-DSA";
export type AttackClass = "SCA" | "SCA-assisted CCA" | "FIA";

export type Threat = {
  algorithm: Algorithm;
  procedure: string;
  category: AttackClass;
  attack: string;
  target: string;
  outcome: string;
  // The report investigated the path and found it does not compromise the secret.
  ineffective?: boolean;
};

export const THREATS: Threat[] = [
  // Table 2 — ML-KEM / Kyber
  { algorithm: "ML-KEM", procedure: "Key generation", category: "SCA", attack: "SASCA_NTT", target: "Intermediate values in NTT", outcome: "Secret-key recovery" },
  { algorithm: "ML-KEM", procedure: "Key generation", category: "SCA", attack: "SASCA_KECCAK", target: "KECCAK-based secret generation", outcome: "Recover seed / reconstruct secret" },
  { algorithm: "ML-KEM", procedure: "Encapsulation", category: "SCA", attack: "Message encoding attack", target: "Encoding of random message m", outcome: "Recover m / compromise session secret" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, ephemeral key", category: "SCA", attack: "SASCA / message decoding", target: "Secret-dependent decoding operations", outcome: "Recover secret-dependent values" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, static key", category: "SCA", attack: "Correlation Power Analysis (CPA)", target: "Static private-key computations", outcome: "Private-key recovery" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, static key", category: "SCA-assisted CCA", attack: "CCA_SASCA_NTT", target: "NTT during chosen-ciphertext decapsulation", outcome: "Private-key recovery" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, static key", category: "SCA-assisted CCA", attack: "Binary PC oracle CCA", target: "Plaintext-checking behaviour", outcome: "Private-key recovery" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, static key", category: "SCA-assisted CCA", attack: "Parallel PC oracle CCA", target: "Parallel plaintext-checking behaviour", outcome: "Private-key recovery" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, static key", category: "SCA-assisted CCA", attack: "DF oracle CCA", target: "Decryption-failure behaviour", outcome: "Private-key recovery" },
  { algorithm: "ML-KEM", procedure: "Decapsulation, static key", category: "SCA-assisted CCA", attack: "FD oracle CCA", target: "Full-decryption leakage", outcome: "Private-key recovery" },
  { algorithm: "ML-KEM", procedure: "Key generation", category: "FIA", attack: "Nonce / secret sampling fault", target: "Sampling of s and e", outcome: "Create a relation between secret and error" },
  { algorithm: "ML-KEM", procedure: "Key generation", category: "FIA", attack: "NTT twiddle fault", target: "NTT twiddle factors", outcome: "Reduce secret entropy" },
  { algorithm: "ML-KEM", procedure: "Encapsulation", category: "FIA", attack: "Secret / randomness sampling fault", target: "Encapsulation sampling", outcome: "Faulted secret-dependent computation" },
  { algorithm: "ML-KEM", procedure: "Encapsulation", category: "FIA", attack: "NTT twiddle fault", target: "NTT computation", outcome: "Reduce internal entropy / structure" },
  { algorithm: "ML-KEM", procedure: "Decapsulation", category: "FIA", attack: "Ciphertext comparison attack", target: "Final ciphertext equality check", outcome: "Bypass fallback protection" },
  { algorithm: "ML-KEM", procedure: "Decapsulation", category: "FIA", attack: "Ineffective Fault Analysis (IFA)", target: "Message decoding", outcome: "Infer constraints on the private key" },
  { algorithm: "ML-KEM", procedure: "Decapsulation", category: "FIA", attack: "Fault correction attack", target: "Ciphertext memory / comparison stage", outcome: "Infer secret-dependent decoding information" },

  // Table 3 — ML-DSA / Dilithium
  { algorithm: "ML-DSA", procedure: "Key generation", category: "FIA", attack: "Secret / nonce fault", target: "Sampling of secret components s₁ and s₂", outcome: "Creates unintended relationships between secret components; can weaken key security" },
  { algorithm: "ML-DSA", procedure: "Key generation", category: "FIA", attack: "NTT twiddle fault", target: "NTT over s₁ during key generation", outcome: "Ineffective against the long-term signing secret: the original s₁ is kept and transformed again during signing", ineffective: true },
  { algorithm: "ML-DSA", procedure: "Signing", category: "FIA", attack: "Randomize secret key", target: "Stored coefficients of the signing secret s₁", outcome: "Faulty signatures leak information about s₁ and can enable secret-key recovery" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "FIA", attack: "Generic differential fault analysis", target: "Signature computation z = s₁·c + y", outcome: "Normal and faulty signatures compared so y cancels, exposing a relation involving s₁" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "FIA", attack: "Loop abort fault", target: "Sampling loop of the ephemeral nonce y", outcome: "Unsampled coefficients may stay 0, exposing unmasked terms of s₁·c" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "FIA", attack: "Skip addition attack", target: "Addition of y in z = s₁·c + y", outcome: "Skipping the masking addition exposes coefficients of s₁·c" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "FIA", attack: "NTT twiddle fault", target: "NTT instances for challenge c or nonce y", outcome: "Corrupted NTT output can remove masking terms and expose enough for secret-key recovery" },
  { algorithm: "ML-DSA", procedure: "Verification", category: "FIA", attack: "NTT twiddle fault", target: "NTT over challenge polynomial c", outcome: "Corrupts verification; an invalid or forged signature may be accepted" },
  { algorithm: "ML-DSA", procedure: "Verification", category: "FIA", attack: "Skip_C_Compare", target: "Final equality check of received c against recomputed c̄", outcome: "Bypasses the validity check; an invalid or forged signature may verify" },
  { algorithm: "ML-DSA", procedure: "Key generation", category: "SCA", attack: "SASCA_NTT", target: "NTT over secret-key component s₁", outcome: "Profiled single-trace leakage can recover s₁" },
  { algorithm: "ML-DSA", procedure: "Key generation", category: "SCA", attack: "SASCA_KECCAK", target: "KECCAK-based secret sampling from seedₛ", outcome: "Recovering the seed allows reconstruction of s₁" },
  { algorithm: "ML-DSA", procedure: "Key generation", category: "SCA", attack: "Simple NTT template attack", target: "First-round NTT product s[i]·ωʲ", outcome: "Template matching can recover s₁ from a single high-quality trace" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "SCA", attack: "SASCA_NTT", target: "NTT over s₁ or ephemeral nonce y", outcome: "Single-trace profiled leakage can reveal s₁, or recover y and expose information about s₁" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "SCA", attack: "SASCA_KECCAK", target: "KECCAK-based generation of nonce y from seed ρ", outcome: "Recovering ρ reconstructs y, then secret-key information" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "SCA", attack: "Zero_Nonce_Detect", target: "Coefficients of ephemeral nonce y", outcome: "Positions where y[i] = 0 expose coefficients of s₁·c; enough observations recover s₁" },
  { algorithm: "ML-DSA", procedure: "Signing", category: "SCA", attack: "NTT leakage CPA", target: "Point-wise multiplication ŝ₁ ∘ ĉ in the NTT domain", outcome: "Non-profiled correlation across multiple traces can recover the signing key" },
];

// The three steps of each algorithm (report Figures 1 and 2), in protocol order.
// `step` matches the start of a Threat's `procedure`.
export const STEPS: { algorithm: Algorithm; step: string; does: string }[] = [
  { algorithm: "ML-KEM", step: "Key generation", does: "Creates the key pair: a public key to share, a private key to keep." },
  { algorithm: "ML-KEM", step: "Encapsulation", does: "The sender uses the public key to make a shared secret and a ciphertext." },
  { algorithm: "ML-KEM", step: "Decapsulation", does: "The key owner uses the private key to recover the same shared secret." },
  { algorithm: "ML-DSA", step: "Key generation", does: "Creates the signing key pair." },
  { algorithm: "ML-DSA", step: "Signing", does: "The signer uses the private key to sign a message." },
  { algorithm: "ML-DSA", step: "Verification", does: "Anyone with the public key checks the signature." },
];

export const stepOf = (t: Threat) => t.procedure.split(",")[0];

// Table 1: whether the secret repeats decides the attack model.
export const TRACE_MODELS: { procedure: string; secret: string; reused: string; model: string }[] = [
  { procedure: "ML-KEM key generation", secret: "Private key sk", reused: "No — a new key for each execution", model: "Mainly single-trace" },
  { procedure: "ML-KEM encapsulation", secret: "Random message m", reused: "No — a fresh m for each execution", model: "Mainly single-trace" },
  { procedure: "ML-KEM decapsulation, ephemeral key", secret: "Private key sk", reused: "No — a new key for each session", model: "Mainly single-trace" },
  { procedure: "ML-KEM decapsulation, static key", secret: "Private key sk", reused: "Yes — reused across sessions", model: "Multi-trace possible" },
  { procedure: "ML-DSA key generation", secret: "Secret components s₁, s₂", reused: "No — new components for each run", model: "Mainly single-trace" },
  { procedure: "ML-DSA signing", secret: "Long-term signing key s₁, s₂", reused: "Yes — reused across many signatures", model: "Multi-trace possible" },
  { procedure: "ML-DSA signing", secret: "Ephemeral nonce y", reused: "Normally no — fresh for each signature", model: "Single-trace or per-signature" },
];

// The report's own conclusions from the review, in its words where possible.
export const FINDINGS: { title: string; body: string }[] = [
  {
    title: "NTT and KECCAK are the recurring targets",
    body: "Both process secret-dependent or security-critical values in several stages of both algorithms, so they come up again and again across side-channel and fault attacks.",
  },
  {
    title: "Decapsulation is ML-KEM’s widest surface",
    body: "Ten of the seventeen ML-KEM attack paths target it: CPA, five side-channel-assisted chosen-ciphertext attacks, a decoding attack and three fault attacks. Some recover a session secret, others the long-term private key.",
  },
  {
    title: "A reused secret invites statistics",
    body: "Fresh keys and nonces mostly face single-trace attacks. Static keys — ML-KEM decapsulation with a static key, ML-DSA signing — can be attacked across many traces.",
  },
  {
    title: "Some faults forge rather than steal",
    body: "Verification-stage faults on ML-DSA don’t recover the key: a corrupted NTT or a skipped c = c̄ comparison can make an invalid or forged signature pass.",
  },
  {
    title: "Every attack needs its own test",
    body: "Some need a profiling clone and high-SNR traces; CPA needs no profiling but many traces. Different setups, measurements and success criteria — hence a checklist, not a single score.",
  },
];

export const THREAT_SOURCE =
  "Milestone 1 report, “Automating Security Testing of Quantum-Safe Chips” (W. Zhang, September 2026)";
