'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import { getTrending } from '@/lib/tmdb/endpoints';
import { buildImageUrl } from '@/lib/tmdb/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PosterFanScene } from './PosterFanScene';
import { PosterFanFallback } from './PosterFanFallback';

const POSTER_COUNT = 7;

// Catches WebGL context-creation failures so a bad device falls back
// to the static collage instead of taking the whole page down.
class CanvasBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function Hero() {
  const [posterUrls, setPosterUrls] = useState<string[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    getTrending()
      .then((data) => {
        const urls = data.results
          .slice(0, POSTER_COUNT)
          .map((movie) => buildImageUrl(movie.poster_path, 'w500'))
          .filter((url): url is string => Boolean(url));
        setPosterUrls(urls);
      })
      .catch(() => setPosterUrls([]));
  }, []);

  if (posterUrls.length === 0) return null;
  if (reducedMotion) return <PosterFanFallback urls={posterUrls} />;

  return (
    <CanvasBoundary fallback={<PosterFanFallback urls={posterUrls} />}>
      <PosterFanScene urls={posterUrls} />
    </CanvasBoundary>
  );
}
