import type { Person } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchPeople(): Promise<Person[]> {
  return readSheet<Person>('Personas');
}

export async function addPerson(person: Omit<Person, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Personas', { ...person, id });
  return result.id || id;
}

export async function updatePerson(person: Person): Promise<void> {
  await writeSheet('update', 'Personas', person as unknown as Record<string, unknown>);
}

export async function deletePerson(id: string): Promise<void> {
  await writeSheet('delete', 'Personas', { id });
}
