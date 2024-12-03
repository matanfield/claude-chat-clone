const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY is not set in environment variables');
  process.exit(1);
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages must be an array' });
    }

    console.log('Received request with messages:', JSON.stringify(messages, null, 2));
    
    // Validate messages format
    if (!messages.every(m => m.role && m.content && typeof m.content === 'string')) {
      return res.status(400).json({ error: 'Invalid message format. Each message must have role and content.' });
    }

    // Format messages for Claude API
    const formattedMessages = messages.map(({ role, content }) => ({
      role: role === 'assistant' ? 'assistant' : 'user',
      content: content.trim()
    }));

    console.log('Formatted messages:', JSON.stringify(formattedMessages, null, 2));
    
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',  // Updated to the latest Claude 3 model
      max_tokens: 1024,
      messages: formattedMessages,
      system: systemPrompt || 'You are Claude, a helpful AI assistant.'
    });

    console.log('Anthropic API response:', response);
    res.json(response);
  } catch (error) {
    console.error('Detailed server error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.status,
      headers: error.response?.headers
    });
    
    // More specific error handling
    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    } else if (error.status === 400) {
      return res.status(400).json({ error: 'Invalid request format' });
    } else if (error.status === 404) {
      return res.status(404).json({ error: 'Model not found. Please check the model name.' });
    }
    
    res.status(500).json({ 
      error: error.message,
      type: error.name,
      details: error.response?.data || error.stack
    });
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok',
    apiKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 10) + '...'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', {
    nodeEnv: process.env.NODE_ENV,
    apiKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 10) + '...',
    model: 'claude-3-opus-20240229'
  });
}); 