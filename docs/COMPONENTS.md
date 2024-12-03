# Component Documentation

## Component Structure

```
src/components/
├── chat/
│   ├── ChatInput.tsx       # Message input component
│   ├── ChatMessage.tsx     # Individual message display
│   ├── ChatThread.tsx      # Thread container
│   ├── MessageAvatar.tsx   # User/Assistant avatar
│   ├── MessageContent.tsx  # Message content display
│   └── MessageList.tsx     # Message list container
├── layout/
│   ├── ResizableDivider.tsx # Resizable divider component
│   └── MainLayout.tsx      # Main application layout
├── output/
│   └── OutputPane.tsx      # Code output display
└── threads/
    └── ThreadList.tsx      # Thread management
```

## Chat Components

### ChatInput

Input component for sending messages to Claude.

```typescript
interface ChatInputProps {
  onSubmit: (content: string) => void;
}
```

Features:
- Text area for message input
- Command + Enter shortcut for sending
- Loading state handling
- Character count (optional)

### ChatMessage

Displays a single message in the conversation.

```typescript
interface ChatMessageProps {
  message: Message;
}
```

Features:
- Different styles for user/assistant messages
- Avatar display
- Message content formatting

### ChatThread

Container for the active conversation thread.

Features:
- Message list display
- Input component
- Thread state management
- Auto-scroll to bottom

### MessageAvatar

Displays the appropriate avatar for each message.

```typescript
interface MessageAvatarProps {
  isAssistant: boolean;
}
```

Features:
- Different icons for user/assistant
- Customizable styling
- Accessibility support

### MessageContent

Renders the content of a message.

```typescript
interface MessageContentProps {
  isAssistant: boolean;
  content: string;
}
```

Features:
- Text formatting
- Code block highlighting
- Link detection
- Markdown support (optional)

### MessageList

Container for all messages in a thread.

```typescript
interface MessageListProps {
  messages: Message[];
}
```

Features:
- Message rendering
- Auto-scrolling
- Virtual scrolling (optional)
- Loading states

## Layout Components

### ResizableDivider
A draggable divider component that allows users to resize adjacent panes.

Props:
- `onResize: (delta: number) => void`: Callback function that receives the resize delta
- `isVertical?: boolean`: Whether the divider is vertical (default: true)

### Layout
The main layout component that implements a three-pane design with resizable dividers.
- Left pane: Minimum width 150px, maximum width 500px
- Main pane: Flexible width with minimum 300px
- Right pane: Minimum width 200px, maximum width 600px

Users can drag the dividers between panes to adjust their sizes according to their preferences.

### MainLayout

Main application layout component.

Features:
- Three-column layout
- Responsive design
- Navigation structure
- Theme support

## Output Components

### OutputPane

Displays generated code and other structured output.

Features:
- Code syntax highlighting
- Copy to clipboard
- Output type indicators
- Error state handling

## Thread Components

### ThreadList

Manages conversation threads.

Features:
- Thread creation
- Thread switching
- Thread title editing
- Active thread indication

## Context Integration

### ThreadProvider

```typescript
interface ThreadContextType {
  threads: Thread[];
  activeThreadId: number;
  createThread: () => void;
  setActiveThread: (id: number) => void;
  addMessageToThread: (threadId: number, content: string) => void;
  isLoading: boolean;
}
```

Used by:
- ChatThread
- ThreadList
- ChatInput

## Hooks

### useThreads

Custom hook for accessing thread context.

```typescript
const { 
  threads,
  activeThreadId,
  createThread,
  setActiveThread,
  addMessageToThread,
  isLoading
} = useThreads();
```

### useChat

Custom hook for chat functionality.

```typescript
const {
  messages,
  addMessage
} = useChat();
```

## Styling

The application uses Tailwind CSS for styling with custom utility classes:

```typescript
// Common class combinations
const buttonClasses = "px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20";
const inputClasses = "w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500";
```

## Best Practices

1. Component Organization
   - One component per file
   - Clear component interfaces
   - Proper prop typing
   - Error boundary implementation

2. Performance Optimization
   - React.memo for expensive renders
   - Proper key usage in lists
   - Lazy loading where appropriate
   - Debounced input handling

3. Accessibility
   - Proper ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Color contrast compliance

4. Testing
   - Component unit tests
   - Integration tests
   - Accessibility tests
   - Snapshot testing

## Future Improvements

1. Add component documentation using Storybook
2. Implement component testing
3. Add theme customization
4. Improve accessibility
5. Add animation and transitions
6. Implement error boundaries
7. Add loading skeletons
8. Improve mobile responsiveness 