import type { Assignment } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchAssignments(escenaId?: string): Promise<Assignment[]> {
  const assignments = await readSheet<Assignment>('Asignaciones');
  return escenaId ? assignments.filter((a) => a.escenaId === escenaId) : assignments;
}

export async function addAssignment(assignment: Omit<Assignment, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Asignaciones', { ...assignment, id });
  return result.id || id;
}

export async function updateAssignment(assignment: Assignment): Promise<void> {
  await writeSheet('update', 'Asignaciones', assignment as unknown as Record<string, unknown>);
}

export async function deleteAssignment(id: string): Promise<void> {
  await writeSheet('delete', 'Asignaciones', { id });
}
