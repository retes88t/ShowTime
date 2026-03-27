import type { Minuta } from '../../types';

const ESTADO_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  en_progreso: 'bg-blue-100 text-blue-800',
  listo: 'bg-green-100 text-green-800',
};

const ESTADO_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  listo: 'Listo',
};

const CARD_STYLES = [
  { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: '🎨' },
  { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', icon: '🔧' },
  { gradient: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-800', icon: '🎯' },
  { gradient: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', icon: '⚡' },
  { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: '📌' },
  { gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', icon: '💡' },
];

const NOTE_ICONS = ['📌', '💡', '🔧', '📝', '🎯', '⚡', '🪑', '🌿', '🎭', '✂️', '🏴‍☠️', '🎨'];

function parseCommitments(text: string) {
  const blocks = text.split(/\n\n+/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.split('\n').filter(Boolean);
    const firstLine = lines[0];
    const colonIdx = firstLine.indexOf(':');
    if (colonIdx > 0 && colonIdx < 50) {
      return { name: firstLine.slice(0, colonIdx).trim(), subtitle: firstLine.slice(colonIdx + 1).trim(), items: lines.slice(1).map((l) => l.replace(/^[-•]\s*/, '')) };
    }
    return { name: '', subtitle: '', items: lines.map((l) => l.replace(/^[-•]\s*/, '')) };
  });
}

function parseLines(text: string) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

export function formatMinutaDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface MinutaDetailViewProps {
  minuta: Minuta;
  printRef: React.RefObject<HTMLDivElement | null>;
  scenes?: { id: string; numero: number; nombre: string; color: string }[];
  materialsByScene?: Record<string, { id: string; nombre: string; cantidad: number; estado: string; responsableId: string; notas: string }[]>;
  totalMaterials?: number;
  pendientes?: number;
  enProgreso?: number;
  listos?: number;
  personName?: (id: string) => string;
  showMaterials?: boolean;
}

export function MinutaDetailView({
  minuta,
  printRef,
  scenes = [],
  materialsByScene = {},
  totalMaterials = 0,
  pendientes = 0,
  enProgreso = 0,
  listos = 0,
  personName = () => '',
  showMaterials = true,
}: MinutaDetailViewProps) {
  return (
    <div ref={printRef} className="space-y-6">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-night to-night-light p-8 text-white shadow-lg">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10" />
        <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-gold/5" />
        <div className="absolute right-12 bottom-4 h-20 w-20 rounded-full bg-gold/5" />
        <div className="relative">
          <div className="mb-1 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-3xl backdrop-blur-sm">📋</span>
            <div>
              <h2 className="text-2xl font-bold leading-tight">{minuta.titulo}</h2>
              <p className="mt-0.5 text-sm text-white/60">Minuta de reunion</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {formatMinutaDate(minuta.fecha)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {minuta.asistentes}
            </span>
          </div>
        </div>
      </div>

      {/* Resumen */}
      {minuta.resumen && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white text-sm">📄</span>
            <h3 className="text-lg font-bold text-gray-900">Resumen de la Junta</h3>
          </div>
          {(() => {
            const paragraphs = minuta.resumen.split(/\n\n+/);
            const mainText = paragraphs[0];
            const bulletLines = paragraphs.slice(1).join('\n').split('\n').filter(Boolean);
            return (
              <>
                <p className="mb-4 text-gray-700 leading-relaxed">{mainText}</p>
                {bulletLines.length > 0 && (
                  <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs text-white font-bold">!</span>
                      <h4 className="font-bold text-amber-900">Pendientes clave</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-amber-800">
                      {bulletLines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          <span>{line.replace(/^[-•]\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            );
          })()}
        </section>
      )}

      {/* Compromisos */}
      {minuta.compromisos && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white text-sm">🤝</span>
            <h3 className="text-lg font-bold text-gray-900">Apoyo del Equipo</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {parseCommitments(minuta.compromisos).map((block, i) => {
              const style = CARD_STYLES[i % CARD_STYLES.length];
              return (
                <div key={i} className={`overflow-hidden rounded-xl border ${style.border} ${style.bg}`}>
                  {block.name && (
                    <div className={`bg-gradient-to-r ${style.gradient} px-4 py-3`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{style.icon}</span>
                        <h4 className="font-bold text-white">{block.name}</h4>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    {block.subtitle && <p className={`mb-2 text-xs italic ${style.text} opacity-75`}>{block.subtitle}</p>}
                    <ul className={`space-y-1.5 text-sm ${style.text}`}>
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Notas al vuelo */}
      {minuta.notasVuelo && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white text-sm">⚡</span>
            <h3 className="text-lg font-bold text-gray-900">Notas al Vuelo</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {parseLines(minuta.notasVuelo).map((line, i) => {
              const colonIdx = line.indexOf(':');
              const title = colonIdx > 0 ? line.slice(0, colonIdx).trim() : line;
              const desc = colonIdx > 0 ? line.slice(colonIdx + 1).trim() : '';
              return (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 border border-gray-100 hover:shadow-sm transition">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm border border-gray-100">
                    {NOTE_ICONS[i % NOTE_ICONS.length]}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    {desc && <p className="mt-0.5 text-sm text-gray-500">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Proximos pasos */}
      {minuta.proximosPasos && (
        <section className="rounded-2xl border-2 border-gold bg-gradient-to-br from-gold/5 to-gold/10 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-night text-sm font-bold">→</span>
            <h3 className="text-lg font-bold text-gray-900">Proximos Pasos</h3>
          </div>
          <div className="space-y-3">
            {parseLines(minuta.proximosPasos).map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-night text-xs font-bold text-gold">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm text-gray-800 leading-relaxed">{line.replace(/^\d+[.)]\s*/, '')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Materiales */}
      {showMaterials && totalMaterials > 0 && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white text-sm">📦</span>
            <h3 className="text-lg font-bold text-gray-900">Estado Actual de Materiales</h3>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-gray-900">{totalMaterials}</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-yellow-600">{pendientes}</p>
              <p className="text-xs font-medium text-yellow-600 uppercase tracking-wide">Pendientes</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-blue-600">{enProgreso}</p>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">En progreso</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-green-600">{listos}</p>
              <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Listos</p>
            </div>
          </div>

          {scenes
            .sort((a, b) => a.numero - b.numero)
            .map((scene) => {
              const sceneMats = materialsByScene[scene.id] || [];
              if (sceneMats.length === 0) return null;
              return (
                <div key={scene.id} className="mb-6 overflow-hidden rounded-xl border border-gray-200">
                  <h4
                    className="px-4 py-2.5 text-sm font-bold text-white"
                    style={{ backgroundColor: scene.color }}
                  >
                    Escena {scene.numero}: {scene.nombre}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50 text-left text-xs text-gray-500">
                          <th className="px-3 py-2">Material</th>
                          <th className="px-3 py-2 text-center">Cant.</th>
                          <th className="px-3 py-2">Responsable</th>
                          <th className="px-3 py-2">Estado</th>
                          <th className="px-3 py-2">Notas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sceneMats.map((mat) => (
                          <tr key={mat.id} className="border-b last:border-0">
                            <td className="px-3 py-2 font-medium text-gray-900">{mat.nombre}</td>
                            <td className="px-3 py-2 text-center text-gray-600">{mat.cantidad}</td>
                            <td className="px-3 py-2 text-gray-700">
                              {personName(mat.responsableId) || <span className="text-gray-300 italic">Sin asignar</span>}
                            </td>
                            <td className="px-3 py-2">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${ESTADO_COLORS[mat.estado]}`}>
                                {ESTADO_LABELS[mat.estado]}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-gray-500">{mat.notas || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
        </section>
      )}

      {/* Footer */}
      <div className="rounded-2xl bg-gradient-to-r from-night/5 to-night/10 p-4 text-center">
        <p className="text-xs text-gray-400">Generado por ShowTime — {formatMinutaDate(minuta.fecha)}</p>
      </div>
    </div>
  );
}
