import { Header } from '@/components';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
