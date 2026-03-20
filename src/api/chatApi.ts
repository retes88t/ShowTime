import type { ChatMessage } from '../types';
import { readSheet, writeSheet } from './sheetsClient';

export async function fetchChat(escenaId: string): Promise<ChatMessage[]> {
  const messages = await readSheet<ChatMessage>('Chat');
  return messages.filter((m) => m.escenaId === escenaId);
}

export async function addMessage(message: Omit<ChatMessage, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  const result = await writeSheet('add', 'Chat', { ...message, id });
  return result.id || id;
}
