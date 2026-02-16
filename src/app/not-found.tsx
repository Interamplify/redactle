import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-border-strong mb-3">404</h1>
      <p className="text-muted mb-5 text-sm">This puzzle doesn&apos;t exist yet.</p>
      <Link
        href="/"
        className="bg-accent hover:bg-accent-hover text-accent-fg font-medium px-5 py-2.5 rounded-xl transition-all text-sm"
      >
        Play today&apos;s puzzle
      </Link>
    </div>
  );
}
