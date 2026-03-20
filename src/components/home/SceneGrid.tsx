import type { Scene } from '../../types';
import { SceneCard } from './SceneCard';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';

interface SceneGridProps {
  scenes: Scene[];
  loading: boolean;
  syncing?: boolean;
}

export function SceneGrid({ scenes, loading, syncing }: SceneGridProps) {
  if (loading) return <Spinner />;

  if (scenes.length === 0) {
    return (
      <EmptyState
        message="No hay escenas registradas aun."
        action="Ir a Admin para agregar"
      />
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-center gap-3">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Escenas de la Obra
        </h2>
        {syncing && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scenes
          .sort((a, b) => a.numero - b.numero)
          .map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
      </div>
    </section>
  );
}
