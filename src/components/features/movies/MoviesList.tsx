import React from 'react';
import { FlatList, View } from 'react-native';

import MovieCard, { MovieCardItem } from './MovieCard';
import Spinner from '../shared/Spinner';

type MovieListProps = {
  data: MovieCardItem[];
  isLoading: boolean;
  onPressItem: (id: number) => void;
  onEndReached?: () => void;
  isRefetching?: boolean;
  onRefresh?: () => void;
};

const MovieList: React.FC<MovieListProps> = ({
  data,
  isLoading,
  onPressItem,
  onEndReached,
  onRefresh,
  isRefetching = false,
}) => {
  const renderFooter = () => {
    if (!isLoading) return null;
    return <Spinner />;
  };

  return (
    <FlatList
      data={data}
      extraData={data}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={onPressItem} />
      )}
      {...(typeof onRefresh === 'function' && {
        refreshing: isRefetching,
        onRefresh: () => {
          if (typeof onRefresh === 'function') {
            onRefresh();
          }
        },
      })}
      ListFooterComponent={renderFooter}
      {...(typeof onEndReached === 'function' && {
        onEndReachedThreshold: 0.35,
        onEndReached: () => {
          if (!isLoading) {
            onEndReached();
          }
        },
      })}
    />
  );
};

export default MovieList;
