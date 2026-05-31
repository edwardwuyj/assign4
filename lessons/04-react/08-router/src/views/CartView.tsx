import { Button } from '@/components';
import { getItemPrice, useStore } from '@/hooks';

export const CartView = () => {
  const { cart, removeFromCart } = useStore();
  const totalPrice = cart.reduce((sum, item) => sum + (getItemPrice(item) ?? 0), 0);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Cart</h1>
      {cart.length ? (
        <div className="space-y-3">
          {cart.map((item) => {
            const price = getItemPrice(item);
            return (
              <div key={`${item.media}-${item.id}`} className="rounded-2xl border border-gray-700 bg-gray-900 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-gray-400">
                      {item.media === 'movie' ? 'Movie' : item.media === 'tv-season' ? `TV Season ${item.season_number}` : 'TV Show'}
                    </p>
                  </div>
                  <p className="text-sm text-blue-300">{price ? `$${price.toFixed(2)}` : 'N/A'}</p>
                </div>
                <div className="mt-3">
                  <Button variant="grey" onClick={() => removeFromCart(item)}>
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="rounded-2xl border border-gray-700 bg-gray-900 p-4 text-right text-lg font-semibold text-white">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Your cart is empty.</p>
      )}
    </section>
  );
};
