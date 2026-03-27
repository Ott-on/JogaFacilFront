'use client';

import { useState, useEffect } from 'react';
import type { Team } from '@/types/football';
import { getTeams } from '@/lib/api/teamsService';

interface UseTeamsReturn {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}

export function useTeams(): UseTeamsReturn {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getTeams()
      .then((data) => {
        if (!cancelled) setTeams(data);
      })
      .catch((err) => {
        if (!cancelled) setError('Não foi possível carregar os times.');
        console.error(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { teams, isLoading, error };
}
