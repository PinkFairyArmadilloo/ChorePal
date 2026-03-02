import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const atlasUri = process.env['ATLAS_URI'];
if (!atlasUri) {
  throw new Error('ATLAS_URI environment variable is not defined in config.env');
}

const client = new MongoClient(atlasUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database: Db | undefined;

export const connectToServer = async (): Promise<void> => {
  try {
    await client.connect();
    database = client.db('chorePal');
    console.log('MongoDB connection established.');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
};

export const getDb = (): Db => {
  if (!database) {
    throw new Error('Database not connected. Call connectToServer() first.');
  }
  return database;
};
