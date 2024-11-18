import config from '../dbConfig.json' assert { type: 'json' };
import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority&appName=Cluster0`;
// const url = `mongodb+srv://tatemccauley:${config.password}@cluster0.trmab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(url);
const db = client.db('rental');

async function testConnection() {
  await client.connect();
 const response = await db.command({ ping: 1 });
 console.log(response)
};

export default testConnection