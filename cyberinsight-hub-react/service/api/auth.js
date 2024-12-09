import express from 'express';
import { findUserByEmail, createUser } from '../database.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    const user = await findUserByEmail(email);
    console.log('User lookup result:', user ? 'found' : 'not found');
    
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    if (user.password === password) {
      const { password, ...userData } = user;
      console.log('Login successful for user:', userData);
      return res.json({ success: true, user: userData });
    } else {
      console.log('Login failed: Invalid password');
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
    const userData = {
      email,
      password, // TODO: Add password hashing
      username,
      joinDate: new Date(),
      stats: {
        comments: 0,
        reactions: 0,
        articlesRead: 0
      }
    };
    
    const result = await createUser(userData);
    
    // Return the created user data (excluding password) along with success message
    const { password: _, ...safeUserData } = userData;
    
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      user: safeUserData
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;