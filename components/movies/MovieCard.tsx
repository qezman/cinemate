'use client';

import Image from 'next/image';
import Link from 'next/link';
import { buildImageUrl } from '@/lib/tmdb/image';
import { useTilt } from '@/hooks/useTilt';
import type { Movie } from '@/types/movie';

export function MovieCard({ movie }: { movie: Movie }) {
  const tilt = useTilt<HTMLDivElement>();
  const poster = buildImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4) ?? '—';

  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="aspect-[2/3] overflow-hidden rounded-sm bg-ink-raised transition-transform duration-150 ease-out"
      >
        {poster ? (
          <Image
            src={poster}
            alt={movie.title}
            width={342}
            height={513}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-caption text-text-soft">
            No poster
          </div>
        )}
      </div>

      <h3 className="mt-3 truncate font-semibold group-hover:text-wine-text">{movie.title}</h3>
      <p className="font-mono text-caption text-text-soft">
        {year} · {movie.vote_average.toFixed(1)}
      </p>
    </Link>
  );
}
