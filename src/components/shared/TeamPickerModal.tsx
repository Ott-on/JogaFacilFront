'use client';

import { useState, useEffect, useRef } from 'react';
import type { Team } from '@/types/football';
import { useTeams } from '@/hooks/useTeams';

interface TeamPickerModalProps {
  /** Which slot is being picked: 'home' or 'away' */
  slot: 'home' | 'away';
  /** Currently selected team for this slot */
  current?: Team;
  /** Called when user selects a team */
  onSelect: (team: Team) => void;
  /** Called when user dismisses the modal */
  onClose: () => void;
}

export default function TeamPickerModal({
  slot,
  current,
  onSelect,
  onClose,
}: TeamPickerModalProps) {
  const { teams, isLoading, error } = useTeams();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input on open
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.shortName.toLowerCase().includes(query.toLowerCase())
  );

  const label = slot === 'home' ? 'Time da Casa' : 'Time Visitante';

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-[var(--color-surface-container-lowest)]/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg glass-panel rounded-t-3xl sm:rounded-2xl shadow-2xl border border-white/8 flex flex-col max-h-[75vh]">

        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[var(--color-outline-variant)]/40" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="font-label text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
              Selecionar
            </p>
            <h3 className="font-headline font-bold text-[var(--color-on-surface)] text-lg">
              {label}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--color-surface-container-high)] flex items-center justify-center hover:bg-[var(--color-surface-variant)] transition-colors"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[var(--color-outline)] text-lg">close</span>
          </button>
        </div>

        {/* Search input */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-3 bg-[var(--color-surface-container-high)] rounded-2xl px-4 py-3 border border-[var(--color-secondary)]/0 focus-within:border-[var(--color-secondary)]/30 focus-within:shadow-[0_0_0_4px_rgba(76,215,246,0.08)] transition-all">
            <span className="material-symbols-outlined text-[var(--color-outline)] text-xl">search</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar time..."
              className="flex-1 bg-transparent border-none outline-none text-[var(--color-on-surface)] placeholder-[var(--color-outline)] text-sm font-body"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[var(--color-outline)] hover:text-[var(--color-on-surface)]">
                <span className="material-symbols-outlined text-lg">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Team list */}
        <div className="overflow-y-auto custom-scrollbar-thin flex-1 px-3 pb-6">
          {isLoading && (
            <div className="space-y-2 px-2 pt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-14 skeleton rounded-xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-[var(--color-error)] text-3xl block mb-2">wifi_off</span>
              <p className="text-sm text-[var(--color-on-surface-variant)]">{error}</p>
            </div>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-[var(--color-outline)] text-3xl block mb-2">search_off</span>
              <p className="text-sm text-[var(--color-on-surface-variant)]">Nenhum time encontrado</p>
            </div>
          )}

          {!isLoading && filtered.map((team) => {
            const isSelected = current?.id === team.id;
            return (
              <button
                key={team.id}
                onClick={() => { onSelect(team); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all text-left ${
                  isSelected
                    ? 'bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20'
                    : 'hover:bg-[var(--color-surface-container-high)]'
                }`}
              >
                {/* Logo or placeholder */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-surface-container-highest)] flex items-center justify-center overflow-hidden shrink-0">
                  {team.logoUrl ? (
                    <img src={team.logoUrl} alt={team.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-headline font-black text-sm text-[var(--color-outline)]">
                      {team.shortName.slice(0, 2)}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm truncate ${isSelected ? 'text-[var(--color-secondary)]' : 'text-[var(--color-on-surface)]'}`}>
                    {team.name}
                  </p>
                  <p className="font-label text-[10px] text-[var(--color-outline)] uppercase tracking-widest">
                    {team.shortName}
                  </p>
                </div>

                {isSelected && (
                  <span className="material-symbols-outlined text-[var(--color-secondary)] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
