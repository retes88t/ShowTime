import { fetchPeople } from '../api/peopleApi';
import { useData } from './useSheets';

export function usePeople() {
  return useData(fetchPeople);
}
