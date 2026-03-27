import type { ApiTeam, Team } from '@/types/football';
import { mapApiTeam } from '@/types/football';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/** Fetch all teams from backend. */
export async function getTeams(): Promise<Team[]> {
  const res = await fetch(`${API_URL}/teams`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: ApiTeam[] = await res.json();
  return data.map(mapApiTeam);
}
