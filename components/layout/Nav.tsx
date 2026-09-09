import Link from 'next/link';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl italic">
          Cinemate
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-wine-text">
            Home
          </Link>
          <Link href="/watchlist" className="hover:text-wine-text">
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
