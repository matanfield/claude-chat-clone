import { createContext, useContext } from 'react';
import { ThreadContextType } from '../types';

export const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export const useThreads = () => {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error('useThreads must be used within a ThreadProvider');
  }
  return context;
}; 