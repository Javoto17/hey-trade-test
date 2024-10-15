import { ClientRepository } from '@/src/modules/client/domain/ClientRepository';
import { MovieRepository } from '../domain/MovieRepository';
import { Movie } from '../domain/Movie';
import { MovieDetail } from '../domain/MovieDetail';
import { MoviePagination } from '../domain/MoviePagination';
import { StorageRepository } from '../../storage/domain/StorageRepository';

interface GetTrendingMoviesResponse {
  page: number;
  results: Movie[];
}
interface GetTrendingMoviesPaginationResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

interface GetSearchMoviesPaginationResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export function generateMoviesRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
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
          nextCursor: data?.page < data?.total_pages ? data?.page + 1 : null,
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
    searchMoviesPagination: async (
      query,
      page = 1,
      locale = 'es-ES'
    ): Promise<MoviePagination> => {
      try {
        const data =
          await clientRepository.get<GetSearchMoviesPaginationResponse>(
            API_URL +
              `search/movie?include_adult=true&${locale}&page=${page}&query=${encodeURIComponent(query)}`
          );

        console.log(data);

        return {
          page: data?.page,
          results: data?.results,
          nextCursor: data?.page < data?.total_pages ? data?.page + 1 : null,
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
    saveFavorite: async (movie: Movie) => {
      const prevFavorites =
        (await storageRepository.get<Movie[]>('list')) ?? [];

      const hasPreviously = prevFavorites.some(
        (item) => item?.id === movie?.id
      );

      if (hasPreviously) {
        return;
      }

      prevFavorites.push(movie);

      storageRepository.set('list', prevFavorites);
    },
    removeFavorite: async (movieId: number) => {
      let prevFavorites = (await storageRepository.get<Movie[]>('list')) ?? [];

      prevFavorites = prevFavorites.filter((item) => item?.id !== movieId);

      storageRepository.set('list', prevFavorites);
    },
    getIsFavorite: async (movieId: number): Promise<boolean> => {
      const prevFavorites =
        (await storageRepository.get<Movie[]>('list')) ?? [];

      const isFavorite =
        prevFavorites.findIndex((item) => item?.id === movieId) !== -1;

      return isFavorite;
    },
    getAllFavorites: async (): Promise<Movie[]> => {
      const favorites = (await storageRepository.get<Movie[]>('list')) ?? [];

      return favorites;
    },
  };
}
