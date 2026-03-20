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
      <div className="h-2" style={{ backgroundColor: scene.color }} />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a escenas
          </Link>
          <div className="flex gap-2">
            {prev && (
              <Link
                to={`/escena/${prev.id}`}
                className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              >
                &larr; {prev.nombre}
              </Link>
            )}
            {next && (
              <Link
                to={`/escena/${next.id}`}
                className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              >
                {next.nombre} &rarr;
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold text-white"
            style={{ backgroundColor: scene.color }}
          >
            {scene.numero}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{scene.nombre}</h1>
            {scene.subtitulo && (
              <p className="text-gray-500">{scene.subtitulo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
