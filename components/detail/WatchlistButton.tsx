"use client";

import { useWatchlist } from "@/hooks/useWatchlist";

export function WatchlistButton({ movieId }: { movieId: number }) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(movieId);

  return (
    <button
      onClick={() => toggle(movieId)}
      className="flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:border-wine-text"
    >
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        className={saved ? "text-wine-text" : ""}
      >
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
      </svg>
      {saved ? "Saved" : "Add to watchlist"}
    </button>
  );
}
