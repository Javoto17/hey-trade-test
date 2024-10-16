import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { getMovieDetail } from '@/src/modules/movies/application/get/getMovieDetail';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { useQuery } from '@tanstack/react-query';

import { generateStorageRepository } from '../modules/storage/infrastructure/StorageRepository';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const moviesRepository = generateMoviesRepository(
  clientRepository,
  storageRepository
);

export function useGetMovieDetail(id: number) {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      return await getMovieDetail(moviesRepository)(id);
    },
    enabled: !!id,
    retry: 10,
    retryDelay: 5000,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
