import { LinkGroup } from '@/components';
import { useStore } from '@/hooks';

export const Header = () => {
  const { username } = useStore();

  return (
    <header className="border-b border-gray-700 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl space-y-2 p-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">TMDB Explorer</h1>
            <LinkGroup
              options={[
                { label: 'Movies', to: '/movies' },
                { label: 'TV', to: '/tv' },
                { label: 'Trending', to: '/trending' },
                { label: 'Genre', to: '/genres' },
                { label: 'Favorites', to: '/favorites' },
                { label: 'Cart', to: '/cart' },
                { label: 'Settings', to: '/settings' },
                { label: 'Search', to: '/search' },
              ]}
            />
          </div>

          <div className="text-sm text-gray-300">{username ? `Welcome, ${username}` : 'Guest'}</div>
        </div>
      </div>
    </header>
  );
};
