import { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'error';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:   'bg-[rgba(173,198,255,0.12)] text-[var(--color-primary)]',
  secondary: 'bg-[rgba(76,215,246,0.12)]  text-[var(--color-secondary)]',
  tertiary:  'bg-[rgba(182,196,255,0.12)] text-[var(--color-tertiary)]',
  neutral:   'bg-[rgba(140,144,159,0.12)] text-[var(--color-outline)]',
  error:     'bg-[rgba(255,180,171,0.12)] text-[var(--color-error)]',
};

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-label text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
