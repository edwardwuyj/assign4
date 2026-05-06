import { LinkGroup } from '@/components';
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

export const GenresView = () => {
  const { media = 'movies' } = useParams();
  const activeMedia = media === 'tv' ? 'tv' : 'movies';
  const genres = GENRE_OPTIONS[activeMedia];

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold">Genres</h1>
        <LinkGroup
          options={[
            { label: 'Movies', to: '/genres/movies' },
            { label: 'TV', to: '/genres/tv' },
          ]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-10">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to={`/genres/${activeMedia}/${genre.id}`}
            className="rounded-2xl border border-gray-700 bg-gray-900 px-2 py-3 text-center text-sm font-semibold text-gray-200 transition hover:border-white hover:bg-gray-800"
          >
            {genre.label}
          </Link>
        ))}
      </div>
      <Outlet />
    </section>
  );
};
