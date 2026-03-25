import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types';
import { addMessage } from '../../api/chatApi';
import { EmptyState } from '../ui/EmptyState';

interface MiniChatProps {
  messages: ChatMessage[];
  escenaId: string;
  onRefresh: () => void;
  loading: boolean;
}

export function MiniChat({ messages, escenaId, onRefresh, loading }: MiniChatProps) {
  const currentUser = null as { id: string; nombre: string } | null;
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addMessage({
      escenaId,
      autorId: currentUser?.id || '',
      autorNombre: currentUser?.nombre || 'Anonimo',
      mensaje: text.trim(),
      fechaCreacion: new Date().toISOString(),
    });

    setText('');
    onRefresh();
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime()
  );

  return (
    <div className="flex h-[500px] flex-col rounded-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Chat de Escena</h3>
        <span className="text-xs text-gray-400">Auto-refresh: 15s</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : sortedMessages.length === 0 ? (
          <EmptyState message="No hay mensajes aun. Se el primero!" />
        ) : (
          <div className="space-y-3">
            {sortedMessages.map((msg) => {
              const isMe = msg.autorId === currentUser?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 ${isMe ? 'bg-gold/20 text-night' : 'bg-gray-100 text-gray-800'}`}>
                    {!isMe && (
                      <p className="mb-0.5 text-xs font-medium text-gold-dark">{msg.autorNombre}</p>
                    )}
                    <p className="text-sm">{msg.mensaje}</p>
                    <p className="mt-1 text-right text-[10px] text-gray-400">
                      {new Date(msg.fechaCreacion).toLocaleTimeString('es-MX', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 border-t border-gray-200 p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={currentUser ? 'Escribe un mensaje...' : 'Selecciona un usuario primero'}
          disabled={!currentUser}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:bg-gray-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || !currentUser}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
