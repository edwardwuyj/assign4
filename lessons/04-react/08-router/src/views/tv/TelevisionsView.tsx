import { LinkGroup } from '@/components';
import { Outlet } from 'react-router-dom';

export const TvView = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">TV</h1>
        <LinkGroup
          options={[
            { label: 'Airing Today', to: '/tv/airing-today' },
            { label: 'On the Air', to: '/tv/on-the-air' },
            { label: 'Top Rated', to: '/tv/top-rated' },
            { label: 'Popular', to: '/tv/popular' },
          ]}
        />
      </div>
      <Outlet />
    </section>
  );
};
