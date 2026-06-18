import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/problem", "/demo", "/method", "/team", "/resources"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
}
