"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  onGuess: (word: string) => void;
  disabled: boolean;
}

export default function GuessInput({ onGuess, disabled }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onGuess(trimmed);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 h-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={disabled ? "Puzzle complete!" : "Type a word..."}
        disabled={disabled}
        className="flex-1 bg-bg-elevated border border-border rounded-xl px-4 py-2.5 text-heading placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/50 transition-all disabled:opacity-40 text-[15px]"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="bg-accent hover:bg-accent-hover disabled:bg-border disabled:text-muted text-accent-fg font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.97] text-sm"
      >
        Guess
      </button>
    </form>
  );
}
