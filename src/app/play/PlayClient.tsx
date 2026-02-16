"use client";

import { useState, useCallback } from "react";
import Game from "@/components/Game";
import { Category, CATEGORY_LABELS } from "@/lib/articles";

type Difficulty = "easy" | "medium" | "hard" | null;

const DIFFICULTY_OPTIONS: {
  value: Difficulty;
  label: string;
  desc: string;
}[] = [
  { value: null, label: "Any", desc: "All" },
  { value: "easy", label: "Easy", desc: "Well-known" },
  { value: "medium", label: "Medium", desc: "Moderate" },
  { value: "hard", label: "Hard", desc: "Obscure" },
];

export default function PlayClient() {
  const [category, setCategory] = useState<Category>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleStart = () => {
    setGameKey((k) => k + 1);
    setGameStarted(true);
  };

  const handleNewRandom = useCallback(() => {
    setGameKey((k) => k + 1);
  }, []);

  const categories = Object.entries(CATEGORY_LABELS) as [
    Exclude<Category, "all">,
    { label: string; emoji: string },
  ][];

  if (gameStarted) {
    return (
      <>
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold mb-0.5">
            <span className="text-accent">Free</span>{" "}
            <span className="text-heading">Play</span>
          </h1>
          <p className="text-muted text-sm">
            {category !== "all" && (
              <span>
                {CATEGORY_LABELS[category as Exclude<Category, "all">]?.emoji}{" "}
                {CATEGORY_LABELS[category as Exclude<Category, "all">]?.label}
              </span>
            )}
            {category === "all" && "All categories"}
            {difficulty &&
              ` · ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`}
            {" · "}
            <button
              onClick={() => setGameStarted(false)}
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Change
            </button>
          </p>
        </div>

        <Game
          key={gameKey}
          mode="random"
          category={category}
          difficulty={difficulty}
          onNewRandom={handleNewRandom}
        />
      </>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-0.5">
          <span className="text-accent">New</span>{" "}
          <span className="text-heading">Game</span>
        </h1>
        <p className="text-muted text-sm">
          Choose your preferences
        </p>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h2 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 px-1">
          Category
        </h2>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setCategory("all")}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all ${
              category === "all"
                ? "bg-accent-soft border-accent/30 text-accent"
                : "bg-bg-elevated border-border text-muted hover:border-border-strong hover:text-heading"
            }`}
          >
            <span className="text-base">🎲</span>
            <span className="text-sm font-medium">All</span>
          </button>
          {categories.map(([key, { label, emoji }]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all ${
                category === key
                  ? "bg-accent-soft border-accent/30 text-accent"
                  : "bg-bg-elevated border-border text-muted hover:border-border-strong hover:text-heading"
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span className="text-sm font-medium truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-8">
        <h2 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 px-1">
          Difficulty
        </h2>
        <div className="grid grid-cols-4 gap-1.5">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setDifficulty(opt.value)}
              className={`py-2.5 rounded-lg border text-center transition-all ${
                difficulty === opt.value
                  ? "bg-accent-soft border-accent/30 text-accent"
                  : "bg-bg-elevated border-border text-muted hover:border-border-strong hover:text-heading"
              }`}
            >
              <div className="text-sm font-medium">{opt.label}</div>
              <div className="text-[9px] text-muted mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Start */}
      <button
        onClick={handleStart}
        className="w-full bg-accent hover:bg-accent-hover text-accent-fg font-bold py-3.5 rounded-xl text-base transition-all active:scale-[0.98]"
      >
        Start Game
      </button>

      <div className="text-center mt-4">
        <a
          href="/"
          className="text-muted hover:text-body text-sm transition-colors"
        >
          &larr; Daily puzzle
        </a>
      </div>
    </div>
  );
}
