import { MetadataRoute } from "next";
import { ALTERNATIVE_PAGES } from "@/lib/alternativeData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bio.puretoolhub.com";

  const altEntries = ALTERNATIVE_PAGES.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...altEntries,
  ];
}

