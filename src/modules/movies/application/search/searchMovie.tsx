import { MovieRepository } from '../../domain/MovieRepository';

export const searchMovies =
  (moviesRepository: MovieRepository) =>
  async (query: string, page: number = 1) => {
    const data = await moviesRepository.searchMoviesPagination(query, page);

    return data;
  };
