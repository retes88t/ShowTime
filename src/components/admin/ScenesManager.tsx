import { useState } from 'react';
import type { Scene } from '../../types';
import { addScene, updateScene, deleteScene } from '../../api/scenesApi';
import { SCENE_COLORS } from '../../utils/constants';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';

interface ScenesManagerProps {
  scenes: Scene[];
  onRefresh: () => void;
}

const emptyForm = {
  numero: 1,
  nombre: '',
  subtitulo: '',
  descripcion: '',
  personajes: '',
  conflicto: '',
  objetivos: '',
  lineaEntrada: '',
  lineaConflicto: '',
  lineaSalida: '',
  juego: '',
  parodia: '',
  imagenUrl: '',
  color: SCENE_COLORS[0],
  acto: '',
  lugar: '',
};

export function ScenesManager({ scenes, onRefresh }: ScenesManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Scene | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm, numero: scenes.length + 1, color: SCENE_COLORS[scenes.length % SCENE_COLORS.length] });
    setShowModal(true);
  };

  const openEdit = (s: Scene) => {
    setEditing(s);
    setForm({
      numero: s.numero,
      nombre: s.nombre,
      subtitulo: s.subtitulo,
      descripcion: s.descripcion,
      personajes: s.personajes,
      conflicto: s.conflicto,
      objetivos: s.objetivos,
      lineaEntrada: s.lineaEntrada,
      lineaConflicto: s.lineaConflicto,
      lineaSalida: s.lineaSalida,
      juego: s.juego,
      parodia: s.parodia,
      imagenUrl: s.imagenUrl,
      color: s.color,
      acto: s.acto,
      lugar: s.lugar,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateScene({ ...editing, ...form });
    } else {
      await addScene(form);
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Eliminar esta escena? Se perderan todos los datos asociados.')) {
      await deleteScene(id);
      onRefresh();
    }
  };

  const sorted = [...scenes].sort((a, b) => a.numero - b.numero);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Escenas ({scenes.length})</h3>
        <button
          onClick={openAdd}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
        >
          + Agregar escena
        </button>
      </div>

      {scenes.length === 0 ? (
        <EmptyState message="No hay escenas registradas." action="Agregar escena" onAction={openAdd} />
      ) : (
        <div className="space-y-3">
          {sorted.map((s) => (
            <div key={s.id} className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: s.color }}
              >
                {s.numero}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{s.nombre}</h4>
                {s.subtitulo && <p className="text-sm text-gray-500">{s.subtitulo}</p>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(s)} className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(s.id)} className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Escena' : 'Agregar Escena'}>
        <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Numero</label>
              <input
                type="number"
                min="1"
                required
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: parseInt(e.target.value) || 1 })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Color</label>
              <div className="flex gap-2">
                {SCENE_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm({ ...form, color: c })}
                    className={`h-8 w-8 rounded-full border-2 ${form.color === c ? 'border-gray-900' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
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
            <label className="mb-1 block text-sm font-medium text-gray-700">Subtitulo</label>
            <input
              type="text"
              value={form.subtitulo}
              onChange={(e) => setForm({ ...form, subtitulo: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Acto</label>
              <input
                type="text"
                value={form.acto}
                onChange={(e) => setForm({ ...form, acto: e.target.value })}
                placeholder="Ej: Acto 1. La Tierra"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Lugar</label>
              <input
                type="text"
                value={form.lugar}
                onChange={(e) => setForm({ ...form, lugar: e.target.value })}
                placeholder="Ej: Salon Verde Vekio"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Descripcion</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Personajes</label>
            <input
              type="text"
              value={form.personajes}
              onChange={(e) => setForm({ ...form, personajes: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Conflicto</label>
            <textarea
              value={form.conflicto}
              onChange={(e) => setForm({ ...form, conflicto: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Parodia</label>
            <input
              type="text"
              value={form.parodia}
              onChange={(e) => setForm({ ...form, parodia: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Juego de arteterapia</label>
            <input
              type="text"
              value={form.juego}
              onChange={(e) => setForm({ ...form, juego: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Linea de entrada</label>
              <input
                type="text"
                value={form.lineaEntrada}
                onChange={(e) => setForm({ ...form, lineaEntrada: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Linea de conflicto</label>
              <input
                type="text"
                value={form.lineaConflicto}
                onChange={(e) => setForm({ ...form, lineaConflicto: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Linea de salida</label>
              <input
                type="text"
                value={form.lineaSalida}
                onChange={(e) => setForm({ ...form, lineaSalida: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
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
