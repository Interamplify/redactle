// Streak management with cookies/localStorage

export interface StreakData {
  current: number;
  best: number;
  lastPlayedDate: string; // YYYY-MM-DD
  gamesPlayed: number;
  gamesWon: number;
  totalGuesses: number;
}

const STORAGE_KEY = "redactle-streak";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") {
    return {
      current: 0,
      best: 0,
      lastPlayedDate: "",
      gamesPlayed: 0,
      gamesWon: 0,
      totalGuesses: 0,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        current: 0,
        best: 0,
        lastPlayedDate: "",
        gamesPlayed: 0,
        gamesWon: 0,
        totalGuesses: 0,
      };
    }

    const data: StreakData = JSON.parse(raw);

    // If the last played date is before yesterday, streak is broken
    const today = getToday();
    const yesterday = getYesterday();
    if (
      data.lastPlayedDate !== today &&
      data.lastPlayedDate !== yesterday
    ) {
      data.current = 0;
    }

    return data;
  } catch {
    return {
      current: 0,
      best: 0,
      lastPlayedDate: "",
      gamesPlayed: 0,
      gamesWon: 0,
      totalGuesses: 0,
    };
  }
}

export function recordWin(guessCount: number): StreakData {
  const streak = getStreak();
  const today = getToday();

  // Don't double-count same day
  if (streak.lastPlayedDate === today) return streak;

  streak.gamesPlayed += 1;
  streak.gamesWon += 1;
  streak.totalGuesses += guessCount;
  streak.current += 1;
  if (streak.current > streak.best) {
    streak.best = streak.current;
  }
  streak.lastPlayedDate = today;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(streak));

  // Also set a cookie for SSR access
  document.cookie = `redactle-streak=${streak.current}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

  return streak;
}

export function recordLoss(): StreakData {
  const streak = getStreak();
  const today = getToday();

  if (streak.lastPlayedDate === today) return streak;

  streak.gamesPlayed += 1;
  streak.current = 0;
  streak.lastPlayedDate = today;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(streak));
  document.cookie = `redactle-streak=0; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

  return streak;
}
