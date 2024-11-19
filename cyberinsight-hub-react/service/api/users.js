import express from 'express';
import { getStats } from '../database.js';

const router = express.Router();

// In api/users.js
router.get('/:userId/stats', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch user stats from database
    const stats = await getUserStats(userId);
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user stats' 
    });
  }
});

export default router;