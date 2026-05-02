import { UserContext } from '@/context';
import { FAVORITES_KEY, USERNAME_KEY, type ImageCell } from '@/core';
import { useLocalStorage } from '@/hooks';
import { type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, 'User');
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    serialize: (map) => Array.from(map.entries()),
    deserialize: (entries) => new Map(entries),
  });

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
