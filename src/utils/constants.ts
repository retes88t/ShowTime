export const SCENE_COLORS = [
  '#87CEEB', // Scene 1 - Consultorio (sky blue)
  '#3498DB', // Scene 2 - Planeta del Pirata (blue)
  '#E8567F', // Scene 3 - Vanidoso (rose)
  '#1ABC9C', // Scene 4 - Geógrafo (teal)
  '#E67E22', // Scene 5 - Constructores (orange)
  '#9B59B6', // Scene 6 - Principito (purple)
];

export const ESTADO_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  listo: 'Listo',
};

export const ESTADO_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  en_progreso: 'bg-blue-100 text-blue-800',
  listo: 'bg-green-100 text-green-800',
};

// Tareas - Niveles
export const NIVEL_LABELS: Record<string, string> = {
  facil: 'Facil',
  dificil: 'Dificil',
  critico: 'Critico',
  indispensable: 'Indispensable',
};

export const NIVEL_COLORS: Record<string, string> = {
  facil: 'bg-green-100 text-green-800',
  dificil: 'bg-yellow-100 text-yellow-800',
  critico: 'bg-orange-100 text-orange-800',
  indispensable: 'bg-red-100 text-red-800',
};

// Tareas - Estados
export const ESTADO_TAREA_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  completada: 'Completada',
  bloqueada: 'Bloqueada',
};

export const ESTADO_TAREA_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  en_progreso: 'bg-blue-100 text-blue-800',
  completada: 'bg-green-100 text-green-800',
  bloqueada: 'bg-red-100 text-red-800',
};

// Riesgos - Probabilidad
export const PROBABILIDAD_LABELS: Record<string, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
};

export const PROBABILIDAD_COLORS: Record<string, string> = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-red-100 text-red-800',
};
