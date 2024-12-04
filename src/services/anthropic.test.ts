import { describe, it, expect } from 'vitest';
import { generateResponse } from './anthropic';
import { Message } from '../types';

describe('Anthropic API Integration', () => {
  const createTestMessage = (content: string, isAi: boolean = false): Message => ({
    id: Date.now(),
    chat_id: 1,
    user_id: 'test-user',
    content,
    is_ai: isAi,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  it('should validate message input', async () => {
    await expect(generateResponse([])).rejects.toThrow('Messages array is required');
  });

  it('should handle empty message content', async () => {
    const emptyMessage = createTestMessage('');
    await expect(generateResponse([emptyMessage])).resolves.toBeTruthy();
  });

  it('should successfully connect to Anthropic API', async () => {
    const testMessage = createTestMessage('Say hello world');
    
    console.log('Testing API connection with message:', testMessage);
    
    const response = await generateResponse([testMessage]);
    
    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should handle multiple messages in conversation', async () => {
    const messages: Message[] = [
      createTestMessage('Hello'),
      createTestMessage('Hi there!', true),
      createTestMessage('How are you?')
    ];

    const response = await generateResponse(messages);
    
    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });
});