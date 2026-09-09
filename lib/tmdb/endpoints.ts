import { tmdbFetch } from './client';
import type { Cast, Genre, Movie, MovieDetail, Paginated, Video } from '@/types/movie';

export function getTrending() {
  return tmdbFetch<Paginated<Movie>>('/trending/movie/week');
}

export function getGenres() {
  return tmdbFetch<{ genres: Genre[] }>('/genre/movie/list').then((data) => data.genres);
}

export function discoverMovies(genreId?: string, page = 1) {
  return tmdbFetch<Paginated<Movie>>('/discover/movie', {
    sort_by: 'popularity.desc',
    page: String(page),
    ...(genreId ? { with_genres: genreId } : {}),
  });
}

export function searchMovies(query: string, page = 1) {
  return tmdbFetch<Paginated<Movie>>('/search/movie', { query, page: String(page) });
}

export function getMovie(id: string) {
  return tmdbFetch<MovieDetail>(`/movie/${id}`);
}

export function getCredits(id: string) {
  return tmdbFetch<{ cast: Cast[] }>(`/movie/${id}/credits`).then((data) => data.cast);
}

export function getVideos(id: string) {
  return tmdbFetch<{ results: Video[] }>(`/movie/${id}/videos`).then((data) => data.results);
}

export function getRecommendations(id: string) {
  return tmdbFetch<Paginated<Movie>>(`/movie/${id}/recommendations`);
}
