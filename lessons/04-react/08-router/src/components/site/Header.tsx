import { LinkGroup } from '@/components';

export const Header = () => {
  return (
    <header className="border-b border-gray-700 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl space-y-2 p-5">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">TMDB Explorer</h1>
          <LinkGroup
            options={[
              { label: 'Movies', to: '/movies' },
              { label: 'TV', to: '/tv' },
              { label: 'Trending', to: '/trending' },
              { label: 'Genre', to: '/genres' },
              { label: 'Search', to: '/search' },
            ]}
          />
        </div>
      </div>
    </header>
  );
};

/**/

/*                options={[
              { label: 'Movies', to: '/movies/' },
              { label: 'TV', to: '/trending?interval=day' },
              { label: 'Trending', to: '/trending?interval=day' },
              { label: 'Genre', to: '/upcoming' },
              { label: 'Search', to: '/search' },
               */
