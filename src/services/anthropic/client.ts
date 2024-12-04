import { Message } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const generateResponse = async (messages: Message[]): Promise<string> => {
  try {
    console.log('Full messages:', messages.map(msg => ({
      id: msg.id,
      content: msg.content,
      is_ai: msg.is_ai
    })));

    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map(msg => ({
          role: msg.is_ai ? 'assistant' : 'user',
          content: msg.content
        }))
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    if (!data.message) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid response format from API');
    }

    return data.message;
  } catch (error) {
    console.error('Error in generateResponse:', error);
    throw error;
  }
};