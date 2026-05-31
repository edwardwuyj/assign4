import { ImageGrid, Pagination } from '@/components';
import { DISCOVER_MOVIE_ENDPOINT, DISCOVER_TV_ENDPOINT, getImageUrl, type ImageCell } from '@/core';
import { useStore, useTmdb } from '@/hooks';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const GENRES = {
  movies: [
    { id: '28', label: 'Action' },
    { id: '12', label: 'Adventure' },
    { id: '16', label: 'Animation' },
    { id: '80', label: 'Crime' },
    { id: '10751', label: 'Family' },
    { id: '14', label: 'Fantasy' },
    { id: '36', label: 'History' },
    { id: '27', label: 'Horror' },
    { id: '9648', label: 'Mystery' },
    { id: '878', label: 'Sci-Fi' },
  ],
  tv: [
    { id: '10759', label: 'Action' },
    { id: '16', label: 'Animation' },
    { id: '35', label: 'Comedy' },
    { id: '80', label: 'Crime' },
    { id: '99', label: 'Documentary' },
    { id: '18', label: 'Drama' },
    { id: '10751', label: 'Family' },
    { id: '10762', label: 'Kids' },
    { id: '9648', label: 'Mystery' },
    { id: '10765', label: 'Sci-Fi' },
  ],
};

const normalizeGenre = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, ''); // labels are normalized to fit the format

type GenreResult = {
  id: number;
  poster_path: string;
  original_title?: string;
  original_name?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
};

type GenreResponse = {
  results: GenreResult[];
  total_pages: number;
};

export const PreferredGenresView = () => {
  const navigate = useNavigate();
  const { genrePreferences, addFavorite, favorites } = useStore();
  const { media = 'movies' } = useParams();
  const activeMedia = media === 'tv' ? 'tv' : 'movies';
  const [page, setPage] = useState<number>(1);
  const genreList = GENRES[activeMedia];
  const selectedPreferences = useMemo(() => genrePreferences[activeMedia] ?? [], [genrePreferences, activeMedia]);

  const selectedIds = useMemo(
    () => genreList.filter((genre) => selectedPreferences.includes(normalizeGenre(genre.label))).map((genre) => genre.id),
    [genreList, selectedPreferences]
  );

  const params = useMemo(() => {
    const base = { page };
    return selectedIds.length > 0 ? { ...base, with_genres: selectedIds.join(',') } : base;
  }, [page, selectedIds]);

  const { data, error } = useTmdb<GenreResponse>(activeMedia === 'tv' ? DISCOVER_TV_ENDPOINT : DISCOVER_MOVIE_ENDPOINT, params);

  const selectedLabels = useMemo(
    () => genreList.filter((genre) => selectedPreferences.includes(normalizeGenre(genre.label))).map((genre) => genre.label),
    [genreList, selectedPreferences]
  );

  if (error) {
    return <p className="text-center text-red-400">Error: {error}</p>;
  }

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const handleFavorite = (image: ImageCell) => {
    if (activeMedia === 'tv') {
      addFavorite({
        id: image.id,
        media: 'tv-show',
        title: image.primaryText,
        poster_path: image.posterPath ?? '',
        first_air_date: image.airDate ?? '',
      });
    } else {
      addFavorite({
        id: image.id,
        media: 'movie',
        title: image.primaryText,
        poster_path: image.posterPath ?? '',
        release_date: image.releaseDate ?? '',
      });
    }
    navigate('/favorites');
  };

  const gridData: ImageCell[] = (data.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title || result.original_name || result.name || 'Untitled',
    posterPath: result.poster_path,
    releaseDate: result.release_date,
    airDate: result.first_air_date,
    isFavorite: favorites.some((favorite) => favorite.id === result.id && favorite.media === (activeMedia === 'tv' ? 'tv-show' : 'movie')),
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Genres</h1>
          <p className="text-sm text-gray-400">
            {selectedLabels.length > 0
              ? `Showing results for: ${selectedLabels.join(', ')}`
              : 'No saved genre preferences yet. Please choose your preferred genres in Settings.'}
          </p>
        </div>
        <Link
          to="/settings"
          className="rounded-full border border-blue-400 bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Edit Preferences
        </Link>
      </div>

      {selectedIds.length === 0 ? (
        <div className="rounded-2xl border border-gray-700 bg-gray-900 p-6 text-gray-300">
          <p className="text-lg font-semibold">No genres selected yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Add movie or TV genre preferences in Settings so this page can show personalized results.
          </p>
        </div>
      ) : (
        <>
          <ImageGrid
            images={gridData}
            onClick={(image) => navigate(`/${activeMedia === 'tv' ? 'tv' : 'movie'}/${image.id}/credits`)}
            onFavoriteClick={handleFavorite}
          />
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      )}
    </section>
  );
};
