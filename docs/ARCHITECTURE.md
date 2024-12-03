# Architecture Documentation

## Overview

The Claude Chat Clone is built using a modern web architecture with the following key components:

```
Frontend (React + TypeScript)
         ↓
    Vite Dev Server
         ↓
    Express Backend
         ↓
     Claude 3 API
```

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express
- @anthropic-ai/sdk
- CORS

## Architecture Layers

### 1. Presentation Layer (React Components)

```typescript
components/
├── chat/          # Chat interface components
├── layout/        # Layout and structure
├── output/        # Output display
└── threads/       # Thread management
```

### 2. State Management Layer

```typescript
context/
├── ThreadContext.tsx          # Thread state provider
├── threadContextUtils.ts      # Context utilities
└── useThreadsProvider.tsx     # Thread state logic
```

### 3. Service Layer

```typescript
services/
└── anthropic/
    ├── client.ts       # API client
    ├── config.ts       # Configuration
    ├── types.ts        # Type definitions
    └── error.ts        # Error handling
```

### 4. Backend Layer

```javascript
server/
├── server.js           # Express server
└── .env               # Environment configuration
```

## Data Flow

1. User Interaction
   ```
   User → ChatInput → ThreadContext → Anthropic Service → Backend → Claude API
   ```

2. Response Flow
   ```
   Claude API → Backend → Frontend Service → ThreadContext → UI Components
   ```

## State Management

### Thread Context

Central state management using React Context:

```typescript
interface ThreadState {
  threads: Thread[];
  activeThreadId: number;
  isLoading: boolean;
}

interface ThreadActions {
  createThread: () => void;
  setActiveThread: (id: number) => void;
  addMessageToThread: (threadId: number, content: string) => void;
}
```

### State Updates

1. Optimistic Updates
   - UI updates immediately
   - Rolls back on error

2. Loading States
   - Global loading state
   - Per-thread loading states
   - Error states

## Error Handling

### Frontend

1. Component Level
   ```typescript
   try {
     // Component logic
   } catch (error) {
     // Error boundary or local handling
   }
   ```

2. Service Level
   ```typescript
   try {
     const response = await generateResponse(messages);
   } catch (error) {
     throw createAnthropicError(error);
   }
   ```

### Backend

1. Request Validation
   ```javascript
   if (!messages || !Array.isArray(messages)) {
     return res.status(400).json({ error: 'Invalid format' });
   }
   ```

2. API Error Handling
   ```javascript
   try {
     const response = await anthropic.messages.create({...});
   } catch (error) {
     // Specific error handling
   }
   ```

## Security

### API Key Protection
- Stored only on backend
- Environment variables
- Never exposed to client

### Request Validation
- Input sanitization
- Type checking
- Format validation

### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
```

## Performance Considerations

### Frontend
1. Component Optimization
   - React.memo for expensive components
   - Virtualization for long lists
   - Lazy loading for routes

2. State Management
   - Normalized state shape
   - Optimistic updates
   - Efficient re-renders

### Backend
1. Request Handling
   - Request validation
   - Error handling
   - Response caching

2. API Integration
   - Connection pooling
   - Request queuing
   - Rate limiting

## Development Workflow

### Local Development
1. Frontend
   ```bash
   npm run dev        # Start Vite dev server
   npm run build      # Production build
   npm run preview    # Preview build
   ```

2. Backend
   ```bash
   node server.js     # Start Express server
   ```

### Testing
1. Unit Tests
   ```bash
   npm run test       # Run Vitest
   ```

2. Integration Tests
   ```bash
   npm run test:integration
   ```

## Deployment

### Frontend Deployment
1. Build the application
   ```bash
   npm run build
   ```

2. Serve the static files
   ```bash
   npm run preview
   ```

### Backend Deployment
1. Environment setup
   ```bash
   export ANTHROPIC_API_KEY=your-key
   ```

2. Start the server
   ```bash
   node server.js
   ```

## Monitoring and Logging

### Frontend Monitoring
- Console logging
- Error tracking
- Performance monitoring

### Backend Monitoring
- Request logging
- Error tracking
- API usage monitoring

## Future Architecture Improvements

1. Database Integration
   - Message persistence
   - User management
   - Thread storage

2. Authentication
   - User authentication
   - Session management
   - Role-based access

3. Caching
   - Response caching
   - State persistence
   - API result caching

4. Scaling
   - Load balancing
   - Horizontal scaling
   - Microservices architecture 

## Layout System
The application uses a flexible three-pane layout system with resizable dividers:
- The layout maintains minimum and maximum widths for each pane to ensure usability
- Pane sizes are persisted in component state
- ResizableDivider components handle mouse events for smooth resizing
- CSS transitions provide visual feedback during interactions