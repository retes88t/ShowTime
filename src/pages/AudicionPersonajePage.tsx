import { useParams, Link } from 'react-router-dom';

const PERSONAJES_DETALLE: Record<
  string,
  {
    nombre: string;
    icon: string;
    edad: string;
    tipo: string;
    color: string;
    colorBg: string;
    descripcion: string;
    contexto: string;
    escenas: string;
    interactuaCon: string[];
    instrucciones: string;
    tips: string[];
    dialogos: { escena: string; lineas: { personaje: string; texto: string }[] }[];
  }
> = {
  teodoro: {
    nombre: 'Teodoro (o Lucia)',
    icon: '\u26F8',
    edad: '17-21 anos',
    tipo: 'Protagonista',
    color: 'text-sky-dark',
    colorBg: 'bg-sky/10 border-sky',
    descripcion:
      'Patinador artistico de hielo. Es cordial, perfeccionista y ex-apasionado. Se siente frustrado por la ejecucion de su rutina para la competencia proxima y la presion le ha provocado apatia por su profesion. Durante su travesia, va desarrollando su curiosidad y soltando sus propias exigencias.',
    contexto:
      'Teodoro es el corazon de la historia. Su arco va desde ser un joven obsesionado con la perfeccion y el control, hasta reconectar con la alegria y espontaneidad de patinar. A traves de los planetas, ve reflejados sus propios defectos en los personajes que encuentra: la obsesion por el control (Capitan Nereo), la vanidad y preocupacion por la imagen (Dylan), y la falta de improvisacion (Agente Catalina). En la escena de los constructores, explota emocionalmente y finalmente entiende que lo que necesita es volver a divertirse.',
    escenas: 'Todas las escenas (1-6)',
    interactuaCon: [
      'Dr. Principe (en todas las escenas)',
      'Capitan Nereo (Escena 2)',
      'Dylan / El Vanidoso (Escena 3)',
      'Agente Catalina (Escena 4)',
      'Baobabs / Constructores (Escenas 2, 3, 5)',
    ],
    instrucciones:
      'Este personaje requiere un rango emocional amplio: desde la ansiedad y frustracion inicial, pasando por la curiosidad y el asombro, hasta la explosion emocional en la Escena 5 y la reconciliacion final. Debes mostrar que puedes transitar entre la seriedad competitiva del "joven estrella" y la vulnerabilidad de un joven que ha perdido su pasion. En la audicion, prepara especialmente el monologo de la Escena 1 (la confesion al Dr. Principe) y la explosion emocional de la Escena 5.',
    tips: [
      'Muestra un arco emocional claro: comienza rigido, controlado y ansioso, y ve soltandote conforme avanza la escena.',
      'El humor de Teodoro es sutil y reactivo, no busca hacer reir, le sale naturalmente al frustrarse con situaciones absurdas.',
      'La explosion en la Escena 5 es el momento clave: debes pasar de la frustracion a la honestidad mas cruda. Practica ese quiebre emocional.',
      'No olvides la fisicalidad: Teodoro es un atleta, su cuerpo refleja tension y rigidez al inicio, soltura al final.',
      'La relacion con el Dr. Principe evoluciona de desconfianza a complicidad. Muestra esa progresion.',
    ],
    dialogos: [
      {
        escena: 'Escena 1 - El Consultorio',
        lineas: [
          { personaje: 'DR. PRINCIPE', texto: '(Repite genuinamente.) Que te trae el dia de hoy a este lugar?' },
          { personaje: 'TEODORO', texto: 'Mis padres me han hecho venir. Creen que usted puede ayudarme. La cantidad de personas que lo han recomendado es—' },
          { personaje: 'DR. PRINCIPE', texto: '(Repite genuinamente.) Que te trae el dia de hoy a este lugar?' },
          { personaje: 'TEODORO', texto: '(Se desespera y dice en voz baja.) Deberia irme. (Se arrepiente y trata de calmarse realizando una tecnica de respiracion. Murmura para si mismo.) Acuerdate de lo que te dijo la entrenadora. (Se dirige al Dr.) Lo siento, pero no puedo perder tiempo, deberia estar ensayando, ya estan por pasar cinco minutos y no hemos—' },
          { personaje: 'DR. PRINCIPE', texto: '(Muestra empatia.) Escucha con atencion. Que te trae el dia de hoy a este lugar?' },
          {
            personaje: 'TEODORO',
            texto:
              'Supongo que... (Se da cuenta de su estado ansioso y detiene el movimiento de sus piernas, pero su expresion se tensa mas de lo usual.) Supongo que estoy aqui porque ultimamente no me puedo concentrar en mis ensayos, no puedo controlar mis movimientos en la pista de hielo, no puedo dar lo mejor de mi en mi gran rutina. Y estoy comenzando a dudar... (Evita contacto visual.) Quizas no soy tan bueno como todos lo creen. Quizas no soy tan bueno como mis padres lo creen. Como es posible que el "joven estrella" no recuerde los tiempos de su gran rutina? Como es posible que el "joven estrella" no recuerde en que segundo de la cancion debe hacer sus giros, saltos, piruetas o espirales? Y para acabarla ya ni siquiera lo disfruto como antes.',
          },
        ],
      },
      {
        escena: 'Escena 5 - Planeta de los Constructores (MONOLOGO CLAVE)',
        lineas: [
          { personaje: 'DR. PRINCIPE', texto: 'Que planeta tan interesante. (Observando a su alrededor con curiosidad.) Este camino a casa no me lo sabia, ese lapiz si que es magico! Como encontraremos esa llave Teodoro?' },
          { personaje: 'TEODORO', texto: '(Pensativo, pero con mas seguridad) Sera dificil encontrar esa llave entre todo este monton de arena solos. Tal vez podamos trabajar en equipo, o mirar mas alla con nuestras lupas o... improvisar! (Con entusiasmo) Mira, hay unas personas por alla, les podemos preguntar.' },
        ],
      },
    ],
  },
  'dr-principe': {
    nombre: 'Dr. Principe',
    icon: '\u2728',
    edad: '30-40 anos',
    tipo: 'Co-protagonista',
    color: 'text-gold-dark',
    colorBg: 'bg-gold/10 border-gold',
    descripcion:
      'Terapeuta experimentado con alma de nino. Sin malicia. Curioso y entusiasta por la vida. Tiene multiples talentos. Al escuchar del problema de Teodoro decide ayudarlo, lo analiza y por medio de un viaje fantastico lo confronta con sus malas actitudes, sus miedos y lo guia para encontrar de nuevo su pasion.',
    contexto:
      'El Dr. Principe es el narrador-guia de la historia. Es un terapeuta que usa metodos poco convencionales: en lugar de sesiones tradicionales, lleva a Teodoro a un viaje fantastico. Tiene una dualidad: es un profesional serio pero con el espiritu jugueton de un nino. Rompe la cuarta pared constantemente, hablandole al publico como "lectores". Es paciente, enigmatico y siempre responde con preguntas. Su frase clave es "Lo esencial es invisible a los ojos."',
    escenas: 'Todas las escenas (1-6)',
    interactuaCon: [
      'Teodoro (en todas las escenas)',
      'Capitan Nereo (Escena 2)',
      'Dylan / El Vanidoso (Escena 3)',
      'Agente Catalina (Escena 4)',
      'Constructores (Escena 5)',
      'Publico (rompe la cuarta pared)',
    ],
    instrucciones:
      'Este personaje es el mas complejo de interpretar. Debes balancear la sabiduria de un terapeuta con la ingenuidad y asombro de un nino. Tiene un sentido del humor sutil y una capacidad unica de repetir preguntas sin que suene agresivo, sino genuino. En la audicion, prepara la escena del consultorio (Escena 1) donde repite "Que te trae el dia de hoy a este lugar?" multiples veces, y la escena con la Agente Catalina (Escena 4) donde narra como cuentacuentos.',
    tips: [
      'La repeticion es tu herramienta principal en la Escena 1. Cada vez que repites la pregunta debe sonar genuina, no mecanica ni impaciente.',
      'Cuando rompes la cuarta pared, hazlo con entusiasmo infantil, como un nino contando su cuento favorito.',
      'Tu relacion con Teodoro es de guia-companero, nunca de autoridad. No le dices que hacer, le preguntas hasta que el mismo descubre.',
      'La fisicalidad es clave: eres un adulto que se acuesta en el piso a pintar, que manchas de pintura a la gente, que se emociona como nino.',
      'Muestra que debajo del personaje excentrico hay un profesional que sabe exactamente lo que hace.',
      'Practica las transiciones entre narrador (hablando al publico) y personaje (interactuando con Teodoro).',
    ],
    dialogos: [
      {
        escena: 'Escena 1 - El Consultorio',
        lineas: [
          { personaje: 'DR. PRINCIPE', texto: 'Tu no te has sincerado conmigo, el "joven estrella" lo hizo.' },
          { personaje: 'TEODORO', texto: '(Se levanta de su asiento.) Yo soy el "joven estrella"!' },
          { personaje: 'DR. PRINCIPE', texto: 'Y no lo dudo! (Se levanta de su asiento.) Pero eres mas que el "joven estrella". (Se vuelve a dirigir a la pintura.) Ahora, dime que ves en esta pintura?' },
          { personaje: 'TEODORO', texto: '(Se dirige a la pintura impacientemente y solo la observa por un par de segundos.) Nada mas que una caja de carton.' },
          { personaje: 'DR. PRINCIPE', texto: '(Sonrie ante acertar con su diagnostico.) Y te preguntas por que no puedes ver mi flor? Has dejado de ver lo invisible! Esa es la razon por la que has venido hoy a este lugar.' },
        ],
      },
      {
        escena: 'Escena 4 - Planeta del Geografo (Narrador)',
        lineas: [
          { personaje: 'DR. PRINCIPE', texto: '(Embroma traviesamente.) Como puedes estar tan cansado si eres un deportista profesional?' },
          { personaje: 'TEODORO', texto: 'No suelo viajar a 300,000 kilometros por segundo. No como otros.' },
          { personaje: 'DR. PRINCIPE', texto: '(Se rie.) 300,000 kilometros por segundo, tu y tus cifras. (Dice entusiasmado.) Viajamos a traves de la luz, su resplandor nos impulsa, nos hace volar, es algo grandioso.' },
          { personaje: 'TEODORO', texto: 'Eres como un cuentacuentos. Tengo que encontrar una llave antes de llegar a la caja.' },
          { personaje: 'DR. PRINCIPE', texto: '(Se rie.) Por supuesto que tienes que encontrar una llave.' },
          { personaje: 'TEODORO', texto: 'Ya lo sabias?' },
          { personaje: 'DR. PRINCIPE', texto: '(Toma su papel como cuentacuentos y rompe la cuarta pared.) Estimados lectores, parece que nuestro heroe (heroina) no ha estado prestando atencion, pues nunca ha oido del tesoro en el que esta la caja tan valiosa por la que hemos viajado a tantos planetas. (Se vuelve a dirigir al patinador.) Que tal?' },
        ],
      },
    ],
  },
  'capitan-nereo': {
    nombre: 'El Capitan Nereo',
    icon: '\u2693',
    edad: 'Abierta',
    tipo: 'Secundario',
    color: 'text-blue-900',
    colorBg: 'bg-blue-planet/10 border-blue-planet',
    descripcion:
      'Pirata ridiculo, carismatico y obsesivo con el control que habita solitario un planeta lleno de islas y mares. Tiene una relacion estrecha con su fiel acompanante Neron, un gracioso perico parlanchin. Desea comandar una tripulacion para buscar con su mapa un gran tesoro. Representa el deseo de control.',
    contexto:
      'El Capitan Nereo vive solo en su planeta con su cotorro Neron (un peluche o marioneta). Es un pirata que quiere controlar todo pero no tiene a nadie a quien mandar. Refleja la obsesion de Teodoro por controlar cada movimiento de su rutina. A traves del juego de "Simon dice" con el publico, descubre que no puede dirigir dando ordenes imposibles, sino confiando en su tripulacion. Le regala a Teodoro un mapa que sera clave para el resto de la historia.',
    escenas: 'Escena 2 - Planeta del Pirata',
    interactuaCon: [
      'Teodoro (dialogo principal)',
      'Dr. Principe (breve interaccion)',
      'Neron el cotorro (su companero)',
      'Baobabs (los ahuyenta)',
      'Publico (juego de Simon dice)',
    ],
    instrucciones:
      'Este es un personaje comico de alta energia. Habla en jerga pirata, interrumpe sus propios dialogos para hablar con Neron (su cotorro), y tiene cambios emocionales rapidos: pasa de gritar ordenes a llorar de frustracion. Prepara especialmente el monologo donde explica las reglas de "Simon dice" al publico y el momento donde se frustra porque nadie sigue sus ordenes. Debes ser capaz de improvisar con el publico durante el juego.',
    tips: [
      'La comedia de este personaje viene de la exageracion y el contraste: se cree el pirata mas temido pero es ridiculo e inofensivo.',
      'La relacion con Neron es clave. Hablas con un peluche/marioneta como si fuera real y traduces su "Arrrgh" como si fuera un idioma.',
      'El juego de Simon dice requiere control del publico e improvisacion. Practica dar ordenes absurdas con conviccion.',
      'Tu momento dramatico es cuando lloras porque nadie sigue tus ordenes. Ese quiebre debe ser breve pero genuino.',
      'Habla con jerga pirata autentica: "Marineros!", "Barbajanes!", "Repampanos!", pero hazla tuya.',
      'Recuerda que eres una parodia de politico: das ordenes, quieres control absoluto, pero no sabes delegar.',
    ],
    dialogos: [
      {
        escena: 'Escena 2 - Planeta del Pirata',
        lineas: [
          { personaje: 'TEODORO', texto: 'Hey, senor, senor! Despierte, ronca horrible, y tiene unas cosas extranas alrededor que le estan robando su tesoro.' },
          { personaje: 'CAPITAN NEREO', texto: 'Mi Tesoro! Largo, barbajanes!... Pero que veo! Marineros! Giugh De agua dulce, asco!' },
          { personaje: 'TEODORO', texto: 'Perdon? Usted no se ve muy saludable.' },
          { personaje: 'CAPITAN NEREO', texto: 'Yo soy el Capitan Nereo, Senor de esta isla, de este planeta y gobierno y controlo todo lo que aqui se encuentra, se mueve o anda.' },
          { personaje: 'PERICO NERON', texto: '*Arrrgh' },
          { personaje: 'CAPITAN NEREO', texto: 'Que dices?' },
          { personaje: 'PERICO NERON', texto: '*Arrrgh *Arrrgh.' },
          { personaje: 'CAPITAN NEREO', texto: 'Ah, si, y el es Neron, el cotorro. Neron por que le haces como cuervo? Perdonenlo, esta ronco. Cof, cof. (Tose la marioneta.)' },
          { personaje: 'CAPITAN NEREO', texto: 'Papapapapapapa, aqui nadie se mueve ni hace nada si no lo ordeno yo. (Hacia Teodoro y el Dr.) Les ordeno a ustedes dos que se identifiquen, marineros.' },
        ],
      },
    ],
  },
  dylan: {
    nombre: 'Dylan (o Kimberly), El Vanidoso',
    icon: '\u{1F451}',
    edad: '23-25 anos',
    tipo: 'Secundario',
    color: 'text-rose',
    colorBg: 'bg-rose/10 border-rose',
    descripcion:
      'Excentrico, diva y convenenciero. Fan de si mismo, busca ser eternamente admirado. Parodia de influencer. Representa el deseo de admiracion. Quiere ser el centro de atencion y recibir constantemente validacion y reconocimiento. Cuando pierde el foco, busca desesperadamente tenerlo de vuelta.',
    contexto:
      'Dylan vive en un jardin hermoso lleno de flores y espejos que lo observan constantemente. Es un influencer obsesionado con su imagen y sus seguidores. Refleja la preocupacion de Teodoro por su apariencia e imagen publica como "joven estrella". Junto con los Baobabs, intenta manipular a Teodoro para que se una a su mundo superficial, alejandolo de la terapia del Dr. Principe. Es el primer personaje que logra tentar a Teodoro.',
    escenas: 'Escena 3 - Planeta del Vanidoso',
    interactuaCon: [
      'Teodoro (intenta reclutarlo)',
      'Dr. Principe (lo confronta)',
      'Baobabs 1 y 2 (sus aliados)',
      'Publico (busca su admiracion)',
    ],
    instrucciones:
      'Dylan es un personaje comico y manipulador. Debes mostrar sus cambios rapidos de actitud: del desprecio total a la adulacion interesada, del drama de telenovela a la motivacion falsa. En la audicion, prepara el monologo donde convence a Teodoro de unirse a el ("La gente como nosotros esta hecha para brillar") y el momento del berrinche cuando pierde la atencion del publico. Necesitas carisma para que el publico entienda por que Teodoro cae en su trampa.',
    tips: [
      'Este personaje vive en un estado de performance constante: todo lo que hace es para ser visto y admirado.',
      'Los cambios de actitud deben ser rapidos y dramaticos: del asco al interes en una fraccion de segundo cuando descubre que Teodoro es famoso.',
      'El monologo motivacional falso es tu momento estrella. Debe sonar tan convincente que hasta tu te lo creas.',
      'La fisicalidad es importante: poses de selfie, mirarte en espejos, arreglarte el pelo constantemente.',
      'El drama de telenovela cuando confronta al Dr. Principe debe ser exagerado al maximo: lagrimas de cocodrilo, suspiros dramaticos.',
      'Piensa en influencers reales para inspirar los manierismos, pero hazlo una parodia, no una imitacion.',
    ],
    dialogos: [
      {
        escena: 'Escena 3 - Planeta del Vanidoso',
        lineas: [
          { personaje: 'VANIDOSO', texto: '(Se despierta de golpe tratando de mantener el estilo) Vaya ahora si que mis seguidores estan ansiosos por saber de mi, empezaron desde temprano. (Arreglandose un poco mientras se ve al celular) No hay que hacerlos esperar, pobrecitos deben de estar ansiosos por verme. Y no los culpo, quien no querria verme todo el tiempo, soy maravilloso. (Procede a tomarse fotos y subir una para sus redes sociales) Listo, ya pueden estar mas agusto mis seguidores. (Mientras se sigue viendo en su celular)' },
          { personaje: 'TEODORO', texto: 'Buenas tardes! Disculpe, me preguntaba si me podria prestar su celular, es urgente.' },
          { personaje: 'VANIDOSO', texto: '(Asustado al enterarse que no estaba solo) Aaaaaaahh! Quienes son ustedes?! Que hacen aqui?! (Toma una foto de todos y con un tono de asco, desprecio y desilucion) Aaagghh (como un eeeewwww), todos son super basics ninguno me sirve (cambiando drasticamente su actitud) Acaso ustedes son admiradores mios?' },
          { personaje: 'TEODORO', texto: 'No, me preguntaba si me podria prestar su celular, es que... (lo interrumpe el vanidoso).' },
          { personaje: 'VANIDOSO', texto: '(Con un disgusto total) No! Como por que te prestaria mi celular quien te crees que eres, no eres digno de tocar mi celular!' },
        ],
      },
    ],
  },
  'agente-catalina': {
    nombre: 'Agente Catalina',
    icon: '\u{1F30D}',
    edad: '30-40 anos',
    tipo: 'Secundario',
    color: 'text-teal-900',
    colorBg: 'bg-teal-planet/10 border-teal-planet',
    descripcion:
      'Comprometida con su trabajo de agente de viajes. Es superficial, exagerada, dramatica y a veces un poco grosera. Tiene un punto debil por el Dr. Principe pues son amigos desde hace anos. Es de mente cerrada; logra cotizar los mejores viajes pero jamas ha salido de su escritorio. Tiene cambios de humor constantes.',
    contexto:
      'Agente Catalina es la agente de viajes interestelar mas reconocida, pero jamas ha salido de su escritorio. Esta rodeada de recuerdos de viajes de otros pero ella nunca ha viajado. Refleja la falta de improvisacion de Teodoro: ambos siguen procedimientos establecidos sin cuestionarlos. Su transformacion viene cuando abre las cartas de sus clientes y descubre que las experiencias emocionales son mas valiosas que los datos. Tiene debilidad por el Dr. Principe, a quien llama "Doctorcito".',
    escenas: 'Escena 4 - Planeta del Geografo',
    interactuaCon: [
      'Teodoro (lo menosprecia al inicio)',
      'Dr. Principe ("Doctorcito", lo aprecia)',
      'Publico (los ignora o menosprecia)',
      'Hada y Sirena (proyecciones de cartas)',
    ],
    instrucciones:
      'Catalina es un personaje de contrastes: es la maxima conocedora de viajes pero nunca ha viajado. Es eficiente y ocupada pero pierde el tiempo en datos inutiles. Es fria con todos excepto con el Dr. Principe. En la audicion, prepara la interaccion donde menosprecia a Teodoro, tus reacciones dramaticas a la carta de la sirena (los desmayos) y el momento donde comienzas a abrir las cartas por curiosidad. Debes poder pasar del desinteres total a la emocion genuina.',
    tips: [
      'El humor de Catalina viene de su actitud condescendiente y su incapacidad de ver su propia ironia (conoce todo pero no ha viajado).',
      'Los desmayos durante la carta de la sirena deben ser comicos y exagerados, parodiando telenovelas.',
      'Tu relacion con el "Doctorcito" muestra tu lado suave. Cada vez que le hablas a el, tu tono cambia completamente.',
      'La transicion de "No abro las cartas" a "Creo que seguire desdoblando las cartas" es tu arco. Hazlo sutil pero visible.',
      'Habla rapido y con autoridad cuando das datos, pero callate abruptamente cuando alguien te cuestiona.',
      'La fisicalidad es estar siempre sentada trabajando, sin levantar la mirada, hasta que algo te obliga a hacerlo.',
    ],
    dialogos: [
      {
        escena: 'Escena 4 - Planeta del Geografo',
        lineas: [
          { personaje: 'DR. PRINCIPE', texto: 'Buenos dias!' },
          { personaje: 'AGENTE CATALINA', texto: '(Dice desde su escritorio y mientras esta trabajando.) Doctorcito, eres tu! Me levantaria y te abrazaria pero tengo muchas cosas que hacer.' },
          { personaje: 'DR. PRINCIPE', texto: '(Se dirige al patinador y dice en voz baja.) Ya ves? Eres igual de extrano que ella.' },
          { personaje: 'TEODORO', texto: '(Se rie ligeramente, mientras lo reflexiona rapidamente.) Supongo que tienes algo de razon.' },
          { personaje: 'AGENTE CATALINA', texto: 'A quien trajiste contigo? Es alguien interesante? Lo voltearia a ver, pero tengo tantos documentos que llenar.' },
          { personaje: 'DR. PRINCIPE', texto: 'Se trata de mi amigo Teodoro/Lucy.' },
          { personaje: 'AGENTE CATALINA', texto: 'Entonces, no es interesante.' },
          { personaje: 'TEODORO', texto: 'Yo soy el "joven estrella".' },
          { personaje: 'AGENTE CATALINA', texto: '(Exclama, mientras levanta su mirada de los libros y suelta el lapiz con el que escribia.) El "joven estrella"! No puedo creerlo! Alguien famoso de la Tierra! Has ido a Japon? Por supuesto que has ido, la ultima competencia fue ahi. Que lugares visitaste?' },
          { personaje: 'TEODORO', texto: 'No, no pude—' },
          { personaje: 'AGENTE CATALINA', texto: '(Regresa su mirada a sus libros y continua escribiendo.) Es una pena. Por un momento crei que podrias compartirme algunos datos para mejorar mis itinerarios.' },
        ],
      },
    ],
  },
  baobabs: {
    nombre: 'Baobabs / Constructores (x3)',
    icon: '\u{1F333}',
    edad: 'Abierta',
    tipo: 'Antagonistas / Comicos',
    color: 'text-orange-900',
    colorBg: 'bg-orange-planet/10 border-orange-planet',
    descripcion:
      'Tres sujetos comicos, caricaturescos y camaleonicos sin identidad que buscan crear caos en el mundo fantastico. Representan los pensamientos intrusivos y catastroficos de Teodoro. En la escena 5, crean una identidad como Constructores en un planeta desertico. Cada uno cuenta con un talento unico.',
    contexto:
      'Los Baobabs representan los miedos, malos pensamientos y malas actitudes de Teodoro. Aparecen en los planetas como criaturas molestas que intentan sabotear la terapia. En la Escena 3 se alian con el Vanidoso para manipular a Teodoro. En la Escena 5 se transforman en "Constructores": tres trabajadores atrapados en una construccion sin sentido durante 15,236 dias, cada uno con un talento oculto (dibujo/caligrafia, canto de opera, rap). Al final, Teodoro los libera y deciden construir un teatro.',
    escenas: 'Escenas 2, 3 y 5',
    interactuaCon: [
      'Teodoro (lo molestan y luego conectan con el)',
      'Dr. Principe (intentan sabotear su terapia)',
      'Capitan Nereo (lo molestan, Escena 2)',
      'Dylan / El Vanidoso (sus aliados, Escena 3)',
      'Entre ellos (como Constructores, Escena 5)',
      'Publico (interactuan directamente)',
    ],
    instrucciones:
      'Cada Baobab/Constructor es un personaje distinto con personalidad propia. Son tres roles: el Farolero (controla entrada/salida, talento de dibujo), el Contador/Ricky (calcula fuerzas, talento de canto de opera), y el Comerciante/William (apila bloques, talento de rap). En la Escena 3 son aliados del Vanidoso y manipulan a Teodoro. En la Escena 5 son los Constructores roboticos que Teodoro libera. Prepara especialmente tu Constructor asignado y las lineas como Baobab en la Escena 3.',
    tips: [
      'Como Baobab, eres fisico y molesto: husmeas, robas cosas, interrumpes. Tu comedia es corporal.',
      'Como Constructor, tu movimiento es mecanico y repetitivo al inicio. La transicion a "persona real" cuando Teodoro cambia la musica es fundamental.',
      'Cada Constructor tiene un talento unico que se va revelando: practica el tuyo (canto de opera, rap, o dibujo/expresion artistica).',
      'El momento de descubrir tu nombre es emotivo. Has trabajado 15,236 dias junto a alguien sin saber su nombre.',
      'En la Escena 3, como Baobab, debes convencer a Teodoro de que el Vanidoso tiene razon y el Dr. Principe es un farsante.',
      'La transicion de antagonista (Baobab) a aliado (Constructor liberado) es tu arco. Al final decides construir un teatro, no una obra sin sentido.',
    ],
    dialogos: [
      {
        escena: 'Escena 3 - Aliados del Vanidoso (como Baobabs)',
        lineas: [
          { personaje: 'BAOBABS 1 y 2', texto: '(Al unisono.) Que?! Como te atreves a menos apreciarlo! No sabes quien es? El es el joven estrella, patinador de clase mundial, el mejor de los mejores!' },
          { personaje: 'BAOBABS 1 y 2', texto: '(Acorralando a Teodoro.) Si, hagamos la colaboracion, podemos llegar a tener la admiracion que nuestro talento merece, no lo pienses.' },
          { personaje: 'BAOBAB 1', texto: '(Interrumpe al Dr. Principe.) Escuchalo, el te esta proponiendo una solucion concreta.' },
          { personaje: 'BAOBAB 2', texto: 'Si! No como este charlatan que solo te dice de cosas enredadas que no se entienden.' },
          { personaje: 'BAOBAB 1', texto: 'Solo te esta estafando, no quiere que progreses rapido, para que le pagues por mas terapias.' },
          { personaje: 'BAOBAB 2', texto: 'Supuestamente es un gran terapeuta pero ni siquiera te ha podido decir bien que ocasiona que ya no disfrutes como antes.' },
        ],
      },
      {
        escena: 'Escena 5 - Los Constructores',
        lineas: [
          { personaje: 'CONSTRUCTOR 1', texto: '(Se encuentra de pie frente a su pizarron. Se dirige hacia el Dr. Principe, repitiendo con una sonrisa mecanica) Buenos dias, Inge. (Observa su reloj de mano) Son las 12:03 pm por favor puede firmar su ficha de entrada y que sea un gran dia de trabajo. (Le entrega una tabla con boligrafo y el Dr. accede a firmar).' },
          { personaje: 'TEODORO', texto: '(Con seguridad) Hola, nosotros no somos constructores, venimos a preguntar sobre alguna llave que hayan visto por aqui.' },
          { personaje: 'CONSTRUCTOR 1', texto: '(Con el mismo tono anterior) Hola inge, buenos dias. (Observa su reloj de mano) Son las 12:04 pm por favor puede firmar su ficha de entrada y que sea un gran dia de trabajo. (Le entrega la misma tabla). De hecho, van un poco tarde, pero no se preocupen mi companero es quien al final les hara el corte de pago.' },
          { personaje: 'DR. PRINCIPE', texto: '(Con calma) Que estan construyendo aqui?' },
          { personaje: 'CONSTRUCTOR 1', texto: '(Con falso entusiasmo) No tengo idea, mi labor es marcar la entrada y salida de todos los trabajadores y marcar los dias de jornada en el proyecto. (Senalando al pizarron) Hoy es el dia 15,235. Perdon! 236. (Borra el numero 5 y escribe el 6 con la misma hermosa caligrafia, se toma su tiempo ensimismado en la escritura). Es un arduo trabajo, pero valdra la pena, es una obra muy importante. (Vuelve a su entusiasmo anterior) La jornada acaba a las 8 y vienen conmigo para firmar su salida. Excelente dia. (Con sonrisa mecanica)' },
          { personaje: 'CONSTRUCTOR 2', texto: '(Escribiendo en su libreta, observando el bloque, concentrado. Serio) Bien, entonces si muevo el bloque 2.3 grados a la izquierda la fuerza de resistencia cambia 34 KHz. Que maravilla! (Canta la frase con voz operistica) (Vuelve a su libreta, serio) Entonces si lo muevo 2.2 grados la fuerza de resistencia cambia a 33.6 KHz. Que planeta tan mas extrano, siempre cambiando sus fuerzas, debo anotar todas las variantes posibles, son muy importantes.' },
          { personaje: 'TEODORO', texto: 'Hola... ingeniero, estabamos buscando por aqui alguna llave que haya visto entre toda esta obra.' },
          { personaje: 'CONSTRUCTOR 2', texto: 'Hola Inge... Inge (Dirigiendose a ambos). Una llave? No sabia que iba a llegar nuevo material esta semana, siempre nos llega arena y mas arena para todos estos bloques que tenemos que apilar y enderezar. Debemos comenzar un inventario nuevo para contar las llaves que nos lleguen esta semana. Que maravilla! (Vuelve a cantar la frase con voz operistica). (Regresa a su semblante serio) (Grita hacia el Farolero) Inge, anota el numero 27.4378, no se me vaya a olvidar.' },
          { personaje: 'TEODORO', texto: 'Todos estan demasiado distraidos!' },
          { personaje: 'CONSTRUCTOR 3', texto: '(Saliendo de su concentracion en las melodias de rap) Disculpa que dijiste?' },
          { personaje: 'TEODORO', texto: 'Nadie me escucha.' },
          { personaje: 'CONSTRUCTOR 3', texto: 'Disculpa que... ah! (Sorprendido. Esperando que no lo descubran por no estar trabajando) Digo ingeniero si ya quedo apilado la torre 35 me dispongo a apilar la siguiente torre sin mas circo. Que buena rima! (Orgulloso) Ustedes no son de aqui, que buscan?' },
          { personaje: 'TEODORO', texto: 'Una llave. (En tono seco)' },
          { personaje: 'CONSTRUCTOR 3', texto: '(Apatico y sarcastico) Uy, eso que tiene que ver con la "Gran Obra Puente Norte-Sur y Parque Ecologico y de Agua del Planeta 261" que sera toda esta construccion? Quiero decir, eso es lo mas importante. Veras, aqui cualquier cosa que busques y que no tenga que ver con apilar bloques de arena, dalo por perdido. Lo aprendi a la mala. (Vuelve resignado a su libreta)' },
        ],
      },
    ],
  },
};

