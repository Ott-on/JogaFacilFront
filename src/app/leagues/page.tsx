'use client';

import { useState } from 'react';
import AppHeader from '@/components/shared/AppHeader';
import BottomNav from '@/components/shared/BottomNav';
import TacticalCard from '@/components/ui/TacticalCard';
import Badge from '@/components/ui/Badge';
import type { RankingEntry, TopScorer, SpotlightCard } from '@/types/football';

// ─── Mock data ────────────────────────────────────────────────────────────────

const SPOTLIGHT_CARDS: SpotlightCard[] = [
  {
    label: 'Poder Ofensivo',
    accentVariant: 'primary',
    content:
      'O poder de gol do Man City é estatisticamente incomparável, mostrando 15% mais eficiência no terço final.',
    team: { id: 'man-city', name: 'Man City', shortName: 'MCI', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKDRGHrGnMXTZikmcEMiNnQ2VTs0SjhLRMYQlx1-Q-365N3AJ27r0-ohcsZ56CIlogqb51Lhx2FyJTLQ-jrq1PDWIfJa-9fmNyJwvPSRZxuKN5JFHxdDN-QsGoymr3wxBxAx1y_YSnxSdbZOvN-GokR2s7KWdPqwT6853p5b7AR24WD4KnXvOOAgSVwE6pswyaOI2r3XhYco6Ps0QUh-2LNZHkflXb-ISSU-eUexlm9wCHQRTr3PskWsTDtBVnb7L-kaGG73OZVeA' },
  },
  {
    label: 'Muralha Defensiva',
    accentVariant: 'secondary',
    content:
      'O Arsenal mantém o bloco baixo mais compacto da liga, resultando no menor xG concedido por jogo.',
    team: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrI0BOUSSTYiUMSkqByC4tM2TDE9kjHxTajGi3m0FrhZplsfBVj6mOOAvMo-pIvZKVsPhU4Us8a65X1LMPWmgFoKhLVwJdMMVONejRkr_Md7McsIq0ITz8sFaI1cZ2vORdK-4g-ENBNxDnv60NzE39afhKFnafFl--9mX7a1bRmEvpUsemAHbLCCVtMNY6iSydbQgRAZRj4lxlShfY9OnzGVVmRifl7xLYGBj4k1kEAbp_KpPZMaQYhTArhchXGlgdYurNbLu9CQE' },
  },
  {
    label: 'Índice de Controle',
    accentVariant: 'tertiary',
    content:
      'Domínio tático no meio-campo permite ao Barça ditar o ritmo, com 68% de controle em zonas decisivas.',
    team: { id: 'barca', name: 'Barça', shortName: 'BAR', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYlar1H3uHdRQkSVMWnzD4fXFbap9VF6XCR7xE1iS_MI7VX3zccgFMXlc4gONpJSEMZAwGDn5amGqyIQlU63cnbjZVjtCwGdGlEoFc2-42sJBk-BdcEducQHA1mDGz2YleueRZqsv0w5NcvEf22lPiGprSF2tjzQ_mlAsPByeym19RUz-M05S2e2h1epJyBmxrQKaI4VsLWn_fBWZxp4zKr5ThAWAy1e3TLq7E3gtjlYLkn3h_eg6Y4t5jifrhtxFJUqJbq02wvBg' },
  },
];

const RANKINGS: RankingEntry[] = [
  { id: '1', position: 1, team: { id: 'man-city', name: 'Man City', shortName: 'MCI' }, badge: 'Favorito Preditivo', badgeVariant: 'secondary', summary: 'Favorito estatístico. Alta probabilidade de conquistar a taça com base na eficiência ofensiva atual.' },
  { id: '2', position: 2, team: { id: 'arsenal',  name: 'Arsenal',  shortName: 'ARS' }, badge: 'Preditivo: Top 2',  badgeVariant: 'tertiary',  summary: 'Estrutura defensiva de elite garante consistência. Era esperado disputar até a última rodada.' },
  { id: '3', position: 3, team: { id: 'liverpool',name: 'Liverpool',shortName: 'LIV' }, badge: 'Preditivo: UCL',    badgeVariant: 'primary',   summary: 'Configuração tática de alto risco e alta recompensa. Previsto para garantir futebol na Champions League.' },
  { id: '4', position: 4, team: { id: 'villa',    name: 'Aston Villa',shortName:'AVL'}, badge: 'Batalha Top 4',   badgeVariant: 'neutral',   summary: 'Dominante em casa. Previsto para garantir vaga na UCL se mantiver percentual de vitórias em casa.' },
];

const TOP_SCORERS: TopScorer[] = [
  { id: '1', name: 'Erling Haaland', goals: 20, team: { id: 'man-city', name: 'Man City', shortName: 'MCI' }, photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdaI9bu881PQ6K5PJ8seZ7eONEVgxIe4_8EyCOp-G9CM1lcRevXYxhOedjPnhETgDPpaDapbBG5nvLtdDRXY3JNo9OaaDp975adXpxGJXzuhxrkzXDaJoPldRNJumhp4to9fI-TcEGa4lujZzwYiUeVBf-XJ52ajuqHG6x6r-rg3w2mgRywMik8kPQJhobT67lwj-xylxw3wfdyux0F82MSM94jQfRFYd9Hlgje5hRDctj1BWmKKhuYE8Q7I7Jz6rnVBUyxE_5aa8' },
  { id: '2', name: 'Cole Palmer',    goals: 20, team: { id: 'chelsea',  name: 'Chelsea',  shortName: 'CHE' }, photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxSZbc_NOO2jLUlV7WJC30IvaI6zXmU_mB0B-PgDGHs1gS5kAyKCYMGI1uVv3SP0d07BLCvyVQTDNJsKwOx27oi99mXOIeWlP5jkz1iF7eThZXzUdFPezNfJA6esJX1btqX9sLtZk9XmYSCQd9yGa5RsK7xH30hQLvl4brUMxN_HHa87Ljc5Ccp4BYKZrVIyliUlLo-lUo6J0Tt0gd2xm1iMhrs5dyY6UEruN1WeFUoGNlYDVJXhSVA6dqFgSOlqxq0N3VLHw2HUA' },
  { id: '3', name: 'Ollie Watkins',  goals: 19, team: { id: 'villa',    name: 'Aston Villa', shortName: 'AVL' }, photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCDLSHQOQAMThWFvXtlUXTvz-PHzcCbaPqnGixYMC8iDjAOilGRds-QotgpCl5bWdCS_x3pKTMSyaRbuJd6_OZ2cESiYxCKGLpL5GUA9C5_xiuCINI82vMzz2TIYjTH9YPDarjOE8tvLeFTA3izVhHte_uemuG9HgjKEWNQMzJpMDglG_md6iNd2XBpFKM1jzLHGJ2AyZp0bHtnv1Rvm0nYk89b3TyLE-fNbcPgiEeEKRUcxtjoQylqJVmmggiJ5P1fwjpURpVEuE' },
  { id: '4', name: 'Mohamed Salah',  goals: 17, team: { id: 'liverpool',name: 'Liverpool',shortName: 'LIV' } },
  { id: '5', name: 'Alexander Isak', goals: 17, team: { id: 'newcastle',name: 'Newcastle',shortName: 'NEW' } },
];

type RankingFilter = 'Overall' | 'Home' | 'Away';

const accentColorMap = {
  primary:   { border: 'border-[var(--color-primary)]/15',   label: 'text-[var(--color-primary)]' },
  secondary: { border: 'border-[var(--color-secondary)]/15', label: 'text-[var(--color-secondary)]' },
  tertiary:  { border: 'border-[var(--color-tertiary)]/15',  label: 'text-[var(--color-tertiary)]' },
};

export default function LeaguesPage() {
  const [rankFilter, setRankFilter] = useState<RankingFilter>('Overall');

  return (
    <>
      <div className="ambient-blob-tl" />
      <div className="ambient-blob-br" />

      <AppHeader />

      <main className="relative z-10 pt-20 pb-32 px-4 max-w-lg mx-auto space-y-8 custom-scrollbar">

        {/* ── League Selector ─────────────────────────────────── */}
        <section>
          <div className="bg-[var(--color-surface-container-low)] rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(218,226,253,0.04)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-container-high)] flex items-center justify-center p-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6fQzUJZrcyMGeu9cKNLr4sOuJhlk-GClbVZR5fwWiQY_-mvA0iMgi0-qK2qy06n-XulPU3-48glxfiCpLvkpIkYDQpZUkVaE4MQtJt13WnjtbjYWMl422M6KT6WKCPYlFVcGF1fX6e5PbLk5Cp5ImtN9p4kOP26fiuczgQIqBNX9S8eOmsZrP6iu5vlPqBY7RgXOCkdT-PhqRENhdN99VVjsTbiIM7-J0MVueFsVEUTMFMa0rmr9bX_8m6to7ZQrmQFk9JAs6BWU"
                  alt="Premier League"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-label text-[10px] font-bold uppercase tracking-widest text-[var(--color-secondary)]">
                  Liga atual
                </p>
                <h2 className="font-headline text-lg font-bold text-[var(--color-on-surface)]">
                  Premier League 2023/24
                </h2>
              </div>
            </div>
            <span className="material-symbols-outlined text-[var(--color-outline)]">expand_more</span>
          </div>
        </section>

        {/* ── AI Spotlight Cards ──────────────────────────────── */}
        <section className="-mx-4">
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2 px-4" style={{ scrollSnapType: 'x mandatory' }}>
            {SPOTLIGHT_CARDS.map((card) => {
              const { border, label } = accentColorMap[card.accentVariant];
              return (
                <div
                  key={card.label}
                  style={{ scrollSnapAlign: 'start' }}
                  className={`min-w-[240px] max-w-[240px] glass-card border ${border} rounded-2xl p-4 relative overflow-hidden flex-shrink-0`}
                >
                  {/* Accent glow */}
                  <div
                    className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[32px] opacity-20 ${
                      card.accentVariant === 'primary'   ? 'bg-[var(--color-primary)]' :
                      card.accentVariant === 'secondary' ? 'bg-[var(--color-secondary)]' :
                                                           'bg-[var(--color-tertiary)]'
                    }`}
                  />
                  <p className={`font-label text-[10px] font-bold uppercase tracking-widest ${label} mb-2`}>
                    {card.label}
                  </p>
                  <p className="text-sm text-[var(--color-on-surface)] leading-relaxed mb-4">
                    {card.content}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-outline-variant)]/10">
                    {card.team.logoUrl ? (
                      <img
                        src={card.team.logoUrl}
                        alt={card.team.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[var(--color-outline)] text-base">groups</span>
                    )}
                    <span className="text-xs font-semibold text-[var(--color-outline)]">
                      {card.team.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Ranking Insights ────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)]">
              Ranking Insights
            </h3>
            {/* Filter pill */}
            <div className="flex bg-[var(--color-surface-container-low)] p-1 rounded-full w-fit gap-0.5">
              {(['Overall', 'Home', 'Away'] as RankingFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setRankFilter(f)}
                  className={`px-3 py-1 rounded-full font-label text-[9px] font-bold uppercase tracking-widest transition-all ${
                    rankFilter === f
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                      : 'text-[var(--color-outline)] hover:text-[var(--color-on-surface)]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {RANKINGS.map((entry) => (
              <TacticalCard key={entry.id} glowAccent="none" className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[var(--color-on-surface)] text-sm">
                        {entry.team.name}
                      </span>
                      <Badge variant={entry.badgeVariant}>{entry.badge}</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-outline)] leading-snug line-clamp-1">
                      {entry.summary}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-label text-[9px] font-bold uppercase px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 shrink-0"
                  >
                    Detalhes
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </TacticalCard>
            ))}
          </div>
        </section>

        {/* ── Top Scorers ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)]">
              Artilheiros
            </h3>
            <span className="font-label text-[10px] text-[var(--color-outline)] uppercase tracking-widest">
              23/24
            </span>
          </div>

          <div className="space-y-3">
            {TOP_SCORERS.map((scorer, idx) => (
              <TacticalCard key={scorer.id} className="p-4" glowAccent="none">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <span className="font-headline text-sm font-black text-[var(--color-outline)]/60 w-4 text-center">
                      {idx + 1}
                    </span>

                    {/* Avatar */}
                    <div className="relative">
                      {scorer.photoUrl ? (
                        <img
                          src={scorer.photoUrl}
                          alt={scorer.name}
                          className="w-10 h-10 rounded-full object-cover shadow-[0_0_12px_rgba(76,215,246,0.2)]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-container)] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[var(--color-outline)]">person</span>
                        </div>
                      )}
                    </div>

                    {/* Name + team */}
                    <div>
                      <h4 className="font-bold text-[var(--color-on-surface)] text-sm leading-tight">
                        {scorer.name}
                      </h4>
                      <p className="font-label text-[9px] text-[var(--color-outline)] font-medium uppercase tracking-wide">
                        {scorer.goals} Gols • {scorer.team.name}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-label text-[9px] font-bold uppercase px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 shrink-0"
                  >
                    Análise
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </TacticalCard>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
