"use client";

import { useState, useEffect } from "react";
import { getStreak } from "@/lib/streak";
import StatsPanel from "./StatsBar";
import SettingsPanel from "./SettingsPanel";

export default function HeaderNav() {
  const [streak, setStreak] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setStreak(getStreak().current);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <header className="border-b border-border sticky top-0 bg-bg/95 backdrop-blur-xl z-40 transition-colors duration-300">
        <div className="max-w-3xl lg:max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          {/* Logo - this is the h1 of every page */}
          <a href="/" className="shrink-0">
            <h1 className="text-lg font-bold tracking-tight m-0">
              <span className="text-accent">Re</span>
              <span className="text-muted">dactle</span>
            </h1>
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1 text-sm">
            <a href="/" className="nav-link">Daily</a>
            <a href="/play" className="nav-link">New Game</a>
            <a href="/archive" className="nav-link">Archive</a>
            <a href="/how-to-play" className="nav-link">Help</a>

            <div className="w-px h-4 bg-border mx-1" />

            {/* Settings */}
            <button onClick={() => setShowSettings(true)} className="nav-icon" title="Settings">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>

            {/* Stats */}
            <button onClick={() => setShowStats(true)} className="nav-icon flex items-center gap-1.5" title="Stats">
              {streak > 0 && <span className="text-[11px] text-accent font-medium">🔥{streak}</span>}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
              </svg>
            </button>
          </nav>

          {/* Mobile right side */}
          <div className="flex sm:hidden items-center gap-1">
            {streak > 0 && <span className="text-[11px] text-accent mr-1">🔥{streak}</span>}
            <button onClick={() => setShowSettings(true)} className="nav-icon-mobile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button onClick={() => setShowStats(true)} className="nav-icon-mobile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
              </svg>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-icon-mobile" aria-label="Menu">
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-border bg-bg px-4 py-2 space-y-0.5 animate-in">
            {[
              { href: "/", label: "Daily Puzzle" },
              { href: "/play", label: "New Game" },
              { href: "/archive", label: "Archive" },
              { href: "/how-to-play", label: "How to Play" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-body hover:text-heading py-2.5 px-3 rounded-lg hover:bg-bg-elevated transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <StatsPanel isOpen={showStats} onClose={() => setShowStats(false)} />
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}
