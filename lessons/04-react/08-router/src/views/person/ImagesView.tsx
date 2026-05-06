import { ImageGrid } from '@/components';
import { PERSON_ENDPOINT, type ImageCell, type ImagesResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

// ImagesView fetches actor images and displays them in  ImageGrid component
export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  const gridData: ImageCell[] = (data?.profiles ?? []).map((image, index) => ({
    id: index,
    imageUrl: `https://image.tmdb.org/t/p/w500${image.file_path}`,
    primaryText: `Rating: ${image.vote_average.toFixed(1)}`,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Images ({data.profiles.length} photos)</h2>
      {data.profiles.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No images available.</p>}
    </section>
  );
};
