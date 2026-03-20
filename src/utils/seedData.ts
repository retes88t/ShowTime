import type { Scene, Material, Escenografia, Person } from '../types';
import { seedSheet } from '../api/sheetsClient';
import { SCENE_COLORS } from './constants';

const SEED_SCENES: Scene[] = [
  {
    id: 'scene-1',
    numero: 1,
    nombre: 'Consultorio / Tierra',
    subtitulo: 'Despacho del Dr. Saint-Exupery',
    descripcion: 'Teodoro llega al consultorio del Dr. Saint-Exupery. El lugar es sobrio y gris, pero poco a poco se transforma en algo mas colorido. Transicion de lo serio a lo fantasioso.',
    personajes: 'Teodoro, Dr. Saint-Exupery',
    conflicto: 'Teodoro no disfruta el patinaje como antes, se siente vacio despues de ganar la medalla de oro.',
    objetivos: 'El publico conoce la motivacion del protagonista. Introduccion al tono absurdo de la obra.',
    lineaEntrada: 'No me sale el movimiento',
    lineaConflicto: 'Es que tienes que probar esta nueva terapia (dibujos)',
    lineaSalida: 'Sale por la puerta y rompe la cuarta pared',
    juego: 'Interpretacion de dibujos',
    parodia: '',
    imagenUrl: 'https://psicologodecanini.com/wp-content/uploads/2022/01/psicoterapia.jpg.webp',
    color: SCENE_COLORS[0],
  },
  {
    id: 'scene-2',
    numero: 2,
    nombre: 'Planeta del Pirata',
    subtitulo: 'El Rey de Nadie',
    descripcion: 'Estamos en el mar. El Pirata Morgan quiere navegar a un puerto de Veracruz y se ve frustrado al ordenar a toda su tripulacion.',
    personajes: 'Teodoro, Dr. Saint-Exupery, Pirata, Publico, Staff',
    conflicto: 'Deseo de control, aceptar que se necesita ayuda. Simon dice se desespera porque no salen las cosas bien.',
    objetivos: 'Trabajar la amistad y la delegacion de tareas en equipo.',
    lineaEntrada: '',
    lineaConflicto: '',
    lineaSalida: '',
    juego: 'Simon dice',
    parodia: 'Politico',
    imagenUrl: 'https://www.lavanguardia.com/files/image_990_484/files/fp/uploads/2021/03/11/604a0199e4d24.r_d.457-306.jpeg',
    color: SCENE_COLORS[1],
  },
  {
    id: 'scene-3',
    numero: 3,
    nombre: 'Planeta del Vanidoso',
    subtitulo: 'Parodia Influencer',
    descripcion: 'El Vanidoso es fan de si mismo, busca ser eternamente admirado. Tiene una filosofia muy contagiosa. Aparecen los Baobabs y se llevan la rosa.',
    personajes: 'Teodoro, Dr. Saint-Exupery, Vanidoso',
    conflicto: 'La vanidad y la preocupacion constante por la apariencia. Los Baobabs logran robar la rosa.',
    objetivos: 'Teodoro ve reflejada su obsesion por que su peinado, maquillaje y vestuario esten en orden.',
    lineaEntrada: '',
    lineaConflicto: '',
    lineaSalida: '',
    juego: 'Interpretacion de dibujos',
    parodia: 'Influencer',
    imagenUrl: 'https://media.mdzol.com/p/b2456a2fa49799d1ee54cc4b11ed54cf/adjuntos/373/imagenes/001/163/0001163718/760x0/smart/problemente-es-el-antagonista-mas-carismatico-las-peliculas-animadas-foto-archivo.jpg',
    color: SCENE_COLORS[2],
  },
  {
    id: 'scene-4',
    numero: 4,
    nombre: 'Planeta del Geografo',
    subtitulo: 'Parodia Agente de Viajes Disney',
    descripcion: 'La mayor conocedora del mundo exterior, sin salir de su escritorio. Espejos e imagenes de caras.',
    personajes: 'Teodoro, Dr. Saint-Exupery, Geografa',
    conflicto: 'Falta de animo o entusiasmo para ir mas alla de lo establecido.',
    objetivos: 'Teodoro ve su falta de improvisacion. Puede improvisar la segunda vez que se cae.',
    lineaEntrada: '',
    lineaConflicto: '',
    lineaSalida: '',
    juego: 'Interpretacion de dibujos',
    parodia: 'Agente de viajes Disney',
    imagenUrl: 'https://imgmedia.larepublica.pe/850x501/larepublica/original/2022/04/13/62574872ea80e22fb84460de.webp',
    color: SCENE_COLORS[3],
  },
  {
    id: 'scene-5',
    numero: 5,
    nombre: 'Planeta de los Constructores',
    subtitulo: 'Parodia Linea 6 del Metro MTY',
    descripcion: 'Constructores de una importantisima obra para su planeta. Cada uno esta atrapado en su propia mentira logica y han perdido la conexion con el mundo emocional.',
    personajes: 'Teodoro, Dr. Saint-Exupery, Constructores',
    conflicto: 'La obra en construccion es un caos total. Perdida de conexion emocional.',
    objetivos: 'Basado en el contador, el farolero, el borracho, el zorro, etc.',
    lineaEntrada: '',
    lineaConflicto: '',
    lineaSalida: '',
    juego: 'Pendiente',
    parodia: 'Linea 6 del metro MTY',
    imagenUrl: 'https://www.shutterstock.com/image-vector/construction-site-cartoon-scene-industrial-260nw-2658942637.jpg',
    color: SCENE_COLORS[4],
  },
  {
    id: 'scene-6',
    numero: 6,
    nombre: 'Planeta del Principito',
    subtitulo: 'Reencuentro con el nino interior',
    descripcion: 'Teodoro llega al planeta del Principito representando que ya conecto con su nino interior. Despedida emotiva y fondo azul lleno de estrellas.',
    personajes: 'Teodoro, Dr. Saint-Exupery / Principito',
    conflicto: 'Despedida y aceptacion. Recuperacion de la rosa.',
    objetivos: 'Teodoro reconecta con su pasion original por el patinaje.',
    lineaEntrada: '',
    lineaConflicto: '',
    lineaSalida: 'No te vayas a olvidar de tus heelys',
    juego: 'Interpretacion de dibujos',
    parodia: '',
    imagenUrl: 'https://i0.wp.com/xavieh.com/wp-content/uploads/2016/04/FB2.jpg?resize=1024%2C667&ssl=1',
    color: SCENE_COLORS[5],
  },
];

