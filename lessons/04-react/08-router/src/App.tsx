import { ApiKeyModal } from '@/components';
import { ApiKeyProvider, useApiKey } from '@/hooks/useApiKey';
import { MainLayout } from '@/layouts';
import {
  AiringTodayView,
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  GenresView,
  HomeView,
  ImagesView,
  MovieView,
  MoviesView,
  NowPlayingView,
  OntheAirView,
  PersonView,
  PopularView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TVPopularView,
  TVTopRatedView,
  TVTrendingView,
  TelevisionView,
  TopRatedView,
  TrailersView,
  TrendingView,
  TrendingsView,
  TvView,
  UpcomingView,
} from '@/views';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  const { hasApiKey } = useApiKey();

  if (!hasApiKey) {
    return <ApiKeyModal />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="movies" element={<MoviesView />}>
          <Route index element={<Navigate to="now-playing" replace />} />
          <Route path="now-playing" element={<NowPlayingView />} />
          <Route path="popular" element={<PopularView />} />
          <Route path="top-rated" element={<TopRatedView />} />
          <Route path="upcoming" element={<UpcomingView />} />
        </Route>

        <Route path="genres">
          <Route index element={<Navigate to="movies" replace />} />
          <Route path=":media" element={<GenresView />} />
          <Route path=":media/:genreId" element={<GenreView />} />
        </Route>

        <Route path="tv" element={<TvView />}>
          <Route index element={<Navigate to="airing-today" replace />} />
          <Route path="airing-today" element={<AiringTodayView />} />
          <Route path="on-the-air" element={<OntheAirView />} />
          <Route path="top-rated" element={<TVTopRatedView />} />
          <Route path="popular" element={<TVPopularView />} />
        </Route>

        <Route path="trending" element={<TrendingsView />}>
          <Route index element={<Navigate to="movies" replace />} />
          <Route path="movies" element={<TrendingView />} />
          <Route path="tv" element={<TVTrendingView />} />
        </Route>

        <Route path="search" element={<SearchView />} />
        <Route path="movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailers" element={<TrailersView />} />
        </Route>
        <Route path="tv/:id" element={<TelevisionView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:season" element={<EpisodeView />} />
        </Route>

        <Route path="now-playing" element={<MoviesView />}>
          <Route index element={<Navigate to="/movies/now-playing" replace />} />
        </Route>

        {/*person detail routesactor biography plus career and image tabs */}
        <Route path="person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};

export const App = () => (
  <ApiKeyProvider>
    <AppRoutes />
  </ApiKeyProvider>
);
