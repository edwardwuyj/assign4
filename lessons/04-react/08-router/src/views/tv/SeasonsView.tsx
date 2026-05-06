import { ImageGrid } from '@/components';
import { TV_ENDPOINT, getImageUrl, type ImageCell, type SeasonsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

// SeasonsView fetch the TV show details and renders seasons in an ImageGrid.
export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData: ImageCell[] = (data?.seasons ?? []).map((season) => ({
    id: season.id,
    imageUrl: getImageUrl(season.poster_path),
    primaryText: season.name,
    secondaryText: `${season.episode_count} episodes`,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Seasons</h2>
      {data.seasons.length ? (
        <ImageGrid
          images={gridData}
          onClick={(image) => navigate(`/tv/${id}/season/${data.seasons.find((s) => s.id === image.id)?.season_number}`)}
        />
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
