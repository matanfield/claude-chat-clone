# API Documentation

## Backend Server API

### Chat Endpoint

`POST /api/chat`

Creates a new message in the conversation using Claude 3 API.

#### Request Body

```typescript
{
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  systemPrompt?: string;
}
```

#### Response

```typescript
{
  content: [{
    text: string;
  }];
  // Additional metadata from Claude API
}
```

#### Error Responses

- `400 Bad Request`: Invalid message format
- `401 Unauthorized`: Invalid API key
- `404 Not Found`: Model not found
- `500 Internal Server Error`: Server or Claude API error

### Test Endpoint

`GET /api/test`

Tests the server configuration and API key setup.

#### Response

```typescript
{
  status: 'ok';
  apiKeyPresent: boolean;
  apiKeyPrefix: string;
}
```

## Anthropic Integration

### Model Configuration

The application uses Claude 3 with the following configuration:

```javascript
{
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [/* conversation history */],
  system: 'You are Claude, a helpful AI assistant.'
}
```

### Available Models

- `claude-3-opus-20240229`: Most capable model, best for complex tasks
- `claude-3-sonnet`: Balanced model for most use cases
- `claude-3-haiku`: Fastest and most cost-effective model

### Message Format

Messages must follow this format:

```typescript
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
```

### Error Handling

The server implements comprehensive error handling:

1. Input Validation
   - Validates message format
   - Ensures required fields are present
   - Checks for valid content types

2. API Error Handling
   - Handles authentication errors
   - Manages rate limiting
   - Processes API-specific errors

3. Response Validation
   - Verifies response format
   - Ensures content is present
   - Handles malformed responses

## Frontend Integration

### Anthropic Client Service

The frontend uses a dedicated service for API communication:

```typescript
// src/services/anthropic/client.ts
export const generateResponse = async (messages: AnthropicMessage[]): Promise<string>
```

### Environment Configuration

Frontend environment variables:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Security Considerations

1. API Key Protection
   - API key is only stored on the backend
   - Never exposed to the client
   - Configured through environment variables

2. Request Validation
   - All requests are validated before processing
   - Malformed requests are rejected
   - Input sanitization is performed

3. CORS Configuration
   - Configured for development environment
   - Should be restricted in production

## Rate Limiting

The server currently doesn't implement rate limiting, but it's recommended to add:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Future Improvements

1. Implement request caching
2. Add request queuing
3. Implement retry logic for failed requests
4. Add request logging and monitoring
5. Implement user authentication
6. Add conversation history persistence 