export interface Scene {
  id: string;
  numero: number;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  personajes: string;
  conflicto: string;
  objetivos: string;
  lineaEntrada: string;
  lineaConflicto: string;
  lineaSalida: string;
  juego: string;
  parodia: string;
  imagenUrl: string;
  color: string;
}

export interface Material {
  id: string;
  escenaId: string;
  nombre: string;
  cantidad: number;
  estado: EstadoMaterial;
  responsableId: string;
  notas: string;
}

export type EstadoMaterial = 'pendiente' | 'en_progreso' | 'listo';

export interface Escenografia {
  id: string;
  escenaId: string;
  nombre: string;
  descripcion: string;
  estado: EstadoMaterial;
  responsableId: string;
}

export interface Person {
  id: string;
  nombre: string;
  rol: string;
  contacto: string;
  activo: boolean;
}

export interface Note {
  id: string;
  escenaId: string;
  autorId: string;
  autorNombre: string;
  contenido: string;
  fechaCreacion: string;
}

export interface ChatMessage {
  id: string;
  escenaId: string;
  autorId: string;
  autorNombre: string;
  mensaje: string;
  fechaCreacion: string;
}

export interface Assignment {
  id: string;
  escenaId: string;
  personaId: string;
  tarea: string;
  tipo: string;
  estado: EstadoMaterial;
  fechaLimite: string;
}

export type SheetTab = 'Escenas' | 'Materiales' | 'Escenografia' | 'Personas' | 'Notas' | 'Chat' | 'Asignaciones';
