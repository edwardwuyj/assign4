import { ButtonGroup, DetailItem, ImageGrid, Modal, Pagination, SearchBar } from '@/components';
import {
  getImageUrl,
  MOVIE_ENDPOINT,
  RATE_LIMIT_DELAY,
  SEARCH_ENDPOINT,
  type ImageCell,
  type MovieResponse,
  type SearchResponse,
} from '@/core';
import { useDebounce, useThrottle, useTmdb } from '@/hooks';
import { useState } from 'react';

export const App = () => {
  const [mode, setMode] = useState<string>('debounce');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [movieId, setMovieId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(searchQuery, RATE_LIMIT_DELAY);
  const throttledQuery = useThrottle(searchQuery, RATE_LIMIT_DELAY);
  const rateLimitedQuery = mode === 'debounce' ? debouncedQuery : throttledQuery;
  const { data: search } = useTmdb<SearchResponse>(SEARCH_ENDPOINT, { query: rateLimitedQuery, page });
  const { data: movie } = useTmdb<MovieResponse>(movieId ? `${MOVIE_ENDPOINT}/${movieId}` : '', {});

  const gridData: ImageCell[] = (search?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title,
  }));

  if (!search) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <main className="flex min-h-screen w-full flex-col border-b border-gray-700 bg-gray-900 text-white">
      <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
        <h1 className="mb-4 text-3xl font-bold">Search</h1>
        <ButtonGroup
          value={mode}
          options={[
            { label: 'Debounce', value: 'debounce' },
            { label: 'Throttle', value: 'throttle' },
          ]}
          onClick={setMode}
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ImageGrid images={gridData} onClick={(image) => setMovieId(image.id)} />
        <Pagination page={page} maxPages={search.total_pages} onClick={setPage} />
      </section>
      {movie && movieId && (
        <Modal onClick={() => setMovieId(null)}>
          <div className="flex flex-col gap-8 p-8">
            <img className="w-50 rounded-xl" src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <p className="leading-relaxed text-gray-300">{movie.overview}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <DetailItem label="Release" value={movie.release_date} />
                <DetailItem label="Rating" value={movie.vote_average} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};
