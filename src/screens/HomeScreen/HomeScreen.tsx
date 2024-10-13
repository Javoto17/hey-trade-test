import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import MovieList from '@/src/components/features/movies/MoviesList';
import { HomeScreenProps } from '@/src/components/features/navigation/Navigation';
import Layout from '@/src/components/features/shared/Layout';

import { useGetMoviesPagination } from '@/src/hooks/useGetMoviesPagination';
import { MovieCardItem } from '@/src/components/features/movies/MovieCard';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { data, isError, fetchNextPage, isFetching, hasNextPage } =
    useGetMoviesPagination();

  const onPressItem = (id: number) => {
    navigation.navigate('Detail', {
      id,
    });
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  if (isError || (!data && !isFetching)) {
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
        isLoading={isFetching}
        onPressItem={onPressItem}
        onEndReached={onEndReached}
      />
    </Layout>
  );
};

export default HomeScreen;
