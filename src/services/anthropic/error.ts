import { AnthropicError } from './types';

export const createAnthropicError = (error: any): AnthropicError => {
  const anthropicError: AnthropicError = new Error(
    error.message || 'An unknown error occurred'
  ) as AnthropicError;

  anthropicError.status = error.status;
  anthropicError.code = error.code;

  if (error.status === 401) {
    anthropicError.message = 'Invalid API key. Please check your credentials.';
  } else if (error.status === 429) {
    anthropicError.message = 'Rate limit exceeded. Please try again later.';
  } else if (error.status === 400) {
    anthropicError.message = `Bad request: ${error.message}`;
  }

  return anthropicError;
};