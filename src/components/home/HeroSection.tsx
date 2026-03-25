import { Link } from 'react-router-dom';
import type { Noticia } from '../../types';
import { NewsSection } from './NewsSection';

interface HeroSectionProps {
  noticias: Noticia[];
}

export function HeroSection({ noticias }: HeroSectionProps) {
  return (
    <section className="bg-stars relative overflow-hidden px-4 py-20 text-center">
      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-6 text-6xl">&#9733;</div>
        <h1 className="mb-4 text-5xl font-bold text-gold md:text-6xl">
          El Principito
        </h1>
        <p className="text-lg text-desert-light">
          &laquo;Lo esencial es invisible a los ojos&raquo;
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night-light/50 px-5 py-2 text-sm text-gray-300">
            <span className="h-2 w-2 rounded-full bg-green-planet" />
            Basado en El Principito &mdash; 6 Escenas
          </div>
          <Link
            to="/libreto"
            className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-rose/10 px-5 py-2 text-sm font-medium text-rose transition hover:bg-rose/20"
          >
            <span>&#128214;</span>
            Ver Libreto
          </Link>
        </div>

        {/* News Section */}
        <NewsSection noticias={noticias} />
      </div>
    </section>
  );
}
