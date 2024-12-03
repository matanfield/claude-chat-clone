import { beforeAll } from 'vitest';
import { initializeAnthropicClient } from '../services/anthropic';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

beforeAll(() => {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('Warning: ANTHROPIC_API_KEY is not set in test environment');
  } else {
    initializeAnthropicClient(process.env.ANTHROPIC_API_KEY);
  }
}); 