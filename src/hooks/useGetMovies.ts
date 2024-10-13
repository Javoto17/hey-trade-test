import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/src/modules/movies/application/get/getMovies';
import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';

const clientRepository = generateClientRepository();
const moviesRepository = generateMoviesRepository(clientRepository);

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
