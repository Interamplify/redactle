// Common English words that stay visible (not redacted)
export const COMMON_WORDS = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "no",
  "just",
  "him",
  "know",
  "take",
  "come",
  "could",
  "than",
  "been",
  "its",
  "over",
  "such",
  "how",
  "some",
  "them",
  "into",
  "other",
  "then",
  "these",
  "two",
  "may",
  "was",
  "were",
  "has",
  "had",
  "are",
  "is",
  "also",
  "more",
  "after",
  "most",
  "between",
  "during",
  "each",
  "those",
  "being",
  "where",
  "both",
  "through",
  "very",
  "before",
  "while",
  "should",
  "any",
  "only",
  "because",
  "does",
  "did",
]);

export interface WordToken {
  text: string;
  isWord: boolean;
  normalized: string;
  revealed: boolean;
  guessIndex: number | null; // which guess revealed it
}

export interface Guess {
  word: string;
  hits: number;
  index: number;
}

// Simple stemmer - reduces words to approximate root form
function simpleStem(word: string): string {
  let w = word.toLowerCase();
  // Handle common suffixes
  if (w.endsWith("ies") && w.length > 4)
    return w.slice(0, -3) + "y";
  if (w.endsWith("ied") && w.length > 4)
    return w.slice(0, -3) + "y";
  if (w.endsWith("ing") && w.length > 5)
    return w.slice(0, -3);
  if (w.endsWith("tion") && w.length > 5)
    return w.slice(0, -4) + "t";
  if (w.endsWith("sion") && w.length > 5)
    return w.slice(0, -4) + "d";
  if (w.endsWith("ment") && w.length > 5)
    return w.slice(0, -4);
  if (w.endsWith("ness") && w.length > 5)
    return w.slice(0, -4);
  if (w.endsWith("able") && w.length > 5)
    return w.slice(0, -4);
  if (w.endsWith("ible") && w.length > 5)
    return w.slice(0, -4);
  if (w.endsWith("ous") && w.length > 4)
    return w.slice(0, -3);
  if (w.endsWith("ive") && w.length > 4)
    return w.slice(0, -3);
  if (w.endsWith("ful") && w.length > 4)
    return w.slice(0, -3);
  if (w.endsWith("less") && w.length > 5)
    return w.slice(0, -4);
  if (w.endsWith("ly") && w.length > 4)
    return w.slice(0, -2);
  if (w.endsWith("ed") && w.length > 4)
    return w.slice(0, -2);
  if (w.endsWith("er") && w.length > 4)
    return w.slice(0, -2);
  if (w.endsWith("est") && w.length > 4)
    return w.slice(0, -3);
  if (w.endsWith("es") && w.length > 4)
    return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3)
    return w.slice(0, -1);
  return w;
}

export function tokenizeText(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  // Split into words and non-words (preserving spaces, punctuation, etc.)
  const parts = text.split(/(\b)/);

  for (const part of parts) {
    if (part === "") continue;
    const isWord = /^[a-zA-Z]+$/.test(part);
    const normalized = part.toLowerCase();
    const isCommon = COMMON_WORDS.has(normalized);

    tokens.push({
      text: part,
      isWord,
      normalized,
      revealed: !isWord || isCommon,
      guessIndex: null,
    });
  }

  return tokens;
}

export function processGuess(
  tokens: WordToken[],
  guess: string,
  guessIndex: number
): { tokens: WordToken[]; hits: number } {
  const guessLower = guess.toLowerCase().trim();
  const guessStem = simpleStem(guessLower);
  let hits = 0;

  const newTokens = tokens.map((token) => {
    if (!token.isWord || token.revealed) return token;

    const tokenStem = simpleStem(token.normalized);

    // Match exact or by stem
    if (token.normalized === guessLower || tokenStem === guessStem) {
      hits++;
      return { ...token, revealed: true, guessIndex };
    }

    return token;
  });

  return { tokens: newTokens, hits };
}

export function checkWin(
  title: string,
  tokens: WordToken[]
): boolean {
  // Extract title words
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => /^[a-zA-Z]+$/.test(w) && !COMMON_WORDS.has(w));

  if (titleWords.length === 0) return true;

  // Check if all title words have been revealed somewhere in the tokens
  const revealedWords = new Set(
    tokens
      .filter((t) => t.isWord && t.revealed && !COMMON_WORDS.has(t.normalized))
      .map((t) => t.normalized)
  );

  return titleWords.every((word) => {
    const wordStem = simpleStem(word);
    return Array.from(revealedWords).some(
      (revealed) => revealed === word || simpleStem(revealed) === wordStem
    );
  });
}

export function getStats() {
  if (typeof window === "undefined") return { gamesPlayed: 0, gamesWon: 0, avgGuesses: 0 };
  try {
    const stats = JSON.parse(localStorage.getItem("redactle-stats") || "{}");
    return {
      gamesPlayed: stats.gamesPlayed || 0,
      gamesWon: stats.gamesWon || 0,
      avgGuesses: stats.avgGuesses || 0,
    };
  } catch {
    return { gamesPlayed: 0, gamesWon: 0, avgGuesses: 0 };
  }
}

export function saveStats(guesses: number, won: boolean) {
  if (typeof window === "undefined") return;
  const stats = getStats();
  stats.gamesPlayed += 1;
  if (won) {
    stats.gamesWon += 1;
    const totalGuesses = stats.avgGuesses * (stats.gamesWon - 1) + guesses;
    stats.avgGuesses = Math.round(totalGuesses / stats.gamesWon);
  }
  localStorage.setItem("redactle-stats", JSON.stringify(stats));
}
