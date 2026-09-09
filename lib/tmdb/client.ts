// Server components need a full URL to fetch our own API route;
// the browser can just use a relative path.
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const onServer = typeof window === "undefined";
  const url = `${onServer ? getBaseUrl() : ""}/api/tmdb${path}${query ? `?${query}` : ""}`;

  const res = await fetch(url, onServer ? { cache: "no-store" } : undefined);
  if (!res.ok) throw new Error(`TMDB request failed (${res.status}): ${path}`);
  return res.json();
}
