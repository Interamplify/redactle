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

      <section className="mt-14 max-w-2xl mx-auto space-y-8 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-heading mb-2">The Wikipedia guessing game</h2>
          <p className="text-body">
            Redactle gives you a full Wikipedia article with nearly every word blacked out. Common filler words stay visible, but everything else? Gone. Your job is to type guesses one at a time — if a word exists in the article, it gets revealed everywhere it appears. Piece the clues together, figure out what the article is about, and nail the title. Sounds easy until you&apos;re 40 guesses deep staring at a wall of black rectangles.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-heading mb-2">How it works</h2>
          <p className="text-body">
            You start with nothing but sentence structure and a handful of connecting words. Type any English word, hit Enter, and see what lights up. Got three hits on &quot;war&quot;? Probably a history article. Zero hits on &quot;president&quot;? Cross that off. Click any blacked-out word to check its letter count — that alone can crack a tricky title. The game ends when you uncover every important word in the title. Smart matching means guessing &quot;discover&quot; also reveals &quot;discovered&quot; and &quot;discovery&quot;, so you don&apos;t need to brute-force every form.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-heading mb-2">Play Redactle unlimited</h2>
          <p className="text-body">
            One puzzle a day not enough? Unlimited mode pulls from the same pool of curated Wikipedia articles but lets you play back to back, no waiting. Filter by category if you want — science, history, space, biology, whatever you&apos;re into — or go fully random. Pick easy for household names, hard for deep cuts. There&apos;s no daily limit and no score penalty, so go wild.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-heading mb-2">Daily puzzle, midnight reset</h2>
          <p className="text-body">
            Every day at midnight UTC a fresh Redactle puzzle goes live. Same article for everyone, so you can compare scores. Solve it, share your guess count, and keep your streak alive. Miss a day? The archive has every past puzzle if you want to catch up or just practice before tomorrow&apos;s drops.
          </p>
        </div>
      </section>
    </>
  );
}
