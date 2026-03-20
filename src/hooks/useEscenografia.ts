import { fetchEscenografia } from '../api/escenografiaApi';
import { useData } from './useSheets';

export function useEscenografia(escenaId?: string) {
  return useData(() => fetchEscenografia(escenaId), [escenaId]);
}
