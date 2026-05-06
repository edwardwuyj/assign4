import { ImageGrid } from '@/components';
import { PERSON_ENDPOINT, getImageUrl, type CareerResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

// CareerView fetches the actor's combined credits and renders each role as a clickable card.
// Clicking a role routes to the correct movie or TV detail page based on media type.
export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/combined_credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((role) => ({
    id: role.id,
    imageUrl: getImageUrl(role.poster_path),
    primaryText: role.title || role.name || 'Unknown',
    secondaryText: role.character,
    media: role.media_type === 'tv' ? 'tv' : 'movie',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Career ({data.cast.length} roles)</h2>
      {data.cast.length ? (
        <ImageGrid
          images={gridData}
          // Navigate to the selected role's detail page, using media type if available.
          onClick={(image) => navigate(`/${image.media ?? 'movie'}/${image.id}`)}
        />
      ) : (
        <p className="text-center text-gray-400">No career information available.</p>
      )}
    </section>
  );
};
