import { Link } from 'react-router-dom';
import { NarrativeSection } from '../components/home/NarrativeSection';

export function EstructuraPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-stars relative overflow-hidden px-4 py-12 text-center">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="animate-twinkle absolute rounded-full bg-star"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gold md:text-4xl">
            Contexto
          </h1>
          <p className="mt-2 text-sm text-desert-light">
            &laquo;Lo esencial es invisible a los ojos&raquo;
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-1 text-sm text-gold-light hover:text-gold"
          >
            &larr; Volver al inicio
          </Link>
        </div>
      </div>

      {/* Argumento */}
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <div className="rounded-xl border border-gold/20 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-night">Argumento</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Teodoro es un joven patinador que esta preparandose para la competencia mas importante de su vida pero algo parece no estar saliendo bien en su rutina. Con ayuda de la terapia poco convencional del Dr. Principe, realizara un viaje extraordinario que lo hara descubrir lo que tanto le faltaba.
          </p>
        </div>
      </div>

      <NarrativeSection />
    </div>
  );
}
