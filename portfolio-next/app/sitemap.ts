import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jawads.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: p.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
