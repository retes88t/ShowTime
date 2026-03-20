import type { Material } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchMaterials(escenaId?: string): Promise<Material[]> {
  const materials = await readSheet<Material>('Materiales');
  return escenaId ? materials.filter((m) => m.escenaId === escenaId) : materials;
}

export async function addMaterial(material: Omit<Material, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Materiales', { ...material, id });
  return result.id || id;
}

export async function updateMaterial(material: Material): Promise<void> {
  await writeSheet('update', 'Materiales', material as unknown as Record<string, unknown>);
}

export async function deleteMaterial(id: string): Promise<void> {
  await writeSheet('delete', 'Materiales', { id });
}
