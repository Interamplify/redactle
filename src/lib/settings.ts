export type Theme = "auto" | "dark" | "light";
export type FontSize = "small" | "medium" | "large";

export interface Settings {
  theme: Theme;
  fontSize: FontSize;
  showLetterCount: boolean;
  autoScroll: boolean;
}

const STORAGE_KEY = "redactle-settings";

const DEFAULTS: Settings = {
  theme: "auto",
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

/** Resolve "auto" to actual dark/light based on system preference */
export function resolveTheme(theme: Theme): "dark" | "light" {
  if (theme !== "auto") return theme;
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export const FONT_SIZES: Record<FontSize, string> = {
  small: "13px",
  medium: "15px",
  large: "18px",
};
