import type { Scene } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToScene(row: string[]): Scene {
  return {
    id: row[0] || '',
    numero: parseInt(row[1]) || 0,
    nombre: row[2] || '',
    subtitulo: row[3] || '',
    descripcion: row[4] || '',
    personajes: row[5] || '',
    conflicto: row[6] || '',
    objetivos: row[7] || '',
    lineaEntrada: row[8] || '',
    lineaConflicto: row[9] || '',
    lineaSalida: row[10] || '',
    juego: row[11] || '',
    parodia: row[12] || '',
    imagenUrl: row[13] || '',
    color: row[14] || '',
  };
}

export async function fetchScenes(): Promise<Scene[]> {
  const rows = await readSheet('Escenas');
  if (rows.length > 1) {
    return rows.slice(1).map(rowToScene);
  }
  return getLocalData<Scene>('Escenas');
}

export async function addScene(scene: Omit<Scene, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...scene, id };
  const result = await writeSheet('add', 'Escenas', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Scene>('Escenas');
    existing.push(full as Scene);
    setLocalData('Escenas', existing);
  }

  return result.id || id;
}

export async function updateScene(scene: Scene): Promise<void> {
  await writeSheet('update', 'Escenas', scene as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Scene>('Escenas');
    const idx = existing.findIndex((s) => s.id === scene.id);
    if (idx >= 0) existing[idx] = scene;
    setLocalData('Escenas', existing);
  }
}

export async function deleteScene(id: string): Promise<void> {
  await writeSheet('delete', 'Escenas', { id });

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Scene>('Escenas');
    setLocalData('Escenas', existing.filter((s) => s.id !== id));
  }
}
