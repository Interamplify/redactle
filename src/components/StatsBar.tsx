"use client";

import { useEffect, useState } from "react";
import { getStreak, StreakData } from "@/lib/streak";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatsPanel({ isOpen, onClose }: Props) {
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    if (isOpen) setStreak(getStreak());
  }, [isOpen]);

  if (!isOpen || !streak) return null;

  const avg = streak.gamesWon > 0 ? Math.round(streak.totalGuesses / streak.gamesWon) : 0;
  const winRate = streak.gamesPlayed > 0 ? Math.round((streak.gamesWon / streak.gamesPlayed) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-heading">Stats</h2>
          <button onClick={onClose} className="text-muted hover:text-heading transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { val: streak.gamesPlayed, label: "Played" },
            { val: `${winRate}%`, label: "Win %" },
            { val: streak.current, label: "Streak" },
            { val: streak.best, label: "Best" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold text-heading tabular-nums">{s.val}</div>
              <div className="text-[9px] text-muted uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {streak.current > 0 && (
          <div className="card-inset rounded-xl p-3 mb-4 text-center">
            <span className="text-2xl">🔥</span>
            <div className="text-sm text-heading font-medium mt-1">{streak.current}-day streak</div>
            <div className="text-[10px] text-muted">Play daily to keep it</div>
          </div>
        )}

        {streak.gamesWon > 0 && (
          <div className="flex justify-between text-xs text-muted border-t border-border pt-3">
            <span>Avg guesses/win</span>
            <span className="text-heading font-medium tabular-nums">{avg}</span>
          </div>
        )}

        <button onClick={onClose} className="w-full mt-5 bg-border hover:bg-border-strong text-heading font-medium py-2 rounded-xl transition-all text-sm">
          Close
        </button>
      </div>
    </div>
  );
}
