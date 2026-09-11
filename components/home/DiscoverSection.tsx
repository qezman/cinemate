'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GenreFilter } from './GenreFilter';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { useMovies } from '@/hooks/useMovies';
import { discoverMovies, searchMovies } from '@/lib/tmdb/endpoints';

export function DiscoverSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const { movies, loading, error } = useMovies(
    () => (query ? searchMovies(query) : discoverMovies(activeGenre ?? undefined)),
    [query, activeGenre],
  );

  return (
    <div>
      {query ? (
        <p className="mb-6 text-text-soft">Results for &ldquo;{query}&rdquo;</p>
      ) : (
        <GenreFilter activeGenre={activeGenre} onSelect={setActiveGenre} />
      )}

      {loading && <p className="py-12 text-text-soft">Loading films...</p>}
      {error && <p className="py-12 text-wine-text">Couldn&apos;t load films - try again in a moment.</p>}
      {!loading && !error && <MovieGrid movies={movies} />}
    </div>
  );
}
