import React from 'react';
import { Message } from '../../types';
import MessageAvatar from './MessageAvatar';
import MessageContent from './MessageContent';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.is_ai;

  return (
    <div className={`flex gap-4 items-start`}>
      <MessageAvatar isAssistant={isAssistant} />
      <MessageContent isAssistant={isAssistant} content={message.content} />
    </div>
  );
};

export default ChatMessage;