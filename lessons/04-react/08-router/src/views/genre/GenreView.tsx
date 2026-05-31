import { ImageGrid, Pagination } from '@/components';
import { DISCOVER_MOVIE_ENDPOINT, DISCOVER_TV_ENDPOINT, getImageUrl, type ImageCell } from '@/core';
import { type MovieStoreItem, type TvShowStoreItem, useStore, useTmdb } from '@/hooks';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GENRES = {
  movies: [
    { id: '28', label: 'Action' },
    { id: '12', label: 'Adventure' },
    { id: '16', label: 'Animation' },
    { id: '35', label: 'Comedy' },
    { id: '80', label: 'Crime' },
    { id: '99', label: 'Documentary' },
    { id: '18', label: 'Drama' },
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

export const GenreView = () => {
  const navigate = useNavigate();
  const { media = 'movies', genreId = '28' } = useParams();
  const [page, setPage] = useState<number>(1);
  const endpoint = media === 'tv' ? DISCOVER_TV_ENDPOINT : DISCOVER_MOVIE_ENDPOINT;
  const { data, error } = useTmdb<GenreResponse>(endpoint, { page, with_genres: genreId });

  const { addFavorite, favorites } = useStore();

  const genreName = useMemo(() => {
    return GENRES[media as 'movies' | 'tv']?.find((genre) => genre.id === genreId)?.label ?? 'Genre';
  }, [genreId, media]);

  if (error) {
    return <p className="text-center text-red-400">Error: {error}</p>;
  }

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const handleFavorite = (image: ImageCell) => {
    if (media === 'tv') {
      const favorite: TvShowStoreItem = {
        id: image.id,
        media: 'tv-show',
        title: image.primaryText,
        poster_path: image.posterPath ?? '',
        first_air_date: image.airDate ?? '',
      };
      addFavorite(favorite);
    } else {
      const favorite: MovieStoreItem = {
        id: image.id,
        media: 'movie',
        title: image.primaryText,
        poster_path: image.posterPath ?? '',
        release_date: image.releaseDate ?? '',
      };
      addFavorite(favorite);
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
    isFavorite: favorites.some((favorite) => favorite.id === result.id && favorite.media === (media === 'tv' ? 'tv-show' : 'movie')),
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{media === 'tv' ? 'TV' : 'Movies'} by Genre</h1>
          <p className="text-sm text-gray-400">Showing {genreName} titles</p>
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/${media === 'tv' ? 'tv' : 'movie'}/${image.id}/credits`)}
        onFavoriteClick={handleFavorite}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
