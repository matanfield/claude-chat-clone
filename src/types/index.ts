export interface Message {
  id: number;
  chat_id: number;
  user_id: string;
  content: string;
  is_ai: boolean;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: number;
  project_id: number;
  parent_chat_id: number | null;
  head: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  user_id: string;
  title: string;
  chats: Chat[];
  created_at: string;
  updated_at: string;
}

export interface ChatHead {
  id: number;
  chat_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface Outcome {
  id: number;
  chat_id: number;
  outcome_type: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ThreadContextType {
  projects: Project[];
  activeProjectId: number | null;
  activeChat: Chat | null;
  createProject: (title: string) => Promise<void>;
  createChat: (projectId: number, head: string) => Promise<void>;
  setActiveProject: (projectId: number | null) => void;
  setActiveChat: (chat: Chat | null) => void;
  addMessageToChat: (chatId: number, content: string) => Promise<void>;
  isLoading: boolean;
}