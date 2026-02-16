"use client";

import { Guess } from "@/lib/game";

interface Props {
  guesses: Guess[];
}

export default function GuessList({ guesses }: Props) {
  if (guesses.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5 px-1">
        Guesses ({guesses.length})
      </h3>
      <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
        {[...guesses].reverse().map((g) => (
          <div
            key={g.index}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm ${
              g.hits > 0 ? "bg-success-soft" : "bg-bg-elevated"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-faint text-[11px] font-mono w-5 text-right">{g.index}</span>
              <span className={g.hits > 0 ? "text-success font-medium" : "text-muted"}>
                {g.word}
              </span>
            </span>
            <span className={`text-[11px] font-mono tabular-nums ${g.hits > 0 ? "text-success" : "text-faint"}`}>
              {g.hits}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
