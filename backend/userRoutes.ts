import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDb } from './connect';
import type { DbUser } from './src/types/domain';

const userRoutes = express.Router();
const SALT_ROUNDS = 6;

// ─── Request body interfaces ──────────────────────────────────────────────────

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
  childrenName?: string[];
}

interface UpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  childrenName?: string[];
}

interface LoginBody {
  email: string;
  password: string;
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// #1 Retrieve all users
userRoutes.get('/users', async (_req: Request, res: Response): Promise<void> => {
  const db = getDb();
  const data = await db.collection<DbUser>('users').find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

// #2 Retrieve one user
userRoutes.get(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const db = getDb();
    const data = await db
      .collection<DbUser>('users')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (data && Object.keys(data).length > 0) {
      res.json(data);
    } else {
      throw new Error('Data was not found :(');
    }
  }
);

// #3 Create one user
userRoutes.post(
  '/users',
  async (
    req: Request<Record<string, never>, unknown, CreateUserBody>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const takenEmail = await db
      .collection<DbUser>('users')
      .findOne({ email: req.body.email });

    if (takenEmail) {
      res.json({ message: 'The email is taken' });
      return;
    }

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const mongoObject: Omit<DbUser, '_id'> = {
      username: req.body.name,
      email: req.body.email,
      password: hash,
      childrenName: req.body.childrenName ?? [],
    };
    const data = await db.collection<DbUser>('users').insertOne(mongoObject);
    res.json(data);
  }
);

// #4 Update one user
userRoutes.put(
  '/users/:id',
  async (
    req: Request<{ id: string }, unknown, UpdateUserBody>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const mongoObject = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        childrenName: req.body.childrenName,
      },
    };
    const data = await db
      .collection<DbUser>('users')
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
    res.json(data);
  }
);

// #5 Delete one user
userRoutes.delete(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const db = getDb();
    const data = await db
      .collection<DbUser>('users')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
  }
);

// #6 Login
userRoutes.post(
  '/users/login',
  async (
    req: Request<Record<string, never>, unknown, LoginBody>,
    res: Response
  ): Promise<void> => {
    const db = getDb();
    const user = await db
      .collection<DbUser>('users')
      .findOne({ email: req.body.email });

    if (!user) {
      res.json({ success: false, message: 'User not found' });
      return;
    }

    const confirmation = await bcrypt.compare(req.body.password, user.password);
    if (!confirmation) {
      res.json({ success: false, message: 'Incorrect Password' });
      return;
    }

    const secretKey = process.env['SECRETKEY'];
    if (!secretKey) throw new Error('SECRETKEY environment variable is not set');

    const token = jwt.sign(
      {
        _id: user._id?.toString(),
        email: user.email,
        username: user.username,
      },
      secretKey,
      { expiresIn: '1h' }
    );
    res.json({ success: true, token });
  }
);

export default userRoutes;
