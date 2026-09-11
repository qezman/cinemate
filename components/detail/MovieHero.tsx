import Image from 'next/image';
import { buildImageUrl } from '@/lib/tmdb/image';
import type { MovieDetail } from '@/types/movie';

export function MovieHero({ movie }: { movie: MovieDetail }) {
  const backdrop = buildImageUrl(movie.backdrop_path, 'w1280');
  const year = movie.release_date?.slice(0, 4) ?? '—';

  return (
    <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
      {backdrop && <Image src={backdrop} alt="" fill priority className="object-cover" />}

      {/* solid at the bottom where the title sits, fading up over the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-6xl px-6 pb-8">
          <h1 className="font-display text-headline">{movie.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-caption text-text-soft">
            <span>{year}</span>
            <span>·</span>
            <span>{movie.runtime} min</span>
            {movie.genres.length > 0 && (
              <>
                <span>·</span>
                <span>{movie.genres.map((genre) => genre.name).join(', ')}</span>
              </>
            )}
            <span className="rounded-full bg-wine-dim px-3 py-1 text-wine-text">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
