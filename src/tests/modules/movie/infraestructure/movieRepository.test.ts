import { generateMoviesRepository } from '@/src/modules/movies/infrastructure/MovieRepository';
import { generateClientRepository } from '@/src/modules/client/infrastructure/ClientRepository';

describe('Movies Repository Test Integration', () => {
  const clientRepository = generateClientRepository();
  const moviesRepository = generateMoviesRepository(clientRepository);

  it('Should obtain a list of movies', async () => {
    const data = await moviesRepository.getTrendingMovies();

    expect(data?.length)?.toBeGreaterThan(0);
  });

  it('Gets detail of first item list', async () => {
    const data = await moviesRepository.getTrendingMovies();
    const movieId = data?.[0]?.id;

    const movieDetail = await moviesRepository.getDetailMovie(movieId);

    expect(movieDetail).toBeDefined();
    expect(movieDetail?.id).toEqual(movieId);
  });

  it('Null is returned if movie not exists', async () => {
    const movieDetail = await moviesRepository.getDetailMovie(1234);

    expect(movieDetail).toBeNull();
  });
});
