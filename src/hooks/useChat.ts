import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage } from '../types';
import { fetchChat } from '../api/chatApi';

export function useChat(escenaId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
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
