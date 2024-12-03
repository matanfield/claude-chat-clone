import { AnthropicConfig } from './types';

export const DEFAULT_CONFIG: AnthropicConfig = {
  apiKey: '',
  model: 'claude-3-sonnet-20241022',
  maxTokens: 1024,
  systemPrompt: 'You are Claude, a helpful AI assistant. Provide clear, concise, and accurate responses.',
};

export const ANTHROPIC_API_VERSION = '2023-06-01';