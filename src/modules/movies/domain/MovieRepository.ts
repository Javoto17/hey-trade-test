import { Movie } from './Movie';
import { MovieDetail } from './MovieDetail';

export interface MovieRepository {
  getTrendingMovies: () => Promise<Array<Movie>>;
  getDetailMovie: (movieId: number) => Promise<MovieDetail | null>;
}
