import type { Material, EstadoMaterial } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToMaterial(row: string[]): Material {
  return {
    id: row[0] || '',
    escenaId: row[1] || '',
    nombre: row[2] || '',
    cantidad: parseInt(row[3]) || 0,
    estado: (row[4] as EstadoMaterial) || 'pendiente',
    responsableId: row[5] || '',
    notas: row[6] || '',
  };
}

export async function fetchMaterials(escenaId?: string): Promise<Material[]> {
  const rows = await readSheet('Materiales');
  let materials: Material[];

  if (rows.length > 1) {
    materials = rows.slice(1).map(rowToMaterial);
  } else {
    materials = getLocalData<Material>('Materiales');
  }

  return escenaId ? materials.filter((m) => m.escenaId === escenaId) : materials;
}

export async function addMaterial(material: Omit<Material, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...material, id };
  const result = await writeSheet('add', 'Materiales', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Material>('Materiales');
    existing.push(full as Material);
    setLocalData('Materiales', existing);
  }

  return result.id || id;
}

export async function updateMaterial(material: Material): Promise<void> {
  await writeSheet('update', 'Materiales', material as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Material>('Materiales');
    const idx = existing.findIndex((m) => m.id === material.id);
    if (idx >= 0) existing[idx] = material;
    setLocalData('Materiales', existing);
  }
}

export async function deleteMaterial(id: string): Promise<void> {
  await writeSheet('delete', 'Materiales', { id });

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<Material>('Materiales');
    setLocalData('Materiales', existing.filter((m) => m.id !== id));
  }
}
