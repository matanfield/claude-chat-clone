import { describe, it, expect } from 'vitest';
import { generateResponse } from '../index';
import type { AnthropicMessage } from '../types';

describe('Anthropic Client', () => {
  describe('Input Validation', () => {
    it('should reject empty messages array', async () => {
      await expect(generateResponse([])).rejects.toThrow('Messages array cannot be empty');
    });

    it('should reject invalid message format', async () => {
      const invalidMessage = { role: 'invalid', content: 'test' } as unknown as AnthropicMessage;
      await expect(generateResponse([invalidMessage])).rejects.toThrow('Invalid message role');
    });
  });

  describe('API Integration', () => {
    // Skip API tests if no API key is present
    const runIfApiKey = process.env.ANTHROPIC_API_KEY ? it : it.skip;

    runIfApiKey('should generate a response for a valid message', async () => {
      const message: AnthropicMessage = {
        role: 'user',
        content: 'Hello, how are you?'
      };

      const response = await generateResponse([message]);
      expect(response).toBeTruthy();
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
    });

    runIfApiKey('should handle conversation context', async () => {
      const messages: AnthropicMessage[] = [
        { role: 'user', content: 'What is 2+2?' },
        { role: 'assistant', content: '4' },
        { role: 'user', content: 'Why?' }
      ];

      const response = await generateResponse(messages);
      expect(response).toBeTruthy();
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
    });
  });
}); 