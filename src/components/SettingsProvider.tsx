"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Settings,
  Theme,
  FontSize,
  getSettings,
  saveSettings,
  resolveTheme,
  FONT_SIZES,
} from "@/lib/settings";

interface SettingsCtx extends Settings {
  resolvedTheme: "dark" | "light";
  setTheme: (t: Theme) => void;
  setFontSize: (f: FontSize) => void;
  toggleLetterCount: () => void;
  toggleAutoScroll: () => void;
}

const Ctx = createContext<SettingsCtx | null>(null);

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export default function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(getSettings);
  const [mounted, setMounted] = useState(false);
  const [systemDark, setSystemDark] = useState(true);

  useEffect(() => {
    setSettings(getSettings());
    setMounted(true);

    // Listen for system color scheme changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedTheme: "dark" | "light" =
    settings.theme === "auto" ? (systemDark ? "dark" : "light") : settings.theme;

  useEffect(() => {
    if (!mounted) return;
    saveSettings(settings);

    // Apply resolved theme
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);

    // Apply font size
    root.style.setProperty("--article-font-size", FONT_SIZES[settings.fontSize]);
  }, [settings, mounted, resolvedTheme]);

  const ctx: SettingsCtx = {
    ...settings,
    resolvedTheme,
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setFontSize: (fontSize) => setSettings((s) => ({ ...s, fontSize })),
    toggleLetterCount: () =>
      setSettings((s) => ({ ...s, showLetterCount: !s.showLetterCount })),
    toggleAutoScroll: () =>
      setSettings((s) => ({ ...s, autoScroll: !s.autoScroll })),
  };

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
