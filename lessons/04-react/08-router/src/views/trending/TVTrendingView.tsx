import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, TV_TRENDING_ENDPOINT, type ImageCell, type TvListResponse } from '@/core';
import { useStore, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TVTrendingView = () => {
  const navigate = useNavigate();
  const { addFavorite, favorites } = useStore();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';
  const { data } = useTmdb<TvListResponse>(`${TV_TRENDING_ENDPOINT}/${interval}`, { page, time_window: interval });

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

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_name || result.name,
    posterPath: result.poster_path,
    airDate: result.first_air_date,
    isFavorite: favorites.some((favorite) => favorite.id === result.id && favorite.media === 'tv-show'),
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/credits`)} onFavoriteClick={handleFavorite} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
