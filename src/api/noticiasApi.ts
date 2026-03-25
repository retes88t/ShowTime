import type { Noticia } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchNoticias(): Promise<Noticia[]> {
  const noticias = await readSheet<Noticia>('Noticias');
  return noticias;
}

export async function addNoticia(noticia: Omit<Noticia, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Noticias', { ...noticia, id });
  return result.id || id;
}

export async function updateNoticia(noticia: Noticia): Promise<void> {
  await writeSheet('update', 'Noticias', noticia as unknown as Record<string, unknown>);
}

export async function deleteNoticia(id: string): Promise<void> {
  await writeSheet('delete', 'Noticias', { id });
}
