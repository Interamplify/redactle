"use client";

interface Props {
  title: string;
  guessCount: number;
  puzzleNumber: number;
  isRandom?: boolean;
  streak?: number;
  onNewGame: () => void;
  onClose: () => void;
}

export default function WinModal({
  title,
  guessCount,
  puzzleNumber,
  isRandom = false,
  streak = 0,
  onNewGame,
  onClose,
}: Props) {
  const shareText = isRandom
    ? `Redactle Free Play — "${title}" in ${guessCount} guesses${streak > 1 ? ` 🔥${streak}` : ""}`
    : `Redactle #${puzzleNumber} — ${guessCount} guesses${streak > 1 ? ` 🔥${streak}` : ""}`;

  const handleShare = () => {
    if (navigator.share) navigator.share({ text: shareText });
    else navigator.clipboard.writeText(shareText);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card rounded-2xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl animate-in">
        <div className="text-3xl mb-3">{streak > 1 ? "🔥" : "🎉"}</div>
        <h2 className="text-lg font-bold text-heading mb-0.5">Solved!</h2>
        <p className="text-muted text-xs mb-1">The article was</p>
        <p className="text-xl font-bold text-accent mb-4">{title}</p>

        <div className="card-inset rounded-xl p-4 mb-5">
          <div className={`grid ${streak > 0 ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
            <div>
              <div className="text-xl font-bold text-heading tabular-nums">{guessCount}</div>
              <div className="text-[9px] text-muted uppercase tracking-wide">Guesses</div>
            </div>
            <div>
              <div className="text-xl font-bold text-heading">
                {isRandom ? "Free" : `#${puzzleNumber}`}
              </div>
              <div className="text-[9px] text-muted uppercase tracking-wide">
                {isRandom ? "Mode" : "Puzzle"}
              </div>
            </div>
            {streak > 0 && (
              <div>
                <div className="text-xl font-bold text-accent tabular-nums">{streak}</div>
                <div className="text-[9px] text-muted uppercase tracking-wide">Streak</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 bg-accent hover:bg-accent-hover text-accent-fg font-semibold py-2.5 rounded-xl transition-all active:scale-[0.97] text-sm"
          >
            Share
          </button>
          <button
            onClick={onNewGame}
            className="flex-1 bg-border hover:bg-border-strong text-heading font-semibold py-2.5 rounded-xl transition-all active:scale-[0.97] text-sm"
          >
            {isRandom ? "Play again" : "New game"}
          </button>
        </div>

        <button onClick={onClose} className="mt-2.5 text-muted hover:text-body text-xs transition-colors">
          Keep reading
        </button>
      </div>
    </div>
  );
}
