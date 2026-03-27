'use client';

import { useTeams } from '@/hooks/useTeams';
import type { Team } from '@/types/football';
import { useMemo } from 'react';

interface TeamSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (team: Team) => void;
  title?: string;
}

export default function TeamSelectorModal({
  isOpen,
  onClose,
  onSelect,
  title = 'Selecione um Time',
}: TeamSelectorModalProps) {
  const { teams, isLoading, error } = useTeams();

  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => a.name.localeCompare(b.name));
  }, [teams]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[var(--color-surface-container-highest)] rounded-t-3xl sm:rounded-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-5">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[var(--color-surface-container-highest)]">
          <h2 className="font-headline font-bold text-lg text-[var(--color-on-surface)]">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[var(--color-on-surface)] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar-thin">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
              <p className="font-label text-xs uppercase tracking-widest text-[var(--color-outline)]">
                Carregando times...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <span className="material-symbols-outlined text-[32px] text-[var(--color-error)]">error</span>
              <p className="font-body text-sm text-[var(--color-error)] text-center">
                {error}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {sortedTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => onSelect(team)}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors w-full text-left bg-[var(--color-surface-container-high)] shadow-[0_4px_16px_rgba(218,226,253,0.02)]"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-surface-container-highest)] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {team.logoUrl ? (
                      <img
                        src={team.logoUrl}
                        alt={team.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[var(--color-outline)]">sports_soccer</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline font-bold text-[15px] text-[var(--color-on-surface)]">
                      {team.name}
                    </span>
                    <span className="font-label text-xs tracking-wider uppercase text-[var(--color-outline)]">
                      {team.shortName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
