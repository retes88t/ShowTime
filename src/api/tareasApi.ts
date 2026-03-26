import type { Tarea } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

function normalizeTarea(t: Tarea): Tarea {
  return {
    ...t,
    porcentaje: Number(t.porcentaje) || 0,
    fechaLimite: t.fechaLimite ? String(t.fechaLimite).slice(0, 10) : '',
  };
}

function toSheetData(tarea: Record<string, unknown>): Record<string, unknown> {
  return {
    ...tarea,
    porcentaje: String(tarea.porcentaje),
    fechaLimite: tarea.fechaLimite ? "'" + String(tarea.fechaLimite) : '',
  };
}

export async function fetchTareas(): Promise<Tarea[]> {
  const raw = await readSheet<Tarea>('Tareas');
  return raw.map(normalizeTarea);
}

export async function addTarea(tarea: Omit<Tarea, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Tareas', toSheetData({ id, ...tarea }));
  return result.id || id;
}

export async function updateTarea(tarea: Tarea): Promise<void> {
  await writeSheet('update', 'Tareas', toSheetData(tarea));
}

export async function deleteTarea(id: string): Promise<void> {
  await writeSheet('delete', 'Tareas', { id });
}
