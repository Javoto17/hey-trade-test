import { ClientRepository } from '@/src/modules/client/domain/ClientRepository';
import { MovieRepository } from '../domain/MovieRepository';
import { Movie } from '../domain/Movie';
import { MovieDetail } from '../domain/MovieDetail';
import { MoviePagination } from '../domain/MoviePagination';

interface GetTrendingMoviesResponse {
  page: number;
  results: Movie[];
}
interface GetTrendingMoviesPaginationResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export function generateMoviesRepository(
  clientRepository: ClientRepository
): MovieRepository {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  return {
    getTrendingMovies: async (page = 1, locale = 'es-ES'): Promise<Movie[]> => {
      try {
        const data = await clientRepository.get<GetTrendingMoviesResponse>(
          API_URL + `trending/movie/day?language=${locale}&page=${page}`
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

        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getTrendingMoviesPagination: async (
      page = 1,
      locale = 'es-ES'
    ): Promise<MoviePagination> => {
      try {
        const data =
          await clientRepository.get<GetTrendingMoviesPaginationResponse>(
            API_URL + `trending/movie/day?language=${locale}&page=${page}`
          );

        return {
          page: data?.page,
          results: data?.results,
          nextCursor: data?.page <= data?.total_pages ? data?.page + 1 : null,
        };
      } catch (error) {
        console.log(error);
        return {
          page: 0,
          results: [],
          nextCursor: null,
        };
      }
    },
  };
}
