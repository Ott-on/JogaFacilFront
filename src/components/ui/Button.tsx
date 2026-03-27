import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'icon' | 'analyze';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--color-primary-container)] to-[var(--color-primary)] text-[var(--color-on-primary-container)] font-bold shadow-[0_4px_16px_rgba(173,198,255,0.2)]',
  ghost:
    'bg-[rgba(173,198,255,0.10)] hover:bg-[rgba(173,198,255,0.18)] text-[var(--color-primary)] backdrop-blur-sm',
  analyze:
    'bg-[var(--color-primary-container)]/90 text-[var(--color-on-primary-container)] hover:bg-[var(--color-primary-container)]',
  icon:
    'bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-variant)]',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-label text-[10px] uppercase tracking-wide transition-all active:scale-95 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
