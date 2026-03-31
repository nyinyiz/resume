import { MetadataRoute } from "next";

const BASE_URL = "https://nyinyizaw.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles/local-llm-old-phone`,
      lastModified: new Date("2025-02-27"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
