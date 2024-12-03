# Claude Chat Clone

A modern chat interface clone for Claude AI, built with React, TypeScript, and Node.js.

## Features

- Real-time chat interface with Claude AI
- Multi-threaded conversations
- Resizable three-pane layout
- Code syntax highlighting
- Markdown support
- TypeScript support

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Claude API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/claude-chat-clone.git
cd claude-chat-clone
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the server directory
```env
ANTHROPIC_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```

4. Start the development server
```bash
# Start the backend server
cd server
npm start

# In a new terminal, start the frontend
cd ..
npm run dev
```

## Development

- Frontend runs on: http://localhost:5173
- Backend runs on: http://localhost:3000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details 