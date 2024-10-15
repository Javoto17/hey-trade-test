import { MovieRepository } from '../../domain/MovieRepository';

export const removeFavorite =
  (moviesRepository: MovieRepository) => async (movieId: number) => {
    return moviesRepository.removeFavorite(movieId);
  };
