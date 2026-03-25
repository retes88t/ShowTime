import type { SheetTab } from '../types';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const ADMIN_PASSWORD = 'showtime2026';

function getUrl(): string {
  if (!APPS_SCRIPT_URL) {
    throw new Error('VITE_APPS_SCRIPT_URL no esta configurada en .env');
  }
  return APPS_SCRIPT_URL;
}

function cacheKey(tab: SheetTab): string {
  return `showtime_${tab}`;
}

export function readCache<T>(tab: SheetTab): T[] {
  try {
    return JSON.parse(localStorage.getItem(cacheKey(tab)) || '[]');
  } catch {
    return [];
  }
}

export function writeCache<T>(tab: SheetTab, data: T[]): void {
  localStorage.setItem(cacheKey(tab), JSON.stringify(data));
}

export async function readSheet<T>(tab: SheetTab): Promise<T[]> {
  const url = `${getUrl()}?action=read&tab=${encodeURIComponent(tab)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error leyendo ${tab}: ${response.statusText}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || `Error leyendo ${tab}`);
  }

  const data = result.data as T[];
  writeCache(tab, data);
  return data;
}

export async function writeSheet(
  action: 'add' | 'update' | 'delete' | 'seed',
  tab: SheetTab,
  data: Record<string, unknown>
): Promise<{ success: boolean; id?: string }> {
  const response = await fetch(getUrl(), {
    method: 'POST',
    body: JSON.stringify({ action, tab, data, password: ADMIN_PASSWORD }),
  });

  if (!response.ok) {
    throw new Error(`Error escribiendo en ${tab}: ${response.statusText}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || `Error en operacion ${action} en ${tab}`);
  }

  return result;
}

export async function seedSheet(
  tab: SheetTab,
  rows: Record<string, unknown>[]
): Promise<void> {
  const response = await fetch(getUrl(), {
    method: 'POST',
    body: JSON.stringify({ action: 'seed', tab, data: rows, password: ADMIN_PASSWORD }),
  });

  if (!response.ok) {
    throw new Error(`Error poblando ${tab}: ${response.statusText}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || `Error poblando ${tab}`);
  }

  writeCache(tab, rows);
}
