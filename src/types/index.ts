export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export interface Thread {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export type ThreadContextType = {
  threads: Thread[];
  activeThreadId: number;
  createThread: () => void;
  setActiveThread: (id: number) => void;
  addMessageToThread: (threadId: number, content: string) => void;
  isLoading: boolean;
};