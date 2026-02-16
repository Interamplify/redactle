import { NextResponse } from "next/server";
import {
  getPuzzleNumber,
  getArticleTitleForPuzzle,
  getRandomArticle,
  ARTICLES,
  CATEGORY_LABELS,
  Category,
} from "@/lib/articles";

interface WikiPage {
  title: string;
  extract: string;
  pageid: number;
}

interface WikiResponse {
  query: {
    pages: Record<string, WikiPage>;
  };
}

async function fetchArticleByTitle(
  title: string
): Promise<{ title: string; content: string; pageid: number } | null> {
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${encodeURIComponent(title)}&format=json`,
    { next: { revalidate: 3600 } }
  );
  const data: WikiResponse = await res.json();
  const page = Object.values(data.query.pages)[0];

  if (!page.extract || page.extract.length < 200) return null;

  let content = page.extract;
  if (content.length > 6000) {
    const cutoff = content.lastIndexOf(".", 6000);
    content = content.substring(0, cutoff > 4000 ? cutoff + 1 : 6000);
  }

  return { title: page.title, content, pageid: page.pageid };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const puzzleParam = searchParams.get("puzzle");
  const mode = searchParams.get("mode"); // "random" or null
  const category = (searchParams.get("category") || "all") as Category;
  const difficulty = searchParams.get("difficulty") as
    | "easy"
    | "medium"
    | "hard"
    | null;

  try {
    let articleTitle: string;
    let puzzleNumber: number;
    let articleCategory = "";

    if (mode === "random") {
      const entry = getRandomArticle(category, difficulty || undefined);
      articleTitle = entry.title;
      puzzleNumber = -1;
      const catKey = entry.category as Exclude<Category, "all">;
      articleCategory = CATEGORY_LABELS[catKey]?.label || entry.category;
    } else {
      puzzleNumber = puzzleParam
        ? parseInt(puzzleParam, 10)
        : getPuzzleNumber();

      if (isNaN(puzzleNumber) || puzzleNumber < 1) {
        return NextResponse.json(
          { error: "Invalid puzzle number" },
          { status: 400 }
        );
      }
      articleTitle = getArticleTitleForPuzzle(puzzleNumber);
      // Find category for daily puzzle
      const entry = ARTICLES.find((a) => a.title === articleTitle);
      if (entry) {
        const catKey = entry.category as Exclude<Category, "all">;
        articleCategory = CATEGORY_LABELS[catKey]?.label || entry.category;
      }
    }

    const article = await fetchArticleByTitle(articleTitle);

    if (!article) {
      const fallback = await fetchArticleByTitle("Solar System");
      if (!fallback) {
        return NextResponse.json(
          { error: "Failed to fetch article" },
          { status: 500 }
        );
      }
      return NextResponse.json({
        ...fallback,
        puzzleNumber,
        category: "Space",
      });
    }

    return NextResponse.json({
      ...article,
      puzzleNumber,
      category: articleCategory,
    });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}
