// service/websocket.js
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { parse } from 'url';

function setupWebSocket(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  
  // Track connected clients
  const clients = new Set();

  // Handle new connections
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected');

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);
        
        // Broadcast message to all connected clients
        clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({
              type: 'chat',
              data: {
                user: message.user,
                message: message.message,
                timestamp: new Date().toLocaleTimeString()
              }
            }));
          }
        });

      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
  });

  // Handle upgrade requests
  httpServer.on('upgrade', (request, socket, head) => {
    const { pathname } = parse(request.url);
    
    if (pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  return wss;
}

export default setupWebSocket;