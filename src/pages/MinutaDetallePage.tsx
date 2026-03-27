import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useScenes } from '../hooks/useScenes';
import { useMaterials } from '../hooks/useMaterials';
import { useMinutas } from '../hooks/useMinutas';
import { MinutaDetailView } from '../components/minutas/MinutaDetailView';

export function MinutaDetallePage() {
  const { id } = useParams<{ id: string }>();
  const { isAdmin, people } = useAppContext();
  const { data: scenes } = useScenes();
  const { data: materials } = useMaterials();
  const { data: minutas } = useMinutas();
  const printRef = useRef<HTMLDivElement>(null);

  const personName = (pid: string) => {
    if (!pid) return '';
    const p = people.find((pp) => pp.id === pid);
    return p ? p.nombre : '';
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Acceso restringido. Inicia sesion como admin desde el header.</p>
      </div>
    );
  }

  const minuta = minutas.find((m) => m.id === id);

  if (!minuta) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-500">Minuta no encontrada.</p>
        <Link to="/minutas" className="text-sm font-medium text-gold hover:underline">Volver a minutas</Link>
      </div>
    );
  }

  const materialsByScene = materials.reduce<Record<string, typeof materials>>((acc, mat) => {
    if (!acc[mat.escenaId]) acc[mat.escenaId] = [];
    acc[mat.escenaId].push(mat);
    return acc;
  }, {});

  const handleDownloadPDF = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styleSheets = Array.from(document.styleSheets);
    let cssText = '';
    for (const sheet of styleSheets) {
      try {
        cssText += Array.from(sheet.cssRules).map((r) => r.cssText).join('\n');
      } catch {
        if (sheet.href) cssText += `@import url("${sheet.href}");\n`;
      }
    }

    printWindow.document.write(`<!DOCTYPE html>
<html><head><meta charset="utf-8" />
<title>Minuta - ${minuta.titulo}</title>
<style>${cssText}</style>
<style>
  @media print { html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
  body { background: #f9fafb !important; padding: 24px !important; margin: 0 !important; }
  button, a[data-hide-print] { display: none !important; }
</style>
</head><body>${content.outerHTML}</body></html>`);
    printWindow.document.close();
    printWindow.onload = () => { printWindow.focus(); printWindow.print(); };
    setTimeout(() => { printWindow.focus(); printWindow.print(); }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link
            to="/minutas"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Todas las minutas
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-night to-night-light px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <MinutaDetailView
          minuta={minuta}
          printRef={printRef}
          scenes={scenes}
          materialsByScene={materialsByScene}
          totalMaterials={materials.length}
          pendientes={materials.filter((m) => m.estado === 'pendiente').length}
          enProgreso={materials.filter((m) => m.estado === 'en_progreso').length}
          listos={materials.filter((m) => m.estado === 'listo').length}
          personName={personName}
          showMaterials={true}
        />
      </div>
    </div>
  );
}
