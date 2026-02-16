import { Metadata } from "next";
import { getPuzzleNumber } from "@/lib/articles";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Puzzle Archive",
  description: "Browse and play all past Redactle puzzles.",
};

export default function ArchivePage() {
  const current = getPuzzleNumber();
  const puzzles = Array.from({ length: current }, (_, i) => current - i);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-heading mb-0.5">Archive</h2>
        <p className="text-muted text-xs">{current} puzzles</p>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-1.5">
        {puzzles.map((n) => (
          <Link
            key={n}
            href={n === current ? "/" : `/${n}`}
            className={`flex flex-col items-center justify-center py-2.5 rounded-lg border text-center transition-all ${
              n === current
                ? "bg-accent-soft border-accent/20 text-accent"
                : "bg-bg-elevated border-border text-muted hover:text-heading hover:border-border-strong"
            }`}
          >
            <span className="text-xs font-semibold tabular-nums">{n}</span>
            {n === current && (
              <span className="text-[7px] text-accent font-bold uppercase mt-0.5">Today</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
