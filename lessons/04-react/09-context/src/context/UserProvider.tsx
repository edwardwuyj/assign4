import { UserContext } from '@/context';
import { type ImageCell } from '@/core';
import { useState, type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useState<string>('User');
  const [favorites, setFavorites] = useState<Map<number, ImageCell>>(new Map());

  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        favorites,
        setUserName,
        toggleFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
