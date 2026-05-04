import { ApiKeyModal } from '@/components';
import { ApiKeyProvider, useApiKey } from '@/hooks/useApiKey';
import { MainLayout } from '@/layouts';
import { CreditsView, ErrorView, HomeView, MovieView, NowPlayingView, ReviewsView, SearchView, TrendingView, UpcomingView } from '@/views';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  const { hasApiKey } = useApiKey();

  if (!hasApiKey) {
    return <ApiKeyModal />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route index element={<NowPlayingView />} />
        <Route path="now-playing" element={<NowPlayingView />} />

        <Route path="upcoming" element={<UpcomingView />} />

        <Route path="/trending" element={<TrendingView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
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
