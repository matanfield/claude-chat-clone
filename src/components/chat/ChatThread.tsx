import React, { useEffect } from 'react';
import { useThread } from '../../context/threadContextUtils';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatThread: React.FC = () => {
  const { activeChat, addMessageToChat } = useThread();

  // Force re-render when messages change
  useEffect(() => {
    if (activeChat) {
      console.log('Messages updated:', activeChat.messages);
    }
  }, [activeChat]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat or create a new one to start chatting
      </div>
    );
  }

  const handleSubmit = (content: string) => {
    addMessageToChat(activeChat.id, content);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-medium">{activeChat.head}</h2>
      </div>
      <MessageList messages={activeChat.messages} />
      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatThread;