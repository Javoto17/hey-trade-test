import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { generateStorageRepository } from '@/src/modules/storage/infrastructure/StorageRepository';
import { useQuery } from '@tanstack/react-query';
import { getAllFavorites } from '../modules/movies/application/favorites/getAllFavorites';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const moviesRepository = generateMoviesRepository(
  clientRepository,
  storageRepository
);

export function useGetMoviesFavorites() {
  const { data, isLoading, isSuccess, isError, refetch, isRefetching } =
    useQuery({
      queryKey: ['list-favorites'],
      queryFn: () => getAllFavorites(moviesRepository)(),
    });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isRefetching,
  };
}
