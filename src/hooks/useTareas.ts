import { fetchTareas } from '../api/tareasApi';
import { useData } from './useSheets';

export function useTareas() {
  return useData(fetchTareas, [], 'Tareas');
}
