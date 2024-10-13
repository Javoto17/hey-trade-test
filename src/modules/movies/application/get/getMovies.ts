import { MovieRepository } from '../../domain/MovieRepository';

export const getMovies = (moviesRepository: MovieRepository) => async () => {
  const data = await moviesRepository.getTrendingMovies();

  return data;
};
