import { useState } from 'react';
import type { Person } from '../../types';
import { addPerson, updatePerson, deletePerson } from '../../api/peopleApi';
import { useAppContext } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

export function PeopleManager() {
  const { people, refreshPeople } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Person | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    rol: '',
    contacto: '',
    activo: true,
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ nombre: '', rol: '', contacto: '', activo: true });
    setShowModal(true);
  };

  const openEdit = (p: Person) => {
    setEditing(p);
    setForm({ nombre: p.nombre, rol: p.rol, contacto: p.contacto, activo: p.activo });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updatePerson({ ...editing, ...form });
    } else {
      await addPerson(form);
    }
    setShowModal(false);
    refreshPeople();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar esta persona?')) {
      await deletePerson(id);
      refreshPeople();
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Personas ({people.length})</h3>
        <button
          onClick={openAdd}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
        >
          + Agregar persona
        </button>
      </div>

      {people.length === 0 ? (
        <EmptyState message="No hay personas registradas." action="Agregar persona" onAction={openAdd} />
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {people.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{p.rol}</td>
                  <td className="px-4 py-3 text-gray-600">{p.contacto}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="rounded p-1 text-gray-400 hover:text-blue-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="rounded p-1 text-gray-400 hover:text-red-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Persona' : 'Agregar Persona'}>
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
            <label className="mb-1 block text-sm font-medium text-gray-700">Rol</label>
            <input
              type="text"
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
              placeholder="Ej: Director, Actor, Staff..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Contacto</label>
            <input
              type="text"
              value={form.contacto}
              onChange={(e) => setForm({ ...form, contacto: e.target.value })}
              placeholder="Telefono, email, etc."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activo"
              checked={form.activo}
              onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="activo" className="text-sm text-gray-700">Activo</label>
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
