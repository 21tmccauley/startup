import { MongoClient } from 'mongodb';
import config from './dbConfig.json' assert { type: 'json' };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('cyberinsight');

// Test the connection
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
    process.exit(1);
  }
})();

// Export collections
export const users = db.collection('users');
export const posts = db.collection('posts');
export const comments = db.collection('comments');
export const messages = db.collection('messages');

// Helper functions
export async function findUserByEmail(email) {
  return await users.findOne({ email });
}

export async function createUser(userData) {
  return await users.insertOne(userData);
}

export async function getBlogPosts() {
  return await posts.find({}).sort({ date: -1 }).toArray();
}

export async function createBlogPost(postData) {
  return await posts.insertOne({ ...postData, date: new Date() });
}

export async function getChatMessages(limit = 50) {
  return await messages.find({})
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray();
}

export async function saveChatMessage(messageData) {
  return await messages.insertOne({ 
    ...messageData, 
    timestamp: new Date() 
  });
}