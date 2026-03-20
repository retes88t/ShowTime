import type { Person } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToPerson(row: string[]): Person {
  return {
    id: row[0] || '',
    nombre: row[1] || '',
    rol: row[2] || '',
    contacto: row[3] || '',
    activo: row[4] !== 'false',
  };
}

export async function fetchPeople(): Promise<Person[]> {
  const rows = await readSheet('Personas');
  if (rows.length > 1) {
    return rows.slice(1).map(rowToPerson);
  }
  return getLocalData<Person>('Personas');
}

export async function addPerson(person: Omit<Person, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...person, id };
  const result = await writeSheet('add', 'Personas', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Person>('Personas');
    existing.push(full as Person);
    setLocalData('Personas', existing);
  }

  return result.id || id;
}

export async function updatePerson(person: Person): Promise<void> {
  await writeSheet('update', 'Personas', person as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Person>('Personas');
    const idx = existing.findIndex((p) => p.id === person.id);
    if (idx >= 0) existing[idx] = person;
    setLocalData('Personas', existing);
  }
}

export async function deletePerson(id: string): Promise<void> {
  await writeSheet('delete', 'Personas', { id });

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Person>('Personas');
    setLocalData('Personas', existing.filter((p) => p.id !== id));
  }
}
