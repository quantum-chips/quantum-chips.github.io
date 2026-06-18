// Canonical site URL, used for metadata, Open Graph, robots and sitemap.
// TODO: set this to the real deployment URL before going live.
export const SITE_URL = "https://quantum-safe-chips.example";

// Base path the site is served under (e.g. "/<repo>" on GitHub project pages).
// Set at build time via PAGES_BASE_PATH; used to prefix plain <img> asset paths.
export const BASE_PATH = (() => {
  const raw = process.env.PAGES_BASE_PATH || "";
  return raw === "/" ? "" : raw;
})();

export const SITE_NAME = "Automating Security Testing of Quantum-Safe Chips";
export const SITE_DESCRIPTION =
  "A University of Queensland research project, with industry partner SEMICON TREND, automating side-channel security testing of new-generation quantum-safe chips.";
