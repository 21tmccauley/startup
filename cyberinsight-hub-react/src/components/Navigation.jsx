import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">CyberInsight Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`} to="/chat">Live Chat</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login/Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}