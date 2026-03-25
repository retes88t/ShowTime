import { useState } from 'react';
import type { Material, EstadoMaterial } from '../../types';
import { addMaterial, updateMaterial, deleteMaterial } from '../../api/materialsApi';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

interface MaterialsListProps {
  materials: Material[];
  escenaId: string;
  onRefresh: () => void;
  isAdmin?: boolean;
}

export function MaterialsList({ materials, escenaId, onRefresh, isAdmin }: MaterialsListProps) {
  const { people } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Material | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    cantidad: 1,
    estado: 'pendiente' as EstadoMaterial,
    responsableId: '',
    notas: '',
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ nombre: '', cantidad: 1, estado: 'pendiente', responsableId: '', notas: '' });
    setShowModal(true);
  };

  const openEdit = (m: Material) => {
    setEditing(m);
    setForm({
      nombre: m.nombre,
      cantidad: m.cantidad,
      estado: m.estado,
      responsableId: m.responsableId,
      notas: m.notas,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateMaterial({ ...editing, ...form });
    } else {
      await addMaterial({ escenaId, ...form });
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar este material?')) {
      await deleteMaterial(id);
      onRefresh();
    }
  };

  const getPersonName = (id: string) =>
    people.find((p) => p.id === id)?.nombre || '';

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Materiales</h3>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
          >
            + Agregar
          </button>
        )}
      </div>

      {materials.length === 0 ? (
        <EmptyState message="No hay materiales registrados." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Material</th>
                <th className="px-4 py-3">Cant.</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Responsable</th>
                <th className="px-4 py-3">Notas</th>
                {isAdmin && <th className="px-4 py-3"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{m.nombre}</td>
                  <td className="px-4 py-3">{m.cantidad}</td>
                  <td className="px-4 py-3">
                    <Badge estado={m.estado} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getPersonName(m.responsableId)}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-gray-500">{m.notas}</td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(m)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(m.id)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Material' : 'Agregar Material'}>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                type="number"
                min="1"
                value={form.cantidad}
                onChange={(e) => setForm({ ...form, cantidad: parseInt(e.target.value) || 1 })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
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
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Notas</label>
            <textarea
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
            >
              {editing ? 'Guardar' : 'Agregar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
