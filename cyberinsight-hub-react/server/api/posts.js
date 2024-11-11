import express from 'express';
import { getBlogPosts, createBlogPost } from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await getBlogPosts();
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch posts' 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const post = await createBlogPost({
      title,
      excerpt,
      content,
      date: new Date(),
      // TODO: Add author info from authentication
      author: "Anonymous"
    });
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create post' 
    });
  }
});

export default router;