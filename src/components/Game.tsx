"use client";

import { useState, useEffect, useCallback } from "react";
import {
  WordToken,
  Guess,
  tokenizeText,
  processGuess,
  checkWin,
  COMMON_WORDS,
} from "@/lib/game";
import { Category, getPuzzleNumber } from "@/lib/articles";
import { recordWin, recordLoss, getStreak } from "@/lib/streak";
import RedactedArticle from "./RedactedArticle";
import GuessInput from "./GuessInput";
import GuessList from "./GuessList";
import WinModal from "./WinModal";
import HintPanel from "./HintPanel";
import IntroBanner from "./IntroBanner";

interface Props {
  puzzleNumber?: number;
  mode?: "daily" | "random";
  category?: Category;
  difficulty?: "easy" | "medium" | "hard" | null;
  onNewRandom?: () => void;
}

interface ArticleData {
  title: string;
  content: string;
  pageid: number;
  puzzleNumber: number;
  category: string;
}

export default function Game({
  puzzleNumber,
  mode = "daily",
  category = "all",
  difficulty = null,
  onNewRandom,
}: Props) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [tokens, setTokens] = useState<WordToken[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [won, setWon] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastGuessIndex, setLastGuessIndex] = useState<number | null>(null);
  const [gaveUp, setGaveUp] = useState(false);
  const [streak, setStreak] = useState(0);

  const [revealWordHints, setRevealWordHints] = useState(3);
  const [topicHintUsed, setTopicHintUsed] = useState(false);
  const [letterHintUsed, setLetterHintUsed] = useState(false);

  const currentMaxPuzzle = getPuzzleNumber();

  useEffect(() => {
    setStreak(getStreak().current);
  }, []);

  const loadArticle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url: string;
      if (mode === "random") {
        url = `/api/article?mode=random&category=${category}`;
        if (difficulty) url += `&difficulty=${difficulty}`;
      } else {
        url = `/api/article?puzzle=${puzzleNumber}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ArticleData = await res.json();
      setArticle(data);
      setTokens(tokenizeText(data.content));
      setGuesses([]);
      setWon(false);
      setShowWinModal(false);
      setLastGuessIndex(null);
      setGaveUp(false);
      setRevealWordHints(3);
      setTopicHintUsed(false);
      setLetterHintUsed(false);
    } catch {
      setError("Failed to load puzzle. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [puzzleNumber, mode, category, difficulty]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  const handleGuess = (word: string) => {
    if (won || !article || gaveUp) return;
    const normalized = word.toLowerCase().trim();
    if (guesses.some((g) => g.word.toLowerCase() === normalized)) return;
    if (COMMON_WORDS.has(normalized)) return;

    const guessIndex = guesses.length + 1;
    const { tokens: newTokens, hits } = processGuess(tokens, word, guessIndex);
    setTokens(newTokens);
    setLastGuessIndex(guessIndex);

    const newGuess: Guess = { word: normalized, hits, index: guessIndex };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    if (checkWin(article.title, newTokens)) {
      setWon(true);
      setShowWinModal(true);
      const s = recordWin(newGuesses.length);
      setStreak(s.current);
      setTokens(newTokens.map((t) => ({ ...t, revealed: true })));
    }
  };

  const handleGiveUp = () => {
    if (!article) return;
    setGaveUp(true);
    const s = recordLoss();
    setStreak(s.current);
    setTokens((prev) => prev.map((t) => ({ ...t, revealed: true })));
  };

  const handleRevealWord = () => {
    if (revealWordHints <= 0) return;
    const unrevealed = tokens
      .map((t, i) => ({ token: t, index: i }))
      .filter(({ token }) => token.isWord && !token.revealed && !COMMON_WORDS.has(token.normalized));
    if (unrevealed.length === 0) return;
    const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    const guessIndex = guesses.length + 1;
    const { tokens: newTokens, hits } = processGuess(tokens, pick.token.text, guessIndex);
    setTokens(newTokens);
    setLastGuessIndex(guessIndex);
    setGuesses((prev) => [...prev, { word: `${pick.token.normalized} (hint)`, hits, index: guessIndex }]);
    setRevealWordHints((h) => h - 1);
  };

  const handleTopicHint = (): string => {
    if (!article) return "";
    setTopicHintUsed(true);
    return `Category: ${article.category}`;
  };

  const handleLetterHint = (): string => {
    if (!article) return "";
    setLetterHintUsed(true);
    const titleWords = article.title.split(/\s+/).filter((w) => !COMMON_WORDS.has(w.toLowerCase()));
    if (titleWords.length === 0) return `Starts with: ${article.title[0]}`;
    return `Starts with "${titleWords[0][0].toUpperCase()}..." (${article.title.split(/\s+/).length} words)`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-muted text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-danger mb-4 text-sm">{error}</p>
          <button onClick={loadArticle} className="bg-accent hover:bg-accent-hover text-accent-fg px-5 py-2 rounded-lg transition-all font-medium text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalWords = tokens.filter((t) => t.isWord && !COMMON_WORDS.has(t.normalized)).length;
  const revealedWords = tokens.filter((t) => t.isWord && t.revealed && !COMMON_WORDS.has(t.normalized)).length;
  const accuracy = guesses.length > 0 ? Math.round((guesses.filter((g) => g.hits > 0).length / guesses.length) * 100) : 0;
  const progress = totalWords > 0 ? (revealedWords / totalWords) * 100 : 0;
  const gameFinished = won || gaveUp;
  const pNum = article?.puzzleNumber || puzzleNumber || 0;
  const canGoPrev = mode === "daily" && pNum > 1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Puzzle header: number + prev button + subtitle */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-0.5">
          {canGoPrev && (
            <a
              href={`/${pNum - 1}`}
              className="text-muted hover:text-heading transition-colors p-1"
              title={`Puzzle #${pNum - 1}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </a>
          )}

          <span className="text-accent font-bold text-lg tabular-nums">
            {mode === "daily" ? `#${pNum}` : "Free Play"}
          </span>

          {mode === "daily" && pNum < currentMaxPuzzle && (
            <a
              href={pNum + 1 === currentMaxPuzzle ? "/" : `/${pNum + 1}`}
              className="text-muted hover:text-heading transition-colors p-1"
              title={`Puzzle #${pNum + 1}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
          )}
        </div>

        <p className="text-muted text-xs text-center">
          {mode === "daily" && pNum === currentMaxPuzzle && "Today's puzzle"}
          {mode === "daily" && pNum < currentMaxPuzzle && (
            <>Past puzzle · <a href="/" className="text-accent hover:underline">play today&apos;s</a></>
          )}
          {mode === "random" && "Unlimited mode"}
        </p>
      </div>

      {/* Collapsible intro */}
      {guesses.length === 0 && !gameFinished && (
        <IntroBanner
          mode={mode}
          puzzleNumber={pNum}
          totalWords={totalWords}
          titleWordCount={article ? article.title.split(/\s+/).length : 0}
          streak={streak}
        />
      )}

      {/* Compact stats row */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <div className="flex items-center gap-2 text-muted no-scrollbar overflow-x-auto">
          <span><span className="text-heading font-medium">{guesses.length}</span> guesses</span>
          <span className="text-faint">·</span>
          <span><span className="text-heading font-medium">{accuracy}%</span> accuracy</span>
          {streak > 0 && (
            <>
              <span className="text-faint">·</span>
              <span>🔥 {streak}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-faint tabular-nums">{revealedWords}/{totalWords}</span>
          {!gameFinished && (
            <button onClick={handleGiveUp} className="text-muted hover:text-danger transition-colors">
              Give up
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] bg-border rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Give up result */}
      {gaveUp && !won && article && (
        <div className="card rounded-xl p-4 mb-4 text-center animate-in">
          <p className="text-danger/70 text-xs mb-1">You gave up!</p>
          <p className="text-lg font-bold text-heading">{article.title}</p>
          <div className="flex items-center justify-center gap-3 mt-2 text-xs">
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Read on Wikipedia
            </a>
            {mode === "random" && onNewRandom && (
              <button onClick={onNewRandom} className="text-accent hover:underline">Play another</button>
            )}
          </div>
        </div>
      )}

      {/* Article */}
      <div className="card rounded-xl p-4 sm:p-5 mb-4 max-h-[55vh] overflow-y-auto custom-scrollbar">
        <RedactedArticle tokens={tokens} lastGuessIndex={lastGuessIndex} />
      </div>

      {/* Guess input + hints */}
      <div className="sticky bottom-0 bg-bg/90 backdrop-blur-xl pt-3 pb-2 z-20">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <GuessInput onGuess={handleGuess} disabled={gameFinished} />
          </div>
          <HintPanel
            revealWordHintsLeft={revealWordHints}
            topicHintUsed={topicHintUsed}
            letterHintUsed={letterHintUsed}
            onRevealWord={handleRevealWord}
            onTopicHint={handleTopicHint}
            onLetterHint={handleLetterHint}
            disabled={gameFinished}
          />
        </div>
      </div>

      {/* Guess list */}
      <GuessList guesses={guesses} />

      {/* Win */}
      {showWinModal && article && (
        <WinModal
          title={article.title}
          guessCount={guesses.length}
          puzzleNumber={article.puzzleNumber}
          isRandom={mode === "random"}
          streak={streak}
          onNewGame={() => {
            if (mode === "random" && onNewRandom) onNewRandom();
            else window.location.href = "/";
          }}
          onClose={() => setShowWinModal(false)}
        />
      )}
    </div>
  );
}