const SLUG_MAP: Record<string, string> = {
  teodoro: 'teodoro',
  'dr-principe': 'dr-principe',
  'capitan-nereo': 'capitan-nereo',
  dylan: 'dylan',
  'agente-catalina': 'agente-catalina',
  baobabs: 'baobabs',
};

export function AudicionPersonajePage() {
  const { personaje } = useParams<{ personaje: string }>();
  const data = personaje ? PERSONAJES_DETALLE[personaje] : undefined;

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-6xl">🎭</p>
          <h1 className="mt-4 text-2xl font-bold text-night">Personaje no encontrado</h1>
          <Link
            to="/audicion"
            className="mt-4 inline-block text-sm text-gold-dark hover:underline"
          >
            &larr; Volver a Audiciones
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/audicion" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Volver a Audiciones
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
          {/* Character Header */}
          <div className="mb-8 text-center print:mb-6">
            <div className="mb-2 text-5xl print:text-4xl">{data.icon}</div>
            <h1 className="text-3xl font-bold text-night print:text-2xl">{data.nombre}</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${data.colorBg}`}>
                {data.tipo}
              </span>
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                Edad: {data.edad}
              </span>
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {data.escenas}
              </span>
            </div>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          </div>

          {/* Descripcion */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Descripcion del Personaje
            </h2>
            <div className={`rounded-lg border p-4 ${data.colorBg}`}>
              <p className="text-sm leading-relaxed text-gray-700">{data.descripcion}</p>
            </div>
          </section>

          {/* Contexto */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Contexto en la Historia
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm leading-relaxed text-gray-700">{data.contexto}</p>
            </div>
          </section>

          {/* Interactua con */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Interactua Con
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.interactuaCon.map((p) => (
                <span
                  key={p}
                  className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </section>

          {/* Instrucciones para la audicion */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Instrucciones para la Audicion
            </h2>
            <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
              <p className="text-sm leading-relaxed text-gray-700">{data.instrucciones}</p>
            </div>
          </section>

          {/* Page break for print */}
          <div className="hidden print:block" style={{ pageBreakBefore: 'always' }} />

          {/* Dialogos del libreto */}
          <section className="mb-8 print:mb-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Dialogos del Libreto
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              A continuacion se muestran fragmentos clave del libreto. <strong>Tus lineas estan resaltadas</strong>. Los demas personajes dan continuidad al dialogo durante la audicion.
            </p>
            <div className="space-y-6">
              {data.dialogos.map((bloque) => (
                <div key={bloque.escena} className="print:break-inside-avoid">
                  <h3 className="mb-3 rounded-t-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-bold text-night">
                    {bloque.escena}
                  </h3>
                  <div className="space-y-0 rounded-b-lg border border-t-0 border-gray-200">
                    {bloque.lineas.map((linea, i) => {
                      const isOwnLine = isCharacterLine(linea.personaje, personaje!);
                      return (
                        <div
                          key={i}
                          className={`border-b border-gray-100 px-4 py-3 last:border-b-0 ${
                            isOwnLine ? `${data.colorBg} font-medium` : 'bg-white'
                          }`}
                        >
                          <span
                            className={`text-xs font-bold uppercase tracking-wide ${
                              isOwnLine ? data.color : 'text-gray-400'
                            }`}
                          >
                            {linea.personaje}
                          </span>
                          <p className={`mt-1 text-sm leading-relaxed ${isOwnLine ? 'text-gray-900' : 'text-gray-500'}`}>
                            {linea.texto}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="mb-4 print:mb-2">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-night print:text-lg">
              <span className="text-gold">&#9679;</span> Tips para Ser Seleccionado
            </h2>
            <div className="space-y-2">
              {data.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-gray-200 p-4 print:break-inside-avoid"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-night">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="mt-8 border-t border-gray-200 pt-4 text-center print:mt-6">
            <p className="text-xs text-gray-400">
              ShowTime &mdash; Material confidencial para audiciones &mdash; {data.nombre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function isCharacterLine(linePersonaje: string, slug: string): boolean {
  const lower = linePersonaje.toLowerCase();
  switch (slug) {
    case 'teodoro':
      return lower.includes('teodoro') || lower.includes('patinador');
    case 'dr-principe':
      return lower.includes('dr') || lower.includes('principe');
    case 'capitan-nereo':
      return lower.includes('capitan') || lower.includes('nereo') || lower.includes('neron') || lower.includes('perico');
    case 'dylan':
      return lower.includes('vanidoso') || lower.includes('dylan');
    case 'agente-catalina':
      return lower.includes('agente') || lower.includes('catalina');
    case 'baobabs':
      return (
        lower.includes('baobab') ||
        lower.includes('constructor') ||
        lower.includes('farolero') ||
        lower.includes('contador') ||
        lower.includes('comerciante') ||
        lower.includes('tony') ||
        lower.includes('ricky') ||
        lower.includes('william')
      );
    default:
      return false;
  }
}

export { SLUG_MAP };
