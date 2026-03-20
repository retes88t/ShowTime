import { fetchAssignments } from '../api/assignmentsApi';
import { useData } from './useSheets';

export function useAssignments(escenaId?: string) {
  return useData(() => fetchAssignments(escenaId), [escenaId]);
}
