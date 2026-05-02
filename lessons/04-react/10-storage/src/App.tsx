import { MainLayout } from '@/layouts';
import {
  CreditsView,
  ErrorView,
  FavoritesView,
  HomeView,
  MovieView,
  NowPlayingView,
  ReviewsView,
  SearchView,
  SettingsView,
  TrendingView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/now-playing" element={<NowPlayingView />} />
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
