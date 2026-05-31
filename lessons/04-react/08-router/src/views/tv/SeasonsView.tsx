import { Button } from '@/components';
import { TV_ENDPOINT, getImageUrl, type SeasonsResponse } from '@/core';
import { getItemPrice, useStore, useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

// SeasonsView fetch the TV show details and renders seasons in a grid.
export const SeasonsView = () => {
  const navigate = useNavigate();
  const { cart, favorites, addFavorite, addToCart, removeFavorite, removeFromCart } = useStore();
  const { id } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Seasons</h2>
      {data.seasons.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.seasons.map((season) => {
            const seasonItem = {
              id: season.id,
              media: 'tv-season' as const,
              title: season.name,
              poster_path: season.poster_path,
              air_date: season.air_date ?? '',
              season_number: season.season_number,
              show_id: Number(id),
            };
            const isFavorite = favorites.some((item) => item.id === seasonItem.id && item.media === seasonItem.media);
            const isInCart = cart.some((item) => item.id === seasonItem.id && item.media === seasonItem.media);
            const price = getItemPrice(seasonItem);

            return (
              <div key={season.id} className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-900">
                <img src={getImageUrl(season.poster_path)} alt={season.name} className="h-64 w-full object-cover" />
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{season.name}</h3>
                    <span className="text-sm text-blue-300">{price ? `$${price.toFixed(2)}` : '$4.99'}</span>
                  </div>
                  <p className="text-sm text-gray-400">{season.episode_count} episodes</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={isInCart ? 'grey' : 'primary'}
                      onClick={() => (isInCart ? removeFromCart(seasonItem) : addToCart(seasonItem))}
                    >
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant={isFavorite ? 'grey' : 'primary'}
                      onClick={() => (isFavorite ? removeFavorite(seasonItem) : addFavorite(seasonItem))}
                    >
                      {isFavorite ? 'Remove Favorite' : 'Favorite'}
                    </Button>
                    <Button variant="grey" onClick={() => navigate(`/tv/${id}/season/${season.season_number}`)}>
                      View Episodes
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
