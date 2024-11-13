import express from 'express';
import { getStats } from '../database.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    // For now, return mock stats until we implement full tracking
    const stats = {
      members: 1337,
      discussions: 42,
      articles: 256
    };
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stats' 
    });
  }
});

export default router;