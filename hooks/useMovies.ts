"use client";

import { useEffect, useState } from "react";
import type { Movie, Paginated } from "@/types/movie";

interface UseMoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

// Wraps any paginated TMDB fetch (discover, search, trending) with
// loading/error state, and refetches whenever `deps` changes.
export function useMovies(
  fetcher: () => Promise<Paginated<Movie>>,
  deps: unknown[],
): UseMoviesState {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled)
          setState({ movies: data.results, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled)
          setState({ movies: [], loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}
