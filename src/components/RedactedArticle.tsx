"use client";

import { WordToken } from "@/lib/game";
import { useEffect, useRef, useState } from "react";

interface Props {
  tokens: WordToken[];
  titleTokens?: WordToken[];
  lastGuessIndex: number | null;
}

export default function RedactedArticle({ tokens, titleTokens, lastGuessIndex }: Props) {
  const scrollRef = useRef<HTMLSpanElement | null>(null);
  const [clickedKey, setClickedKey] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [lastGuessIndex]);

  useEffect(() => {
    if (!clickedKey) return;
    const t = setTimeout(() => setClickedKey(null), 2500);
    return () => clearTimeout(t);
  }, [clickedKey]);

  const paragraphs: WordToken[][] = [];
  let current: WordToken[] = [];
  for (const token of tokens) {
    if (token.text.includes("\n")) {
      if (current.length > 0) { paragraphs.push(current); current = []; }
    } else {
      current.push(token);
    }
  }
  if (current.length > 0) paragraphs.push(current);

  let firstHighlighted = false;

  const renderToken = (token: WordToken, key: string, isTitle?: boolean) => {
    if (!token.isWord) {
      return <span key={key} className="text-body">{token.text}</span>;
    }

    if (token.revealed) {
      const isNew = token.guessIndex === lastGuessIndex && lastGuessIndex !== null;
      let ref: React.RefObject<HTMLSpanElement | null> | undefined;
      if (isNew && !firstHighlighted) { ref = scrollRef; firstHighlighted = true; }

      return (
        <span
          key={key}
          ref={ref}
          className={`transition-all duration-500 ${
            isNew
              ? "bg-accent-soft text-accent font-medium rounded px-0.5"
              : token.guessIndex !== null
                ? "text-success"
                : "text-body"
          }`}
        >
          {token.text}
        </span>
      );
    }

    const isClicked = clickedKey === key;
    const blockWidth = isTitle
      ? Math.max(token.text.length * 0.6, 1.2)
      : Math.max(token.text.length * 0.52, 1);

    return (
      <span key={key} className="relative inline-block mx-[1px] align-baseline">
        <span
          onClick={() => setClickedKey(isClicked ? null : key)}
          className="inline-block bg-redacted hover:bg-redacted-hover rounded-[3px] cursor-pointer transition-colors"
          style={{
            width: `${blockWidth}em`,
            height: isTitle ? "1.3em" : "1.1em",
          }}
        />
        {isClicked && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-accent text-accent-fg text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap z-10 shadow-lg pointer-events-none animate-in">
            {token.text.length}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-accent" />
          </span>
        )}
      </span>
    );
  };

  return (
    <div style={{ fontSize: "var(--article-font-size)" }}>
      {/* Title - big redacted heading */}
      {titleTokens && titleTokens.length > 0 && (
        <h2 className="text-[1.6em] font-bold leading-[2] mb-4 pb-3 border-b border-border">
          {titleTokens.map((token, i) => renderToken(token, `title-${i}`, true))}
        </h2>
      )}

      {/* Article body */}
      <div className="space-y-3">
        {paragraphs.map((paragraph, pIdx) => (
          <p key={pIdx} className="leading-[1.8]">
            {paragraph.map((token, tIdx) => renderToken(token, `${pIdx}-${tIdx}`))}
          </p>
        ))}
      </div>
    </div>
  );
}
