import React from 'react';
import ThreadList from '../threads/ThreadList';
import ChatThread from '../chat/ChatThread';
import OutputPane from '../output/OutputPane';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ThreadList />
      <ChatThread />
      <OutputPane />
    </div>
  );
};

export default MainLayout;