import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import MovieAdditionalInfo from '@/src/components/features/movieDetail/MovieAdditionalInfo';
import MovieOverview from '@/src/components/features/movieDetail/MovieOverview';
import MovieProductionCompanies from '@/src/components/features/movieDetail/MovieProductionCompanies';
import MovieTitle from '@/src/components/features/movieDetail/MovieTitle';
import { DetailScreenProps } from '@/src/components/features/navigation/Navigation';

import BackdropImage from '@/src/components/features/shared/BackdropImage';
import Layout from '@/src/components/features/shared/Layout';
import TagList from '@/src/components/features/shared/TagList';

import { useGetMovieDetail } from '@/src/hooks/useGetMovieDetail';
import Spinner from '@/src/components/features/shared/Spinner';

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { id } = route?.params;

  const { data, isError, isLoading } = useGetMovieDetail(id);

  if (isError || (!data && !isLoading)) {
    return (
      <Layout withHeader>
        <View style={styles.container}>
          <View style={styles.wrapperErrorMessage}>
            <Text>Ups.. Something wrong happens</Text>
          </View>
        </View>
      </Layout>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout withHeader>
      <ScrollView style={styles.container}>
        <BackdropImage
          source={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
        />

        <MovieTitle
          title={data?.title as string}
          tagline={data?.tagline as string}
        />
        {data?.overview && <MovieOverview overview={data?.overview} />}
        {data?.genres && <TagList tags={data?.genres ?? []} title="Gender" />}
        {data?.production_companies &&
          data?.production_companies?.length > 0 && (
            <MovieProductionCompanies companies={data?.production_companies} />
          )}
        {(data?.release_date ||
          data?.runtime ||
          data?.budge ||
          data?.revenue) && (
          <MovieAdditionalInfo
            releaseDate={data?.release_date}
            runtime={data?.runtime}
            budget={data?.budget}
            revenue={data?.revenue}
          />
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperErrorMessage: {
    padding: 16,
  },
});

export default DetailScreen;
