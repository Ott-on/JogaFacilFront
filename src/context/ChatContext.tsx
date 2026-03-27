'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import type { ChatMessage } from '@/types/football';
import { sendMessage } from '@/lib/api/chatService';

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  send: (text: string) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const send = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessage(text.trim());
      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'ai',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'ai',
        content:
          'Não foi possível conectar ao servidor de análise. Tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, send, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextType {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
}
