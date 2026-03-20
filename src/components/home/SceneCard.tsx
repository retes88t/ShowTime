import { Link } from 'react-router-dom';
import type { Scene } from '../../types';

interface SceneCardProps {
  scene: Scene;
}

export function SceneCard({ scene }: SceneCardProps) {
  return (
    <Link
      to={`/escena/${scene.id}`}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Color bar top */}
      <div className="h-2" style={{ backgroundColor: scene.color }} />

      <div className="p-5">
        {/* Scene number badge */}
        <div
          className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{ backgroundColor: scene.color }}
        >
          {scene.numero}
        </div>

        <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-night">
          {scene.nombre}
        </h3>
        {scene.subtitulo && (
          <p className="mb-3 text-sm text-gray-500">{scene.subtitulo}</p>
        )}
        {scene.descripcion && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            {scene.descripcion}
          </p>
        )}

        {scene.personajes && (
          <div className="mb-3">
            <p className="text-xs font-medium uppercase text-gray-400">Personajes</p>
            <p className="text-sm text-gray-600">{scene.personajes}</p>
          </div>
        )}

        {scene.juego && (
          <div className="inline-flex items-center gap-1 rounded-full bg-gold-light/50 px-2 py-1 text-xs text-gold-dark">
            <span>&#127922;</span> {scene.juego}
          </div>
        )}
      </div>

      {/* Hover indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100"
        style={{ backgroundColor: scene.color }}
      />
    </Link>
  );
}
