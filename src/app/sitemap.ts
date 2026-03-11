import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { horsesSlugsQuery } from "@/sanity/lib/queries";
import { HorsesSlugsQueryResult } from "@/../sanity.types";

const BASE_URL = "https://jk-silherovice.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<HorsesSlugsQueryResult>(horsesSlugsQuery);

  const horseUrls: MetadataRoute.Sitemap = slugs.map((s) => ({
    url: `${BASE_URL}/kone/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/kone`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/galerie`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/o-nas`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...horseUrls,
  ];
}
