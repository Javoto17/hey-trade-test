import { MovieRepository } from '../../domain/MovieRepository';

export const getAllFavorites =
  (moviesRepository: MovieRepository) => async () => {
    return await moviesRepository.getAllFavorites();
  };
