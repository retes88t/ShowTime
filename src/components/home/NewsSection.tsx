import type { Noticia } from '../../types';

interface NewsSectionProps {
  noticias: Noticia[];
}

export function NewsSection({ noticias }: NewsSectionProps) {
  const activas = noticias.filter((n) => n.activa);

  if (activas.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <div className="overflow-hidden rounded-xl border-2 border-gold/40 bg-gradient-to-br from-gold-light/90 via-desert-light/85 to-star/80 shadow-lg shadow-gold/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-gold-dark/20 bg-gold/30 px-5 py-3">
          <span className="text-base">&#128227;</span>
          <span className="text-sm font-bold uppercase tracking-wider text-night">
            Noticias
          </span>
        </div>
        <div className="divide-y divide-gold-dark/15">
          {activas.map((noticia) => (
            <div key={noticia.id} className="px-5 py-4">
              <p className="text-sm font-semibold text-night">
                {noticia.titulo}
              </p>
              {noticia.contenido !== noticia.titulo && (
                <p className="mt-1 text-xs text-night-light">
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
