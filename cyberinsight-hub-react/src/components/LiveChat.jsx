// src/components/LiveChat.jsx
import { useState } from 'react';

export default function LiveChat() {
  const [message, setMessage] = useState('');
  const [chatMessages] = useState([
    {
      id: 1,
      user: 'SecurityNinja',
      message: 'Has anyone implemented zero trust architecture in their organization?',
      timestamp: '10:15 AM'
    },
    {
      id: 2,
      user: 'EthicalHacker42',
      message: "Yes, we've been working on it for the past 6 months. It's challenging but worth it.",
      timestamp: '10:17 AM'
    }
  ]);

  const [onlineUsers] = useState([
    'SecurityNinja',
    'EthicalHacker42',
    'CyberExpert123'
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h2 className="h4 mb-0">Live Chat: Current Cybersecurity Trends</h2>
            </div>
            
            <div className="card-body" style={{ height: '400px', overflowY: 'scroll' }}>
              {chatMessages.map(msg => (
                <div key={msg.id} className="chat-message mb-3">
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
                  />
                  <button type="submit" className="btn btn-primary">
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