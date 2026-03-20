import { useState, useEffect, useCallback, useRef } from 'react';
import type { SheetTab } from '../types';
import { readCache } from '../api/sheetsClient';

interface UseDataResult<T> {
  data: T[];
  loading: boolean;
  syncing: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useData<T>(
  fetchFn: () => Promise<T[]>,
  deps: unknown[] = [],
  cacheTab?: SheetTab
): UseDataResult<T> {
  const [data, setData] = useState<T[]>(() =>
    cacheTab ? readCache<T>(cacheTab) : []
  );
  const [loading, setLoading] = useState(() =>
    cacheTab ? readCache(cacheTab).length === 0 : true
  );
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const refetch = useCallback(async () => {
    setError(null);
    setSyncing(true);
    try {
      const result = await fetchFn();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setSyncing(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, syncing, error, refetch };
}
