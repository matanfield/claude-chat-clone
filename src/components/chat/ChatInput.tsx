import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useThreads } from '../../context/threadContextUtils';

interface ChatInputProps {
  onSubmit: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const { isLoading } = useThreads();

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Command + Enter to send)"
          className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          className="absolute right-4 bottom-4 p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;