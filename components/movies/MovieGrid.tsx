import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/movie';

export function MovieGrid({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return <p className="text-text-soft">No films to show yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
