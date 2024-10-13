import React from 'react';
import { Text, View } from 'react-native';

import MovieList from '@/src/components/features/movies/MoviesList';
import { HomeScreenProps } from '@/src/components/features/navigation/Navigation';
import Layout from '@/src/components/features/shared/Layout';

import { useGetMovies } from '@/src/hooks/useGetMovies';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { data, isError, isLoading } = useGetMovies();

  const onPressItem = (id: number) => {
    navigation.navigate('Detail', {
      id,
    });
  };

  if (isError || !data) {
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
      <MovieList data={data} isLoading={isLoading} onPressItem={onPressItem} />
    </Layout>
  );
};

export default HomeScreen;
