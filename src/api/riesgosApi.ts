import type { Riesgo } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchRiesgos(tareaId?: string): Promise<Riesgo[]> {
  const riesgos = await readSheet<Riesgo>('Riesgos');
  return tareaId ? riesgos.filter((r) => r.tareaId === tareaId) : riesgos;
}

export async function addRiesgo(riesgo: Omit<Riesgo, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Riesgos', { id, ...riesgo });
  return result.id || id;
}

export async function updateRiesgo(riesgo: Riesgo): Promise<void> {
  await writeSheet('update', 'Riesgos', riesgo as unknown as Record<string, unknown>);
}

export async function deleteRiesgo(id: string): Promise<void> {
  await writeSheet('delete', 'Riesgos', { id });
}
