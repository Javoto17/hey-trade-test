import { MovieRepository } from '../../domain/MovieRepository';

export const getMovieDetail =
  (moviesRepository: MovieRepository) => async (movieId: number) => {
    const data = await moviesRepository.getDetailMovie(movieId);

    return data;
  };
