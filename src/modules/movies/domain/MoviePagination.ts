import { Movie } from './Movie';

export interface MoviePagination {
  page: number;
  results: Movie[];
  nextCursor: number | null;
}
