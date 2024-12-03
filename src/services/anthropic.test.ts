import { describe, it, expect } from 'vitest';
import { generateResponse } from './anthropic';

describe('Anthropic API Integration', () => {
  it('should validate message input', async () => {
    await expect(generateResponse([])).rejects.toThrow('Messages array is required');
  });

  it('should handle empty message content', async () => {
    const emptyMessage = { role: 'user', content: '' };
    await expect(generateResponse([emptyMessage])).resolves.toBeTruthy();
  });

  it('should successfully connect to Anthropic API', async () => {
    const testMessage = {
      role: 'user',
      content: 'Say hello world',
    };
    
    console.log('Testing API connection with message:', testMessage);
    
    const response = await generateResponse([testMessage]);
    
    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should handle multiple messages in conversation', async () => {
    const messages = [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi there!' },
      { role: 'user', content: 'How are you?' },
    ];

    const response = await generateResponse(messages);
    
    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });
});