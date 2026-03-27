import { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { useScenes } from '../hooks/useScenes';
import { useMaterials } from '../hooks/useMaterials';

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

export function MinutasPage() {
  const { isAdmin, people } = useAppContext();
  const { data: scenes } = useScenes();
  const { data: materials } = useMaterials();

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

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Gather all stylesheets from the current document
    const styleSheets = Array.from(document.styleSheets);
    let cssText = '';
    for (const sheet of styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules);
        cssText += rules.map((r) => r.cssText).join('\n');
      } catch {
        // Cross-origin sheets: copy via link tag
        if (sheet.href) {
          cssText += `@import url("${sheet.href}");\n`;
        }
      }
    }

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Minuta - Junta de Produccion</title>
  <style>${cssText}</style>
  <style>
    @media print {
      html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
    body { background: white !important; padding: 0 !important; margin: 0 !important; }
    /* hide buttons that may be inside the cloned content */
    button { display: none !important; }
  </style>
</head>
<body>
  ${content.outerHTML}
</body>
</html>`);
    printWindow.document.close();

    // Wait for styles to load then trigger print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
    // Fallback if onload doesn't fire
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 800);
  };

  const sceneNameById = (id: string) => {
    const s = scenes.find((sc) => sc.id === id);
    return s ? `Escena ${s.numero}: ${s.nombre}` : id;
  };

  const handleDownloadExcel = () => {
    const escape = (val: string | number) => {
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const header = ['Escena', 'Material', 'Cantidad', 'Quien lo trae', 'Fecha de entrega', 'Estado', 'Notas'];
    const rows = materials
      .sort((a, b) => {
        const sa = scenes.find((s) => s.id === a.escenaId);
        const sb = scenes.find((s) => s.id === b.escenaId);
        return (sa?.numero ?? 0) - (sb?.numero ?? 0);
      })
      .map((mat) => [
        sceneNameById(mat.escenaId),
        mat.nombre,
        mat.cantidad,
        personName(mat.responsableId),
        '', // Fecha de entrega
        ESTADO_LABELS[mat.estado] || mat.estado,
        mat.notas || '',
      ]);

    const csv = [header, ...rows].map((row) => row.map(escape).join(',')).join('\n');
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Materiales_Obra.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const materialsByScene = materials.reduce<Record<string, typeof materials>>((acc, mat) => {
    const key = mat.escenaId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(mat);
    return acc;
  }, {});

  const totalMaterials = materials.length;
  const pendientes = materials.filter(m => m.estado === 'pendiente').length;
  const enProgreso = materials.filter(m => m.estado === 'en_progreso').length;
  const listos = materials.filter(m => m.estado === 'listo').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Minutas - Junta de Produccion</h1>
                <p className="text-sm text-gray-500">26 de Marzo 2026 — Retes, Arturo y Tony</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadExcel}
                className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Descargar Excel
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 rounded-lg bg-night px-4 py-2 text-sm font-medium text-white hover:bg-night-light transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={printRef} className="mx-auto max-w-5xl space-y-8 px-4 py-8">

        {/* Resumen de la junta */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Resumen de la Junta</h2>
          <p className="mb-3 text-gray-700">
            Reunion de produccion entre <strong>Retes</strong>, <strong>Arturo</strong> y <strong>Tony</strong> para
            definir el plan de adquisicion de materiales, escenografia y elementos graficos de la obra.
          </p>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <h3 className="font-semibold text-amber-900 mb-2">Pendientes clave</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
              <li><strong>Nombre oficial de la obra</strong> — aun no se define. Es necesario para que Tony pueda arrancar con los flyers de publicidad.</li>
              <li><strong>Fecha limite para recoleccion de materiales</strong> — hay que establecerla.</li>
              <li><strong>Fecha para sesion de manualidades</strong> — se necesita agendar un dia para que el equipo venga a hacer las manualidades necesarias (flores, props, escenografia).</li>
            </ul>
          </div>
        </section>

        {/* Apoyo del equipo */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Apoyo del Equipo</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
              <h3 className="font-bold text-blue-900 mb-2">Tony (Disenador grafico)</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
                <li>Flyers y material de publicidad (pendiente: necesita el nombre oficial de la obra)</li>
                <li>Apoyo en materiales graficos y de escenografia</li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
              <h3 className="font-bold text-purple-900 mb-2">Arturo</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-purple-800">
                <li>Apoyo en recoleccion de materiales</li>
                <li>Coordinacion de logistica</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Notas al vuelo */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Notas al Vuelo</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <span className="text-lg">🪑</span>
              <div>
                <p className="font-medium text-gray-900">Sillas</p>
                <p className="text-sm text-gray-600">Preguntar a <strong>Fersa</strong></p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="font-medium text-gray-900">Focos</p>
                <p className="text-sm text-gray-600">Preguntar a <strong>Ellen</strong></p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <span className="text-lg">🌿</span>
              <div>
                <p className="font-medium text-gray-900">Baobabs</p>
                <p className="text-sm text-gray-600">Plantas artificiales, maquillaje</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <span className="text-lg">🏴‍☠️</span>
              <div>
                <p className="font-medium text-gray-900">Planeta Pirata</p>
                <p className="text-sm text-gray-600">Revisar materiales necesarios</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <span className="text-lg">✂️</span>
              <div>
                <p className="font-medium text-gray-900">Sesion de manualidades</p>
                <p className="text-sm text-gray-600">Poner fecha para venir a hacer manualidades</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <span className="text-lg">🎭</span>
              <div>
                <p className="font-medium text-gray-900">Tela para sillas</p>
                <p className="text-sm text-gray-600">Tela para cubrir sillas en escenas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resumen de materiales */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Resumen General de Materiales</h2>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-gray-100 p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{totalMaterials}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="rounded-lg bg-yellow-50 p-3 text-center">
              <p className="text-2xl font-bold text-yellow-700">{pendientes}</p>
              <p className="text-xs text-yellow-600">Pendientes</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-center">
              <p className="text-2xl font-bold text-blue-700">{enProgreso}</p>
              <p className="text-xs text-blue-600">En progreso</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <p className="text-2xl font-bold text-green-700">{listos}</p>
              <p className="text-xs text-green-600">Listos</p>
            </div>
          </div>

          {/* Materiales por escena */}
          {scenes
            .sort((a, b) => a.numero - b.numero)
            .map((scene) => {
              const sceneMats = materialsByScene[scene.id] || [];
              if (sceneMats.length === 0) return null;
              return (
                <div key={scene.id} className="mb-6">
                  <h3
                    className="mb-2 rounded-t-lg px-4 py-2 text-sm font-bold text-white"
                    style={{ backgroundColor: scene.color }}
                  >
                    Escena {scene.numero}: {scene.nombre}
                  </h3>
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
                            <td className="px-3 py-2 text-gray-700">{personName(mat.responsableId) || <span className="text-gray-300 italic">Sin asignar</span>}</td>
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

        {/* Proximos pasos */}
        <section className="rounded-xl border border-gold bg-gold/5 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Proximos Pasos</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800">
            <li><strong>Definir el nombre oficial de la obra</strong> para que Tony pueda empezar con los flyers.</li>
            <li><strong>Establecer fecha limite</strong> para recolectar todos los materiales.</li>
            <li><strong>Agendar sesion de manualidades</strong> — un dia para construir props y escenografia.</li>
            <li><strong>Consultar con Fersa</strong> sobre las sillas y con <strong>Ellen</strong> sobre los focos.</li>
          </ol>
        </section>

      </div>
    </div>
  );
}
