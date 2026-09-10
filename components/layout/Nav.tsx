"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/watchlist", label: "Watchlist" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl italic"
          onClick={() => setOpen(false)}
        >
          Cinemate
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-wine-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-text transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-text transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 text-sm font-medium md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 hover:text-wine-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
