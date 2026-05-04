import { LinkGroup } from '@/components';
import { Outlet } from 'react-router-dom';

export const MoviesView = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Movies</h1>
        <LinkGroup
          options={[
            { label: 'Now Playing', to: '/movies/now-playing' },
            { label: 'Popular', to: '/movies/popular' },
            { label: 'Top Rated', to: '/movies/top-rated' },
            { label: 'Upcoming', to: '/movies/upcoming' },
          ]}
        />
      </div>
      <Outlet />
    </section>
  );
};
