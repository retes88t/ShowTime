import type { Noticia } from '../../types';

interface NewsSectionProps {
  noticias: Noticia[];
}

export function NewsSection({ noticias }: NewsSectionProps) {
  const activas = noticias.filter((n) => n.activa);

  if (activas.length === 0) return null;

  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="overflow-hidden rounded-lg border border-gold/30 bg-night-light/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-gold/20 bg-gold/10 px-4 py-2">
          <span className="text-sm">&#128227;</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            Noticias
          </span>
        </div>
        <div className="divide-y divide-gold/10">
          {activas.map((noticia) => (
            <div key={noticia.id} className="px-4 py-3">
              <p className="text-sm font-medium text-gold-light">
                {noticia.titulo}
              </p>
              {noticia.contenido !== noticia.titulo && (
                <p className="mt-1 text-xs text-desert-light">
                  {noticia.contenido}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
