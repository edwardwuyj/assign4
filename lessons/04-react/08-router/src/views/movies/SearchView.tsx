import { ImageGrid, Pagination, SearchBar } from '@/components';
import { type ImageCell, type MovieRespsonse, getImageUrl, RATE_LIMIT_DELAY, SEARCH_ENDPOINT } from '@/core';
import { useDebounce, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const debouncedQuery = useDebounce(query, RATE_LIMIT_DELAY);
  const { data } = useTmdb<MovieRespsonse>(SEARCH_ENDPOINT, { query: debouncedQuery, page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Search</h1>
      <SearchBar value={query} onChange={setQuery} />
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          setPage(1);
          navigate(`/movie/${image.id}/credits`);
        }}
      />
      {data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found.</p>
      )}
    </section>
  );
};
