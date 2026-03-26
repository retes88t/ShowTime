import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTareas } from '../hooks/useTareas';
import { useRiesgos } from '../hooks/useRiesgos';
import { addTarea, updateTarea, deleteTarea } from '../api/tareasApi';
import { addRiesgo, updateRiesgo, deleteRiesgo } from '../api/riesgosApi';
import type { Tarea, Riesgo, NivelTarea, EstadoTarea, Probabilidad } from '../types';
import {
  NIVEL_LABELS,
  NIVEL_COLORS,
  ESTADO_TAREA_LABELS,
  ESTADO_TAREA_COLORS,
  PROBABILIDAD_LABELS,
  PROBABILIDAD_COLORS,
} from '../utils/constants';

const NIVELES: NivelTarea[] = ['facil', 'dificil', 'critico', 'indispensable'];
const ESTADOS: EstadoTarea[] = ['pendiente', 'en_progreso', 'completada', 'bloqueada'];
const PROBABILIDADES: Probabilidad[] = ['baja', 'media', 'alta'];

const emptyTarea: Omit<Tarea, 'id'> = {
  titulo: '',
  descripcion: '',
  responsables: '',
  porcentaje: 0,
  fechaLimite: '',
  nivel: 'facil',
  estado: 'pendiente',
};

const emptyRiesgo: Omit<Riesgo, 'id'> = {
  tareaId: '',
  riesgo: '',
  probabilidad: 'baja',
  planes: '[]',
};

