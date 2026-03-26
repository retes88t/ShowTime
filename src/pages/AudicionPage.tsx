import { Link } from 'react-router-dom';

const PERSONAJES = [
  {
    nombre: 'Teodoro',
    slug: 'teodoro',
    edad: '17-21 anos',
    tipo: 'Protagonista',
    descripcion:
      'Patinador artistico. Joven alegre y (ex) apasionado. Tras ganar una medalla de oro, ha dejado de disfrutar el patinaje. Asiste a terapia avergonzado buscando reconectar con su pasion.',
    escenas: 'Todas las escenas',
    color: 'bg-sky/20 border-sky text-sky-dark',
    icon: '\u26F8',
  },
  {
    nombre: 'Dr. Saint Exupery / Principito',
    slug: 'dr-principe',
    edad: '30-40 anos',
    tipo: 'Co-protagonista',
    descripcion:
      'Terapeuta experimentado con alma de nino. Guia a Teodoro a traves de una terapia poco convencional que lo lleva a viajar por distintos planetas.',
    escenas: 'Todas las escenas',
    color: 'bg-gold/20 border-gold text-gold-dark',
    icon: '\u2728',
  },
  {
    nombre: 'Capitan Nereo (Rey/Pirata)',
    slug: 'capitan-nereo',
    edad: 'Abierta',
    tipo: 'Secundario',
    descripcion:
      'Pirata ridiculo, carismatico y obsesivo con el control. Habita solitario un planeta lleno de islas y mares. Desea comandar una tripulacion para buscar un gran tesoro. Parodia de politico.',
    escenas: 'Escena 2 - Planeta del Pirata',
    color: 'bg-blue-planet/20 border-blue-planet text-blue-900',
    icon: '\u2693',
  },
  {
    nombre: 'Dylan (El Vanidoso)',
    slug: 'dylan',
    edad: 'Abierta',
    tipo: 'Secundario',
    descripcion:
      'Excentrico, diva y convenenciero. Fan de si mismo, busca ser eternamente admirado. Tiene una filosofia muy contagiosa. Parodia de influencer.',
    escenas: 'Escena 3 - Planeta del Vanidoso',
    color: 'bg-rose/20 border-rose text-rose',
    icon: '\u{1F451}',
  },
  {
    nombre: 'Agente Catalina (La Geografa)',
    slug: 'agente-catalina',
    edad: 'Abierta',
    tipo: 'Secundario',
    descripcion:
      'Comprometida, superficial, exagerada, dramatica. La mayor conocedora del mundo exterior sin salir de su escritorio. Tiene un punto debil por el Dr. Principe. Parodia de agente de viajes Disney.',
    escenas: 'Escena 4 - Planeta del Geografo',
    color: 'bg-teal-planet/20 border-teal-planet text-teal-900',
    icon: '\u{1F30D}',
  },
  {
    nombre: 'Baobabs / Constructores (x3)',
    slug: 'baobabs',
    edad: 'Abierta',
    tipo: 'Antagonistas / Comicos',
    descripcion:
      'Tres sujetos comicos y frustrados. Como Baobabs, su pasatiempo favorito es hacerle la vida imposible al Dr. y su terapia e intentan robar la rosa. Como Constructores, estan atrapados en su propia mentira logica realizando una obra sin sentido. Cada uno tiene un talento unico. Parodia de la Linea 6 del metro MTY.',
    escenas: 'Escenas 2, 3 y 5',
    color: 'bg-orange-planet/20 border-orange-planet text-orange-900',
    icon: '\u{1F333}',
  },
];

