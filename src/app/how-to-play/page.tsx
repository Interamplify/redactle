import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Play Redactle",
  description:
    "Learn how to play Redactle, the daily Wikipedia guessing game. Rules, tips, and strategies.",
};

const steps = [
  {
    n: "1",
    title: "Read the article",
    text: "You are shown a Wikipedia article where most words are hidden as dark blocks. Only common words like \"the\", \"is\", \"and\" remain visible.",
  },
  {
    n: "2",
    title: "Guess words",
    text: "Type a word and press Enter. If it appears in the article, all occurrences are revealed and highlighted in green.",
  },
  {
    n: "3",
    title: "Check letter counts",
    text: "Click any redacted block to see how many letters it contains. This helps narrow down possibilities.",
  },
  {
    n: "4",
    title: "Smart matching",
    text: "Guessing \"run\" also reveals \"running\", \"runs\", and \"runner\". You don't need to guess every variation.",
  },
  {
    n: "5",
    title: "Use hints",
    text: "Stuck? The lightbulb button offers hints: reveal a random word, see the article's category, or get the title's first letter.",
  },
  {
    n: "6",
    title: "Win!",
    text: "Guess all the key words in the article's title to win. Try to solve it in as few guesses as possible and share your score.",
  },
];

const tips = [
  "Start with broad topic words like \"war\", \"city\", \"science\", \"king\"",
  "Pay attention to paragraph structure — it gives clues about the topic",
  "Click redacted blocks to check their letter count",
  "Once you spot a theme, guess the specific title words",
  "Numbers and proper nouns often appear near the beginning",
];

export default function HowToPlayPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-0.5">
          <span className="text-accent">How to</span>{" "}
          <span className="text-heading">Play</span>
        </h1>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.n}
            className="flex gap-3 items-start"
          >
            <span className="shrink-0 w-7 h-7 rounded-lg bg-accent-soft text-accent flex items-center justify-center text-xs font-bold mt-0.5">
              {step.n}
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-heading mb-0.5">
                {step.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card rounded-xl p-4 sm:p-5 mt-8">
        <h2 className="text-sm font-semibold text-accent mb-3">Tips</h2>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-muted text-sm">
              <span className="text-accent mt-0.5 shrink-0">-</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-6">
        <a
          href="/"
          className="text-accent hover:text-accent-hover text-sm font-medium transition-colors"
        >
          Play today&apos;s puzzle &rarr;
        </a>
      </div>
    </div>
  );
}
