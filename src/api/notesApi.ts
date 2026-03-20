import type { Note } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchNotes(escenaId?: string): Promise<Note[]> {
  const notes = await readSheet<Note>('Notas');
  return escenaId ? notes.filter((n) => n.escenaId === escenaId) : notes;
}

export async function addNote(note: Omit<Note, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Notas', { ...note, id });
  return result.id || id;
}

export async function deleteNote(id: string): Promise<void> {
  await writeSheet('delete', 'Notas', { id });
}