const ESCENAS_RESUMEN = [
  {
    num: 1,
    nombre: 'Consultorio / Tierra',
    lugar: 'Salon Chico',
    descripcion:
      'Teodoro llega al consultorio. Escena seria que transiciona a lo fantasioso. Ejercicios de dibujo.',
    juego: 'Interpretacion de dibujos',
  },
  {
    num: 2,
    nombre: 'Planeta del Pirata',
    lugar: 'Salon Verde',
    descripcion:
      'El Capitan Nereo quiere navegar y se frustra al ordenar a su tripulacion. Trabajo en equipo y amistad.',
    juego: 'Simon dice',
  },
  {
    num: 3,
    nombre: 'Planeta del Vanidoso',
    lugar: 'Salon Negro (derecha)',
    descripcion:
      'Dylan busca admiracion constante. Aparecen los Baobabs y se llevan la rosa del Principito.',
    juego: 'Descubre el mensaje a traves de la lupa',
  },
  {
    num: 4,
    nombre: 'Planeta del Geografo',
    lugar: 'Salon Negro (izquierda)',
    descripcion:
      'Agente Catalina cotiza los mejores viajes pero jamas ha salido de su escritorio. Falta de improvisacion.',
    juego: 'Proyeccion de cartas',
  },
  {
    num: 5,
    nombre: 'Planeta de los Constructores',
    lugar: 'Salon Verde',
    descripcion:
      'Los Baobabs crean identidad de Constructores. Movimientos mecanicos y repetitivos. Teodoro los despierta.',
    juego: 'Baile',
  },
  {
    num: 6,
    nombre: 'Planeta del Principito',
    lugar: 'Salon Negro',
    descripcion:
      'Teodoro reconecta con su nino interior. Despedida emotiva. Fondo azul lleno de estrellas.',
    juego: '',
  },
];

