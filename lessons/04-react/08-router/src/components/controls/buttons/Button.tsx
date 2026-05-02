import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'grey';
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles = 'px-4 py-2 text-sm rounded-md transition font-medium disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  grey: 'bg-gray-700 hover:bg-gray-600 text-white',
};

export const Button = ({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  return (
    <button type="button" className={`${baseStyles} ${variants[variant]}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
