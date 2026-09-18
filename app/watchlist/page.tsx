'use client';

import { useEffect, useState } from 'react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { getMovie } from '@/lib/tmdb/endpoints';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Movie, MovieDetail } from '@/types/movie';

export default function WatchlistPage() {
  const { ids, toggle } = useWatchlist();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.all(ids.map((id) => getMovie(String(id)).catch(() => null))).then((results) => {
      if (!cancelled) {
        setMovies(results.filter((movie): movie is MovieDetail => movie !== null));
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
    // ids is an array - depend on its actual values, not the reference,
    // so a fresh (but identical) array doesn't refetch everything again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 font-display text-headline">Your watchlist</h1>

      {loading ? (
        <p className="text-text-soft">Loading your watchlist...</p>
      ) : movies.length === 0 ? (
        <EmptyState message="Nothing saved yet." actionLabel="Browse films" actionHref="/" />
      ) : (
        <MovieGrid movies={movies} onRemove={toggle} />
      )}
    </div>
  );
}
