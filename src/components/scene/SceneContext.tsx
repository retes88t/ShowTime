import type { Scene } from '../../types';

interface SceneContextProps {
  scene: Scene;
}

export function SceneContext({ scene }: SceneContextProps) {
  const sections = [
    { label: 'Descripcion', value: scene.descripcion },
    { label: 'Personajes', value: scene.personajes },
    { label: 'Conflicto', value: scene.conflicto },
    { label: 'Objetivos', value: scene.objetivos },
    { label: 'Parodia', value: scene.parodia },
    { label: 'Acto', value: scene.acto },
    { label: 'Lugar', value: scene.lugar },
  ];

  const lines = [
    { label: 'Linea de entrada', value: scene.lineaEntrada },
    { label: 'Linea de conflicto', value: scene.lineaConflicto },
    { label: 'Linea de salida', value: scene.lineaSalida },
  ];

  return (
    <div className="space-y-6">
      {/* Info cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {sections
          .filter((s) => s.value)
          .map((section) => (
            <div key={section.label} className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-1 text-xs font-medium uppercase text-gray-400">
                {section.label}
              </h4>
              <p className="text-sm text-gray-700">{section.value}</p>
            </div>
          ))}
      </div>

      {/* Lines */}
      {lines.some((l) => l.value) && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-xs font-medium uppercase text-gray-400">Lineas</h4>
          <div className="space-y-3">
            {lines
              .filter((l) => l.value)
              .map((line) => (
                <div key={line.label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex rounded-full bg-gold-light px-2 py-0.5 text-xs font-medium text-gold-dark">
                    {line.label}
                  </span>
                  <p className="text-sm italic text-gray-600">&ldquo;{line.value}&rdquo;</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Game */}
      {scene.juego && (
        <div className="rounded-lg border-2 border-dashed border-gold/30 bg-gold-light/20 p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">&#127922;</span>
            <div>
              <h4 className="text-sm font-medium text-gold-dark">Juego de Arteterapia</h4>
              <p className="text-sm text-gray-700">{scene.juego}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
