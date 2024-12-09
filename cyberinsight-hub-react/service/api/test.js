import { MongoClient } from 'mongodb';
import config from '../dbConfig.json' assert { type: 'json' };

export default async function testConnection(req, res) {
  console.log('Test endpoint called');
  const uri = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=Cluster0`;
  const client = new MongoClient(uri);
  
  try {
    console.log('Attempting MongoDB connection...');
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('MongoDB connection successful');
    return res.json({ success: true });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}