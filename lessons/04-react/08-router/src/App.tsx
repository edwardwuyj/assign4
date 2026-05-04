import { ApiKeyModal } from '@/components';
import { ApiKeyProvider, useApiKey } from '@/hooks/useApiKey';
import { MainLayout } from '@/layouts';
import {
  AiringTodayView,
  CreditsView,
  ErrorView,
  HomeView,
  MovieView,
  MoviesView,
  NowPlayingView,
  PopularView,
  ReviewsView,
  SearchView,
  TelevisionView,
  TopRatedView,
  TrailersView,
  TrendingView,
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

        <Route path="tv" element={<TvView />}>
          <Route index element={<Navigate to="airing-today" replace />} />
          <Route path="airing-today" element={<AiringTodayView />} />
        </Route>

        <Route path="trending" element={<TrendingView />} />
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
        </Route>
        <Route path="now-playing" element={<MoviesView />}>
          <Route index element={<Navigate to="/movies/now-playing" replace />} />
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
