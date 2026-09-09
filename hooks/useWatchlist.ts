"use client";

import { useCallback, useEffect, useState } from "react";
import type { WatchlistEntry } from "@/types/watchlist";

const STORAGE_KEY = "cinemate-watchlist";

// The only place in the app that touches localStorage.
function readStorage(): WatchlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(entries: WatchlistEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage unavailable (private browsing, quota) - fail silently
  }
}

export function useWatchlist() {
  const [entries, setEntries] = useState<WatchlistEntry[]>([]);

  useEffect(() => {
    setEntries(readStorage());
  }, []);

  const isSaved = useCallback(
    (id: number) => entries.some((entry) => entry.id === id),
    [entries],
  );

  const toggle = useCallback((id: number) => {
    setEntries((current) => {
      const next = current.some((entry) => entry.id === id)
        ? current.filter((entry) => entry.id !== id)
        : [...current, { id, addedAt: Date.now() }];
      writeStorage(next);
      return next;
    });
  }, []);

  return { ids: entries.map((entry) => entry.id), isSaved, toggle };
}
