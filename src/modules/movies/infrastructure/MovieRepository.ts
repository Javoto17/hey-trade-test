import { ClientRepository } from '@/src/modules/client/domain/ClientRepository';
import { MovieRepository } from '../domain/MovieRepository';
import { Movie } from '../domain/Movie';
import { MovieDetail } from '../domain/MovieDetail';

interface GetTrendingMoviesResponse {
  page: number;
  results: Movie[];
}

export function generateMoviesRepository(
  clientRepository: ClientRepository
): MovieRepository {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  return {
    getTrendingMovies: async (locale = 'es-ES'): Promise<Movie[]> => {
      try {
        const data = await clientRepository.get<GetTrendingMoviesResponse>(
          API_URL + `trending/movie/day?language=${locale}`
        );

        return data?.results;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    getDetailMovie: async (
      movieId: number,
      locale = 'es-ES'
    ): Promise<MovieDetail | null> => {
      try {
        const data = await clientRepository.get<MovieDetail>(
          API_URL + `movie/${movieId}?language=${locale}`
        );

        console.log(data);

        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
}
