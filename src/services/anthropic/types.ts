export interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnthropicConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  systemPrompt: string;
}

export interface AnthropicError extends Error {
  status?: number;
  code?: string;
  message: string;
}