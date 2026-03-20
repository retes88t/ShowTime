import { Link } from 'react-router-dom';
import type { Scene } from '../../types';

interface SceneCardProps {
  scene: Scene;
}

export function SceneCard({ scene }: SceneCardProps) {
  return (
    <Link
      to={`/escena/${scene.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image background */}
      <div className="relative h-44 overflow-hidden">
        {scene.imagenUrl ? (
          <img
            src={scene.imagenUrl}
            alt={scene.nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: scene.color }} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Scene number badge */}
        <div
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg"
          style={{ backgroundColor: scene.color }}
        >
          {scene.numero}
        </div>
        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white drop-shadow-md">
            {scene.nombre}
          </h3>
          {scene.subtitulo && (
            <p className="text-sm text-white/80">{scene.subtitulo}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {scene.descripcion && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">
            {scene.descripcion}
          </p>
        )}

        {scene.personajes && (
          <div className="mb-3">
            <p className="text-xs font-medium uppercase text-gray-400">Personajes</p>
            <p className="text-sm text-gray-600">{scene.personajes}</p>
          </div>
        )}

        <div className="mt-auto">
          {scene.juego && (
            <div className="inline-flex items-center gap-1 rounded-full bg-gold-light/50 px-2.5 py-1 text-xs text-gold-dark">
              <span>&#127922;</span> {scene.juego}
            </div>
          )}
        </div>
      </div>

      {/* Bottom color bar on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 transition-transform group-hover:scale-x-100"
        style={{ backgroundColor: scene.color }}
      />
    </Link>
  );
}
