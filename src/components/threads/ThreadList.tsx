import React from 'react';
import { MessageSquare, Plus, FolderPlus } from 'lucide-react';
import { useThread } from '../../context/threadContextUtils';
import { Project, Chat } from '../../types';

const ThreadList: React.FC = () => {
  const { 
    projects, 
    activeProjectId, 
    activeChat,
    createProject, 
    createChat,
    setActiveProject,
    setActiveChat 
  } = useThread();

  const handleCreateProject = () => {
    createProject('New Project');
  };

  const handleCreateChat = (projectId: number) => {
    createChat(projectId, 'New Chat');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <button
        onClick={handleCreateProject}
        className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors mb-4 text-white"
      >
        <FolderPlus size={16} />
        <span>New Project</span>
      </button>

      <div className="space-y-4">
        {projects.map((project: Project) => (
          <div key={project.id} className="space-y-1">
            <div
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left transition-colors text-white cursor-pointer ${
                project.id === activeProjectId ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              onClick={() => setActiveProject(project.id)}
            >
              <span className="truncate font-medium">{project.title}</span>
            </div>
            
            {project.id === activeProjectId && (
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => handleCreateChat(project.id)}
                  className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm"
                >
                  <Plus size={14} />
                  <span>New Chat</span>
                </button>
                
                {project.chats?.map((chat: Chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left transition-colors text-white text-sm ${
                      chat.id === activeChat?.id ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <MessageSquare size={14} />
                    <span className="truncate">{chat.head}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadList;