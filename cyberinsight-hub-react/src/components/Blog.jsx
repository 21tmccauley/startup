// src/components/Blog.jsx
import { useState } from 'react';

export default function Blog() {
  const [blogPosts] = useState([
    {
      id: 1,
      title: "Understanding Ransomware Attacks",
      date: "September 25, 2024",
      excerpt: "Ransomware attacks have become increasingly sophisticated and frequent in recent years. This article explores the latest trends in ransomware and provides actionable steps to protect your organization.",
      image: "/placeholder-ransomware.jpg"
    },
    {
      id: 2,
      title: "Top 10 Cybersecurity Tools for 2024",
      date: "September 20, 2024",
      excerpt: "Stay ahead of cyber threats with these top 10 cybersecurity tools that every organization should consider implementing in 2024."
    }
  ]);

  const [categories] = useState([
    { name: 'Ransomware', count: 12 },
    { name: 'Network Security', count: 8 },
    { name: 'Data Privacy', count: 15 }
  ]);

  const [recentComments] = useState([
    {
      id: 1,
      author: "John Doe",
      post: "Understanding Ransomware Attacks",
      comment: "Great article! Very informative."
    },
    {
      id: 2,
      author: "Jane Smith",
      post: "Top 10 Cybersecurity Tools for 2024",
      comment: "I've been using tool #3 and it's fantastic!"
    }
  ]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-4">CyberInsight Hub Blog</h1>
          
          {blogPosts.map(post => (
            <div key={post.id} className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h3">{post.title}</h2>
                <small className="text-muted">Posted on: {post.date}</small>
                {post.image && (
                  <img 
                    src={post.image} 
                    className="img-fluid mb-3 mt-3" 
                    alt={post.title}
                  />
                )}
                <p>{post.excerpt}</p>
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          {/* Search */}
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Search</h3>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search blog posts..."
                />
                <button className="btn btn-primary" type="button">Search</button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Categories</h3>
              <ul className="list-unstyled">
                {categories.map((category, index) => (
                  <li key={index}>
                    {category.name} <span className="badge bg-primary rounded-pill">{category.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Comments */}
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">Recent Comments</h3>
              {recentComments.map(comment => (
                <div key={comment.id} className="mb-3">
                  <strong>{comment.author}</strong> on <a href="#">{comment.post}</a>
                  <p className="small mb-0">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}