'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  iconFilled: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'Matches',
    icon: 'sports_soccer',
    iconFilled: 'sports_soccer',
  },
  {
    href: '/insights',
    label: 'Insights',
    icon: 'psychology',
    iconFilled: 'psychology',
  },
  {
    href: '/leagues',
    label: 'Leagues',
    icon: 'emoji_events',
    iconFilled: 'emoji_events',
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 glass-nav rounded-t-[1.5rem] shadow-[0_-8px_32px_rgba(218,226,253,0.06)] border-t border-[var(--color-outline-variant)]/15">
      <div className="flex justify-around items-center px-4 pb-6 pt-3 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[var(--color-secondary)] bg-[var(--color-surface-container-high)]'
                  : 'text-[var(--color-on-surface)]/40 hover:text-[var(--color-primary)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {isActive ? item.iconFilled : item.icon}
              </span>
              <span className="font-label text-[9px] font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
