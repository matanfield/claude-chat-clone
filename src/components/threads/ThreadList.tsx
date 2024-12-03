import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useThreads } from '../../context/threadContextUtils';

const ThreadList: React.FC = () => {
  const { threads, activeThreadId, createThread, setActiveThread } = useThreads();

  return (
    <div className="w-64 bg-gray-900 text-gray-100 p-4 flex flex-col">
      <button
        onClick={createThread}
        className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors mb-4"
      >
        <Plus size={16} />
        <span>New Thread</span>
      </button>

      <div className="space-y-1">
        {threads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setActiveThread(thread.id)}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left transition-colors ${
              thread.id === activeThreadId ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <MessageSquare size={16} />
            <span className="truncate">{thread.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThreadList;