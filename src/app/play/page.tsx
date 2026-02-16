import { Metadata } from "next";
import PlayClient from "./PlayClient";

export const metadata: Metadata = {
  title: "Free Play - Choose your Redactle puzzle",
  description:
    "Play unlimited Redactle puzzles. Choose a category, difficulty, and start guessing hidden Wikipedia articles.",
};

export default function PlayPage() {
  return <PlayClient />;
}
