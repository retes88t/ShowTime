import { useState, useRef } from 'react';
import type { Noticia } from '../../types';
import { addNoticia, updateNoticia, deleteNoticia } from '../../api/noticiasApi';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

interface NoticiasManagerProps {
  noticias: Noticia[];
  onRefresh: () => void;
}

export function NoticiasManager({ noticias, onRefresh }: NoticiasManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Noticia | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [form, setForm] = useState({
    titulo: '',
    contenido: '',
    activa: true,
  });

  const insertAtCursor = (before: string, after: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.contenido.slice(start, end);
    const replacement = before + (selected || 'texto') + after;
    const newValue = form.contenido.slice(0, start) + replacement + form.contenido.slice(end);
    setForm({ ...form, contenido: newValue });
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + (selected || 'texto').length;
    }, 0);
  };

  const insertLink = () => {
    const url = prompt('URL del enlace:', 'https://');
    if (!url) return;
    const ta = textareaRef.current;
    const start = ta?.selectionStart ?? form.contenido.length;
    const end = ta?.selectionEnd ?? form.contenido.length;
    const selected = form.contenido.slice(start, end) || 'texto del enlace';
    const tag = `<a href="${url}" target="_blank">${selected}</a>`;
    const newValue = form.contenido.slice(0, start) + tag + form.contenido.slice(end);
    setForm({ ...form, contenido: newValue });
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ titulo: '', contenido: '', activa: true });
    setShowModal(true);
  };

  const openEdit = (n: Noticia) => {
    setEditing(n);
    setForm({ titulo: n.titulo, contenido: n.contenido, activa: n.activa });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateNoticia({ ...editing, ...form });
    } else {
      await addNoticia({ ...form, fechaCreacion: new Date().toISOString() });
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar esta noticia?')) {
      await deleteNoticia(id);
      onRefresh();
    }
  };

  const handleToggle = async (n: Noticia) => {
    await updateNoticia({ ...n, activa: !n.activa });
    onRefresh();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Noticias ({noticias.length})</h3>
        <button
          onClick={openAdd}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
        >
          + Agregar noticia
        </button>
      </div>

      {noticias.length === 0 ? (
        <EmptyState message="No hay noticias." action="Agregar noticia" onAction={openAdd} />
      ) : (
        <div className="space-y-3">
          {noticias.map((n) => (
            <div
              key={n.id}
              className={`rounded-lg border bg-white p-4 ${n.activa ? 'border-green-200' : 'border-gray-200 opacity-60'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{n.titulo}</h4>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        n.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {n.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600 [&_a]:text-blue-600 [&_a]:underline" dangerouslySetInnerHTML={{ __html: n.contenido }} />
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(n.fechaCreacion).toLocaleDateString('es-MX')}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleToggle(n)}
                    className="rounded p-1 text-gray-400 hover:text-gold-dark"
                    title={n.activa ? 'Desactivar' : 'Activar'}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={n.activa ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878l4.242 4.242M21 21l-4.878-4.878' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'}
                      />
                    </svg>
                  </button>
                  <button onClick={() => openEdit(n)} className="rounded p-1 text-gray-400 hover:text-blue-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(n.id)} className="rounded p-1 text-gray-400 hover:text-red-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Noticia' : 'Agregar Noticia'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Titulo</label>
            <input
              type="text"
              required
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Contenido (soporta HTML)</label>
            {/* Toolbar */}
            <div className="mb-1 flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 px-2 py-1.5">
              <button
                type="button"
                onClick={insertLink}
                className="rounded px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                title="Insertar enlace"
              >
                &#128279; Link
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<b>', '</b>')}
                className="rounded px-2 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200"
                title="Negrita"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<i>', '</i>')}
                className="rounded px-2 py-1 text-xs italic text-gray-700 hover:bg-gray-200"
                title="Cursiva"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor('<br>', '')}
                className="rounded px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
                title="Salto de linea"
              >
                &#9166; Salto
              </button>
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`rounded px-2 py-1 text-xs font-medium ${showPreview ? 'bg-gold/20 text-gold-dark' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  {showPreview ? 'Editar' : 'Vista previa'}
                </button>
              </div>
            </div>
            {showPreview ? (
              <div
                className="min-h-[5rem] w-full rounded-b-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 [&_a]:font-semibold [&_a]:text-blue-600 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: form.contenido || '<span class="text-gray-400">Sin contenido</span>' }}
              />
            ) : (
              <textarea
                ref={textareaRef}
                required
                value={form.contenido}
                onChange={(e) => setForm({ ...form, contenido: e.target.value })}
                rows={4}
                className="w-full rounded-b-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder='Ejemplo: Visita <a href="https://example.com" target="_blank">este enlace</a>'
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activa"
              checked={form.activa}
              onChange={(e) => setForm({ ...form, activa: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="activa" className="text-sm text-gray-700">Activa (visible en la pagina principal)</label>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark">
              {editing ? 'Guardar' : 'Agregar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
