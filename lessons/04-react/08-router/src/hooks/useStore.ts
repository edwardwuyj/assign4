import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type StoreItemBase = {
  id: number;
  media: 'movie' | 'tv-show' | 'tv-season';
  title: string;
  poster_path?: string;
};

export type MovieStoreItem = StoreItemBase & {
  media: 'movie';
  release_date: string;
};

export type TvShowStoreItem = StoreItemBase & {
  media: 'tv-show';
  first_air_date?: string;
};

export type TvSeasonStoreItem = StoreItemBase & {
  media: 'tv-season';
  air_date: string;
  season_number: number;
  show_id: number;
};

export type StoreItem = MovieStoreItem | TvShowStoreItem | TvSeasonStoreItem;

export type GenrePreferences = {
  movies: string[];
  tv: string[];
};

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    if (typeof fallback === 'string') {
      return raw as unknown as T;
    }

    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const calculatePrice = (date: string) => {
  const year = new Date(date).getFullYear();
  if (Number.isNaN(year)) {
    return 4.99;
  }

  const age = new Date().getFullYear() - year;
  return Math.max(4.99, 19.99 - age);
};

export const getItemPrice = (item: StoreItem): number | null => {
  if (item.media === 'movie') {
    return calculatePrice(item.release_date);
  }

  if (item.media === 'tv-season') {
    return calculatePrice(item.air_date);
  }

  return null;
};

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const useStoreState = () => {
  const [username, setUsername] = useState(() => loadFromStorage('username', ''));
  const [favorites, setFavorites] = useState<StoreItem[]>(() => loadFromStorage('favorites', []));
  const [cart, setCart] = useState<StoreItem[]>(() => loadFromStorage('cart', []));
  const [genrePreferences, setGenrePreferences] = useState<GenrePreferences>(() =>
    loadFromStorage('genrePreferences', { movies: [], tv: [] })
  );

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('genrePreferences', JSON.stringify(genrePreferences));
  }, [genrePreferences]);

  const addFavorite = (item: StoreItem) => {
    setCart((current) => current.filter((cartItem) => cartItem.id !== item.id || cartItem.media !== item.media));
    setFavorites((current) => {
      if (current.some((currentItem) => currentItem.id === item.id && currentItem.media === item.media)) {
        return current;
      }
      return [...current, item];
    });
  };

  //loads saved favorites on app startup.

  const addToCart = (item: StoreItem) => {
    if (item.media === 'tv-show') {
      return;
    }

    setFavorites((current) => current.filter((fav) => fav.id !== item.id || fav.media !== item.media));
    setCart((current) => {
      if (current.some((cartItem) => cartItem.id === item.id && cartItem.media === item.media)) {
        // this removes matching item from cart
        return current; // checks if item is alr in cart
      }
      return [...current, item];
    });
  };

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  // same here

  return {
    username,
    setUsername,
    favorites,
    cart,
    genrePreferences,
    setGenrePreferences,
    addFavorite,
    addToCart,
    removeFavorite: (item: StoreItem) => setFavorites((current) => current.filter((fav) => fav.id !== item.id || fav.media !== item.media)),
    removeFromCart: (item: StoreItem) =>
      setCart((current) => current.filter((cartItem) => cartItem.id !== item.id || cartItem.media !== item.media)),
  };
};

const StoreContext = createContext<ReturnType<typeof useStoreState> | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useStoreState();

  return React.createElement(StoreContext.Provider, { value: store }, children);
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
};
