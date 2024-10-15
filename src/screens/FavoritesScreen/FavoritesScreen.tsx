import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import MovieList from '@/src/components/features/movies/MoviesList';
import { FavoritesScreenProps } from '@/src/components/features/navigation/Navigation';
import Layout from '@/src/components/features/shared/Layout';

import { MovieCardItem } from '@/src/components/features/movies/MovieCard';
import { useGetMoviesFavorites } from '@/src/hooks/useGetMoviesFavorites';
import { useRefreshOnFocus } from '@/src/hooks/useRefreshOnFocus';
import Spinner from '@/src/components/features/shared/Spinner';

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  navigation,
  route,
}) => {
  const { data, isError, isLoading, refetch, isRefetching } =
    useGetMoviesFavorites();

  const onPressItem = (id: number) => {
    navigation.navigate('Detail', {
      id,
    });
  };

  if (isLoading || isRefetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Layout>
        <View>
          <Text>Ups.. Something wrong happens</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <MovieList
        data={data as MovieCardItem[]}
        isLoading={isLoading}
        onPressItem={onPressItem}
        isRefetching={isRefetching}
        onRefresh={() => {
          refetch();
        }}
      />
    </Layout>
  );
};

export default FavoritesScreen;
