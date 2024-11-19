// Navigation.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Add this import

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Add this hook
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">CyberInsight Hub</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            
            {/* Public routes */}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} 
                to="/blog"
              >
                Blog
              </Link>
            </li>

            {/* Protected routes - only show when logged in */}
            {user && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} 
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`} 
                    to="/chat"
                  >
                    Live Chat
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth section */}
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {user.username}!
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} 
                  to="/login"
                >
                  Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}