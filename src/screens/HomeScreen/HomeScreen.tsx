import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, Text, View } from 'react-native';

import MovieList from '@/src/components/features/movies/MoviesList';
import { HomeScreenProps } from '@/src/components/features/navigation/Navigation';
import Layout from '@/src/components/features/shared/Layout';

import { useGetMoviesPagination } from '@/src/hooks/useGetMoviesPagination';
import { MovieCardItem } from '@/src/components/features/movies/MovieCard';
import ButtonIcon from '@/src/components/features/shared/ButtonIcon';
import MovieFilter from '@/src/components/features/movies/MovieFilter';
import { useSearchMovies } from '@/src/hooks/useSearchMovies';

import debounce from 'just-debounce-it';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [text, setText] = useState<string>();

  const { data, isError, fetchNextPage, isFetching, hasNextPage } =
    useGetMoviesPagination();

  const refList = useRef<FlatList>(null);

  const {
    data: searchResults,
    isFetching: isLoadingResults,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
  } = useSearchMovies(text);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: undefined,
      headerTitle: '',
      headerRight: () => (
        <ButtonIcon
          icon="bookmarks"
          onPress={() => navigation.push('Favorites')}
        />
      ),
    });
  }, [navigation]);

  const onPressItem = (id: number) => {
    navigation.navigate('Detail', {
      id,
    });
  };

  const onEndReached = useCallback(() => {
    if (text && hasSearchNextPage) {
      fetchSearchNextPage();
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, hasSearchNextPage, fetchSearchNextPage, fetchNextPage]);

  if (isError || (!data && !isFetching)) {
    return (
      <Layout>
        <View>
          <Text>Ups.. Something wrong happens</Text>
        </View>
      </Layout>
    );
  }

  const handleChange = useCallback((query: string) => {
    setText(query);
    refList.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  const debounceHandleChange = useCallback(
    debounce((query: string) => handleChange(query), 500),
    [handleChange]
  );

  const thisData = useMemo(() => {
    return text ? searchResults : data;
  }, [text, searchResults, data]);

  return (
    <Layout withHeader>
      <MovieFilter onChange={debounceHandleChange} value={text} />
      <MovieList
        ref={refList}
        data={thisData as MovieCardItem[]}
        isLoading={isFetching || isLoadingResults}
        onPressItem={onPressItem}
        onEndReached={onEndReached}
      />
    </Layout>
  );
};

export default HomeScreen;
