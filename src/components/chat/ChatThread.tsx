import React from 'react';
import { useThreads } from '../../context/threadContextUtils';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatThread: React.FC = () => {
  const { threads, activeThreadId, addMessageToThread } = useThreads();
  const activeThread = threads.find((t) => t.id === activeThreadId);

  if (!activeThread) return null;

  return (
    <div className="flex-1 flex flex-col">
      <MessageList messages={activeThread.messages} />
      <ChatInput onSubmit={(content) => addMessageToThread(activeThreadId, content)} />
    </div>
  );
};

export default ChatThread;