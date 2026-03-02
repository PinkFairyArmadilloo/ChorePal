import { connectToServer } from './connect';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import userRoutes from './userRoutes';
import choreRoutes from './choreRoutes';
import childRoutes from './childRoutes';
import awsRoutes from './awsRoutes';

const app = express();
const PORT = 3000;
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(upload.any());
app.use(userRoutes);
app.use(choreRoutes);
app.use(childRoutes);
app.use(awsRoutes);

async function startServer(): Promise<void> {
  try {
    await connectToServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error.', err);
    process.exit(1);
  }
}

startServer();
