import type { Video } from '@/types/movie';

export function TrailerEmbed({ videos }: { videos: Video[] }) {
  const trailer = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
  if (!trailer) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-sm bg-ink-raised">
      <iframe
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
