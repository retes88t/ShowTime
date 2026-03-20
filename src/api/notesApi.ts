import type { Note } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToNote(row: string[]): Note {
  return {
    id: row[0] || '',
    escenaId: row[1] || '',
    autorId: row[2] || '',
    autorNombre: row[3] || '',
    contenido: row[4] || '',
    fechaCreacion: row[5] || '',
  };
}

export async function fetchNotes(escenaId?: string): Promise<Note[]> {
  const rows = await readSheet('Notas');
  let notes: Note[];

  if (rows.length > 1) {
    notes = rows.slice(1).map(rowToNote);
  } else {
    notes = getLocalData<Note>('Notas');
  }

  return escenaId ? notes.filter((n) => n.escenaId === escenaId) : notes;
}

export async function addNote(note: Omit<Note, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...note, id };
  const result = await writeSheet('add', 'Notas', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Note>('Notas');
    existing.push(full as Note);
    setLocalData('Notas', existing);
  }

  return result.id || id;
}

export async function deleteNote(id: string): Promise<void> {
  await writeSheet('delete', 'Notas', { id });

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Note>('Notas');
    setLocalData('Notas', existing.filter((n) => n.id !== id));
  }
}
