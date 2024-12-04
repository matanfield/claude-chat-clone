import { useState, useEffect, useCallback } from 'react';
import { Project, Chat, Message, ThreadContextType } from '../types';
import { generateResponse } from '../services/anthropic/client';
import { database } from '../services/supabase/database';
import { useAuth } from '../hooks/useAuth';

export const useThreadsProvider = (): ThreadContextType => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const loadProjects = useCallback(async () => {
    if (!user) return;
    try {
      const loadedProjects = await database.getProjects(user.id);
      setProjects(loadedProjects);
      if (loadedProjects.length > 0 && !activeProjectId) {
        setActiveProjectId(loadedProjects[0].id);
        const firstProject = loadedProjects[0];
        if (firstProject.chats && firstProject.chats.length > 0) {
          setActiveChat(firstProject.chats[0]);
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }, [user, activeProjectId]);

  // Load projects on mount
  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user, loadProjects]);

  const createProject = async (title: string): Promise<void> => {
    if (!user) return;
    try {
      const newProject = await database.createProject(user.id, title);
      setProjects((prev: Project[]) => [newProject, ...prev]);
      setActiveProjectId(newProject.id);
      // Create initial chat for the project
      const newChat = await database.createChat(newProject.id, 'New Chat');
      setProjects((prev: Project[]) => 
        prev.map((p: Project) => 
          p.id === newProject.id 
            ? { ...p, chats: [newChat, ...(p.chats || [])] }
            : p
        )
      );
      setActiveChat(newChat);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const createChat = async (projectId: number, head: string): Promise<void> => {
    if (!user) return;
    try {
      const newChat = await database.createChat(projectId, head);
      
      // Add initial welcome message from Claude
      const welcomeMessage: Message = {
        id: Date.now(),
        chat_id: newChat.id,
        user_id: 'AI',
        content: "Hello! I'm Claude, your AI assistant. How can I help you today?",
        is_ai: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const chatWithWelcome: Chat = {
        ...newChat,
        messages: [welcomeMessage]
      };

      setProjects((prev: Project[]) => 
        prev.map((p: Project) => 
          p.id === projectId 
            ? { ...p, chats: [chatWithWelcome, ...(p.chats || [])] }
            : p
        )
      );
      
      setActiveChat(chatWithWelcome);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const setActiveProject = useCallback((projectId: number | null) => {
    setActiveProjectId(projectId);
    if (projectId === null) {
      setActiveChat(null);
      return;
    }
    
    const project = projects.find(p => p.id === projectId);
    if (project && project.chats && project.chats.length > 0) {
      setActiveChat(project.chats[0]);
    } else {
      setActiveChat(null);
    }
  }, [projects]);

  const addMessageToChat = async (chatId: number, content: string): Promise<void> => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      const userMessage: Message = {
        id: Date.now(),
        chat_id: chatId,
        user_id: user.id,
        content,
        is_ai: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Update projects state with user message
      const updatedProjects: Project[] = projects.map((project: Project) => ({
        ...project,
        chats: project.chats.map((chat: Chat) => 
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
        )
      }));

      setProjects(updatedProjects);

      // Update active chat with user message
      let updatedChat = activeChat;
      if (activeChat && activeChat.id === chatId) {
        updatedChat = {
          ...activeChat,
          messages: [...activeChat.messages, userMessage]
        };
        setActiveChat(updatedChat);
      }

      // Get current chat for AI response
      const currentChat = updatedProjects
        .flatMap((p: Project) => p.chats)
        .find((c: Chat) => c.id === chatId);

      if (!currentChat) {
        throw new Error('Chat not found');
      }

      // Get AI response
      const aiResponse = await generateResponse(currentChat.messages);
      
      const assistantMessage: Message = {
        id: Date.now(),
        chat_id: chatId,
        user_id: 'AI',
        content: aiResponse,
        is_ai: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Update projects state with AI message
      setProjects((prev: Project[]) => {
        const updated = prev.map((project: Project) => ({
          ...project,
          chats: project.chats.map((chat: Chat) => 
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, assistantMessage] }
              : chat
          )
        }));
        return updated;
      });

      // Update active chat with AI message, including previous messages
      if (updatedChat && updatedChat.id === chatId) {
        setActiveChat({
          ...updatedChat,
          messages: [...updatedChat.messages, assistantMessage]
        });
      }

    } catch (error) {
      console.error('Error adding message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    activeProjectId,
    activeChat,
    createProject,
    createChat,
    setActiveProject,
    setActiveChat,
    addMessageToChat,
    isLoading,
  };
}; 