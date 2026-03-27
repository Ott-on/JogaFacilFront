import { ReactNode } from 'react';

type GlowAccent = 'primary' | 'secondary' | 'tertiary' | 'none';

interface TacticalCardProps {
  children: ReactNode;
  glowAccent?: GlowAccent;
  className?: string;
  onClick?: () => void;
  glass?: boolean;
}

const glowMap: Record<GlowAccent, string> = {
  primary:   'before:bg-[radial-gradient(circle_at_top_right,rgba(173,198,255,0.12),transparent_60%)]',
  secondary: 'before:bg-[radial-gradient(circle_at_top_right,rgba(76,215,246,0.12),transparent_60%)]',
  tertiary:  'before:bg-[radial-gradient(circle_at_top_right,rgba(182,196,255,0.10),transparent_60%)]',
  none:      '',
};

export default function TacticalCard({
  children,
  glowAccent = 'none',
  className = '',
  onClick,
  glass = false,
}: TacticalCardProps) {
  const base = glass ? 'glass-card' : 'bg-[var(--color-surface-container-high)]';
  const glow = glowAccent !== 'none'
    ? `relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:pointer-events-none ${glowMap[glowAccent]}`
    : '';
  const interactive = onClick
    ? 'cursor-pointer transition-transform active:scale-[0.98] hover:brightness-110'
    : '';

  return (
    <div
      className={`${base} rounded-2xl shadow-[0_8px_32px_rgba(218,226,253,0.05)] ${glow} ${interactive} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
