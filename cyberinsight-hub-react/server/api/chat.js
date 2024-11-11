import express from 'express';
import { getChatMessages, saveChatMessage } from '../database.js';

const router = express.Router();

router.get('/messages', async (req, res) => {
  try {
    const messages = await getChatMessages(50); // Get last 50 messages
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch messages' 
    });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await saveChatMessage({
      user,
      message,
      timestamp: new Date()
    });
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save message' 
    });
  }
});

export default router;