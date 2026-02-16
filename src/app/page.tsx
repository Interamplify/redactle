import { Metadata } from "next";
import Game from "@/components/Game";
import { getPuzzleNumber } from "@/lib/articles";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const puzzleNumber = getPuzzleNumber();
  return {
    title: `Redactle #${puzzleNumber} - Daily Wikipedia Guessing Game`,
    description: `Can you guess today's hidden Wikipedia article? Redactle puzzle #${puzzleNumber}. Reveal redacted words and figure out the topic!`,
  };
}

export default function HomePage() {
  const puzzleNumber = getPuzzleNumber();

  return <Game puzzleNumber={puzzleNumber} mode="daily" />;
}
