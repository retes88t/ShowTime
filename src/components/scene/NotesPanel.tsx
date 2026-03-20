import { useState } from 'react';
import type { Note } from '../../types';
import { addNote, deleteNote } from '../../api/notesApi';
import { useAppContext } from '../../context/AppContext';
import { EmptyState } from '../ui/EmptyState';

interface NotesPanelProps {
  notes: Note[];
  escenaId: string;
  onRefresh: () => void;
}

export function NotesPanel({ notes, escenaId, onRefresh }: NotesPanelProps) {
  const { currentUser } = useAppContext();
  const [content, setContent] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await addNote({
      escenaId,
      autorId: currentUser?.id || '',
      autorNombre: currentUser?.nombre || 'Anonimo',
      contenido: content.trim(),
      fechaCreacion: new Date().toISOString(),
    });

    setContent('');
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar esta nota?')) {
      await deleteNote(id);
      onRefresh();
    }
  };

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
  );

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Notas</h3>

      {/* Add note form */}
      <form onSubmit={handleAdd} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Agregar una nota..."
          rows={3}
          className="mb-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim()}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark disabled:opacity-50"
          >
            Agregar nota
          </button>
        </div>
      </form>

      {sortedNotes.length === 0 ? (
        <EmptyState message="No hay notas para esta escena." />
      ) : (
        <div className="space-y-3">
          {sortedNotes.map((note) => (
            <div key={note.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-night text-xs font-bold text-gold">
                    {note.autorNombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{note.autorNombre}</span>
                    <span className="ml-2 text-xs text-gray-400">
                      {new Date(note.fechaCreacion).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleDelete(note.id)} className="rounded p-1 text-gray-400 hover:text-red-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.contenido}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
