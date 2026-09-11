'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/');
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a film..."
        className="w-full rounded-sm bg-paper-raised px-5 py-3.5 text-text-on-paper placeholder:text-text-on-paper-soft focus:outline-none focus:ring-1 focus:ring-wine-on-paper"
      />
    </form>
  );
}
