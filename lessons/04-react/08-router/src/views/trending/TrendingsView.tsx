import { LinkGroup } from '@/components';
import { Outlet } from 'react-router-dom';

export const TrendingsView = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4">
        <LinkGroup
          options={[
            { label: 'Movies', to: '/trending/movies?interval=day' },
            { label: 'TV', to: '/trending/tv?interval=day' },
          ]}
        />
      </div>
      <Outlet />
    </section>
  );
};
