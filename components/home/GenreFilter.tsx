'use client';

import { useEffect, useState } from 'react';
import { getGenres } from '@/lib/tmdb/endpoints';
import type { Genre } from '@/types/movie';

interface GenreFilterProps {
  activeGenre: string | null;
  onSelect: (genreId: string | null) => void;
}

export function GenreFilter({ activeGenre, onSelect }: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]));
  }, []);

  return (
    <div className="sticky top-[65px] z-30 flex flex-wrap gap-2 bg-ink py-4">
      <Pill label="All" active={activeGenre === null} onClick={() => onSelect(null)} />
      {genres.map((genre) => (
        <Pill
          key={genre.id}
          label={genre.name}
          active={activeGenre === String(genre.id)}
          onClick={() => onSelect(String(genre.id))}
        />
      ))}
    </div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active
          ? 'border-wine-dim bg-wine-dim text-wine-text'
          : 'border-border text-text-soft hover:border-border-strong'
      }`}
    >
      {label}
    </button>
  );
}
