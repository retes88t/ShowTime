const ESTRUCTURA = [
  {
    acto: 'Acto 1. La Tierra',
    escenas: [{ numero: 1, nombre: 'Dibujame unos patines', subtitulo: 'El joven estrella' }],
  },
  {
    acto: 'Acto 2. El Mundo Fantastico',
    escenas: [
      { numero: 2, nombre: 'El pirata y el mapa', subtitulo: '' },
      { numero: 3, nombre: 'El vanidoso y la lupa', subtitulo: '' },
      { numero: 4, nombre: 'La geografa y el lapiz', subtitulo: '' },
      { numero: 5, nombre: 'El planeta de los constructores', subtitulo: '' },
    ],
  },
  {
    acto: 'Acto 3. El Mundo Interior',
    escenas: [{ numero: 6, nombre: 'El planeta del Principito', subtitulo: '' }],
  },
];

const PERSONAJES = [
  {
    nombre: 'Teodoro (o Lucia)',
    descripcion: '17-21 anos. Patinador artistico de hielo. Cordial, perfeccionista y ex-apasionado. Frustrado por su rutina y la presion le ha provocado apatia.',
  },
  {
    nombre: 'Dr. Principe',
    descripcion: '30-40 anos. Terapeuta experimentado con alma de nino. Curioso y entusiasta por la vida. Multiples talentos.',
  },
  {
    nombre: 'Capitan Nereo',
    descripcion: 'Pirata ridiculo, carismatico y obsesivo con el control. Habita solitario un planeta lleno de islas y mares con su perico Neron.',
  },
  {
    nombre: 'Dylan (o Kimberly)',
    descripcion: '23-25 anos. Excentrico, diva, convenenciero. Fan de si mismo. Parodia influencer. Representa el deseo de admiracion.',
  },
  {
    nombre: 'Agente Catalina',
    descripcion: '30-40 anos. Agente de viajes comprometida, superficial, exagerada y dramatica. Basada en el Geografo del cuento.',
  },
  {
    nombre: 'Baobabs / Constructores 1, 2 y 3',
    descripcion: 'Tres sujetos comicos, caricaturescos y camaleOnicos. Representan los pensamientos intrusivos de Teodoro. Se mueven como intrusos entre el publico.',
  },
];

export function NarrativeSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      {/* Estructura Narrativa */}
      <div className="mb-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Estructura Narrativa
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {ESTRUCTURA.map((acto) => (
            <div
              key={acto.acto}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-dark">
                {acto.acto}
              </h3>
              <ul className="space-y-2">
                {acto.escenas.map((e) => (
                  <li key={e.numero} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold-dark">
                      {e.numero}
                    </span>
                    <span className="text-sm text-gray-700">
                      &ldquo;{e.nombre}&rdquo;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Personajes */}
      <div>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Personajes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONAJES.map((p) => (
            <div
              key={p.nombre}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-2 text-sm font-semibold text-night">
                {p.nombre}
              </h3>
              <p className="text-xs leading-relaxed text-gray-600">
                {p.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
