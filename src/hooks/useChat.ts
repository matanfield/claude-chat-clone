import { useState } from 'react';
import { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! How can I help you today?',
    },
  ]);

  const addMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      content: 'I received your message: ' + content,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  return { messages, addMessage };
};