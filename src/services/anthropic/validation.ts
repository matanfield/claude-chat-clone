import { AnthropicMessage } from './types';

export const validateMessages = (messages: AnthropicMessage[]): void => {
  if (!Array.isArray(messages)) {
    throw new Error('Messages must be an array');
  }

  if (messages.length === 0) {
    throw new Error('Messages array cannot be empty');
  }

  messages.forEach((message, index) => {
    if (!message.role || !['user', 'assistant'].includes(message.role)) {
      throw new Error(`Invalid message role at index ${index}`);
    }

    if (typeof message.content !== 'string') {
      throw new Error(`Message content must be a string at index ${index}`);
    }
  });
};

export const validateApiKey = (apiKey: string): void => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  if (!apiKey.startsWith('sk-ant-')) {
    throw new Error('Invalid API key format');
  }
};