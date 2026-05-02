import type { ReactNode } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string[];
};

export const Link = ({ children, to, match = [] }: LinkProps) => {
  const { pathname } = useLocation();
  const matched = match.some((pattern) => matchPath({ path: pattern, end: false }, pathname));

  return (
    <NavLink
      replace
      to={to}
      className={({ isActive }) =>
        `rounded-md border px-4 py-1 transition-all duration-200 ${
          isActive || matched
            ? 'scale-105 border-white bg-white text-gray-900 shadow-lg'
            : 'border-gray-700 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
};
