'use client';

import { useState, useEffect, useCallback } from 'react';
import type { H2HData, Team } from '@/types/football';
import { getH2HMatches, MOCK_H2H_DATA } from '@/lib/api/matchService';

interface UseH2HDataReturn {
  data: H2HData | null;
  isLoading: boolean;
  error: string | null;
  homeTeam: Team;
  awayTeam: Team;
  setHomeTeam: (team: Team) => void;
  setAwayTeam: (team: Team) => void;
  refetch: () => void;
}

export function useH2HData(): UseH2HDataReturn {
  const [data, setData] = useState<H2HData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [homeTeam, setHomeTeam] = useState<Team>(MOCK_H2H_DATA.homeTeam);
  const [awayTeam, setAwayTeam] = useState<Team>(MOCK_H2H_DATA.awayTeam);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getH2HMatches(homeTeam, awayTeam);
      setData(result);
    } catch (err) {
      setError('Erro ao carregar dados H2H.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [homeTeam, awayTeam]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    isLoading,
    error,
    homeTeam,
    awayTeam,
    setHomeTeam,
    setAwayTeam,
    refetch: fetch,
  };
}
