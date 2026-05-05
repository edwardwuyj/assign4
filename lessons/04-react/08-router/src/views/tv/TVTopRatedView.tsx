import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, TV_TOP_RATED_ENDPOINT, type ImageCell, type MovieRespsonse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TVTopRatedView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data, error } = useTmdb<MovieRespsonse>(TV_TOP_RATED_ENDPOINT, { page });

  if (error) {
    return <p className="text-center text-red-400">Error: {error}</p>;
  }

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Top Rated</h1>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
