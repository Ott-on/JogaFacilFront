import type { ApiEvent, Match, mapApiEvent as MapFn } from '@/types/football';
import { mapApiEvent, mapApiTeam } from '@/types/football';
import { MOCK_H2H_DATA } from './matchService';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/**
 * Fetch all ended events from the backend.
 * Falls back to mock data if the backend is unavailable.
 */
export async function getEndedEvents(): Promise<Match[]> {
  try {
    const res = await fetch(`${API_URL}/events/ended`, {
      next: { revalidate: 60 }, // cache 60s on server
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiEvent[] = await res.json();
    return data.map(mapApiEvent);
  } catch (err) {
    console.warn('[eventsService] /events/ended unavailable, using mock data:', err);
    return MOCK_H2H_DATA.matches;
  }
}

/**
 * Fetch ended events filtered by team ID.
 * First tries a query param; if backend doesn't support it, filters client-side.
 */
export async function getEndedEventsByTeam(teamId: string): Promise<Match[]> {
  try {
    // Try with query param first (preferred)
    const res = await fetch(`${API_URL}/events/ended?team_id=${teamId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiEvent[] = await res.json();
    return data.map(mapApiEvent);
  } catch {
    // Fallback: fetch all and filter client-side
    try {
      const all = await getEndedEvents();
      return all.filter(
        (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId
      );
    } catch {
      return MOCK_H2H_DATA.matches.filter(
        (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId
      );
    }
  }
}
