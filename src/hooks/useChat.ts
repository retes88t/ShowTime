import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage } from '../types';
import { fetchChat } from '../api/chatApi';
import { readCache } from '../api/sheetsClient';

export function useChat(escenaId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const cached = readCache<ChatMessage>('Chat');
    return cached.filter((m) => m.escenaId === escenaId);
  });
  const [loading, setLoading] = useState(() => {
    const cached = readCache<ChatMessage>('Chat');
    return cached.filter((m) => m.escenaId === escenaId).length === 0;
  });
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const refetch = useCallback(async () => {
    try {
      const result = await fetchChat(escenaId);
      setMessages(result);
    } catch (err) {
      console.error('Error fetching chat:', err);
    } finally {
      setLoading(false);
    }
  }, [escenaId]);

  useEffect(() => {
    refetch();
    intervalRef.current = setInterval(refetch, 15000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refetch]);

  return { messages, loading, refetch };
}
