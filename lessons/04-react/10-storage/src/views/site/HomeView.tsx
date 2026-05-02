import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="flex flex-1 items-center justify-center">
        <section className="space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight">TMDB Explorer</h1>
          <p className="text-lg text-gray-400">Explore movies and discover people using a fast, modern interface.</p>
          <Button onClick={() => navigate('/now-playing')}>Enter</Button>
        </section>
      </main>
      <footer className="p-5 text-center text-sm text-gray-500">Built with React, Vite and React Router</footer>
    </div>
  );
};
