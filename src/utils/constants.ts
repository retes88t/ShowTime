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
