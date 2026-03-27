import type { H2HData, Match, Team, WinProbability } from '@/types/football';
import { getEndedEventsByTeam } from '@/lib/api/eventsService';
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
/**
 * Fetch H2H match data from backend.
 * Falls back to mock data if the backend is unavailable.
 */
import { mapApiEvent } from '@/types/football';

export async function getH2HMatches(
  team1: Team,
  team2: Team
): Promise<H2HData> {
  const team1Id = team1.id;
  const team2Id = team2.id;
  
  try {
    const res = await fetch(
      `${API_URL}/matches?team_id_1=${team1Id}&team_id_2=${team2Id}`
    );
    
    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
    }
    
    const responseData = await res.json();
    
    // Tratando possibilidade de retorno ser array direto ou envelopado
    let apiEvents: any[] = [];
    if (Array.isArray(responseData)) {
      apiEvents = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
      apiEvents = responseData.data;
    } else if (responseData && Array.isArray(responseData.matches)) {
      apiEvents = responseData.matches;
    } else if (responseData && Array.isArray(responseData.response)) {
      apiEvents = responseData.response;
    }

    // Limita e mapeia para o formato correto de interface do front
    const h2hMatches = apiEvents.slice(0, 10).map(mapApiEvent);

    const fallbackProbability: WinProbability = {
      homeTeam: team1,
      awayTeam: team2,
      homePercent: 50,
      drawPercent: 0,
      awayPercent: 50,
      insight: 'Probabilidades estimadas por IA indisponíveis.',
    };

    return {
      homeTeam: team1,
      awayTeam: team2,
      matches: h2hMatches.length ? h2hMatches : MOCK_H2H_DATA.matches,
      probability: fallbackProbability,
    };
  } catch (err) {
    console.error('[getH2HMatches] Fetch failed, returning mock data:', err);
    return MOCK_H2H_DATA;
  }
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const REAL_MADRID: Team = {
  id: '179360',
  name: 'Real Madrid',
  shortName: 'RMA',
  logoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAVdzWG3AhTeI-pTpfetfoQ5Un9i1bf1_lksQzG99APyjSs4aUXS2CKagYwG3vx8PKRQ_b-68kwt8PiMC2kM5dPiaI0GctqslzbE7cPHdIW3Ftb792RteSbw2dH2cNj1qwpEj-AdgQIKuBS0gh_e5CvnwkhndJn6QXBrMKxCMmQ75hffdoSRpJl3Qy7O44UaeOQC0wamhyW49ysXQRD46_cBSAHtnmkekD3hYB4yNMA3MMWGYLbIMqWBbrLATqkKJ9epbUWV1Vlak',
};

const BARCELONA: Team = {
  id: '294357',
  name: 'Barcelona',
  shortName: 'BAR',
  logoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOi64DVl0wg5ZVaFDMXQuveK1FNSE-WnmByehJAfx4uuQbmahC7xFQSVo9b5pP69m9hS5AwZuIq4EIM8C4bAHeOTul_HT4yzJIAGM_KLuQOuAHUW2nMUc6FUF9UEWZSW0t1H9yAUk4XERV3BwuVJ4bY0wYFR9SCOHO9MeidblDy-YlX48diifpkStKrBzhqVLs_SEDowvlTawdrlc_Xgtx7bUQwAkQcvpW2w9q6nmnK_4x2mNSscA4WIz39Hll7h-sZz9D6LvKCGM',
};

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    date: '14 Jan 2024',
    time: '20:00 GMT',
    homeTeam: REAL_MADRID,
    awayTeam: BARCELONA,
    homeScore: 2,
    awayScore: 1,
    status: 'LIVE',
  },
  {
    id: '2',
    date: '28 Out 2023',
    time: '16:15 GMT',
    homeTeam: BARCELONA,
    awayTeam: REAL_MADRID,
    homeScore: 1,
    awayScore: 2,
    status: 'FINALIZADO',
  },
  {
    id: '3',
    date: '05 Abr 2023',
    time: '21:00 GMT',
    homeTeam: REAL_MADRID,
    awayTeam: BARCELONA,
    homeScore: 0,
    awayScore: 4,
    status: 'FINALIZADO',
  },
  {
    id: '4',
    date: '19 Mar 2023',
    time: '20:00 GMT',
    homeTeam: BARCELONA,
    awayTeam: REAL_MADRID,
    homeScore: 2,
    awayScore: 1,
    status: 'FINALIZADO',
  },
  {
    id: '5',
    date: '15 Jan 2023',
    time: '20:00 GMT',
    homeTeam: REAL_MADRID,
    awayTeam: BARCELONA,
    homeScore: 3,
    awayScore: 1,
    status: 'FINALIZADO',
  },
];

const MOCK_PROBABILITY: WinProbability = {
  homeTeam: REAL_MADRID,
  awayTeam: BARCELONA,
  homePercent: 42,
  drawPercent: 28,
  awayPercent: 30,
  insight:
    'A análise tática sugere alta pressão no terço final. <highlight>Expectativa de mais de 2.5 gols</highlight> com base nas formações defensivas atuais.',
};

export const MOCK_H2H_DATA: H2HData = {
  homeTeam: REAL_MADRID,
  awayTeam: BARCELONA,
  matches: MOCK_MATCHES,
  probability: MOCK_PROBABILITY,
};
