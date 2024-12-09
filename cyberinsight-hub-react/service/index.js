import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { MongoClient } from 'mongodb';
import config from './dbConfig.json' assert { type: 'json' };
import testConnection from './api/test.js';
import setupWebSocket from './websocket.js'
//import testConnection from './api/test.js';

// Import routes
import authRoutes from './api/auth.js';
import postRoutes from './api/posts.js';
import chatRoutes from './api/chat.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4006;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);

app.on('error', (err) => {
  console.error('Server error:', err);
});

app.get('/api/test', async (req, res) => {
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=Cluster0`;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
});

app.get('/api/test', (req, res) => {
  console.log("made it to /api/test,")
  testConnection();
  console.log(" connection valid")
  res.send("hello");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Catch-all route for SPA
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.use((_req, res) => {
  res.sendFile('index.html', {root: "public"})
})

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

setupWebSocket(httpServer);

