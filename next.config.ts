import type { NextConfig } from "next";

// On GitHub Pages "project" sites the app is served under /<repo>, so the
// CI workflow passes that path in as PAGES_BASE_PATH. For a user/org page or a
// custom domain it stays empty (served at the root).
const raw = process.env.PAGES_BASE_PATH || "";
const basePath = raw === "/" ? "" : raw;

const nextConfig: NextConfig = {
  output: "export", // emit a fully static site into ./out
  trailingSlash: true, // /problem -> /problem/index.html (static-host friendly)
  images: { unoptimized: true }, // no Image Optimization server on static hosts
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
