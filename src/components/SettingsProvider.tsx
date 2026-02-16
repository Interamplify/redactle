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
  FONT_SIZES,
} from "@/lib/settings";

interface SettingsCtx extends Settings {
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

  useEffect(() => {
    setSettings(getSettings());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveSettings(settings);

    // Apply theme class
    const root = document.documentElement;
    root.setAttribute("data-theme", settings.theme);

    // Apply font size
    root.style.setProperty("--article-font-size", FONT_SIZES[settings.fontSize]);
  }, [settings, mounted]);

  const ctx: SettingsCtx = {
    ...settings,
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setFontSize: (fontSize) => setSettings((s) => ({ ...s, fontSize })),
    toggleLetterCount: () =>
      setSettings((s) => ({ ...s, showLetterCount: !s.showLetterCount })),
    toggleAutoScroll: () =>
      setSettings((s) => ({ ...s, autoScroll: !s.autoScroll })),
  };

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
