import { Button } from '@/components';
import { useApiKey } from '@/hooks/useApiKey';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ApiKeyModal = () => {
  const navigate = useNavigate();
  const { hasApiKey, setApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState('');

  const handleSetKey = () => {
    setApiKey(inputValue);
    setInputValue('');
  };

  const handleEnter = () => {
    if (hasApiKey) {
      navigate('/now-playing');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="flex flex-1 items-center justify-center">
        <section className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold">TMDB Explorer</h1>
          <p className="text-lg text-gray-400">Enter your TMDB API key to continue</p>

          {hasApiKey ? (
            <p className="text-green-400">API key found</p>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter TMDB API key"
                className="w-full max-w-md rounded border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-gray-500 focus:outline-none"
              />
              <Button onClick={handleSetKey} disabled={!inputValue.trim()}>
                Set Key
              </Button>
            </div>
          )}

          <Button onClick={handleEnter} disabled={!hasApiKey}>
            Enter
          </Button>
        </section>
      </main>
      <footer className="p-5 text-center text-sm text-gray-500">Built with React, Vite and React Router</footer>
    </div>
  );
};
