import { useState } from 'react';
import type { Minuta } from '../../types';
import { addMinuta, updateMinuta, deleteMinuta } from '../../api/minutasApi';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

interface MinutasManagerProps {
  minutas: Minuta[];
  onRefresh: () => void;
}

const EMPTY_FORM = {
  titulo: '',
  fecha: new Date().toISOString().slice(0, 10),
  asistentes: '',
  resumen: '',
  compromisos: '',
  notasVuelo: '',
  proximosPasos: '',
};

export function MinutasManager({ minutas, onRefresh }: MinutasManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Minuta | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (m: Minuta) => {
    setEditing(m);
    setForm({
      titulo: m.titulo,
      fecha: m.fecha,
      asistentes: m.asistentes,
      resumen: m.resumen,
      compromisos: m.compromisos,
      notasVuelo: m.notasVuelo,
      proximosPasos: m.proximosPasos,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateMinuta({ ...editing, ...form });
    } else {
      await addMinuta({ ...form, fechaCreacion: new Date().toISOString() });
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar esta minuta?')) {
      await deleteMinuta(id);
      onRefresh();
    }
  };

  const sorted = [...minutas].sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Minutas ({minutas.length})</h3>
        <button
          onClick={openAdd}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
        >
          + Nueva minuta
        </button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState message="No hay minutas registradas." action="Crear minuta" onAction={openAdd} />
      ) : (
        <div className="space-y-3">
          {sorted.map((m) => (
            <div key={m.id} className="rounded-lg border border-gray-200 bg-white">
              <div
                className="flex cursor-pointer items-center justify-between p-4"
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-night/10 px-2.5 py-0.5 text-xs font-medium text-night">
                      {new Date(m.fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h4 className="font-medium text-gray-900">{m.titulo}</h4>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Asistentes: {m.asistentes}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(m); }}
                    className="rounded p-1 text-gray-400 hover:text-blue-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}
                    className="rounded p-1 text-gray-400 hover:text-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <svg
                    className={`ml-2 h-5 w-5 text-gray-400 transition-transform ${expanded === m.id ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expanded === m.id && (
                <div className="border-t px-4 pb-4 pt-3 space-y-3 text-sm">
                  {m.resumen && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Resumen</p>
                      <p className="text-gray-600 whitespace-pre-line">{m.resumen}</p>
                    </div>
                  )}
                  {m.compromisos && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Compromisos / Apoyo del equipo</p>
                      <p className="text-gray-600 whitespace-pre-line">{m.compromisos}</p>
                    </div>
                  )}
                  {m.notasVuelo && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Notas al vuelo</p>
                      <p className="text-gray-600 whitespace-pre-line">{m.notasVuelo}</p>
                    </div>
                  )}
                  {m.proximosPasos && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Proximos pasos</p>
                      <p className="text-gray-600 whitespace-pre-line">{m.proximosPasos}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Minuta' : 'Nueva Minuta'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Titulo</label>
              <input
                type="text"
                required
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Ej: Junta de Produccion"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                required
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Asistentes</label>
            <input
              type="text"
              required
              value={form.asistentes}
              onChange={(e) => setForm({ ...form, asistentes: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="Ej: Retes, Arturo, Tony"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Resumen</label>
            <textarea
              required
              value={form.resumen}
              onChange={(e) => setForm({ ...form, resumen: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="Descripcion general de lo que se trato en la junta..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Compromisos / Apoyo del equipo</label>
            <textarea
              value={form.compromisos}
              onChange={(e) => setForm({ ...form, compromisos: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="Tony: flyers y publicidad&#10;Arturo: recoleccion de materiales"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Notas al vuelo</label>
            <textarea
              value={form.notasVuelo}
              onChange={(e) => setForm({ ...form, notasVuelo: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="Sillas: preguntar a Fersa&#10;Focos: preguntar a Ellen"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Proximos pasos</label>
            <textarea
              value={form.proximosPasos}
              onChange={(e) => setForm({ ...form, proximosPasos: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="1. Definir nombre de la obra&#10;2. Establecer fecha limite"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark">
              {editing ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
