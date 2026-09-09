const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w200' | 'w342' | 'w500' | 'original';
export type BackdropSize = 'w780' | 'w1280' | 'original';

export function buildImageUrl(path: string | null, size: PosterSize | BackdropSize): string | null {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}
