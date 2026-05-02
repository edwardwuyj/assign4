import { DetailItem, LinkGroup, Modal } from '@/components';
import { type MovieRespsonse, getBackdropUrl, getImageUrl, ICON_SIZE, MOVIE_ENDPOINT } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();
  const { id } = useParams();
  const { data } = useTmdb<MovieRespsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' });

  const trailerVideo =
    data?.videos?.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.name?.toLowerCase().includes('official')
    ) || data?.videos?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.title} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.title} />
          <div className="space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{data.title}</h1>
              <button
                onClick={() =>
                  toggleFavorite({
                    id: data.id,
                    imageUrl: getImageUrl(data.poster_path),
                    primaryText: data.title,
                  })
                }
                className="rounded-full p-2 transition hover:bg-black/40"
              >
                {favorites.has(data.id) ? (
                  <FaHeart size={ICON_SIZE} className="text-blue-500" />
                ) : (
                  <FaRegHeart size={ICON_SIZE} className="text-white" />
                )}
              </button>
            </div>
            <p className="leading-relaxed text-gray-300">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.release_date} />
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
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
