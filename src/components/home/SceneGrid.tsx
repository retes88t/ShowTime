import type { Scene } from '../../types';
import { SceneCard } from './SceneCard';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';

interface SceneGridProps {
  scenes: Scene[];
  loading: boolean;
}

export function SceneGrid({ scenes, loading }: SceneGridProps) {
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
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Escenas de la Obra
      </h2>
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
