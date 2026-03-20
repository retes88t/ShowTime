import type { SheetTab } from '../types';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export async function readSheet(tab: SheetTab): Promise<string[][]> {
  if (!SHEET_ID || !API_KEY) {
    console.warn('Google Sheets not configured. Using local data.');
    return [];
  }

  const url = `${SHEETS_API_BASE}/${SHEET_ID}/values/${encodeURIComponent(tab)}?key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Failed to read sheet ${tab}:`, response.statusText);
    return [];
  }

  const data = await response.json();
  return data.values || [];
}

export async function writeSheet(
  action: string,
  tab: SheetTab,
  data: Record<string, unknown>
): Promise<{ success: boolean; id?: string }> {
  if (!APPS_SCRIPT_URL) {
    console.warn('Apps Script URL not configured. Using local storage fallback.');
    return localStorageFallback(action, tab, data);
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, tab, data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to write to sheet: ${response.statusText}`);
  }

  return response.json();
}

function localStorageFallback(
  action: string,
  tab: SheetTab,
  data: Record<string, unknown>
): { success: boolean; id?: string } {
  const key = `showtime_${tab}`;
  const existing: Record<string, unknown>[] = JSON.parse(localStorage.getItem(key) || '[]');

  switch (action) {
    case 'add': {
      const id = data.id as string || crypto.randomUUID();
      existing.push({ ...data, id });
      localStorage.setItem(key, JSON.stringify(existing));
      return { success: true, id };
    }
    case 'update': {
      const idx = existing.findIndex((item) => item.id === data.id);
      if (idx >= 0) {
        existing[idx] = { ...existing[idx], ...data };
        localStorage.setItem(key, JSON.stringify(existing));
      }
      return { success: true };
    }
    case 'delete': {
      const filtered = existing.filter((item) => item.id !== data.id);
      localStorage.setItem(key, JSON.stringify(filtered));
      return { success: true };
    }
    default:
      return { success: false };
  }
}

export function getLocalData<T>(tab: SheetTab): T[] {
  const key = `showtime_${tab}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function setLocalData<T>(tab: SheetTab, data: T[]): void {
  const key = `showtime_${tab}`;
  localStorage.setItem(key, JSON.stringify(data));
}
