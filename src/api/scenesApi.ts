import type { Scene } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchScenes(): Promise<Scene[]> {
  return readSheet<Scene>('Escenas');
}

export async function addScene(scene: Omit<Scene, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Escenas', { ...scene, id });
  return result.id || id;
}

export async function updateScene(scene: Scene): Promise<void> {
  await writeSheet('update', 'Escenas', scene as unknown as Record<string, unknown>);
}

export async function deleteScene(id: string): Promise<void> {
  await writeSheet('delete', 'Escenas', { id });
}
