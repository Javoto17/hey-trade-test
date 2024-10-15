import React, { forwardRef } from 'react';
import { FlatList, View, FlatListProps } from 'react-native';

import MovieCard, { MovieCardItem } from './MovieCard';
import Spinner from '../shared/Spinner';

type MovieListProps = {
  data: MovieCardItem[];
  isLoading: boolean;
  onPressItem: (id: number) => void;
  onEndReached?: () => void;
  isRefetching?: boolean;
  onRefresh?: () => void;
  header?: React.ReactNode;
};

const MovieList = forwardRef<FlatList, MovieListProps>(
  (
    {
      data,
      isLoading,
      onPressItem,
      onEndReached,
      onRefresh,
      isRefetching = false,
      header = null,
    },
    ref
  ) => {
    const renderFooter = () => {
      if (!isLoading) return null;
      return <Spinner />;
    };

    return (
      <FlatList
        ref={ref}
        data={data}
        extraData={data}
        ListHeaderComponent={React.isValidElement(header) ? header : null}
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
  }
);

MovieList.displayName = 'MovieList';

export default MovieList;
