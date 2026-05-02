import { ICON_SIZE, type ImageCell } from '@/core';
import { useUserContext } from '@/hooks';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type FavoritesOverlayProps = {
  image: ImageCell;
};

export const FavoritesOverlay = ({ image }: FavoritesOverlayProps) => {
  const { favorites, toggleFavorite } = useUserContext();

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        toggleFavorite(image);
      }}
      className="absolute top-1 right-1 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition hover:bg-black/70"
    >
      {favorites.has(image.id) ? (
        <FaHeart size={ICON_SIZE} className="text-blue-500" />
      ) : (
        <FaRegHeart size={ICON_SIZE} className="text-white" />
      )}
    </button>
  );
};
