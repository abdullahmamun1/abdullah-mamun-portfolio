import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
