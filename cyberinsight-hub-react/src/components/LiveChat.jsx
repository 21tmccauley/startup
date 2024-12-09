import { useState, useEffect, useRef } from 'react';
import { useUser } from '../contexts/UserContext';

export default function LiveChat() {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const getWebSocketUrl = () => {
    // For local development
    if (window.location.hostname === 'localhost') {
      return 'ws://localhost:4000';
    }
    
    // For production on EC2
    return 'ws://startup.tatemccauley.click:4000';
  };

  const connectWebSocket = () => {
    try {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const wsUrl = getWebSocketUrl();
      console.log('Attempting WebSocket connection to:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
        
        if (user) {
          wsRef.current.send(JSON.stringify({
            type: 'user_connected',
            user: user.username
          }));
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          console.log('Received message:', event.data);
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'chat':
              setChatMessages(prev => [...prev, {
                id: Date.now(),
                user: data.data.user,
                message: data.data.message,
                timestamp: data.data.timestamp
              }]);
              break;
              
            case 'user_list':
              setOnlineUsers(data.users);
              break;
              
            case 'error':
              console.error('WebSocket error:', data.message);
              break;
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket Disconnected');
        setIsConnected(false);
        
        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && wsRef.current && isConnected) {
      const messageData = {
        type: 'chat',
        user: user?.username || 'Anonymous',
        message: message.trim()
      };
      
      console.log('Sending message:', messageData);
      wsRef.current.send(JSON.stringify(messageData));
      setMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="h4 mb-0">Live Chat: Current Cybersecurity Trends</h2>
              <span className={`badge ${isConnected ? 'bg-success' : 'bg-danger'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            <div className="card-body chat-messages" style={{ height: '400px', overflowY: 'scroll' }}>
              {chatMessages.map(msg => (
                <div key={msg.id} className={`chat-message mb-3 ${msg.user === user?.username ? 'text-end' : ''}`}>
                  <strong>{msg.user}:</strong> {msg.message}
                  <br />
                  <small className="text-muted">{msg.timestamp}</small>
                </div>
              ))}
            </div>

            <div className="card-footer">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!isConnected}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!isConnected || !message.trim()}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">Online Users</h3>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                {onlineUsers.map((user, index) => (
                  <li key={index} className="mb-2">
                    <span className="text-success">●</span> {user}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="h5 mb-0">Chat Rules</h3>
            </div>
            <div className="card-body">
              <ol className="mb-0">
                <li>Be respectful to all participants</li>
                <li>Stay on topic (cybersecurity trends)</li>
                <li>No spamming or promotional content</li>
                <li>Use appropriate language</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}