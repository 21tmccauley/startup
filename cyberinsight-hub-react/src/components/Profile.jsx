// src/components/Profile.jsx
import { useState } from 'react';

export default function Profile() {
  const [userData] = useState({
    username: 'CyberExpert123',
    joinDate: 'January 15, 2024',
    bio: 'Passionate about cybersecurity and always eager to learn new techniques to protect digital assets. Specializing in network security and threat analysis.',
    stats: {
      comments: 27,
      reactions: 84,
      articlesRead: 156
    },
    recentActivity: [
      {
        id: 1,
        type: 'comment',
        post: 'Understanding Ransomware Attacks',
        timeAgo: '1 day ago'
      },
      {
        id: 2,
        type: 'reaction',
        post: 'Top 10 Cybersecurity Tools for 2024',
        timeAgo: '3 days ago'
      },
      {
        id: 3,
        type: 'chat',
        topic: 'Current Cybersecurity Trends',
        timeAgo: '1 week ago'
      }
    ]
  });

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
              <h2 className="card-title h4">{userData.username}</h2>
              <p>Cybersecurity Enthusiast</p>
              <small>Member since: {userData.joinDate}</small>
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
              <p>{userData.bio}</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Activity Stats</h3>
              <div className="row text-center">
                <div className="col-4">
                  <h4 className="h2 mb-0">{userData.stats.comments}</h4>
                  <p>Comments</p>
                </div>
                <div className="col-4">
                  <h4 className="h2 mb-0">{userData.stats.reactions}</h4>
                  <p>Reactions</p>
                </div>
                <div className="col-4">
                  <h4 className="h2 mb-0">{userData.stats.articlesRead}</h4>
                  <p>Articles Read</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Recent Activity</h3>
              {userData.recentActivity.map(activity => (
                <div key={activity.id} className="mb-3">
                  {activity.type === 'comment' && (
                    <p>Commented on "{activity.post}"<br />
                    <small className="text-muted">{activity.timeAgo}</small></p>
                  )}
                  {activity.type === 'reaction' && (
                    <p>Reacted to "{activity.post}"<br />
                    <small className="text-muted">{activity.timeAgo}</small></p>
                  )}
                  {activity.type === 'chat' && (
                    <p>Participated in Live Chat: "{activity.topic}"<br />
                    <small className="text-muted">{activity.timeAgo}</small></p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}