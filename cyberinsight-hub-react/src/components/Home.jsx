// src/components/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const [latestPosts] = useState([
    {
      id: 1,
      title: 'Understanding Ransomware Attacks',
      date: 'September 25, 2024',
      excerpt: 'Learn about the latest ransomware trends and how to protect your organization...'
    },
    // Add more posts as needed
  ]);

  const [stats] = useState({
    members: 1337,
    discussions: 42,
    articles: 256
  });

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

          <section id="latest-posts" className="mb-4">
            <h2 className="h3 mb-3">Latest Blog Posts</h2>
            <div id="blog-posts-container">
              {latestPosts.map(post => (
                <div key={post.id} className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title h5">{post.title}</h3>
                    <small>{post.date}</small>
                    <p className="mt-2">{post.excerpt}</p>
                    <Link to="/blog" className="btn btn-primary">Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-lg-4">
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
              <p className="mb-0">Loading quote from external service...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}