import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect';
import type { DbChild } from './src/types/domain';

const childRoutes = express.Router();

// #1 Retrieve all children
childRoutes.get('/children', async (_req: Request, res: Response): Promise<void> => {
  const db = getDb();
  const data = await db.collection<DbChild>('child').find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

// #2 Retrieve one child
childRoutes.get(
  '/children/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const db = getDb();
    const data = await db
      .collection<DbChild>('child')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (data && Object.keys(data).length > 0) {
      res.json(data);
    } else {
      throw new Error('Data was not found :(');
    }
  }
);

// #3 Create one child
childRoutes.post(
  '/children',
  async (
    req: Request<Record<string, never>, unknown, { username: string }>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const mongoObject: Omit<DbChild, '_id'> = {
      username: req.body.username,
    };
    const data = await db.collection<DbChild>('child').insertOne(mongoObject);
    res.json(data);
  }
);

// #4 Update one child
childRoutes.put(
  '/children/:id',
  async (
    req: Request<{ id: string }, unknown, { username?: string }>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const mongoObject = {
      $set: {
        username: req.body.username,
      },
    };
    const data = await db
      .collection<DbChild>('child')
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
    res.json(data);
  }
);

// #5 Delete one child
childRoutes.delete(
  '/children/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const db = getDb();
    const data = await db
      .collection<DbChild>('child')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
  }
);

export default childRoutes;
