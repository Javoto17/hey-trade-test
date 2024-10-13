import { useCallback, useMemo, useState } from 'react';

import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { getMoviesPagination } from '@/src/modules/movies/application/get/getMoviesPagination';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

const clientRepository = generateClientRepository();
const moviesRepository = generateMoviesRepository(clientRepository);

export function useGetMoviesPagination() {
  const {
    data,
    isSuccess,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies-pagination'],
    queryFn: async ({ pageParam }) => {
      return await getMoviesPagination(moviesRepository)(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, prop) => {
      if (!lastPage?.nextCursor) return lastPage?.nextCursor;
      return 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.results);
    },
    retry: 3,
    retryDelay: 1500,
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
