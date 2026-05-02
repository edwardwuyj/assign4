export type Media = 'movie' | 'tv';

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText: string;
  secondaryText?: string;
  media?: Media;
};
