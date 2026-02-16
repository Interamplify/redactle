"use client";

import { useState } from "react";

interface Props {
  revealWordHintsLeft: number;
  topicHintUsed: boolean;
  letterHintUsed: boolean;
  onRevealWord: () => void;
  onTopicHint: () => string;
  onLetterHint: () => string;
  disabled: boolean;
}

export default function HintPanel({
  revealWordHintsLeft,
  topicHintUsed,
  letterHintUsed,
  onRevealWord,
  onTopicHint,
  onLetterHint,
  disabled,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [topicText, setTopicText] = useState<string | null>(null);
  const [letterText, setLetterText] = useState<string | null>(null);
  const [justRevealed, setJustRevealed] = useState(false);

  const total = revealWordHintsLeft + (topicHintUsed ? 0 : 1) + (letterHintUsed ? 0 : 1);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`relative flex items-center justify-center w-7 h-7 rounded-lg transition-all shrink-0 ${
          isOpen
            ? "text-accent"
            : "text-muted hover:text-accent"
        } disabled:opacity-30 disabled:cursor-not-allowed`}
        title="Hints"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18h6"/><path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5C8.35 12.26 8.82 13.02 9 14"/>
        </svg>
        {total > 0 && !disabled && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent text-accent-fg text-[8px] font-bold rounded-full flex items-center justify-center">
            {total}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-64 card rounded-xl shadow-2xl overflow-hidden z-30 animate-in">
          <div className="px-3 py-2.5 border-b border-border">
            <span className="text-xs font-semibold text-heading">Hints</span>
          </div>
          <div className="p-1.5 space-y-0.5">
            <HintRow
              icon="🔍"
              label={justRevealed ? "Revealed!" : "Reveal a word"}
              sub="Random hidden word"
              count={`${revealWordHintsLeft}/3`}
              disabled={revealWordHintsLeft <= 0 || disabled}
              onClick={() => {
                onRevealWord();
                setJustRevealed(true);
                setTimeout(() => setJustRevealed(false), 1500);
              }}
            />
            <HintRow
              icon="📂"
              label={topicText || "Topic hint"}
              sub={topicText ? "Revealed" : "Article category"}
              count={topicHintUsed ? "0/1" : "1/1"}
              disabled={topicHintUsed || disabled}
              onClick={() => setTopicText(onTopicHint())}
            />
            <HintRow
              icon="🔤"
              label={letterText || "Title letter"}
              sub={letterText ? "Revealed" : "First letter of title"}
              count={letterHintUsed ? "0/1" : "1/1"}
              disabled={letterHintUsed || disabled}
              onClick={() => setLetterText(onLetterHint())}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function HintRow({
  icon,
  label,
  sub,
  count,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  sub: string;
  count: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-2.5 py-2 rounded-lg transition-all flex items-center justify-between ${
        !disabled
          ? "hover:bg-bg-inset text-heading"
          : "opacity-35 cursor-not-allowed text-muted"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-sm">{icon}</span>
        <div>
          <div className="text-xs font-medium leading-tight">{label}</div>
          <div className="text-[10px] text-muted leading-tight">{sub}</div>
        </div>
      </div>
      <span className="text-[10px] text-muted font-mono">{count}</span>
    </button>
  );
}
