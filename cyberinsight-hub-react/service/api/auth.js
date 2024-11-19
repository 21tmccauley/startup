import express from 'express';
import { findUserByEmail, createUser } from '../database.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });
    
    const user = await findUserByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    if (user.password === password) {
      // Remove password before sending user data
      const { password, ...userData } = user;
      console.log('Login successful:', userData);
      return res.json({ success: true, user: userData }); // Make sure to return here
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }
    
    // Create new user
    const result = await createUser({
      email,
      password, // TODO: Add password hashing
      username,
      joinDate: new Date(),
      stats: {
        comments: 0,
        reactions: 0,
        articlesRead: 0
      }
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;