export function AudicionPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Volver
          </Link>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-gold-dark hover:bg-gold/20"
          >
            <span>&#128196;</span>
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 print:max-w-none print:px-8 print:py-0">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 print:border-none print:shadow-none">
          {/* Title */}
          <div className="mb-8 text-center print:mb-6">
            <div className="mb-2 text-4xl print:text-3xl">&#9733;</div>
            <h1 className="text-3xl font-bold text-night print:text-2xl">
              Material para Audiciones
            </h1>
            <p className="mt-1 text-sm text-gray-500">ShowTime &mdash; Basado en El Principito</p>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          </div>

          {/* Sinopsis */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Sinopsis
            </h2>
            <div className="rounded-lg border border-gold/20 bg-gold/5 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                Teodoro es un joven patinador que, tras ganar una medalla de oro en una de las
                competencias mas importantes de su vida, ha dejado de disfrutar este arte como antes
                le apasionaba. Con ayuda de la terapia poco convencional del Dr. Saint-Exupery,
                realizara un viaje extraordinario que lo hara descubrir lo que tanto le faltaba.
              </p>
            </div>
          </section>

          {/* Estilo */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Estilo de la Obra
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Genero
                </p>
                <p className="mt-1 font-medium text-night">Comedia Absurda</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Recursos
                </p>
                <p className="mt-1 font-medium text-night">
                  Fantasia, Parodia, Arteterapia, Teatro Inmersivo
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Dentro de la comedia absurda, los personajes creen que estan viajando a distintos
              planetas. Aceptan esa realidad, similar al cuento de Alicia en el Pais de las
              Maravillas. Todos los personajes tienen fisicamente un aspecto humano y normal acorde a
              su parodia, pero interactuan con su contexto de fantasia de manera absurda.
            </p>
          </section>

          {/* Ayuda para Audiciones */}
          <section className="mb-8 print:mb-6">
            <div className="rounded-xl border-2 border-gold bg-gradient-to-r from-gold/10 to-gold/5 p-5">
              <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                <span className="text-3xl">&#127917;</span>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-night">Ayuda para Audiciones</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Haz click en cualquier personaje para ver su material completo: dialogos del
                    libreto, instrucciones de que hacer en la audicion, con quienes interactuas y
                    tips para ser seleccionado.
                  </p>
                </div>
                <span className="hidden text-2xl text-gold sm:block">&darr;</span>
              </div>
            </div>
          </section>

          {/* Personajes */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Personajes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
              {PERSONAJES.map((p) => (
                <Link
                  to={`/audicion/${p.slug}`}
                  key={p.nombre}
                  className={`group rounded-xl border-l-4 p-4 transition-shadow hover:shadow-md ${p.color} print:break-inside-avoid`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xl">{p.icon}</span>
                    <h3 className="font-bold text-night">{p.nombre}</h3>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="inline-block rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium">
                      {p.tipo}
                    </span>
                    <span className="inline-block rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium">
                      {p.edad}
                    </span>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-gray-700">{p.descripcion}</p>
                  <p className="text-xs text-gray-500">
                    <strong>Aparece en:</strong> {p.escenas}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-gold-dark opacity-0 transition-opacity group-hover:opacity-100">
                    Ver material de audicion &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Page break for print */}
          <div className="hidden print:block" style={{ pageBreakBefore: 'always' }} />

          {/* Escenas */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Estructura de Escenas
            </h2>
            <div className="space-y-3">
              {ESCENAS_RESUMEN.map((e) => (
                <div
                  key={e.num}
                  className="rounded-lg border border-gray-200 p-4 print:break-inside-avoid"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-bold text-night">
                      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-night">
                        {e.num}
                      </span>
                      {e.nombre}
                    </h3>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {e.lugar}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{e.descripcion}</p>
                  {e.juego && (
                    <p className="mt-2 text-xs text-gray-500">
                      <strong>Juego:</strong> {e.juego}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Arco del personaje */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Arco de Teodoro
            </h2>
            <div className="space-y-3">
              <div className="rounded-lg border border-sky/30 bg-sky/5 p-4 print:break-inside-avoid">
                <h4 className="mb-1 text-sm font-bold text-night">Punto de partida</h4>
                <p className="text-sm text-gray-700">
                  Se paro en el podio, la gente aplaudio y jamas se sintio tan vacio y solo. Habia
                  estado tan preocupado por que saliera a la perfeccion que no lo habia vivido
                  realmente. Desde ese dia no ha parado de sentir el vacio.
                </p>
              </div>
              <div className="rounded-lg border border-gold/30 bg-gold/5 p-4 print:break-inside-avoid">
                <h4 className="mb-1 text-sm font-bold text-night">Reflejos en los planetas</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>En el Vanidoso:</strong> ve su constante preocupacion de que su peinado,
                    maquillaje y vestuario esten en orden.
                  </li>
                  <li>
                    <strong>En el Rey/Pirata:</strong> ve su obsesion por controlar cada movimiento
                    de su rutina.
                  </li>
                  <li>
                    <strong>En la Geografa:</strong> ve su falta de animo o entusiasmo para ir mas
                    alla de lo establecido.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-planet/30 bg-green-planet/5 p-4 print:break-inside-avoid">
                <h4 className="mb-1 text-sm font-bold text-night">Punto de giro</h4>
                <p className="text-sm text-gray-700">
                  En los dos primeros planetas los Baobabs tratan de sabotear el rendimiento y robar
                  la rosa del Principito. En los dos primeros fallan y en el tercero lo logran.
                  Teodoro, con su evolucion, debe recuperar la rosa.
                </p>
              </div>
              <div className="rounded-lg border border-purple-planet/30 bg-purple-planet/5 p-4 print:break-inside-avoid">
                <h4 className="mb-1 text-sm font-bold text-night">Resolucion</h4>
                <p className="text-sm text-gray-700">
                  Llega al planeta del Principito representando que ya conecto con su nino interior.
                  Despedida emotiva. &laquo;No te vayas a olvidar de tus heelys.&raquo;
                </p>
              </div>
            </div>
          </section>

          {/* Juegos de arteterapia */}
          <section className="mb-4 print:mb-2">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Juegos de Arteterapia
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 print:break-inside-avoid">
                <h4 className="mb-1 text-sm font-bold text-night">
                  Interpretacion de dibujos
                </h4>
                <p className="text-sm text-gray-600">
                  El publico tendra que pensar mas alla de lo logico, usar imaginacion. Como en el
                  cuento original del Principito.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 print:break-inside-avoid">
                <h4 className="mb-1 text-sm font-bold text-night">Simon dice</h4>
                <p className="text-sm text-gray-600">
                  Juego para desinhibir el miedo al ridiculo, despertar el cuerpo y la interaccion
                  con el grupo.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Se busca al menos un juego interactivo por escena. El publico es un personaje activo de
              la historia.
            </p>
          </section>

          {/* Footer note */}
          <div className="mt-8 border-t border-gray-200 pt-4 text-center print:mt-6">
            <p className="text-xs text-gray-400">
              ShowTime &mdash; Material confidencial para audiciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
