import { type ImageCell } from '@/core';

type ImageGridProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
};

export const ImageGrid = ({ images, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {images.map((image) => (
        <div
          key={image.id}
          className={`relative overflow-hidden rounded-lg bg-gray-800 ${onClick ? 'cursor-pointer transition hover:scale-[1.02]' : ''}`}
          onClick={() => onClick?.(image)}
        >
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
