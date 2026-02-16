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

  return (
    <>
      <Game puzzleNumber={puzzleNumber} mode="daily" />

      <section className="mt-12 max-w-2xl mx-auto space-y-6 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-heading">What is Redactle?</h2>
        <p className="text-body">
          Redactle is a daily word guessing game where you try to figure out a hidden Wikipedia article. Every word in the article is redacted — replaced by dark blocks — except for common words like &quot;the&quot;, &quot;and&quot;, and &quot;is&quot;. Your goal is to guess words that appear in the article to gradually reveal its content and discover the title.
        </p>

        <h2 className="text-lg font-bold text-heading">How to play Redactle</h2>
        <p className="text-body">
          Type a word and press Enter. If your guess appears in the article, every occurrence gets revealed and highlighted. Pay attention to the structure of the text — headings, paragraph length, and sentence patterns all give clues about the topic. Click any redacted block to see how many letters it contains. The game is won when you correctly guess the key words in the article&apos;s title.
        </p>

        <h2 className="text-lg font-bold text-heading">Redactle Unlimited</h2>
        <p className="text-body">
          Want to play more than once a day? Redactle unlimited mode lets you play as many games as you want with random Wikipedia articles. Choose a category — science, history, geography, technology, and more — and pick your difficulty level. Each game is a fresh challenge with a new article to uncover.
        </p>

        <h2 className="text-lg font-bold text-heading">A new Redactle game every day</h2>
        <p className="text-body">
          A brand new Redactle puzzle is available every day at midnight UTC. Come back daily to test your knowledge, build your streak, and share your score with friends. Past puzzles are available in the archive so you never miss one.
        </p>
      </section>
    </>
  );
}
