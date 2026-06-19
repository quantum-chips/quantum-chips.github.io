// Canonical site URL, used for metadata, Open Graph, robots and sitemap.
export const SITE_URL = "https://quantum-chips.github.io";

// Base path the site is served under (e.g. "/<repo>" on GitHub project pages).
// Set at build time via PAGES_BASE_PATH; used to prefix plain <img> asset paths.
export const BASE_PATH = (() => {
  const raw = process.env.PAGES_BASE_PATH || "";
  return raw === "/" ? "" : raw;
})();

export const SITE_NAME = "Transitioning to Quantum-Safe";
export const SITE_DESCRIPTION =
  "A University of Queensland–led QDSA defence research project: security testing of post-quantum cryptography in security-critical applications. This module covers side-channel security testing of quantum-safe chips.";
