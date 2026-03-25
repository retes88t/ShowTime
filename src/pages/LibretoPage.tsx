import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import libretoRaw from '../../docs/Libreto.md?raw';

interface LibretoLine {
  type: 'title' | 'heading' | 'character' | 'stage-direction' | 'dialogue' | 'empty';
  text: string;
}

function parseLibreto(raw: string): LibretoLine[] {
  return raw.split('\n').map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return { type: 'empty', text: '' };
    if (trimmed.startsWith('LIBRETO') || trimmed.startsWith('Título') || trimmed === 'Lo esencial es invisible a los ojos')
      return { type: 'title', text: trimmed };
    if (trimmed.startsWith('ACTO ') || trimmed.startsWith('Escena ') || trimmed.startsWith('ENTREACTO'))
      return { type: 'heading', text: trimmed };
    if (trimmed.startsWith('Autores') || trimmed.startsWith('Lugar:') || trimmed.startsWith('Personajes:'))
      return { type: 'stage-direction', text: trimmed };
    if (/^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s/()0-9,]+:/.test(trimmed) || /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]+$/.test(trimmed))
      return { type: 'character', text: trimmed };
    if (trimmed.startsWith('(') || (trimmed.includes('(') && !trimmed.includes('"')))
      return { type: 'stage-direction', text: trimmed };
    return { type: 'dialogue', text: trimmed };
  });
}

export function LibretoPage() {
  const [lines] = useState<LibretoLine[]>(() => parseLibreto(libretoRaw));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Volver
          </Link>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-gold-dark hover:bg-gold/20"
          >
            <span>&#128196;</span>
            Descargar / Imprimir PDF
          </button>
        </div>
      </div>

      {/* Libreto content */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 print:border-none print:shadow-none">
          {lines.map((line, i) => {
            if (line.type === 'empty') return <div key={i} className="h-4" />;

            if (line.type === 'title')
              return (
                <h1
                  key={i}
                  className="mb-2 text-center text-2xl font-bold text-night md:text-3xl"
                >
                  {line.text}
                </h1>
              );

            if (line.type === 'heading')
              return (
                <h2
                  key={i}
                  className="mb-3 mt-8 border-b border-gold/30 pb-2 text-lg font-bold text-gold-dark"
                >
                  {line.text}
                </h2>
              );

            if (line.type === 'character')
              return (
                <p key={i} className="mt-4 text-sm font-bold uppercase text-night">
                  {line.text}
                </p>
              );

            if (line.type === 'stage-direction')
              return (
                <p key={i} className="text-sm italic text-gray-500">
                  {line.text}
                </p>
              );

            return (
              <p key={i} className="text-sm leading-relaxed text-gray-700">
                {line.text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
