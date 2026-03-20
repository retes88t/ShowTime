export function HeroSection() {
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
          ShowTime
        </h1>
        <p className="mb-2 text-xl text-gold-light md:text-2xl">
          Administracion de Produccion
        </p>
        <p className="text-lg text-desert-light">
          &laquo;Lo esencial es invisible a los ojos&raquo;
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night-light/50 px-5 py-2 text-sm text-gray-300">
          <span className="h-2 w-2 rounded-full bg-green-planet" />
          Basado en El Principito &mdash; 6 Escenas
        </div>
      </div>
    </section>
  );
}