export function TareasPage() {
  const { isAdmin, people } = useAppContext();
  const { data: tareas, loading, refetch: refetchTareas } = useTareas();
  const { data: allRiesgos, refetch: refetchRiesgos } = useRiesgos();

  // Filters
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');

  // Tarea modal
  const [showTareaModal, setShowTareaModal] = useState(false);
  const [editingTarea, setEditingTarea] = useState<Tarea | null>(null);
  const [tareaForm, setTareaForm] = useState<Omit<Tarea, 'id'>>(emptyTarea);
  const [saving, setSaving] = useState(false);

  // Riesgo modal
  const [showRiesgoModal, setShowRiesgoModal] = useState(false);
  const [editingRiesgo, setEditingRiesgo] = useState<Riesgo | null>(null);
  const [riesgoForm, setRiesgoForm] = useState<Omit<Riesgo, 'id'>>(emptyRiesgo);
  const [planesArr, setPlanesArr] = useState<string[]>(['']);

  // Expanded risks
  const [expandedTarea, setExpandedTarea] = useState<string | null>(null);

  const activePeople = people.filter((p) => p.activo);

  const filteredTareas = useMemo(() => {
    return tareas.filter((t) => {
      if (filtroEstado !== 'todos' && t.estado !== filtroEstado) return false;
      if (filtroNivel !== 'todos' && t.nivel !== filtroNivel) return false;
      return true;
    });
  }, [tareas, filtroEstado, filtroNivel]);

  const riesgosByTarea = useMemo(() => {
    const map: Record<string, Riesgo[]> = {};
    for (const r of allRiesgos) {
      if (!map[r.tareaId]) map[r.tareaId] = [];
      map[r.tareaId].push(r);
    }
    return map;
  }, [allRiesgos]);

  function getResponsableNames(csv: string): string {
    if (!csv) return '—';
    const ids = csv.split(',').map((s) => s.trim());
    return ids
      .map((id) => people.find((p) => p.id === id)?.nombre || id)
      .join(', ');
  }

  function parsePlanes(json: string): string[] {
    try {
      const arr = JSON.parse(json);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  // Tarea CRUD
  function openCreateTarea() {
    setEditingTarea(null);
    setTareaForm(emptyTarea);
    setShowTareaModal(true);
  }

  function openEditTarea(tarea: Tarea) {
    setEditingTarea(tarea);
    setTareaForm({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      responsables: tarea.responsables,
      porcentaje: tarea.porcentaje,
      fechaLimite: tarea.fechaLimite,
      nivel: tarea.nivel,
      estado: tarea.estado,
    });
    setShowTareaModal(true);
  }

  async function handleSaveTarea(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTarea) {
        await updateTarea({ ...tareaForm, id: editingTarea.id });
      } else {
        await addTarea(tareaForm);
      }
      await refetchTareas();
      setShowTareaModal(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteTarea(id: string) {
    if (!confirm('Eliminar esta tarea y todos sus riesgos?')) return;
    setSaving(true);
    try {
      // Delete associated risks first
      const risks = riesgosByTarea[id] || [];
      for (const r of risks) {
        await deleteRiesgo(r.id);
      }
      await deleteTarea(id);
      await refetchTareas();
      await refetchRiesgos();
    } finally {
      setSaving(false);
    }
  }

  // Responsables multi-select
  function toggleResponsable(personId: string) {
    const ids = tareaForm.responsables ? tareaForm.responsables.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const idx = ids.indexOf(personId);
    if (idx >= 0) {
      ids.splice(idx, 1);
    } else {
      ids.push(personId);
    }
    setTareaForm({ ...tareaForm, responsables: ids.join(',') });
  }

  // Riesgo CRUD
  function openCreateRiesgo(tareaId: string) {
    setEditingRiesgo(null);
    setRiesgoForm({ ...emptyRiesgo, tareaId });
    setPlanesArr(['']);
    setShowRiesgoModal(true);
  }

  function openEditRiesgo(riesgo: Riesgo) {
    setEditingRiesgo(riesgo);
    setRiesgoForm({
      tareaId: riesgo.tareaId,
      riesgo: riesgo.riesgo,
      probabilidad: riesgo.probabilidad,
      planes: riesgo.planes,
    });
    const parsed = parsePlanes(riesgo.planes);
    setPlanesArr(parsed.length > 0 ? parsed : ['']);
    setShowRiesgoModal(true);
  }

  async function handleSaveRiesgo(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const planesJson = JSON.stringify(planesArr.filter((p) => p.trim()));
    try {
      if (editingRiesgo) {
        await updateRiesgo({ ...riesgoForm, planes: planesJson, id: editingRiesgo.id });
      } else {
        await addRiesgo({ ...riesgoForm, planes: planesJson });
      }
      await refetchRiesgos();
      setShowRiesgoModal(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteRiesgo(id: string) {
    if (!confirm('Eliminar este riesgo?')) return;
    setSaving(true);
    try {
      await deleteRiesgo(id);
      await refetchRiesgos();
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
              <p className="text-sm text-gray-500">Gestion de tareas de la obra</p>
            </div>
            {isAdmin && (
              <button
                onClick={openCreateTarea}
                className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark"
              >
                + Agregar tarea
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="todos">Todos los estados</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>{ESTADO_TAREA_LABELS[e]}</option>
            ))}
          </select>
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="todos">Todos los niveles</option>
            {NIVELES.map((n) => (
              <option key={n} value={n}>{NIVEL_LABELS[n]}</option>
            ))}
          </select>
        </div>

        {/* Task list */}
        {filteredTareas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">No hay tareas{filtroEstado !== 'todos' || filtroNivel !== 'todos' ? ' con estos filtros' : ''}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTareas.map((tarea) => {
              const risks = riesgosByTarea[tarea.id] || [];
              const isExpanded = expandedTarea === tarea.id;

              return (
                <div key={tarea.id} className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  {/* Card header */}
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{tarea.titulo}</h3>
                        {tarea.descripcion && (
                          <p className="mt-1 text-sm text-gray-600">{tarea.descripcion}</p>
                        )}
                      </div>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditTarea(tarea)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            title="Editar"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTarea(tarea.id)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                            title="Eliminar"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${NIVEL_COLORS[tarea.nivel]}`}>
                        {NIVEL_LABELS[tarea.nivel]}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTADO_TAREA_COLORS[tarea.estado]}`}>
                        {ESTADO_TAREA_LABELS[tarea.estado]}
                      </span>
                      {tarea.fechaLimite && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                          {tarea.fechaLimite}
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                        <span>Avance</span>
                        <span>{tarea.porcentaje}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gold transition-all"
                          style={{ width: `${Math.min(100, Math.max(0, tarea.porcentaje))}%` }}
                        />
                      </div>
                    </div>

                    {/* Responsables */}
                    <div className="mb-2 text-sm text-gray-600">
                      <span className="font-medium">Responsables:</span>{' '}
                      {getResponsableNames(tarea.responsables)}
                    </div>

                    {/* Risks toggle */}
                    <button
                      onClick={() => setExpandedTarea(isExpanded ? null : tarea.id)}
                      className="flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-gold"
                    >
                      <svg
                        className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Riesgos ({risks.length})
                    </button>
                  </div>

                  {/* Risks section */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-5">
                      {isAdmin && (
                        <button
                          onClick={() => openCreateRiesgo(tarea.id)}
                          className="mb-3 rounded-lg border border-dashed border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:border-gold hover:text-gold-dark"
                        >
                          + Agregar riesgo
                        </button>
                      )}
                      {risks.length === 0 ? (
                        <p className="text-sm text-gray-400">Sin riesgos registrados</p>
                      ) : (
                        <div className="space-y-3">
                          {risks.map((riesgo) => {
                            const planes = parsePlanes(riesgo.planes);
                            return (
                              <div key={riesgo.id} className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium text-gray-900">{riesgo.riesgo}</p>
                                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PROBABILIDAD_COLORS[riesgo.probabilidad]}`}>
                                        {PROBABILIDAD_LABELS[riesgo.probabilidad]}
                                      </span>
                                    </div>
                                    {planes.length > 0 && (
                                      <div className="mt-2">
                                        <p className="text-xs font-medium text-gray-500">Planes de contingencia:</p>
                                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                                          {planes.map((plan, i) => (
                                            <li key={i} className="text-sm text-gray-600">{plan}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                  {isAdmin && (
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => openEditRiesgo(riesgo)}
                                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                      >
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() => handleDeleteRiesgo(riesgo.id)}
                                        className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                      >
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tarea Modal */}
      {showTareaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-night-lighter bg-night-light p-6 shadow-2xl">
            <h2 className="mb-4 text-lg font-bold text-gold">
              {editingTarea ? 'Editar tarea' : 'Nueva tarea'}
            </h2>
            <form onSubmit={handleSaveTarea} className="space-y-4">
              {/* Titulo */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Titulo</label>
                <input
                  type="text"
                  required
                  value={tareaForm.titulo}
                  onChange={(e) => setTareaForm({ ...tareaForm, titulo: e.target.value })}
                  className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Descripcion */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Descripcion</label>
                <textarea
                  value={tareaForm.descripcion}
                  onChange={(e) => setTareaForm({ ...tareaForm, descripcion: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Responsables multi-select */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Responsables</label>
                <div className="max-h-32 overflow-y-auto rounded-lg border border-night-lighter bg-night p-2">
                  {activePeople.length === 0 ? (
                    <p className="text-xs text-gray-500">No hay personas activas</p>
                  ) : (
                    activePeople.map((p) => {
                      const selected = tareaForm.responsables.split(',').map((s) => s.trim()).includes(p.id);
                      return (
                        <label
                          key={p.id}
                          className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-night-lighter"
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleResponsable(p.id)}
                            className="rounded border-night-lighter accent-gold"
                          />
                          <span className="text-sm text-gray-300">{p.nombre}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Porcentaje */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Avance: {tareaForm.porcentaje}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={tareaForm.porcentaje}
                  onChange={(e) => setTareaForm({ ...tareaForm, porcentaje: Number(e.target.value) })}
                  className="w-full accent-gold"
                />
              </div>

              {/* Fecha limite */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Fecha limite</label>
                <input
                  type="date"
                  value={tareaForm.fechaLimite}
                  onChange={(e) => setTareaForm({ ...tareaForm, fechaLimite: e.target.value })}
                  className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Nivel y Estado */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Nivel</label>
                  <select
                    value={tareaForm.nivel}
                    onChange={(e) => setTareaForm({ ...tareaForm, nivel: e.target.value as NivelTarea })}
                    className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    {NIVELES.map((n) => (
                      <option key={n} value={n}>{NIVEL_LABELS[n]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">Estado</label>
                  <select
                    value={tareaForm.estado}
                    onChange={(e) => setTareaForm({ ...tareaForm, estado: e.target.value as EstadoTarea })}
                    className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    {ESTADOS.map((e) => (
                      <option key={e} value={e}>{ESTADO_TAREA_LABELS[e]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTareaModal(false)}
                  className="rounded-lg border border-night-lighter px-4 py-2 text-sm text-gray-300 hover:bg-night"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Riesgo Modal */}
      {showRiesgoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-night-lighter bg-night-light p-6 shadow-2xl">
            <h2 className="mb-4 text-lg font-bold text-gold">
              {editingRiesgo ? 'Editar riesgo' : 'Nuevo riesgo'}
            </h2>
            <form onSubmit={handleSaveRiesgo} className="space-y-4">
              {/* Riesgo */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Descripcion del riesgo</label>
                <textarea
                  required
                  value={riesgoForm.riesgo}
                  onChange={(e) => setRiesgoForm({ ...riesgoForm, riesgo: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Probabilidad */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Probabilidad</label>
                <select
                  value={riesgoForm.probabilidad}
                  onChange={(e) => setRiesgoForm({ ...riesgoForm, probabilidad: e.target.value as Probabilidad })}
                  className="w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  {PROBABILIDADES.map((p) => (
                    <option key={p} value={p}>{PROBABILIDAD_LABELS[p]}</option>
                  ))}
                </select>
              </div>

              {/* Planes dinamicos */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Planes de contingencia</label>
                <div className="space-y-2">
                  {planesArr.map((plan, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={plan}
                        onChange={(e) => {
                          const next = [...planesArr];
                          next[i] = e.target.value;
                          setPlanesArr(next);
                        }}
                        placeholder={`Plan ${String.fromCharCode(65 + i)}`}
                        className="flex-1 rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                      {planesArr.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPlanesArr(planesArr.filter((_, j) => j !== i))}
                          className="rounded-lg px-2 text-gray-400 hover:text-red-400"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPlanesArr([...planesArr, ''])}
                    className="text-sm text-gold hover:text-gold-dark"
                  >
                    + Agregar plan
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRiesgoModal(false)}
                  className="rounded-lg border border-night-lighter px-4 py-2 text-sm text-gray-300 hover:bg-night"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