const SEED_MATERIALS: Material[] = [
  { id: 'mat-1', escenaId: 'scene-1', nombre: 'Bata de medico', cantidad: 1, estado: 'pendiente', responsableId: '', notas: 'Para Carlos L' },
  { id: 'mat-2', escenaId: 'scene-1', nombre: 'Camisa con rayas y mono grande contrastante', cantidad: 1, estado: 'pendiente', responsableId: '', notas: '' },
  { id: 'mat-3', escenaId: 'scene-1', nombre: 'Hojas y papeles', cantidad: 20, estado: 'pendiente', responsableId: '', notas: 'Para dibujos' },
  { id: 'mat-4', escenaId: 'scene-1', nombre: 'Plumones', cantidad: 10, estado: 'pendiente', responsableId: '', notas: '' },
  { id: 'mat-5', escenaId: 'scene-1', nombre: 'Cinta para pegar', cantidad: 3, estado: 'pendiente', responsableId: '', notas: '' },
  { id: 'mat-6', escenaId: 'scene-1', nombre: 'Pintura fluorescente', cantidad: 2, estado: 'pendiente', responsableId: '', notas: 'Para dibujos en la cara del doc al apagar luces' },
  { id: 'mat-7', escenaId: 'scene-1', nombre: 'Coderas y rodilleras', cantidad: 1, estado: 'pendiente', responsableId: '', notas: 'Para Teodoro - patinador' },
  { id: 'mat-8', escenaId: 'scene-1', nombre: 'Patineta', cantidad: 1, estado: 'pendiente', responsableId: '', notas: 'Prop de Teodoro' },
  { id: 'mat-9', escenaId: 'scene-1', nombre: 'Casco', cantidad: 1, estado: 'pendiente', responsableId: '', notas: 'Para Teodoro' },
  { id: 'mat-10', escenaId: 'scene-2', nombre: 'Bandera de pirata', cantidad: 1, estado: 'pendiente', responsableId: '', notas: '' },
  { id: 'mat-11', escenaId: 'scene-2', nombre: 'Maquina de humo', cantidad: 1, estado: 'pendiente', responsableId: '', notas: '' },
  { id: 'mat-12', escenaId: 'scene-2', nombre: 'Licras llamativas tipo Deadpool', cantidad: 3, estado: 'pendiente', responsableId: '', notas: 'Para los Baobabs' },
  { id: 'mat-13', escenaId: 'scene-2', nombre: 'Luces de color azul extras', cantidad: 4, estado: 'pendiente', responsableId: '', notas: 'Para escena de congelados' },
  { id: 'mat-14', escenaId: 'scene-2', nombre: 'Fomi y celofan', cantidad: 5, estado: 'pendiente', responsableId: '', notas: 'Para ambientar barco' },
  { id: 'mat-15', escenaId: 'scene-2', nombre: 'Pescados decorativos', cantidad: 10, estado: 'pendiente', responsableId: '', notas: 'Para el piso' },
  { id: 'mat-16', escenaId: 'scene-2', nombre: 'Pintura para espejos/vidrios', cantidad: 2, estado: 'pendiente', responsableId: '', notas: 'Para ambientar' },
  { id: 'mat-17', escenaId: 'scene-3', nombre: 'Espejos', cantidad: 3, estado: 'pendiente', responsableId: '', notas: '' },
  { id: 'mat-18', escenaId: 'scene-3', nombre: 'Imagenes impresas de caras', cantidad: 5, estado: 'pendiente', responsableId: '', notas: 'Caras de mujer/hombre' },
  { id: 'mat-19', escenaId: 'scene-3', nombre: 'Lona "Ella es lo mas increible del mundo"', cantidad: 1, estado: 'pendiente', responsableId: '', notas: '' },
];

