import { Movie } from '../../domain/Movie';
import { MovieRepository } from '../../domain/MovieRepository';

export const saveFavorite =
  (moviesRepository: MovieRepository) => async (movie: Movie) => {
    return moviesRepository.saveFavorite(movie);
  };
