import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { useInfiniteQuery } from '@tanstack/react-query';

import { generateStorageRepository } from '../modules/storage/infrastructure/StorageRepository';
import { searchMovies } from '../modules/movies/application/search/searchMovie';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const moviesRepository = generateMoviesRepository(
  clientRepository,
  storageRepository
);

export function useSearchMovies(query?: string) {
  const {
    data,
    isSuccess,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search-pagination', query],
    queryFn: async ({ pageParam }) => {
      if (query) {
        return searchMovies(moviesRepository)(query, pageParam);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, prop) => {
      if (lastPage?.nextCursor) return lastPage?.nextCursor;
      return 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page?.results);
    },
    retry: 3,
    retryDelay: 1500,
    enabled: !!query,
  });

  return {
    data,
    isSuccess,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
