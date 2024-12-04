import { generateResponse } from './client';
import { Message } from '../../types';

describe('Anthropic Client', () => {
  const createMessage = (content: string, is_ai: boolean): Message => ({
    id: 1,
    chat_id: 1,
    user_id: 'test-user',
    content,
    is_ai,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  it('should return a greeting for empty messages', async () => {
    const response = await generateResponse([]);
    expect(response).toBe("Hello! How can I help you today?");
  });

  it('should respond to hello messages', async () => {
    const messages = [createMessage('hello', false)];
    const response = await generateResponse(messages);
    expect(response).toBe("Hello! I'm Claude, your AI assistant. How can I help you today?");
  });

  it('should respond to help requests', async () => {
    const messages = [createMessage('I need help', false)];
    const response = await generateResponse(messages);
    expect(response).toBe("I'm here to help! I can assist with coding, analysis, writing, and many other tasks. What would you like to work on?");
  });

  it('should respond to code-related help requests', async () => {
    const messages = [createMessage('help with code', false)];
    const response = await generateResponse(messages);
    expect(response).toBe("I'd be happy to help with coding. I'm familiar with many programming languages and can help with development, debugging, and code review. What specific coding task would you like assistance with?");
  });

  it('should provide a default response for other messages', async () => {
    const testMessage = 'This is a test message';
    const messages = [createMessage(testMessage, false)];
    const response = await generateResponse(messages);
    expect(response).toBe(`I understand you said: "${testMessage}". How can I help you further with that?`);
  });

  it('should handle conversation history', async () => {
    const messages = [
      createMessage('hello', false),
      createMessage("Hello! I'm Claude, your AI assistant. How can I help you today?", true),
      createMessage('help with code', false)
    ];
    const response = await generateResponse(messages);
    expect(response).toBe("I'd be happy to help with coding. I'm familiar with many programming languages and can help with development, debugging, and code review. What specific coding task would you like assistance with?");
  });
}); 