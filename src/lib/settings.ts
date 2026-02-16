export type Theme = "dark" | "light";
export type FontSize = "small" | "medium" | "large";

export interface Settings {
  theme: Theme;
  fontSize: FontSize;
  showLetterCount: boolean;
  autoScroll: boolean;
}

const STORAGE_KEY = "redactle-settings";

const DEFAULTS: Settings = {
  theme: "dark",
  fontSize: "medium",
  showLetterCount: true,
  autoScroll: true,
};

export function getSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export function saveSettings(settings: Settings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export const FONT_SIZES: Record<FontSize, string> = {
  small: "13px",
  medium: "15px",
  large: "18px",
};
