import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, UPCOMING_ENDPOINT, type ImageCell, type MovieRespsonse } from '@/core';
import { useStore, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpcomingView = () => {
  const navigate = useNavigate();
  const { addFavorite, favorites } = useStore();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<MovieRespsonse>(UPCOMING_ENDPOINT, { page });

  const handleFavorite = (image: ImageCell) => {
    addFavorite({
      id: image.id,
      media: 'movie',
      title: image.primaryText,
      poster_path: image.posterPath ?? '',
      release_date: image.releaseDate ?? '',
    });
    navigate('/favorites');
  };

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
    posterPath: result.poster_path,
    releaseDate: result.release_date,
    isFavorite: favorites.some((favorite) => favorite.id === result.id && favorite.media === 'movie'),
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Upcoming</h1>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} onFavoriteClick={handleFavorite} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
