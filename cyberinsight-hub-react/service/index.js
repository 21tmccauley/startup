import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import path from 'path';
import config from './dbConfig.json' assert { type: 'json' };

// Import routes
import authRoutes from './api/auth.js';
import postRoutes from './api/posts.js';
import chatRoutes from './api/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Track connected clients and their usernames
const clients = new Map();

function broadcastMessage(message) {
  clients.forEach((username, client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(JSON.stringify(message));
    }
  });
}

function updateUserList() {
  const userList = Array.from(clients.values());
  broadcastMessage({
    type: 'user_list',
    users: userList
  });
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  
  // Initially set as anonymous
  clients.set(ws, 'Anonymous');
  updateUserList();

  // Add a ping to keep connection alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === 1) {
      ws.ping();
    }
  }, 30000);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received WebSocket message:', message);

      switch (message.type) {
        case 'user_connected':
          clients.set(ws, message.user);
          updateUserList();
          break;

        case 'chat':
          broadcastMessage({
            type: 'chat',
            data: {
              user: message.user,
              message: message.message,
              timestamp: new Date().toLocaleTimeString()
            }
          });
          break;
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Failed to process message'
      }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(pingInterval);
    clients.delete(ws);
    updateUserList();
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(pingInterval);
    clients.delete(ws);
    updateUserList();
  });
});

// Configure CORS
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'https://startup.tatemccauley.click',
    'http://startup.tatemccauley.click'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Add the stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      members: 150,
      discussions: 45,
      articles: 23
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);

// Catch-all route for React routing
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`WebSocket server is ready`);
});