import React from 'react';
import { LogOut, User } from 'lucide-react';
import ThreadList from '../threads/ThreadList';
import ChatThread from '../chat/ChatThread';
import OutputPane from '../output/OutputPane';
import { useAuth } from '../../hooks/useAuth';

const MainLayout: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex flex-col w-64 bg-gray-900">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <User size={20} />
            <span className="truncate">{user?.email}</span>
          </div>
          <button
            onClick={signOut}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
        <ThreadList />
      </div>
      <ChatThread />
      <OutputPane />
    </div>
  );
};

export default MainLayout;