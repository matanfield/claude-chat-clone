const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Verify API key is present
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set in environment variables');
  process.exit(1);
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    console.log('Raw request body:', req.body);
    console.log('Received messages:', JSON.stringify(messages, null, 2));
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages must be an array' });
    }

    // Format messages for Claude API
    const formattedMessages = messages.map(msg => ({
      role: msg.is_ai ? 'assistant' : 'user',
      content: msg.content
    }));

    console.log('Formatted messages for Claude:', JSON.stringify(formattedMessages, null, 2));

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: formattedMessages,
        system: "You are Claude, a helpful AI assistant."
      });

      console.log('Claude API response:', JSON.stringify(response, null, 2));
      
      if (!response.content || !response.content[0] || !response.content[0].text) {
        console.error('Invalid Claude response format:', response);
        throw new Error('Invalid response format from Claude API');
      }

      const message = response.content[0].text;
      console.log('Sending response:', message);
      res.json({ message });
    } catch (apiError) {
      console.error('Claude API Error:', {
        name: apiError.name,
        message: apiError.message,
        status: apiError.status,
        response: apiError.response?.data
      });
      
      res.status(500).json({
        error: 'Claude API Error',
        details: apiError.message,
        name: apiError.name
      });
    }
  } catch (error) {
    console.error('Server Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Server Error',
      details: error.message,
      name: error.name
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok',
    apiKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY ? 
      `${process.env.ANTHROPIC_API_KEY.substring(0, 7)}...` : 
      'not-set'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', {
    nodeEnv: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: `${process.env.ANTHROPIC_API_KEY?.substring(0, 7)}...`
  });
}); 