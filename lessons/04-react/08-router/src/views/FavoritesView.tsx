import { Button } from '@/components';
import { getItemPrice, useStore } from '@/hooks';

export const FavoritesView = () => {
  const { favorites, addToCart, removeFavorite } = useStore();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Favorites</h1>
      {favorites.length ? (
        <div className="space-y-3">
          {favorites.map((item) => {
            const price = getItemPrice(item);
            const canPurchase = price !== null;

            return (
              <div key={`${item.media}-${item.id}`} className="rounded-2xl border border-gray-700 bg-gray-900 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-gray-400">
                      {item.media === 'movie' ? 'Movie' : item.media === 'tv-season' ? `TV Season ${item.season_number}` : 'TV Show'}
                    </p>
                  </div>
                  <p className="text-sm text-blue-300">{price ? `$${price.toFixed(2)}` : 'Not purchasable'}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {canPurchase && (
                    <Button variant="primary" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                  )}
                  <Button variant="grey" onClick={() => removeFavorite(item)}>
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">You have no favorites yet.</p>
      )}
    </section>
  );
};
