'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Match, Team } from '@/types/football';
import { getEndedEvents, getEndedEventsByTeam } from '@/lib/api/eventsService';

interface UseEndedEventsReturn {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  /** Refetch events; if teamId provided, filters by that team */
  refetch: (teamId?: string) => void;
}

export function useEndedEvents(teamId?: string): UseEndedEventsReturn {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (id?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = id
        ? await getEndedEventsByTeam(id)
        : await getEndedEvents();
      setMatches(data);
    } catch (err) {
      setError('Erro ao carregar partidas.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch(teamId);
  }, [fetch, teamId]);

  return { matches, isLoading, error, refetch: fetch };
}
