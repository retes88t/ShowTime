import type { Minuta } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchMinutas(): Promise<Minuta[]> {
  return readSheet<Minuta>('Minutas');
}

export async function addMinuta(minuta: Omit<Minuta, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Minutas', { ...minuta, id });
  return result.id || id;
}

export async function updateMinuta(minuta: Minuta): Promise<void> {
  await writeSheet('update', 'Minutas', minuta as unknown as Record<string, unknown>);
}

export async function deleteMinuta(id: string): Promise<void> {
  await writeSheet('delete', 'Minutas', { id });
}
