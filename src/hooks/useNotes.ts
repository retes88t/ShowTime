import { fetchNotes } from '../api/notesApi';
import { useData } from './useSheets';

export function useNotes(escenaId?: string) {
  return useData(() => fetchNotes(escenaId), [escenaId], 'Notas');
}
