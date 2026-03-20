import type { ChatMessage } from '../types';
import { readSheet, writeSheet, getLocalData, setLocalData } from './sheetsClient';

function rowToMessage(row: string[]): ChatMessage {
  return {
    id: row[0] || '',
    escenaId: row[1] || '',
    autorId: row[2] || '',
    autorNombre: row[3] || '',
    mensaje: row[4] || '',
    fechaCreacion: row[5] || '',
  };
}

export async function fetchChat(escenaId: string): Promise<ChatMessage[]> {
  const rows = await readSheet('Chat');
  let messages: ChatMessage[];

  if (rows.length > 1) {
    messages = rows.slice(1).map(rowToMessage);
  } else {
    messages = getLocalData<ChatMessage>('Chat');
  }

  return messages.filter((m) => m.escenaId === escenaId);
}

export async function addMessage(message: Omit<ChatMessage, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const full = { ...message, id };
  const result = await writeSheet('add', 'Chat', full as unknown as Record<string, unknown>);

  if (!import.meta.env.VITE_APPS_SCRIPT_URL) {
    const existing = getLocalData<ChatMessage>('Chat');
    existing.push(full as ChatMessage);
    setLocalData('Chat', existing);
  }

  return result.id || id;
}
