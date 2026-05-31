import { Button, DetailItem, LinkGroup, Modal } from '@/components';
import { type MovieRespsonse, getBackdropUrl, getImageUrl, MOVIE_ENDPOINT } from '@/core';
import { getItemPrice, useStore, useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { cart, favorites, addFavorite, addToCart, removeFavorite, removeFromCart } = useStore();
  const { id } = useParams();
  const { data } = useTmdb<MovieRespsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' });

  const trailerVideo =
    data?.videos?.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.name?.toLowerCase().includes('official')
    ) || data?.videos?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const movieItem = {
    id: data.id,
    media: 'movie' as const,
    title: data.title,
    poster_path: data.poster_path,
    release_date: data.release_date,
  };

  const isFavorite = favorites.some((item) => item.id === movieItem.id && item.media === movieItem.media);
  const isInCart = cart.some((item) => item.id === movieItem.id && item.media === movieItem.media);
  const price = getItemPrice(movieItem);

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.title} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.title} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{data.title}</h1>
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
            <div className="flex flex-wrap gap-3 pt-3">
              <Button
                variant={isFavorite ? 'grey' : 'primary'}
                onClick={() => (isFavorite ? removeFavorite(movieItem) : addFavorite(movieItem))}
              >
                {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
              </Button>
              <Button variant={isInCart ? 'grey' : 'primary'} onClick={() => (isInCart ? removeFromCart(movieItem) : addToCart(movieItem))}>
                {isInCart ? 'Remove from Cart' : `Add to Cart ${price ? `$${price.toFixed(2)}` : ''}`}
              </Button>
            </div>
            <LinkGroup
              options={[
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
