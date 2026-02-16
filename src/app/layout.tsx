import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import SettingsProvider from "@/components/SettingsProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Redactle - Daily Wikipedia Guessing Game",
    template: "%s | Redactle",
  },
  description:
    "Guess the hidden Wikipedia article by revealing redacted words. A new puzzle every day. How many guesses will it take you?",
  keywords: [
    "redactle", "word game", "puzzle", "wikipedia",
    "guessing game", "daily puzzle", "wordle",
  ],
  openGraph: {
    title: "Redactle - Daily Wikipedia Guessing Game",
    description: "Guess the hidden Wikipedia article by revealing redacted words!",
    type: "website",
    locale: "en_US",
    siteName: "Redactle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redactle - Daily Wikipedia Guessing Game",
    description: "Guess the hidden Wikipedia article by revealing redacted words!",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-bg text-body min-h-screen transition-colors duration-300`}
      >
        <SettingsProvider>
          <HeaderNav />
          <main className="max-w-3xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
            {children}
          </main>
          <footer className="border-t border-border mt-16">
            <div className="max-w-3xl lg:max-w-6xl mx-auto px-4 py-5 text-center text-xs text-muted">
              Articles from{" "}
              <a
                href="https://en.wikipedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-heading transition-colors underline underline-offset-2"
              >
                Wikipedia
              </a>
            </div>
          </footer>
        </SettingsProvider>
      </body>
    </html>
  );
}
