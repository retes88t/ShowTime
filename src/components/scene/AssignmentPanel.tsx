import { useState } from 'react';
import type { Assignment, EstadoMaterial } from '../../types';
import { addAssignment, updateAssignment, deleteAssignment } from '../../api/assignmentsApi';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

interface AssignmentPanelProps {
  assignments: Assignment[];
  escenaId: string;
  onRefresh: () => void;
  isAdmin?: boolean;
}

export function AssignmentPanel({ assignments, escenaId, onRefresh, isAdmin }: AssignmentPanelProps) {
  const { people } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Assignment | null>(null);
  const [form, setForm] = useState({
    personaId: '',
    tarea: '',
    tipo: 'general',
    estado: 'pendiente' as EstadoMaterial,
    fechaLimite: '',
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ personaId: '', tarea: '', tipo: 'general', estado: 'pendiente', fechaLimite: '' });
    setShowModal(true);
  };

  const openEdit = (a: Assignment) => {
    setEditing(a);
    setForm({
      personaId: a.personaId,
      tarea: a.tarea,
      tipo: a.tipo,
      estado: a.estado,
      fechaLimite: a.fechaLimite,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateAssignment({ ...editing, ...form });
    } else {
      await addAssignment({ escenaId, ...form });
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar esta asignacion?')) {
      await deleteAssignment(id);
      onRefresh();
    }
  };

  const getPersonName = (id: string) =>
    people.find((p) => p.id === id)?.nombre || 'Sin asignar';

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Responsables y Tareas</h3>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
          >
            + Asignar
          </button>
        )}
      </div>

      {assignments.length === 0 ? (
        <EmptyState message="No hay asignaciones para esta escena." />
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{a.tarea}</span>
                  <Badge estado={a.estado} />
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <span>Responsable: {getPersonName(a.personaId)}</span>
                  <span>Tipo: {a.tipo}</span>
                  {a.fechaLimite && <span>Limite: {a.fechaLimite}</span>}
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-1">
                  <button onClick={() => openEdit(a)} className="rounded p-1 text-gray-400 hover:text-blue-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="rounded p-1 text-gray-400 hover:text-red-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Asignacion' : 'Nueva Asignacion'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tarea</label>
            <input
              type="text"
              required
              value={form.tarea}
              onChange={(e) => setForm({ ...form, tarea: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Persona</label>
              <select
                required
                value={form.personaId}
                onChange={(e) => setForm({ ...form, personaId: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="">Seleccionar...</option>
                {people.filter(p => p.activo).map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="general">General</option>
                <option value="materiales">Materiales</option>
                <option value="escenografia">Escenografia</option>
                <option value="vestuario">Vestuario</option>
                <option value="utileria">Utileria</option>
              </select>
            </div>
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
              <label className="mb-1 block text-sm font-medium text-gray-700">Fecha limite</label>
              <input
                type="date"
                value={form.fechaLimite}
                onChange={(e) => setForm({ ...form, fechaLimite: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark">
              {editing ? 'Guardar' : 'Asignar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
