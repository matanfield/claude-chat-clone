import { beforeAll } from 'vitest';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

beforeAll(() => {
  // Verify test environment is properly configured
  if (!process.env.VITE_BACKEND_URL) {
    console.warn('Warning: VITE_BACKEND_URL is not set in test environment');
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('Warning: ANTHROPIC_API_KEY is not set in test environment');
  }
}); 