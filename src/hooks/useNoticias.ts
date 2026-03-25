import { fetchNoticias } from '../api/noticiasApi';
import { useData } from './useSheets';

export function useNoticias() {
  return useData(() => fetchNoticias(), [], 'Noticias');
}
