import { MovieRepository } from '../../domain/MovieRepository';

export const getIsFavorite =
  (moviesRepository: MovieRepository) => async (movieId: number) => {
    return moviesRepository.getIsFavorite(movieId);
  };
