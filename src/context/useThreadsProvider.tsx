import { useState } from 'react';
import { Thread, ThreadContextType } from '../types';
import { generateResponse } from '../services/anthropic/client';

export const useThreadsProvider = (): ThreadContextType => {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 1,
      title: 'Getting Started',
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: 'Hello! How can I help you today?',
        },
      ],
      createdAt: new Date(),
    },
  ]);
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const createThread = () => {
    const newThread: Thread = {
      id: Date.now(),
      title: 'New Thread',
      messages: [
        {
          id: Date.now(),
          role: 'assistant',
          content: 'Hello! How can I help you today?',
        },
      ],
      createdAt: new Date(),
    };
    setThreads((prev) => [...prev, newThread]);
    setActiveThreadId(newThread.id);
  };

  const setActiveThread = (id: number) => {
    setActiveThreadId(id);
  };

  const addMessageToThread = async (threadId: number, content: string) => {
    const userMessage = {
      id: Date.now(),
      role: 'user' as const,
      content,
    };

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            messages: [...thread.messages, userMessage],
          };
        }
        return thread;
      })
    );

    setIsLoading(true);
    try {
      const thread = threads.find((t) => t.id === threadId);
      if (!thread) throw new Error('Thread not found');

      const messagesForAI = [...thread.messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      const aiResponse = await generateResponse(messagesForAI);

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant' as const,
        content: aiResponse,
      };

      setThreads((prev) =>
        prev.map((thread) => {
          if (thread.id === threadId) {
            const newTitle = thread.messages.length === 1 ? 
              content.slice(0, 30) + (content.length > 30 ? '...' : '') :
              thread.title;
            
            return {
              ...thread,
              title: newTitle,
              messages: [...thread.messages, assistantMessage],
            };
          }
          return thread;
        })
      );
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant' as const,
        content: error instanceof Error ? error.message : 'An error occurred while generating a response. Please try again.',
      };
      
      setThreads((prev) =>
        prev.map((thread) => {
          if (thread.id === threadId) {
            return {
              ...thread,
              messages: [...thread.messages, errorMessage],
            };
          }
          return thread;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    threads,
    activeThreadId,
    createThread,
    setActiveThread,
    addMessageToThread,
    isLoading,
  };
}; 