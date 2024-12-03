import { AnthropicMessage } from './types';
import { createAnthropicError } from './error';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const generateResponse = async (messages: AnthropicMessage[]): Promise<string> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        systemPrompt: 'You are Claude, a helpful AI assistant.',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.content?.[0]?.text) {
      throw new Error('Invalid response format from API');
    }

    return data.content[0].text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw createAnthropicError(error);
  }
};