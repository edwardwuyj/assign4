import { type ImageCell } from '@/core';
import { FaHeart } from 'react-icons/fa';

type ImageGridProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
  onFavoriteClick?: (image: ImageCell) => void;
};

export const ImageGrid = ({ images, onClick, onFavoriteClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {images.map((image) => (
        <div
          key={image.id}
          className={`relative overflow-hidden rounded-lg bg-gray-800 ${onClick ? 'cursor-pointer transition hover:scale-[1.02]' : ''}`}
          onClick={() => onClick?.(image)}
        >
          {onFavoriteClick && (
            <button
              type="button"
              aria-label="Add to favorites"
              onClick={(event) => {
                event.stopPropagation();
                onFavoriteClick(image);
              }}
              className="absolute top-2 right-2 z-10 rounded-full bg-black/70 p-2 text-white transition hover:bg-red-600"
            >
              <FaHeart className={`h-4 w-4 ${image.isFavorite ? 'text-red-400' : 'text-white'}`} />
            </button>
          )}
          <img src={image.imageUrl} alt={image.primaryText} />
          {(image.primaryText || image.secondaryText) && (
            <div className="flex flex-col p-3 text-center">
              {image.primaryText && <p className="truncate text-sm font-semibold">{image.primaryText}</p>}
              {image.secondaryText && <p className="truncate text-sm font-semibold text-blue-400">{image.secondaryText}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
