"use client";

import { useSettings } from "./SettingsProvider";
import { FontSize, Theme } from "@/lib/settings";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const themes: { value: Theme; label: string; icon: string }[] = [
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "light", label: "Light", icon: "☀️" },
];

const fontSizes: { value: FontSize; label: string; preview: string }[] = [
  { value: "small", label: "Small", preview: "A" },
  { value: "medium", label: "Medium", preview: "A" },
  { value: "large", label: "Large", preview: "A" },
];

export default function SettingsPanel({ isOpen, onClose }: Props) {
  const {
    theme,
    fontSize,
    showLetterCount,
    autoScroll,
    setTheme,
    setFontSize,
    toggleLetterCount,
    toggleAutoScroll,
  } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-heading">Settings</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-heading transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Theme */}
        <div className="mb-5">
          <label className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 block">
            Theme
          </label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  theme === t.value
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "card-inset border-border text-body hover:text-heading"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-5">
          <label className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 block">
            Article font size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {fontSizes.map((f) => (
              <button
                key={f.value}
                onClick={() => setFontSize(f.value)}
                className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-sm transition-all ${
                  fontSize === f.value
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "card-inset border-border text-body hover:text-heading"
                }`}
              >
                <span
                  className="font-serif font-bold"
                  style={{
                    fontSize:
                      f.value === "small"
                        ? "14px"
                        : f.value === "medium"
                          ? "18px"
                          : "24px",
                  }}
                >
                  {f.preview}
                </span>
                <span className="text-[10px] mt-0.5 opacity-60">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <label className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Options
          </label>

          <div className="flex items-center justify-between">
            <span className="text-sm text-body">Show letter count on click</span>
            <button
              onClick={toggleLetterCount}
              className={`w-10 h-6 rounded-full transition-all relative ${
                showLetterCount ? "bg-accent" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                  showLetterCount ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-body">Auto-scroll to matches</span>
            <button
              onClick={toggleAutoScroll}
              className={`w-10 h-6 rounded-full transition-all relative ${
                autoScroll ? "bg-accent" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                  autoScroll ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-accent hover:bg-accent-hover text-accent-fg font-medium py-2.5 rounded-xl transition-all text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
}
