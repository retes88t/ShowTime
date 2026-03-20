import { fetchScenes } from '../api/scenesApi';
import { useData } from './useSheets';

export function useScenes() {
  return useData(fetchScenes, [], 'Escenas');
}
