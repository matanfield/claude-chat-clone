import { supabase } from './client';
import { Project, Chat, Message } from '../../types';

export const database = {
  async getProjects(userId: string): Promise<Project[]> {
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        chats (
          *,
          messages (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return projects || [];
  },

  async createProject(userId: string, title: string): Promise<Project> {
    const { data: project, error } = await supabase
      .from('projects')
      .insert([
        {
          user_id: userId,
          title,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { ...project, chats: [] };
  },

  async createChat(projectId: number, head: string): Promise<Chat> {
    const { data: chat, error } = await supabase
      .from('chats')
      .insert([
        {
          project_id: projectId,
          head,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { ...chat, messages: [] };
  },

  async addMessage(chatId: number, userId: string, content: string, isAi: boolean): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          chat_id: chatId,
          user_id: userId,
          content,
          is_ai: isAi,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
}; 