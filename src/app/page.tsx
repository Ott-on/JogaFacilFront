'use client';

import AppHeader from '@/components/shared/AppHeader';
import BottomNav from '@/components/shared/BottomNav';
import TacticalCard from '@/components/ui/TacticalCard';
import AIProbabilityBar from '@/components/ui/AIProbabilityBar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MatchRowSkeleton, TeamCardSkeleton, StatCardSkeleton } from '@/components/ui/SkeletonBlock';
import { useH2HData } from '@/hooks/useH2HData';
import type { MatchStatus } from '@/types/football';

const statusLabel: Record<MatchStatus, string> = {
  LIVE:       'AO VIVO',
  FINALIZADO: 'FINALIZADO',
  AGENDADO:   'AGENDADO',
};

export default function DashboardPage() {
  const { data, isLoading, homeTeam, awayTeam } = useH2HData();

  return (
    <>
      {/* Ambient blobs */}
      <div className="ambient-blob-tl" />
      <div className="ambient-blob-br" />

      <AppHeader />

      <main className="relative z-10 pt-20 pb-32 px-4 max-w-lg mx-auto space-y-6">

        {/* ── Team Selector ───────────────────────────────────── */}
        <section className="relative py-2">
          <div className="flex items-stretch justify-between gap-3">
            {/* Home team */}
            {isLoading ? (
              <TeamCardSkeleton />
            ) : (
              <button className="flex-1 bg-[var(--color-surface-container-high)] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_8px_32px_rgba(218,226,253,0.05)]">
                <div className="w-14 h-14 rounded-full bg-[var(--color-surface-container-highest)] flex items-center justify-center overflow-hidden">
                  {homeTeam.logoUrl ? (
                    <img
                      src={homeTeam.logoUrl}
                      alt={homeTeam.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[var(--color-outline)]">sports_soccer</span>
                  )}
                </div>
                <span className="font-label text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface)]">
                  {homeTeam.name}
                </span>
                <span className="material-symbols-outlined text-[var(--color-secondary)] text-sm">expand_more</span>
              </button>
            )}

            {/* VS badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-11 h-11 rounded-full bg-[var(--color-secondary)] flex items-center justify-center shadow-[0_0_24px_rgba(76,215,246,0.45)]">
                <span className="font-headline font-black text-[var(--color-on-secondary)] text-sm italic">VS</span>
              </div>
            </div>

            {/* Away team */}
            {isLoading ? (
              <TeamCardSkeleton />
            ) : (
              <button className="flex-1 bg-[var(--color-surface-container-high)] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_8px_32px_rgba(218,226,253,0.05)]">
                <div className="w-14 h-14 rounded-full bg-[var(--color-surface-container-highest)] flex items-center justify-center overflow-hidden">
                  {awayTeam.logoUrl ? (
                    <img
                      src={awayTeam.logoUrl}
                      alt={awayTeam.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[var(--color-outline)]">sports_soccer</span>
                  )}
                </div>
                <span className="font-label text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface)]">
                  {awayTeam.name}
                </span>
                <span className="material-symbols-outlined text-[var(--color-secondary)] text-sm">expand_more</span>
              </button>
            )}
          </div>
        </section>

        {/* ── Recent Encounters ───────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-headline text-xl font-bold text-[var(--color-primary)] tracking-tight">
              Confrontos Recentes
            </h2>
            <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[var(--color-outline)]">
              Histórico: 5A
            </span>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(6,14,32,0.5)]">
            {isLoading ? (
              <div>
                {[1, 2, 3].map((i) => <MatchRowSkeleton key={i} />)}
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto custom-scrollbar-thin divide-y divide-white/5">
                {data?.matches.map((match) => (
                  <div
                    key={match.id}
                    className="py-3 px-4 flex items-center justify-between gap-2 hover:bg-white/5 transition-colors"
                  >
                    {/* Date & time */}
                    <div className="flex flex-col -space-y-0.5 min-w-[72px]">
                      <span className="font-label text-[9px] text-[var(--color-outline)] uppercase tracking-wider">
                        {match.date}
                      </span>
                      <span className="font-body text-[13px] font-medium text-[var(--color-on-surface-variant)]">
                        {match.time}
                      </span>
                    </div>

                    {/* Score & status */}
                    <div className="flex flex-col items-center gap-0.5 flex-1">
                      <span className="font-headline text-xl font-black tracking-tighter text-[var(--color-on-surface)]">
                        {match.homeScore} – {match.awayScore}
                      </span>
                      {match.status === 'LIVE' ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-error-container)]/20 text-[var(--color-error)] text-[8px] font-black uppercase tracking-widest">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-error)] pulse-dot" />
                          {statusLabel[match.status]}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--color-surface-container-highest)] text-[var(--color-outline)] text-[8px] font-black uppercase tracking-widest">
                          {statusLabel[match.status]}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Button variant="analyze" className="shrink-0">
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        auto_awesome
                      </span>
                      Analisar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── AI Win Probability ──────────────────────────────── */}
        <section>
          <TacticalCard glass glowAccent="secondary" className="p-5 relative overflow-hidden">
            {/* Background glow blob */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-secondary)]/10 blur-[40px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Title */}
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[var(--color-secondary)] glow-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
                <h3 className="font-headline font-bold text-[var(--color-on-surface)]">
                  Probabilidade de Vitória IA
                </h3>
              </div>

              {isLoading || !data ? (
                <div className="space-y-3 animate-pulse">
                  <div className="skeleton h-3 w-full rounded-full" />
                  <div className="skeleton h-2 w-3/4" />
                  <div className="skeleton h-2 w-1/2" />
                </div>
              ) : (
                <AIProbabilityBar
                  homeLabel={data.homeTeam.shortName}
                  homePercent={data.probability.homePercent}
                  drawPercent={data.probability.drawPercent}
                  awayLabel={data.awayTeam.shortName}
                  awayPercent={data.probability.awayPercent}
                  insight={data.probability.insight}
                />
              )}
            </div>
          </TacticalCard>
        </section>

        {/* ── Stats Skeleton (placeholder for future charts) ──── */}
        <section>
          <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-outline)] mb-4">
            Estatísticas Táticas
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Posse de Bola', icon: 'analytics' },
              { label: 'xG', icon: 'center_focus_strong' },
              { label: 'Finalizações', icon: 'sports_score' },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="bg-[var(--color-surface-container-high)] rounded-2xl p-4 flex flex-col items-center gap-3"
              >
                <span className="material-symbols-outlined text-[var(--color-outline)] text-xl">{icon}</span>
                <StatCardSkeleton />
                <span className="font-label text-[9px] uppercase tracking-widest text-[var(--color-outline)] text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center font-label text-[9px] text-[var(--color-outline)]/60 mt-3 tracking-widest uppercase">
            Gráficos em breve
          </p>
        </section>

        {/* ── Recent form badges ──────────────────────────────── */}
        {data && (
          <section>
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-outline)] mb-3">
              Forma Recente
            </h3>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-label text-[10px] text-[var(--color-outline)] mb-2">{data.homeTeam.shortName}</p>
                <div className="flex gap-1.5">
                  {['V', 'V', 'E', 'V', 'D'].map((r, i) => (
                    <Badge
                      key={i}
                      variant={r === 'V' ? 'secondary' : r === 'E' ? 'neutral' : 'error'}
                    >
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-label text-[10px] text-[var(--color-outline)] mb-2 text-right">{data.awayTeam.shortName}</p>
                <div className="flex gap-1.5 justify-end">
                  {['D', 'V', 'V', 'V', 'E'].map((r, i) => (
                    <Badge
                      key={i}
                      variant={r === 'V' ? 'secondary' : r === 'E' ? 'neutral' : 'error'}
                    >
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </>
  );
}
