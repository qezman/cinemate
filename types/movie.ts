export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: Genre[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  key: string;
  type: string;
  site: string;
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
}
