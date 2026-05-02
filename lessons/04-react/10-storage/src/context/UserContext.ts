import type { ImageCell } from '@/core';
import { createContext } from 'react';

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
