import { fetchMinutas } from '../api/minutasApi';
import { useData } from './useSheets';

export function useMinutas() {
  return useData(() => fetchMinutas(), [], 'Minutas');
}
