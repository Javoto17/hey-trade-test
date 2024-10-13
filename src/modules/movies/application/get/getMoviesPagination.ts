import { MovieRepository } from '../../domain/MovieRepository';

export const getMoviesPagination =
  (moviesRepository: MovieRepository) =>
  async (page: number = 1) => {
    const data = await moviesRepository.getTrendingMoviesPagination(page);

    return data;
  };
