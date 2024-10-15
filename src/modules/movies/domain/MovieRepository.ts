import { Movie } from './Movie';
import { MovieDetail } from './MovieDetail';
import { MoviePagination } from './MoviePagination';

export interface MovieRepository {
  getTrendingMovies: () => Promise<Array<Movie>>;
  getDetailMovie: (movieId: number) => Promise<MovieDetail | null>;
  getTrendingMoviesPagination: (page: number) => Promise<MoviePagination>;
  saveFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
  getIsFavorite: (movieId: number) => Promise<boolean>;
  getAllFavorites: () => Promise<Movie[]>;
}
