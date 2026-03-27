import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useScenes } from '../hooks/useScenes';
import { useMaterials } from '../hooks/useMaterials';
import { useMinutas } from '../hooks/useMinutas';
import { MinutaDetailView, formatMinutaDate } from '../components/minutas/MinutaDetailView';

const ESTADO_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  listo: 'Listo',
};

export function MinutasPage() {
  const { isAdmin, people } = useAppContext();
  const { data: scenes } = useScenes();
  const { data: materials } = useMaterials();
  const { data: minutas } = useMinutas();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const personName = (id: string) => {
    if (!id) return '';
    const p = people.find((pp) => pp.id === id);
    return p ? p.nombre : '';
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Acceso restringido. Inicia sesion como admin desde el header.</p>
      </div>
    );
  }

  const sorted = [...minutas].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const selected = selectedId ? minutas.find((m) => m.id === selectedId) : sorted[0];

  const sceneNameById = (id: string) => {
    const s = scenes.find((sc) => sc.id === id);
    return s ? `Escena ${s.numero}: ${s.nombre}` : id;
  };

  const handleDownloadExcel = () => {
    const escape = (val: string | number) => {
      const str = String(val);
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    };
    const header = ['Escena', 'Material', 'Cantidad', 'Quien lo trae', 'Fecha de entrega', 'Estado', 'Notas'];
    const rows = materials
      .sort((a, b) => {
        const sa = scenes.find((s) => s.id === a.escenaId);
        const sb = scenes.find((s) => s.id === b.escenaId);
        return (sa?.numero ?? 0) - (sb?.numero ?? 0);
      })
      .map((mat) => [
        sceneNameById(mat.escenaId), mat.nombre, mat.cantidad,
        personName(mat.responsableId), '',
        ESTADO_LABELS[mat.estado] || mat.estado, mat.notas || '',
      ]);
    const csv = [header, ...rows].map((row) => row.map(escape).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Materiales_Obra.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const materialsByScene = materials.reduce<Record<string, typeof materials>>((acc, mat) => {
    if (!acc[mat.escenaId]) acc[mat.escenaId] = [];
    acc[mat.escenaId].push(mat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Minutas</h1>
                <p className="text-sm text-gray-500">Historial de juntas de produccion</p>
              </div>
            </div>
            <button
              onClick={handleDownloadExcel}
              className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Excel Materiales
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">Juntas</h3>
            {sorted.length === 0 ? (
              <p className="text-sm text-gray-400">No hay minutas. Crea una desde Admin.</p>
            ) : (
              <div className="space-y-2">
                {sorted.map((m) => (
                  <div key={m.id} className="relative">
                    <button
                      onClick={() => setSelectedId(m.id)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        selected?.id === m.id
                          ? 'border-gold bg-gold/10 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900 truncate">{m.titulo}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{formatMinutaDate(m.fecha)}</p>
                      <p className="mt-0.5 text-xs text-gray-400 truncate">{m.asistentes}</p>
                    </button>
                    <Link
                      to={`/minutas/${m.id}`}
                      className="mt-1 inline-flex items-center gap-1 px-3 text-xs font-medium text-gold hover:text-gold-dark transition"
                    >
                      Ver detalle completo
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            {selected ? (
              <MinutaDetailView
                minuta={selected}
                printRef={printRef}
                scenes={scenes}
                materialsByScene={materialsByScene}
                totalMaterials={materials.length}
                pendientes={materials.filter((m) => m.estado === 'pendiente').length}
                enProgreso={materials.filter((m) => m.estado === 'en_progreso').length}
                listos={materials.filter((m) => m.estado === 'listo').length}
                personName={personName}
                showMaterials={false}
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border bg-white">
                <p className="text-gray-400">Selecciona o crea una minuta desde Admin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
