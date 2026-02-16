"use client";

import { useState } from "react";

interface Props {
  mode: "daily" | "random";
  puzzleNumber: number;
  totalWords: number;
  titleWordCount: number;
  streak: number;
}

function getDailyIntro(n: number, words: number, titleWords: number): string {
  const c = [
    `${words} hidden words await.`,
    `${words} redacted words to uncover.`,
    `${words} concealed words in this article.`,
    `${words} words hidden in the text.`,
    `This puzzle hides ${words} words.`,
  ];
  const t = titleWords === 1 ? "The title is one word." : `The title has ${titleWords} words.`;
  const tips = [
    "Click any block to see its letter count.",
    "Tap a block to check how many letters it has.",
    "Click redacted words to reveal their length.",
  ];
  return `Puzzle #${n} — ${c[n % c.length]} ${t} ${tips[n % tips.length]}`;
}

function getRandomIntro(words: number, titleWords: number): string {
  const t = titleWords === 1 ? "one word" : `${titleWords} words`;
  return `This article hides ${words} words. The title is ${t}. Click blocks to check their length.`;
}

export default function IntroBanner({ mode, puzzleNumber, totalWords, titleWordCount, streak }: Props) {
  const [open, setOpen] = useState(false);
  const text = mode === "daily"
    ? getDailyIntro(puzzleNumber, totalWords, titleWordCount)
    : getRandomIntro(totalWords, titleWordCount);

  return (
    <div className="mb-3">
      {!open ? (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 text-muted hover:text-body text-[11px] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
            How this works
          </button>
          {streak > 0 && (
            <span className="text-[11px] text-muted">🔥 {streak}-day streak</span>
          )}
        </div>
      ) : (
        <div className="card rounded-xl p-3.5 animate-in">
          <div className="flex items-start justify-between gap-3">
            <p className="text-body text-xs leading-relaxed flex-1">{text}</p>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-heading transition-colors shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
          {streak > 0 && (
            <div className="mt-2.5 pt-2.5 border-t border-border flex items-center gap-1.5 text-[11px] text-muted">
              🔥 <span className="text-accent font-medium">{streak}-day streak</span> — keep it going!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
