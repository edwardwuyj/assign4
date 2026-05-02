import { FavoritesOverlay, ImageGrid } from '@/components';
import { useUserContext } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Favorites</h1>
      {favorites.size === 0 ? (
        <p className="mt-10 text-gray-400">You have no favorites yet.</p>
      ) : (
        <ImageGrid images={Array.from(favorites.values())} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
          {(image) => <FavoritesOverlay image={image} />}
        </ImageGrid>
      )}
    </section>
  );
};
