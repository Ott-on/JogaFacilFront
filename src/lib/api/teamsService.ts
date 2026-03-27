import type { ApiTeam, Team } from '@/types/football';
import { mapApiTeam } from '@/types/football';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

/** Fetch all teams from backend. */
export async function getTeams(): Promise<Team[]> {
  const res = await fetch(`${API_URL}/teams?league_id=78`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
  const responseData = await res.json();
  
  let apiTeams: ApiTeam[] = [];
  
  if (Array.isArray(responseData)) {
    apiTeams = responseData;
  } else if (responseData && Array.isArray(responseData.data)) {
    apiTeams = responseData.data;
  } else if (responseData && Array.isArray(responseData.teams)) {
    apiTeams = responseData.teams;
  } else if (responseData && Array.isArray(responseData.response)) {
    apiTeams = responseData.response;
  } else if (responseData && typeof responseData === 'object') {
    // Handling dict format: { "123": "Team Name", "456": "Other Team" }
    apiTeams = Object.entries(responseData).map(([key, value]) => ({
      id: key,
      name: String(value)
    }));
  } else {
    console.error('Resposta inesperada da API (times):', responseData);
    return [];
  }

  return apiTeams.map(mapApiTeam);
}
