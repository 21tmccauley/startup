import { WebSocketServer } from 'ws';
import { parse } from 'url';

function setupWebSocket(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  
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

  // Handle new connections
  wss.on('connection', (ws, request) => {
    console.log('New client connected');
    
    // Initially set as anonymous
    clients.set(ws, 'Anonymous');
    updateUserList();

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        console.log('Received message:', message);

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
        console.error('Error processing message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Failed to process message'
        }));
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);
      updateUserList();
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
      updateUserList();
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