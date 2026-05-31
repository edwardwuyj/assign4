import { Button, DetailItem, LinkGroup, Modal } from '@/components';
import { type TvShowResponse, getBackdropUrl, getImageUrl, TV_ENDPOINT } from '@/core';
import { useStore, useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useStore();
  const { id } = useParams();
  const { data } = useTmdb<TvShowResponse>(`${TV_ENDPOINT}/${id}`, { append_to_response: 'videos' });

  const trailerVideo =
    data?.videos?.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.name?.toLowerCase().includes('official')
    ) || data?.videos?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const tvShowItem = {
    id: data.id,
    media: 'tv-show' as const,
    title: data.name,
    poster_path: data.poster_path,
    first_air_date: data.first_air_date,
  };

  const isFavorite = favorites.some((item) => item.id === tvShowItem.id && item.media === tvShowItem.media);

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.name} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.name} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="leading-relaxed text-gray-300">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.first_air_date} />
              <DetailItem label="Rating" value={data.vote_average} />
            </div>
            {trailerVideo && (
              <div className="aspect-video w-[50%]">
                <iframe
                  className="h-full w-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title={trailerVideo.name}
                  allowFullScreen
                />
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-3">
              <Button
                variant={isFavorite ? 'grey' : 'primary'}
                onClick={() => (isFavorite ? removeFavorite(tvShowItem) : addFavorite(tvShowItem))}
              >
                {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
              </Button>
            </div>
            <LinkGroup
              options={[
                { label: 'Seasons', to: 'seasons' },
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Trailers', to: 'trailers' },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
