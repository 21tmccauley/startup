import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://startup.tatemccauley.click';

export default function Home() {
  const [alerts] = useState([
    {
      id: 1,
      type: 'danger',
      message: 'Critical vulnerability detected in popular CMS. Update immediately.'
    },
    {
      id: 2,
      type: 'warning',
      message: 'New zero-day exploit found in widely-used email client.'
    }
  ]);

  const [quote, setQuote] = useState('Loading quote...');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random?tags=technology');
        const data = await response.json();
        setQuote(data.content);
        setQuoteAuthor(data.author);
      } catch (error) {
        setQuote('Technology is best when it brings people together. - Matt Mullenweg');
        setQuoteAuthor('Fallback Quote');
      }
    };

    fetchQuote();
  }, []);

  const [stats, setStats] = useState({
    members: 0,
    discussions: 0,
    articles: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const testConnection = async () => {
    setLoading(true);
    setConnectionError(null);
    setConnectionStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/test`);
      const data = await response.json();

      if (data.success) {
        setConnectionStatus('connected');
      } else {
        setConnectionError(data.error || 'Connection failed');
        setConnectionStatus('error');
      }
    } catch (err) {
      setConnectionError(err.message);
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <section id="intro" className="mb-4">
            <h1 className="display-4">Welcome to CyberInsight Hub</h1>
            <p className="lead">
              Stay informed and engaged with the latest cybersecurity threats and defense strategies.
            </p>
          </section>

          <section id="vulnerability-alerts" className="mb-4">
            <h2 className="h3 mb-3">Real-time Vulnerability Alerts</h2>
            <div id="alert-feed">
              {alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Database Connection Status</h3>
              <button 
                onClick={testConnection}
                disabled={loading}
                className="btn btn-primary w-100 mb-3"
              >
                {loading ? 'Testing Connection...' : 'Test MongoDB Connection'}
              </button>
              
              {connectionStatus && (
                <div className={`alert ${connectionStatus === 'connected' ? 'alert-success' : 'alert-danger'} d-flex align-items-center`}>
                  {connectionStatus === 'connected' ? (
                    <>
                      <CheckCircle2 className="me-2" />
                      <span>Successfully connected to MongoDB</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="me-2" />
                      <span>{connectionError}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Community Stats</h3>
              <ul className="list-unstyled">
                <li>Total Members <span className="badge bg-primary rounded-pill">{stats.members}</span></li>
                <li>Active Discussions <span className="badge bg-primary rounded-pill">{stats.discussions}</span></li>
                <li>Articles Published <span className="badge bg-primary rounded-pill">{stats.articles}</span></li>
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Security Quote of the Day</h3>
              <figure>
                <blockquote className="blockquote">
                  <p className="mb-0">{quote}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {quoteAuthor}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}