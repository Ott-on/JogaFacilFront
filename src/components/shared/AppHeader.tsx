'use client';

import Link from 'next/link';

interface AppHeaderProps {
  title?: string;
  showAiStatus?: boolean;
}

export default function AppHeader({
  title = 'JOGA FACIL',
  showAiStatus = true,
}: AppHeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--color-surface)]/85 backdrop-blur-lg border-b border-[var(--color-outline-variant)]/10">
      <div className="flex items-center justify-between px-5 h-16 max-w-lg mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <span
              className="material-symbols-outlined text-[var(--color-secondary)] text-2xl glow-secondary transition-all group-hover:scale-110"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_soccer
            </span>
          </div>
          <h1 className="font-headline font-black text-lg text-[var(--color-primary)] tracking-[0.25em] uppercase">
            {title}
          </h1>
        </Link>

        {/* AI Status indicator */}
        {showAiStatus && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[var(--color-surface-container-high)] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] pulse-dot" />
              <span className="font-label text-[9px] font-bold uppercase tracking-widest text-[var(--color-secondary)]">
                AI Online
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
