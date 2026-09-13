const TMDB_BASE = 'https://api.themoviedb.org/3';

// Server components call TMDB directly - no reason to round-trip through
// our own API route when we're already on the server. The browser still
// only ever sees /api/tmdb, so the read token never ships to the client.
export async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const onServer = typeof window === 'undefined';
  const queryString = query ? `?${query}` : '';

  const url = onServer ? `${TMDB_BASE}${path}${queryString}` : `/api/tmdb${path}${queryString}`;

  const res = await fetch(url, {
    ...(onServer && {
      headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`, Accept: 'application/json' },
    }),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`TMDB request failed (${res.status}): ${path}`);
  return res.json();
}
