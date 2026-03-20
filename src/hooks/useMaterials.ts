import { fetchMaterials } from '../api/materialsApi';
import { useData } from './useSheets';

export function useMaterials(escenaId?: string) {
  return useData(() => fetchMaterials(escenaId), [escenaId]);
}
