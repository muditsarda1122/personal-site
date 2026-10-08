import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { getNativePosts } from "@/lib/writing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/writing` },
    ...getNativePosts().map((p) => ({ url: `${siteUrl}/writing/${p.slug}`, lastModified: p.date })),
  ];
}
