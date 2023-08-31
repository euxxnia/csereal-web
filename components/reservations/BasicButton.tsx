import { ReactNode } from 'react';

export default function BasicButton({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className={`text-xs text-neutral-700 rounded-sm border border-neutral-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
