import { fetchRiesgos } from '../api/riesgosApi';
import { useData } from './useSheets';

export function useRiesgos(tareaId?: string) {
  return useData(() => fetchRiesgos(tareaId), [tareaId], 'Riesgos');
}
