import { createContext, createElement, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type ApiKeyContextValue = {
  apiKey: string;
  hasApiKey: boolean;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
};

const ApiKeyContext = createContext<ApiKeyContextValue | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKeyState] = useState('');

  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key.trim());
  }, []);

  const clearApiKey = useCallback(() => {
    setApiKeyState('');
  }, []);

  const value = useMemo(() => ({ apiKey, hasApiKey: apiKey.length > 0, setApiKey, clearApiKey }), [apiKey, setApiKey, clearApiKey]);

  return createElement(ApiKeyContext.Provider, { value }, children);
};

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}
