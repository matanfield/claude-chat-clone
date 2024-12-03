# Claude Chat Clone

A real-time chat application built with React, TypeScript, and the Anthropic Claude 3 API. This application provides a chat interface similar to Claude's official interface, allowing users to have conversations with Claude AI.

## Features

- Real-time chat interface with Claude 3
- Multiple chat threads support
- Thread management (create, switch between threads)
- Modern UI with Tailwind CSS
- Full TypeScript support
- Secure API handling through backend proxy

## Project Structure

```
├── docs/               # Documentation files
├── server/            # Backend server
│   ├── server.js      # Express server setup
│   └── .env          # Server environment variables
└── src/               # Frontend source code
    ├── components/    # React components
    │   ├── chat/     # Chat-related components
    │   ├── layout/   # Layout components
    │   ├── output/   # Output display components
    │   └── threads/  # Thread management components
    ├── context/      # React context providers
    ├── services/     # API services
    ├── types/        # TypeScript type definitions
    └── hooks/        # Custom React hooks
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anthropic API key

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd claude-clone
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up the server:
   ```bash
   cd server
   npm install
   ```

4. Configure environment variables:
   - Create `.env` in the server directory:
     ```
     ANTHROPIC_API_KEY=your-api-key-here
     PORT=3000
     ```

5. Start the development server:
   ```bash
   # In the server directory
   node server.js
   ```

6. Start the frontend (in a new terminal):
   ```bash
   # In the project root
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## API Documentation

See [API.md](./API.md) for detailed API documentation.

## Component Documentation

See [COMPONENTS.md](./COMPONENTS.md) for detailed component documentation.

## Architecture Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 