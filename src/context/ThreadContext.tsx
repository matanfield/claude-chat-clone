import React from 'react';
import { useThreadsProvider } from './useThreadsProvider';
import { ThreadContext } from './threadContextUtils';

export const ThreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const threadContextValue = useThreadsProvider();

  return (
    <ThreadContext.Provider value={threadContextValue}>
      {children}
    </ThreadContext.Provider>
  );
};