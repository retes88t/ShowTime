import { Link } from 'react-router-dom';
import type { Scene } from '../../types';

interface SceneHeaderProps {
  scene: Scene;
  totalScenes: number;
  scenes: Scene[];
}

export function SceneHeader({ scene, scenes }: SceneHeaderProps) {
  const sorted = [...scenes].sort((a, b) => a.numero - b.numero);
  const currentIndex = sorted.findIndex((s) => s.id === scene.id);
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <div className="border-b bg-white">
      {/* Banner image */}
      <div className="relative h-48 overflow-hidden md:h-64">
        {scene.imagenUrl ? (
          <img
            src={scene.imagenUrl}
            alt={scene.nombre}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: scene.color }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Nav over banner */}
        <div className="absolute inset-x-0 top-0 z-10 mx-auto max-w-5xl px-4 pt-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1 rounded-lg bg-black/30 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm hover:bg-black/50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </Link>
            <div className="flex gap-2">
              {prev && (
                <Link
                  to={`/escena/${prev.id}`}
                  className="rounded-lg bg-black/30 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm hover:bg-black/50"
                >
                  &larr; {prev.nombre}
                </Link>
              )}
              {next && (
                <Link
                  to={`/escena/${next.id}`}
                  className="rounded-lg bg-black/30 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm hover:bg-black/50"
                >
                  {next.nombre} &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Title over banner */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-5xl px-4 pb-5">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-bold text-white shadow-lg"
              style={{ backgroundColor: scene.color }}
            >
              {scene.numero}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-md md:text-3xl">{scene.nombre}</h1>
              {scene.subtitulo && (
                <p className="text-white/80 drop-shadow-md">{scene.subtitulo}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Color accent bar */}
      <div className="h-1" style={{ backgroundColor: scene.color }} />
    </div>
  );
}
