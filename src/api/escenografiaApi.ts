import type { Escenografia } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchEscenografia(escenaId?: string): Promise<Escenografia[]> {
  const items = await readSheet<Escenografia>('Escenografia');
  return escenaId ? items.filter((e) => e.escenaId === escenaId) : items;
}

export async function addEscenografia(item: Omit<Escenografia, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Escenografia', { ...item, id });
  return result.id || id;
}

export async function updateEscenografia(item: Escenografia): Promise<void> {
  await writeSheet('update', 'Escenografia', item as unknown as Record<string, unknown>);
}

export async function deleteEscenografia(id: string): Promise<void> {
  await writeSheet('delete', 'Escenografia', { id });
}
