# Cinemate

A film discovery app built on TMDB's free API. Editorial, poster-forward design -
one real 3D moment in the hero, everything else flat and fast.

## Getting started

1. Copy `.env.example` to `.env.local` and add a TMDB v4 read access token
   (free, from themoviedb.org/settings/api).
2. `npm install`
3. `npm run dev`

## Why no accounts or database

The watchlist lives entirely in `localStorage` (see `hooks/useWatchlist.ts`).
That's a deliberate choice, not a shortcut: it's low-stakes personal data with
no real need to sync across devices at this scale, it costs nothing to run,
and it means the app is honestly true when it says "no account required."
