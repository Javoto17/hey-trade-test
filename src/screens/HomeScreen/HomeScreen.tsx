import debounce from 'just-debounce-it';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MovieCardItem } from '@/src/components/features/movies/MovieCard';
import { HomeScreenProps } from '@/src/components/features/navigation/Navigation';

import MovieFilter from '@/src/components/features/movies/MovieFilter';
import MovieList, {
  MovieListRef,
} from '@/src/components/features/movies/MoviesList';
import ButtonIcon from '@/src/components/features/shared/ButtonIcon';
import EmptyList from '@/src/components/features/shared/EmptyList';
import Layout from '@/src/components/features/shared/Layout';

import { useGetMoviesPagination } from '@/src/hooks/useGetMoviesPagination';
import { useSearchMovies } from '@/src/hooks/useSearchMovies';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [text, setText] = useState<string>();

  const { data, isError, fetchNextPage, isFetching, hasNextPage } =
    useGetMoviesPagination();

  const refList = useRef<MovieListRef>(null);

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
        <EmptyList text="Ups.. Something wrong happens" />
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

  const thisLoading = useMemo(() => {
    return isFetching || isLoadingResults;
  }, [isFetching, isLoadingResults]);

  return (
    <Layout withHeader>
      <MovieFilter onChange={debounceHandleChange} value={text} />
      <MovieList
        ref={refList}
        data={thisData as MovieCardItem[]}
        isLoading={thisLoading}
        onPressItem={onPressItem}
        onEndReached={
          thisData && thisData?.length > 0 ? onEndReached : undefined
        }
        empty={
          text &&
          !thisLoading && <EmptyList text={`No hay resultados para ${text}`} />
        }
      />
    </Layout>
  );
};

export default HomeScreen;
