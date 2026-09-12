import { notFound } from 'next/navigation';
import { MovieHero } from '@/components/detail/MovieHero';
import { CastRow } from '@/components/detail/CastRow';
import { TrailerEmbed } from '@/components/detail/TrailerEmbed';
import { WatchlistButton } from '@/components/detail/WatchlistButton';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { getCredits, getMovie, getRecommendations, getVideos } from '@/lib/tmdb/endpoints';

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id).catch(() => null);
  if (!movie) notFound();

  const [cast, videos, recommendations] = await Promise.all([
    getCredits(params.id).catch(() => []),
    getVideos(params.id).catch(() => []),
    getRecommendations(params.id).catch(() => ({ page: 1, results: [], total_pages: 0 })),
  ]);

  return (
    <div>
      <MovieHero movie={movie} />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="max-w-[640px]">{movie.overview}</p>

        <div className="mt-6">
          <WatchlistButton movieId={movie.id} />
        </div>

        {videos.length > 0 && (
          <section className="mt-12">
            <TrailerEmbed videos={videos} />
          </section>
        )}

        {cast.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-title">Cast</h2>
            <CastRow cast={cast} />
          </section>
        )}

        {recommendations.results.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-title">If you liked this</h2>
            <MovieGrid movies={recommendations.results.slice(0, 6)} />
          </section>
        )}
      </div>
    </div>
  );
}
