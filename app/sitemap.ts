import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // trailingSlash is on, so the canonical URL of every page ends in "/".
  return ["", "/chip-testing", "/problem", "/threat-model", "/method", "/demo", "/team", "/resources"].map((path) => ({
    url: `${SITE_URL}${path}/`,
    lastModified: now,
  }));
}
