import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export function connectToDb(): Promise<MongoClient> {
  return new Promise((resolve) => {
    MongoClient.connect(process.env.MONGODB_CONNECTION_STRING as string)
      .then((client) => {
        console.log('Connected to Database');
        resolve(client as MongoClient);
      });
  });
}
