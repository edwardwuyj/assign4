export type Media = 'movie' | 'tv' | 'tv-show';

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText: string;
  secondaryText?: string;
  media?: Media;
  posterPath?: string;
  releaseDate?: string;
  airDate?: string;
  isFavorite?: boolean;
};
