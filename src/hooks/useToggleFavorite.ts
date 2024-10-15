import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';
import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { generateStorageRepository } from '@/src/modules/storage/infrastructure/StorageRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { removeFavorite } from '../modules/movies/application/favorites/removeMovieFavorite';
import { saveFavorite } from '../modules/movies/application/favorites/saveMovieFavorite';
import { getIsFavorite } from '../modules/movies/application/favorites/getMovieFavorite';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const moviesRepository = generateMoviesRepository(
  clientRepository,
  storageRepository
);

interface DataFavorite {
  id: number;
  title: string;
}

export function useToggleFavorite(id: number) {
  const queryClient = useQueryClient();

  const { data, refetch, isFetching } = useQuery({
    queryKey: [`is-favorite`, id],
    queryFn: () => getIsFavorite(moviesRepository)(id),
    enabled: !!id,
  });

  const saveMutation = useMutation({
    mutationFn: (movie: DataFavorite) => saveFavorite(moviesRepository)(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-favorites'],
      });
      queryClient.invalidateQueries({
        queryKey: [`is-favorite`, id],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFavorite(moviesRepository)(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-favorites'],
      });
      queryClient.invalidateQueries({
        queryKey: [`is-favorite`, id],
      });
    },
  });

  const save = (movie: DataFavorite) => {
    saveMutation.mutateAsync(movie);
  };

  const remove = (movieId: number) => {
    removeMutation.mutateAsync(movieId);
  };

  return {
    save,
    remove,
    isFavorite: data,
    refetch,
    isFetching,
  };
}
