import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { getMovies } from '@/src/modules/movies/application/get/getMovies';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { generateStorageRepository } from '@/src/modules/storage/infrastructure/StorageRepository';
import { useQuery } from '@tanstack/react-query';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const moviesRepository = generateMoviesRepository(
  clientRepository,
  storageRepository
);

export function useGetMovies() {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      return await getMovies(moviesRepository)();
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
