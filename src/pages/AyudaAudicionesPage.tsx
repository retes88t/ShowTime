import { Link } from 'react-router-dom';

const PERSONAJES = [
  {
    nombre: 'Teodoro',
    slug: 'teodoro',
    tipo: 'Protagonista',
    edad: '17-21 anos',
    icon: '\u26F8',
    color: 'border-sky bg-sky/10 hover:bg-sky/20',
    queSeEvalua: 'Rango emocional, vulnerabilidad, transicion de rigidez a soltura.',
  },
  {
    nombre: 'Dr. Saint Exupery / Principito',
    slug: 'dr-principe',
    tipo: 'Co-protagonista',
    edad: '30-40 anos',
    icon: '\u2728',
    color: 'border-gold bg-gold/10 hover:bg-gold/20',
    queSeEvalua: 'Dualidad terapeuta-nino, manejo del publico, naturalidad al repetir.',
  },
  {
    nombre: 'Capitan Nereo',
    slug: 'capitan-nereo',
    tipo: 'Secundario',
    edad: 'Abierta',
    icon: '\u2693',
    color: 'border-blue-planet bg-blue-planet/10 hover:bg-blue-planet/20',
    queSeEvalua: 'Energia comica, improvisacion con el publico, quiebre emocional breve.',
  },
  {
    nombre: 'Dylan (El Vanidoso)',
    slug: 'dylan',
    tipo: 'Secundario',
    edad: 'Abierta',
    icon: '\u{1F451}',
    color: 'border-rose bg-rose/10 hover:bg-rose/20',
    queSeEvalua: 'Carisma manipulador, cambios rapidos de actitud, exageracion comica.',
  },
  {
    nombre: 'Agente Catalina',
    slug: 'agente-catalina',
    tipo: 'Secundario',
    edad: 'Abierta',
    icon: '\u{1F30D}',
    color: 'border-teal-planet bg-teal-planet/10 hover:bg-teal-planet/20',
    queSeEvalua: 'Timing comico, transicion de frialdad a curiosidad, desmayos dramaticos.',
  },
  {
    nombre: 'Baobabs / Constructores',
    slug: 'baobabs',
    tipo: 'Antagonistas / Comicos',
    edad: 'Abierta',
    icon: '\u{1F333}',
    color: 'border-orange-planet bg-orange-planet/10 hover:bg-orange-planet/20',
    queSeEvalua: 'Comedia fisica, talento individual (canto/rap/dibujo), transicion antagonista a aliado.',
  },
];

const TIPS_GENERALES = [
  {
    titulo: 'Conoce la obra',
    texto: 'Es una comedia absurda basada en El Principito. Los personajes viajan a planetas fantasticos y lo aceptan como real, similar a Alicia en el Pais de las Maravillas. No intentes hacerlo logico, acepta lo absurdo.',
  },
  {
    titulo: 'El publico es parte de la obra',
    texto: 'Esto es teatro inmersivo. El publico participa en juegos, responde preguntas y se mueve entre escenas. Si puedes conectar con la gente y hacerla sentir incluida, tienes una gran ventaja.',
  },
  {
    titulo: 'Parodia, no imitacion',
    texto: 'Cada personaje es una parodia (politico, influencer, agente de viajes Disney, etc.). Lo que buscamos es que captures la esencia del estereotipo y le des tu toque personal, no que imites a alguien especifico.',
  },
  {
    titulo: 'Muestra tu rango',
    texto: 'Todos los personajes tienen momentos comicos Y momentos emotivos. No te quedes solo en la comedia. Muestra que puedes hacer reir y tambien conmover en la misma escena.',
  },
  {
    titulo: 'Improvisa con confianza',
    texto: 'Habra interaccion con el publico y momentos donde deberas reaccionar en el momento. No busques la respuesta perfecta, busca la respuesta autentica de tu personaje.',
  },
  {
    titulo: 'Llega preparado',
    texto: 'Haz click en tu personaje abajo para ver tus dialogos del libreto, con quien interactuas y que se espera de ti. Llegar conociendo tu material te da confianza y nos muestra tu compromiso.',
  },
];

export function AyudaAudicionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">&#127917;</div>
          <h1 className="text-3xl font-bold text-night">Ayuda para Audiciones</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
            Todo lo que necesitas para prepararte y tener exito en tu audicion para ShowTime.
          </p>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
        </div>

        {/* Tips generales */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-night">Que necesitas saber antes de audicionar</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {TIPS_GENERALES.map((tip) => (
              <div
                key={tip.titulo}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <h3 className="mb-1 text-sm font-bold text-night">{tip.titulo}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{tip.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selecciona tu personaje */}
        <section>
          <h2 className="mb-2 text-xl font-bold text-night">Elige tu personaje</h2>
          <p className="mb-4 text-sm text-gray-500">
            Haz click para ver tus dialogos, instrucciones y tips especificos.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PERSONAJES.map((p) => (
              <Link
                to={`/audicion/${p.slug}`}
                key={p.slug}
                className={`group rounded-xl border-l-4 bg-white p-5 shadow-sm transition-all hover:shadow-md ${p.color}`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h3 className="font-bold text-night">{p.nombre}</h3>
                    <span className="text-xs text-gray-500">{p.tipo} &middot; {p.edad}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-700">Se evalua:</strong> {p.queSeEvalua}
                </p>
                <p className="mt-2 text-xs font-semibold text-gold-dark opacity-0 transition-opacity group-hover:opacity-100">
                  Ver material completo &rarr;
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-10 border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-400">
            ShowTime &mdash; Basado en El Principito
          </p>
        </div>
      </div>
    </div>
  );
}
