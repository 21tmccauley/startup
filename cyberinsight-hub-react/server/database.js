import { MongoClient } from 'mongodb';
import config from './dbConfig.json' assert { type: 'json' };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=Cluster0`;
const client = new MongoClient(url);

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('cyberinsight');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

await connectDB();

export const users = db.collection('users');
export const posts = db.collection('posts');
export const comments = db.collection('comments');
export const messages = db.collection('messages');

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
  return await posts.insertOne(postData);
}

export async function getChatMessages(limit = 50) {
  return await messages.find({})
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray();
}

export async function saveChatMessage(messageData) {
  return await messages.insertOne(messageData);
}