import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { Movie } from '@/src/modules/movies/domain/Movie';

import MovieCard from './MovieCard';
import Spinner from '../shared/Spinner';

type MovieListProps = {
  data: Movie[];
  isLoading: boolean;
  onPressItem: (id: number) => void;
};

const MovieList: React.FC<MovieListProps> = ({
  data,
  isLoading,
  onPressItem,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={onPressItem} />
      )}
    />
  );
};

export default MovieList;
