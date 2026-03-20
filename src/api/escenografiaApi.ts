import type { Escenografia, EstadoMaterial } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToEscenografia(row: string[]): Escenografia {
  return {
    id: row[0] || '',
    escenaId: row[1] || '',
    nombre: row[2] || '',
    descripcion: row[3] || '',
    estado: (row[4] as EstadoMaterial) || 'pendiente',
    responsableId: row[5] || '',
  };
}

export async function fetchEscenografia(escenaId?: string): Promise<Escenografia[]> {
  const rows = await readSheet('Escenografia');
  let items: Escenografia[];

  if (rows.length > 1) {
    items = rows.slice(1).map(rowToEscenografia);
  } else {
    items = getLocalData<Escenografia>('Escenografia');
  }

  return escenaId ? items.filter((e) => e.escenaId === escenaId) : items;
}

export async function addEscenografia(item: Omit<Escenografia, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...item, id };
  const result = await writeSheet('add', 'Escenografia', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Escenografia>('Escenografia');
    existing.push(full as Escenografia);
    setLocalData('Escenografia', existing);
  }

  return result.id || id;
}

export async function updateEscenografia(item: Escenografia): Promise<void> {
  await writeSheet('update', 'Escenografia', item as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Escenografia>('Escenografia');
    const idx = existing.findIndex((e) => e.id === item.id);
    if (idx >= 0) existing[idx] = item;
    setLocalData('Escenografia', existing);
  }
}

export async function deleteEscenografia(id: string): Promise<void> {
  await writeSheet('delete', 'Escenografia', { id });

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Escenografia>('Escenografia');
    setLocalData('Escenografia', existing.filter((e) => e.id !== id));
  }
}
