import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageAvatarProps {
  isAssistant: boolean;
}

const MessageAvatar: React.FC<MessageAvatarProps> = ({ isAssistant }) => {
  return (
    <div className={`p-2 rounded-lg ${isAssistant ? 'bg-blue-100' : 'bg-gray-100'}`}>
      {isAssistant ? <Bot size={20} /> : <User size={20} />}
    </div>
  );
};

export default MessageAvatar;