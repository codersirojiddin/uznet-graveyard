import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "https://uznetmuzeyi.uz";
  const projects = await getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/muzey`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/maqolalar`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/taklif-qilish`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about-us`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/maqolalar/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
