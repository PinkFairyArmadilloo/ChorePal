import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect';
import type { DbChore } from './src/types/domain';

const choreRoutes = express.Router();

type ChoreStatus = 'Pending' | 'Completed';

interface ChoreWithStatus extends DbChore {
  status: ChoreStatus;
}

type CreateChoreBody = Omit<DbChore, '_id'>;
type UpdateChoreBody = Partial<Omit<DbChore, '_id'>>;

// #1 Retrieve all chores
choreRoutes.get('/chores', async (_req: Request, res: Response): Promise<void> => {
  const db = getDb();
  const rawData = await db.collection<DbChore>('chores').find({}).toArray();
  const data: ChoreWithStatus[] = rawData.map((chore) => ({
    ...chore,
    status: chore.isCompleted ? 'Completed' : 'Pending',
  }));
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

// #2 Retrieve one chore
choreRoutes.get(
  '/chores/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const db = getDb();
    const data = await db
      .collection<DbChore>('chores')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (data && Object.keys(data).length > 0) {
      res.json(data);
    } else {
      throw new Error('Data was not found :(');
    }
  }
);

// #3 Create one chore
choreRoutes.post(
  '/chores',
  async (
    req: Request<Record<string, never>, unknown, CreateChoreBody>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const mongoObject: CreateChoreBody = {
      choreName: req.body.choreName,
      isWeekly: req.body.isWeekly,
      isCompleted: req.body.isCompleted,
      rating: req.body.rating,
      childName: req.body.childName,
      image: req.body.image,
      day: req.body.day,
    };
    const data = await db.collection<DbChore>('chores').insertOne(mongoObject);
    res.json(data);
  }
);

// #4 Update one chore
choreRoutes.put(
  '/chores/:id',
  async (
    req: Request<{ id: string }, unknown, UpdateChoreBody>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const mongoObject = {
      $set: {
        choreName: req.body.choreName,
        isWeekly: req.body.isWeekly,
        isCompleted: req.body.isCompleted,
        rating: req.body.rating,
        childName: req.body.childName,
        image: req.body.image,
        day: req.body.day,
      },
    };
    const data = await db
      .collection<DbChore>('chores')
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
    res.json(data);
  }
);

// #5 Delete one chore
choreRoutes.delete(
  '/chores/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const db = getDb();
    const data = await db
      .collection<DbChore>('chores')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
  }
);

export default choreRoutes;
