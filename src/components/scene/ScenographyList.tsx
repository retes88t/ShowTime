import { useState } from 'react';
import type { Escenografia, EstadoMaterial } from '../../types';
import { addEscenografia, updateEscenografia, deleteEscenografia } from '../../api/escenografiaApi';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

interface ScenographyListProps {
  items: Escenografia[];
  escenaId: string;
  onRefresh: () => void;
}

export function ScenographyList({ items, escenaId, onRefresh }: ScenographyListProps) {
  const { people } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Escenografia | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    estado: 'pendiente' as EstadoMaterial,
    responsableId: '',
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ nombre: '', descripcion: '', estado: 'pendiente', responsableId: '' });
    setShowModal(true);
  };

  const openEdit = (item: Escenografia) => {
    setEditing(item);
    setForm({
      nombre: item.nombre,
      descripcion: item.descripcion,
      estado: item.estado,
      responsableId: item.responsableId,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateEscenografia({ ...editing, ...form });
    } else {
      await addEscenografia({ escenaId, ...form });
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar este elemento?')) {
      await deleteEscenografia(id);
      onRefresh();
    }
  };

  const getPersonName = (id: string) =>
    people.find((p) => p.id === id)?.nombre || '';

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Escenografia</h3>
        <button
          onClick={openAdd}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
        >
          + Agregar
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState message="No hay elementos de escenografia." action="Agregar elemento" onAction={openAdd} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-medium text-gray-900">{item.nombre}</h4>
                <Badge estado={item.estado} />
              </div>
              {item.descripcion && (
                <p className="mb-3 text-sm text-gray-600">{item.descripcion}</p>
              )}
              <div className="flex items-center justify-between">
                {item.responsableId && (
                  <span className="text-xs text-gray-500">
                    Responsable: {getPersonName(item.responsableId)}
                  </span>
                )}
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="rounded p-1 text-gray-400 hover:text-blue-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="rounded p-1 text-gray-400 hover:text-red-600">
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

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Escenografia' : 'Agregar Escenografia'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Descripcion</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value as EstadoMaterial })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="listo">Listo</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Responsable</label>
              <select
                value={form.responsableId}
                onChange={(e) => setForm({ ...form, responsableId: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="">Sin asignar</option>
                {people.filter(p => p.activo).map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
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
