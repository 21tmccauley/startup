// Profile.jsx
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    comments: 0,
    reactions: 0,
    articlesRead: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:4000/api/users/${user._id}/stats`);
          const data = await response.json();
          if (data.success) {
            setUserStats(data.stats);
          }
        } catch (error) {
          console.error('Failed to fetch user stats:', error);
        }
      }
    };

    fetchUserStats();
  }, [user]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <img 
                src="/api/placeholder/150/150" 
                className="rounded-circle img-fluid mb-3"
                alt="User Avatar"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h2 className="card-title h4">{user.username}</h2>
              <p>{user.bio || 'Cybersecurity Enthusiast'}</p>
              <small>Member since: {new Date(user.joinDate).toLocaleDateString()}</small>
              <div className="mt-3">
                <button className="btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">About Me</h3>
              <p>{user.bio || 'No bio added yet.'}</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Activity Stats</h3>
              <div className="row text-center">
                <div className="col-4">
                  <h4 className="h2 mb-0">{userStats.comments}</h4>
                  <p>Comments</p>
                </div>
                <div className="col-4">
                  <h4 className="h2 mb-0">{userStats.reactions}</h4>
                  <p>Reactions</p>
                </div>
                <div className="col-4">
                  <h4 className="h2 mb-0">{userStats.articlesRead}</h4>
                  <p>Articles Read</p>
                </div>
              </div>
            </div>
          </div>

          {recentActivity.length > 0 && (
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title h5">Recent Activity</h3>
                {recentActivity.map((activity, index) => (
                  <div key={index} className="mb-3">
                    <p>{activity.description}<br />
                    <small className="text-muted">{activity.timeAgo}</small></p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}