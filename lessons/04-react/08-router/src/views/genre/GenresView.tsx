import { LinkGroup } from '@/components';
import { useStore } from '@/hooks';
import { Link, Outlet, useParams } from 'react-router-dom';

const GENRE_OPTIONS = {
  movies: [
    { label: 'Action', id: '28' },
    { label: 'Adventure', id: '12' },
    { label: 'Animation', id: '16' },
    { label: 'Crime', id: '80' },
    { label: 'Family', id: '10751' },
    { label: 'Fantasy', id: '14' },
    { label: 'History', id: '36' },
    { label: 'Horror', id: '27' },
    { label: 'Mystery', id: '9648' },
    { label: 'Sci-Fi', id: '878' },
  ],
  tv: [
    { label: 'Action', id: '10759' },
    { label: 'Animation', id: '16' },
    { label: 'Comedy', id: '35' },
    { label: 'Crime', id: '80' },
    { label: 'Documentary', id: '99' },
    { label: 'Drama', id: '18' },
    { label: 'Family', id: '10751' },
    { label: 'Kids', id: '10762' },
    { label: 'Mystery', id: '9648' },
    { label: 'Sci-Fi', id: '10765' },
  ],
};

const normalizeGenre = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, ''); // labels are normalized to match the format stored in preferences

export const GenresView = () => {
  const { media = 'movies' } = useParams();
  const { genrePreferences } = useStore();
  const activeMedia = media === 'tv' ? 'tv' : 'movies';
  const genres = GENRE_OPTIONS[activeMedia];
  const selectedPreferences = genrePreferences[activeMedia] ?? [];
  const visibleGenres = genres.filter((genre) => selectedPreferences.includes(normalizeGenre(genre.label)));
  //only genres the user selected in settings are shown

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">Genres</h1>
        </div>
        <LinkGroup
          options={[
            { label: 'Movies', to: '/genres/movies' },
            { label: 'TV', to: '/genres/tv' },
          ]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-10">
        {visibleGenres.length > 0 ? (
          visibleGenres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genres/${activeMedia}/${genre.id}`}
              className="rounded-2xl border border-gray-700 bg-gray-900 px-2 py-3 text-center text-sm font-semibold text-gray-200 transition hover:border-white hover:bg-gray-800"
            >
              {genre.label}
            </Link>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-gray-700 bg-gray-900 p-6 text-center text-gray-400">
            <p className="text-lg font-semibold">No saved {activeMedia} genre preferences.</p>
            <p className="mt-2 text-sm text-gray-500">Pick your preferred genres in Settings to see them here.</p>
          </div>
        )}
      </div>
      <Outlet />
    </section>
  );
};
