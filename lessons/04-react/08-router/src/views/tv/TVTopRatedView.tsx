import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, TV_TOP_RATED_ENDPOINT, type ImageCell, type TvListResponse } from '@/core';
import { useStore, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TVTopRatedView = () => {
  const navigate = useNavigate();
  const { addFavorite, favorites } = useStore();
  const [page, setPage] = useState<number>(1);
  const { data, error } = useTmdb<TvListResponse>(TV_TOP_RATED_ENDPOINT, { page });

  const handleFavorite = (image: ImageCell) => {
    addFavorite({
      id: image.id,
      media: 'tv-show',
      title: image.primaryText,
      poster_path: image.posterPath ?? '',
      first_air_date: image.airDate ?? '',
    });
    navigate('/favorites');
  };

  if (error) {
    return <p className="text-center text-red-400">Error: {error}</p>;
  }

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_name || result.name,
    posterPath: result.poster_path,
    airDate: result.first_air_date,
    isFavorite: favorites.some((favorite) => favorite.id === result.id && favorite.media === 'tv-show'),
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Top Rated</h1>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/credits`)} onFavoriteClick={handleFavorite} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
