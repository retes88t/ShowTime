import type { Assignment, EstadoMaterial } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToAssignment(row: string[]): Assignment {
  return {
    id: row[0] || '',
    escenaId: row[1] || '',
    personaId: row[2] || '',
    tarea: row[3] || '',
    tipo: row[4] || '',
    estado: (row[5] as EstadoMaterial) || 'pendiente',
    fechaLimite: row[6] || '',
  };
}

export async function fetchAssignments(escenaId?: string): Promise<Assignment[]> {
  const rows = await readSheet('Asignaciones');
  let assignments: Assignment[];

  if (rows.length > 1) {
    assignments = rows.slice(1).map(rowToAssignment);
  } else {
    assignments = getLocalData<Assignment>('Asignaciones');
  }

  return escenaId ? assignments.filter((a) => a.escenaId === escenaId) : assignments;
}

export async function addAssignment(assignment: Omit<Assignment, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...assignment, id };
  const result = await writeSheet('add', 'Asignaciones', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Assignment>('Asignaciones');
    existing.push(full as Assignment);
    setLocalData('Asignaciones', existing);
  }

  return result.id || id;
}

export async function updateAssignment(assignment: Assignment): Promise<void> {
  await writeSheet('update', 'Asignaciones', assignment as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Assignment>('Asignaciones');
    const idx = existing.findIndex((a) => a.id === assignment.id);
    if (idx >= 0) existing[idx] = assignment;
    setLocalData('Asignaciones', existing);
  }
}

export async function deleteAssignment(id: string): Promise<void> {
  await writeSheet('delete', 'Asignaciones', { id });

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Assignment>('Asignaciones');
    setLocalData('Asignaciones', existing.filter((a) => a.id !== id));
  }
}
