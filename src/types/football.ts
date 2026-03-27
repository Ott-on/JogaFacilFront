export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
}

export type MatchStatus = 'LIVE' | 'FINALIZADO' | 'AGENDADO';

export interface Match {
  id: string;
  date: string; // e.g. "14 Jan 2024"
  time: string; // e.g. "20:00 GMT"
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

export interface WinProbability {
  homeTeam: Team;
  awayTeam: Team;
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
  insight: string;
}

export interface H2HData {
  homeTeam: Team;
  awayTeam: Team;
  matches: Match[];
  probability: WinProbability;
}

export interface League {
  id: string;
  name: string;
  season: string;
  logoUrl?: string;
}

export interface RankingEntry {
  id: string;
  team: Team;
  position: number;
  badge: string;
  badgeVariant: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  summary: string;
}

export interface TopScorer {
  id: string;
  name: string;
  goals: number;
  team: Team;
  photoUrl?: string;
}

export interface SpotlightCard {
  label: string;
  accentVariant: 'primary' | 'secondary' | 'tertiary';
  content: string;
  team: Team;
}

export interface LeaguePageData {
  league: League;
  spotlight: SpotlightCard[];
  rankings: RankingEntry[];
  topScorers: TopScorer[];
}

export type MessageRole = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// ─── Raw API response shapes (snake_case from FastAPI) ────────────────────────

export interface ApiTeam {
  id: string | number;
  name: string;
  short_name?: string;
  shortName?: string;
  logo_url?: string;
  logoUrl?: string;
}

export interface ApiEvent {
  id: string | number;
  home_team: ApiTeam;
  away_team: ApiTeam;
  home_score: number | null;
  away_score: number | null;
  /** ISO 8601 datetime string, e.g. "2024-01-14T20:00:00Z" */
  start_time?: string;
  date?: string;
  time?: string;
  status?: string;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

export function mapApiTeam(t: ApiTeam): Team {
  return {
    id: String(t.id),
    name: t.name,
    shortName: t.short_name ?? t.shortName ?? t.name.slice(0, 3).toUpperCase(),
    logoUrl: t.logo_url ?? t.logoUrl,
  };
}

export function mapApiEvent(e: ApiEvent): Match {
  let date = '';
  let time = '';

  if (e.start_time) {
    const d = new Date(e.start_time);
    date = d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' GMT';
  } else {
    date = e.date ?? '';
    time = e.time ?? '';
  }

  return {
    id: String(e.id),
    date,
    time,
    homeTeam: mapApiTeam(e.home_team),
    awayTeam: mapApiTeam(e.away_team),
    homeScore: e.home_score ?? 0,
    awayScore: e.away_score ?? 0,
    status: 'FINALIZADO',
  };
}
