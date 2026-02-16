import { MetadataRoute } from "next";
import { getPuzzleNumber } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentPuzzle = getPuzzleNumber();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://redactle.example.com";

  const puzzlePages = Array.from({ length: currentPuzzle }, (_, i) => ({
    url: `${baseUrl}/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-play`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...puzzlePages,
  ];
}
