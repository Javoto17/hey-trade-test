import { useQuery } from '@tanstack/react-query';
import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { getMovieDetail } from '@/src/modules/movies/application/get/getMovieDetail';

const clientRepository = generateClientRepository();
const moviesRepository = generateMoviesRepository(clientRepository);

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
