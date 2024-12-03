import React from 'react';

interface MessageContentProps {
  isAssistant: boolean;
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ isAssistant, content }) => {
  return (
    <div className="flex-1">
      <div className="font-medium mb-1">
        {isAssistant ? 'Claude' : 'You'}
      </div>
      <div className="text-gray-700 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};

export default MessageContent;