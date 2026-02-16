import { Metadata } from "next";
import Game from "@/components/Game";
import { getPuzzleNumber } from "@/lib/articles";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const puzzleNumber = parseInt(id, 10);
  if (isNaN(puzzleNumber) || puzzleNumber < 1) return {};
  return {
    title: `Redactle #${puzzleNumber} - Wikipedia Guessing Puzzle`,
    description: `Play Redactle puzzle #${puzzleNumber}. Guess the hidden Wikipedia article!`,
  };
}

export default async function PuzzlePage({ params }: Props) {
  const { id } = await params;
  const puzzleNumber = parseInt(id, 10);
  const currentPuzzle = getPuzzleNumber();

  if (isNaN(puzzleNumber) || puzzleNumber < 1 || puzzleNumber > currentPuzzle) {
    notFound();
  }

  return <Game puzzleNumber={puzzleNumber} mode="daily" />;
}