const SEED_ESCENOGRAFIA: Escenografia[] = [
  { id: 'esc-1', escenaId: 'scene-1', nombre: '2 sillas de consultorio', descripcion: 'Sillas para el consultorio del Dr.', estado: 'pendiente', responsableId: '' },
  { id: 'esc-2', escenaId: 'scene-1', nombre: 'Luces fluorescentes', descripcion: 'Transicion de lo gris a lo colorido. Al apagar, se ven los dibujos fluorescentes.', estado: 'pendiente', responsableId: '' },
  { id: 'esc-3', escenaId: 'scene-2', nombre: 'Proyector pared barco pirata', descripcion: 'Proyectar imagen de barco pirata en la pared', estado: 'pendiente', responsableId: '' },
  { id: 'esc-4', escenaId: 'scene-2', nombre: 'Ambientacion marina', descripcion: 'Fomi, celofan, pescados en el piso para simular el mar', estado: 'pendiente', responsableId: '' },
  { id: 'esc-5', escenaId: 'scene-6', nombre: 'Fondo azul con estrellas', descripcion: 'Fondo azul lleno de puntitos que asimilan estrellas', estado: 'pendiente', responsableId: '' },
];

const SEED_PEOPLE: Person[] = [
  { id: 'person-1', nombre: 'Carlos L', rol: 'Actor / Dr. Saint-Exupery', contacto: '', activo: true },
  { id: 'person-2', nombre: 'Director', rol: 'Director', contacto: '', activo: true },
  { id: 'person-3', nombre: 'Staff 1', rol: 'Staff', contacto: '', activo: true },
  { id: 'person-4', nombre: 'Staff 2', rol: 'Staff', contacto: '', activo: true },
];

export async function seedAllData(): Promise<void> {
  await seedSheet('Escenas', SEED_SCENES as unknown as Record<string, unknown>[]);
  await seedSheet('Materiales', SEED_MATERIALS as unknown as Record<string, unknown>[]);
  await seedSheet('Escenografia', SEED_ESCENOGRAFIA as unknown as Record<string, unknown>[]);
  await seedSheet('Personas', SEED_PEOPLE as unknown as Record<string, unknown>[]);
  await seedSheet('Notas', []);
  await seedSheet('Chat', []);
  await seedSheet('Asignaciones', []);
}
